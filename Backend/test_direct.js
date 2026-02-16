require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const INFO_DIR = path.join(__dirname, 'info');

async function testDirect() {
    console.log('🔍 Testing Gemini API directly...\n');

    // Check API key
    console.log('API Key present:', !!process.env.GEMINI_API_KEY);
    console.log('API Key length:', process.env.GEMINI_API_KEY?.length || 0);

    // Check info directory
    console.log('\n📂 Checking info directory:', INFO_DIR);
    console.log('Directory exists:', fs.existsSync(INFO_DIR));

    if (fs.existsSync(INFO_DIR)) {
        const files = fs.readdirSync(INFO_DIR);
        console.log('Files found:', files.length);
        files.forEach(f => console.log('  -', f));
    }

    // Try to load context
    console.log('\n📖 Loading context...');
    try {
        let fullText = '';
        const files = fs.readdirSync(INFO_DIR);

        for (const file of files) {
            const filePath = path.join(INFO_DIR, file);
            console.log(`   Reading: ${file}`);

            if (file.endsWith('.csv')) {
                const content = fs.readFileSync(filePath, 'utf-8');
                fullText += `\n--- SOURCE: ${file} ---\n${content}\n`;
            } else if (file.endsWith('.docx')) {
                const result = await mammoth.extractRawText({ path: filePath });
                fullText += `\n--- SOURCE: ${file} ---\n${result.value}\n`;
            }
        }

        console.log('✅ Context loaded. Length:', fullText.length);

        // Try Gemini API
        console.log('\n🤖 Testing Gemini API...');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: 'You are a medical chatbot.'
        });

        const prompt = `
MEDICAL CONTEXT:
${fullText.substring(0, 5000)}

USER QUESTION:
What lab tests are available?
`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0,
                topP: 0.1,
                topK: 1,
                maxOutputTokens: 512,
            }
        });

        const response = result.response.text();
        console.log('✅ Gemini response received!');
        console.log('Response preview:', response.substring(0, 200));

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('Error details:', error);
    }
}

testDirect();
