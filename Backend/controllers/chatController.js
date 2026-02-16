const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { parseCSVFiles } = require('../utils/csvParser');
const { findExactTest, searchTestByName, cleanTestName } = require('../utils/searchEngine');
const { classifyIntent } = require('../utils/intentDetector');

const INFO_DIR = path.join(__dirname, '../info');

let model = null;
let contextCache = null;
let isContextLoaded = false;
let labTestsData = [];
let isLabDataLoaded = false;

// Lazy-load Gemini model
function getModel() {
  if (model) return model;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }

  console.log('🤖 [CHAT] Initializing Gemini model (gemini-1.5-flash)...');
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are a specialized medical chatbot for ZUNF Medicare.

STRICT RULES:
1. Answer ONLY medical-related questions.
2. Use the provided context first.
3. Professional, clinical, and EXTREMELY CONCISE response style (max 2-3 sentences).
4. ALWAYS end your response with a new line starting with "SUGGESTIONS:" followed by 3-4 short, relevant follow-up options separated by "|".
5. If no information is found in context or search, state that clearly but remain professional.`
  });

  return model;
}

const generationConfig = {
  temperature: 0,
  topP: 0.1,
  topK: 1,
  maxOutputTokens: 1024,
};

/**
 * Loads and caches content from the info directory.
 */
async function loadContext() {
  if (isContextLoaded && isLabDataLoaded && contextCache !== null) {
    return contextCache;
  }

  try {
    if (!isLabDataLoaded) {
      labTestsData = parseCSVFiles(INFO_DIR);
      isLabDataLoaded = true;
      console.log(`✅ [CHAT] Loaded ${labTestsData.length} lab tests.`);
    }

    if (!isContextLoaded || contextCache === null) {
      let fullText = '';
      const files = fs.readdirSync(INFO_DIR);

      for (const file of files) {
        const filePath = path.join(INFO_DIR, file);
        try {
          if (file.toLowerCase().endsWith('.csv')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            fullText += `\n--- SOURCE: ${file} ---\n${content}\n`;
          } else if (file.toLowerCase().endsWith('.docx')) {
            const result = await mammoth.extractRawText({ path: filePath });
            fullText += `\n--- SOURCE: ${file} ---\n${result.value}\n`;
          }
        } catch (fileError) {
          console.error(`❌ [CHAT] Error processing file ${file}:`, fileError.message);
        }
      }

      contextCache = fullText.trim() || '';
      isContextLoaded = true;
    }

    return contextCache;
  } catch (error) {
    console.error('❌ [CHAT] Critical failure in loadContext:', error);
    return contextCache || '';
  }
}

/**
 * Main chat endpoint with redesigned intent-based routing
 */
exports.chat = async (req, res) => {
  const startTime = Date.now();
  try {
    const { message } = req.body;
    const history = req.body.history || [];

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required',
        response: 'Please provide a valid message.'
      });
    }

    // SPECIAL CASE: Booking Intent
    if (message.toLowerCase().includes('book this test')) {
      console.log('📅 [CHAT] User wants to book a test');
      return res.json({
        response: "Please proceed to the labs page to complete your booking."
      });
    }

    // Ensure context is loaded
    await loadContext();

    console.log(`🤖 [CHAT] Request: "${message.substring(0, 60)}${message.length > 60 ? '...' : ''}"`);

    // STEP 1: Classify Intent
    const intent = classifyIntent(message);
    console.log(`🎯 [CHAT] Intent: ${intent.type} (confidence: ${intent.confidence})`);

    // STEP 2: Route based on intent
    switch (intent.type) {
      case 'greeting':
        return handleGreeting(res);

      case 'exact_query':
        return await handleExactQuery(intent, res);

      case 'test_query':
        return await handleTestQuery(intent, res);

      case 'lab_only':
        // Try to recover test context from history
        const contextTest = findTestInHistory(history);
        if (contextTest) {
          console.log(`🔄 [CHAT] Recovered context: ${contextTest} + ${intent.entities.labName}`);
          // Upgrade to exact query
          intent.entities.testName = contextTest;
          return await handleExactQuery(intent, res);
        }
        return handleLabOnly(intent, res);

      case 'medical_question':
        return await handleMedicalQuestion(message, res);

      default:
        // Check if it might be a context-dependent lab selection that failed intent classification
        const unclearContextTest = findTestInHistory(history);
        if (unclearContextTest) {
          // Check if the message is a lab name (fuzzy match)
          // This is a backup if intentDetector missed it or was unsure
          const potentialLab = labTestsData.find(t =>
            t.labName.toLowerCase().includes(message.toLowerCase()) ||
            message.toLowerCase().includes(t.labName.toLowerCase())
          );

          if (potentialLab) {
            console.log(`🔄 [CHAT] Recovered context (fuzzy lab): ${unclearContextTest} + ${potentialLab.labName}`);
            intent.entities.testName = unclearContextTest;
            intent.entities.labName = potentialLab.labName;
            return await handleExactQuery(intent, res);
          }
        }

        return await handleUnclear(message, res);
    }

  } catch (error) {
    console.error('❌ [CHAT] Error:', error);
    return res.status(500).json({
      error: 'Failed',
      response: 'Sorry, I encountered an error. Please try again.'
    });
  }
};

/**
 * Helper to find the last mentioned test in conversation history
 */
function findTestInHistory(history) {
  if (!history || history.length === 0) return null;

  // Look backwards through history
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i].content;
    const role = history[i].role;

    // If it was a user message, check if it was a test query
    if (role === 'user') {
      // Check typical patterns first
      if (msg.toLowerCase().includes('test') || msg.toLowerCase().includes('count') || msg.toLowerCase().includes('cbc')) {
        // Clean up common words to get the core test name
        const clean = msg.toLowerCase().replace('test', '').replace('price', '').trim();
        if (clean.length > 2) return clean;
      }
    }

    // If it was a bot message saying "I found [Test Name]", extract it
    if (role === 'assistant' && msg.includes('I found ')) {
      // Regex for "I found **Test Name**" or "I found Test Name"
      const match = msg.match(/I found \*\*?([^*]+)\*\*? at/);
      if (match) return match[1].trim();
    }
  }
  return null;
}

/**
 * Handle greeting intent
 */
function handleGreeting(res) {
  console.log('👋 [CHAT] Greeting detected');
  return res.json({
    response: "Hello! I'm ZUNF Medicare's AI assistant. What type of test would you like to conduct today?\n\nSUGGESTIONS: CBC Test | Urine Test | Blood Sugar | Test Zone Diagnostic Center"
  });
}

/**
 * Handle exact query (lab + test specified)
 */
async function handleExactQuery(intent, res) {
  const { labName, testName } = intent.entities;
  console.log(`🔍 [CHAT] Exact query: ${testName} at ${labName}`);

  // Find exact match
  const exactMatch = findExactTest(labName, testName, labTestsData);

  if (exactMatch) {
    const cleanedName = cleanTestName(exactMatch.testName);
    const originalPrice = exactMatch.regularPrice || 0;
    const discountedPrice = exactMatch.salePrice || 0;
    const discountPercentage = exactMatch.discountPercentage || 0;

    let response = `**${cleanedName}**\n\n`;
    response += `Original Price: PKR ${originalPrice.toLocaleString()}\n`;

    if (discountPercentage > 0) {
      response += `Discounted Price: PKR ${discountedPrice.toLocaleString()} (${discountPercentage}% off)`;
    } else {
      response += `Price: PKR ${discountedPrice.toLocaleString()}`;
    }

    response += `\n\nSUGGESTIONS: Book this test`;

    console.log(`✅ [CHAT] Exact match found: ${cleanedName} at ${exactMatch.labName}`);
    return res.json({ response });
  }

  // No exact match found - be helpful
  console.log(`⚠️ [CHAT] No exact match for: ${testName} at ${labName}`);
  return res.json({
    response: `I couldn't find an exact match for "${testName}" at ${labName}. Please check the test name or try another lab.\n\nSUGGESTIONS: Book this test`
  });
}

/**
 * Handle test query (only test specified, no lab)
 */
async function handleTestQuery(intent, res) {
  const { testName } = intent.entities;
  console.log(`🔍 [CHAT] Test query: ${testName}`);

  // Search for test across all labs
  const matches = searchTestByName(testName, labTestsData);

  if (matches.length === 0) {
    console.log(`⚠️ [CHAT] No matches for: ${testName}`);
    return res.json({
      response: `I couldn't find any lab tests matching "${testName}". Please check the spelling or try a different test name.\n\nSUGGESTIONS: CBC Test | Urine Test | Blood Sugar`
    });
  }

  // Get unique labs offering this test
  const uniqueLabs = [...new Set(matches.map(t => t.labName))];

  if (uniqueLabs.length === 1) {
    // Only one lab offers this test - show direct result
    const test = matches[0];
    const cleanedName = cleanTestName(test.testName);
    let response = `**${cleanedName}** is available at **${test.labName}** for **PKR ${test.salePrice.toLocaleString()}**.`;
    response += `\n\nSUGGESTIONS: Book this test`;

    console.log(`✅ [CHAT] Single lab found: ${test.labName}`);
    return res.json({ response });
  }

  // Multiple labs offer this test - show options (limit to top 5)
  const topLabs = uniqueLabs.slice(0, 5);
  let response = `I found **${cleanTestName(matches[0].testName)}** at ${topLabs.length} labs. Please select a lab to see the price:\n\n`;

  topLabs.forEach((lab, index) => {
    response += `${index + 1}. ${lab}\n`;
  });

  response += `\nYou can type the lab name to see full details.\n\nSUGGESTIONS: ${topLabs.slice(0, 3).join(' | ')}`;

  console.log(`✅ [CHAT] Found ${topLabs.length} labs offering this test`);
  return res.json({ response });
}

/**
 * Handle lab-only query (lab specified but no test)
 */
function handleLabOnly(intent, res) {
  const { labName } = intent.entities;
  console.log(`🏥 [CHAT] Lab-only query: ${labName}`);

  return res.json({
    response: `You selected **${labName.charAt(0).toUpperCase() + labName.slice(1)}** lab. Is there a specific test you're looking for?\n\nSUGGESTIONS: CBC Test | Urine Test | Blood Sugar`
  });
}

/**
 * Handle medical question using Gemini
 */
async function handleMedicalQuestion(message, res) {
  console.log('🤖 [CHAT] Medical question - using Gemini...');

  const prompt = `
MEDICAL CONTEXT:
${contextCache.substring(0, 30000) || 'No Context'}

USER QUESTION:
${message}
`;

  const modelInstance = getModel();
  const result = await modelInstance.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig,
  });

  let responseText = result.response.text().trim();
  if (!responseText.includes('SUGGESTIONS:')) {
    responseText += "\n\nSUGGESTIONS: Book this test";
  }

  return res.json({ response: responseText });
}

/**
 * Handle unclear queries - try one more broad search before giving up
 */
async function handleUnclear(message, res) {
  console.log('❓ [CHAT] Unclear query - attempting fallback...');

  // Try a broad test search
  const matches = searchTestByName(message, labTestsData);

  if (matches.length > 0) {
    // Redirect to test query handler
    return await handleTestQuery({ entities: { testName: message }, confidence: 0.5 }, res);
  }

  // Really unclear - ask for clarification
  return res.json({
    response: "I'm not sure what you're looking for. Could you please specify which lab test you'd like information about?\n\nSUGGESTIONS: CBC Test | Urine Test | Blood Sugar"
  });
}