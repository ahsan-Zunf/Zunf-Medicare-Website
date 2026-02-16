/**
 * Intent Detection and Entity Extraction for Chatbot
 * Classifies user intent and extracts lab names and test names
 */

// Known lab names (normalized)
const KNOWN_LABS = [
    'chughtai',
    'biotech',
    'bio-tech',
    'bio tech',
    'ayzal',
    'test zone',
    'testzone',
    'jinnah',
    'jinnah mri',
    'esthetique',
    'esthetique canon',
    'canon'
];

// Common test name patterns
const COMMON_TESTS = [
    'cbc',
    'complete blood count',
    'blood test',
    'urine routine',
    'urine test',
    'blood sugar',
    'sugar test',
    'hba1c',
    'thyroid',
    'lipid profile',
    'liver function',
    'lft',
    'kidney function',
    'rft',
    'vitamin d',
    'vitamin b12',
    'ultrasound',
    'xray',
    'x-ray',
    'ecg',
    'ct scan',
    'mri'
];

/**
 * Main intent classifier
 * @param {string} query - User query
 * @returns {Object} Intent classification result
 */
function classifyIntent(query) {
    if (!query || typeof query !== 'string') {
        return { type: 'unknown', confidence: 0 };
    }

    const normalized = query.trim().toLowerCase();

    // Check for greeting
    if (isGreeting(normalized)) {
        return {
            type: 'greeting',
            confidence: 1.0,
            entities: {}
        };
    }

    // Extract entities
    const entities = extractEntities(normalized);

    // Determine intent type based on entities
    if (entities.labName && entities.testName) {
        return {
            type: 'exact_query',
            confidence: entities.confidence,
            entities,
            requiresPrice: isPriceQuery(normalized)
        };
    }

    if (entities.testName && !entities.labName) {
        return {
            type: 'test_query',
            confidence: entities.confidence,
            entities,
            requiresLabSelection: true
        };
    }

    if (entities.labName && !entities.testName) {
        return {
            type: 'lab_only',
            confidence: entities.confidence,
            entities,
            requiresTestSelection: true
        };
    }

    // Check if it's a general medical question
    if (isMedicalQuery(normalized)) {
        return {
            type: 'medical_question',
            confidence: 0.7,
            entities: {}
        };
    }

    return {
        type: 'unclear',
        confidence: 0.3,
        entities: {}
    };
}

/**
 * Extract lab name and test name from query
 * @param {string} query - Normalized query
 * @returns {Object} Extracted entities with confidence
 */
function extractEntities(query) {
    const entities = {
        labName: null,
        testName: null,
        confidence: 0
    };

    // Extract lab name
    const labMatch = extractLabName(query);
    if (labMatch) {
        entities.labName = labMatch.name;
        entities.confidence += 0.5;
    }

    // Extract test name
    const testMatch = extractTestName(query);
    if (testMatch) {
        entities.testName = testMatch.name;
        entities.confidence += 0.5;
    }

    return entities;
}

/**
 * Extract lab name from query
 * @param {string} query - Normalized query
 * @returns {Object|null} Lab name and confidence
 */
function extractLabName(query) {
    // Look for explicit "at [lab]" pattern
    const atPattern = /(?:at|from|in)\s+([a-z\s\-]+?)(?:\s+lab|\s+hospital|\s+centre|$|[,.])/i;
    const atMatch = query.match(atPattern);

    if (atMatch) {
        const labCandidate = atMatch[1].trim();
        const matchedLab = findBestLabMatch(labCandidate);
        if (matchedLab) {
            return { name: matchedLab, confidence: 0.9 };
        }
    }

    // Check if any known lab name appears in the query
    for (const lab of KNOWN_LABS) {
        const labRegex = new RegExp(`\\b${escapeRegex(lab)}\\b`, 'i');
        if (labRegex.test(query)) {
            return { name: lab, confidence: 0.7 };
        }
    }

    return null;
}

/**
 * Extract test name from query
 * @param {string} query - Normalized query
 * @returns {Object|null} Test name and confidence
 */
function extractTestName(query) {
    // Remove lab name portion to avoid confusion
    const cleanQuery = query.replace(/(?:at|from|in)\s+[a-z\s\-]+?(?:\s+lab|\s+hospital|\s+centre)/i, '');

    // Check for common test patterns
    for (const test of COMMON_TESTS) {
        const testRegex = new RegExp(`\\b${escapeRegex(test)}\\b`, 'i');
        if (testRegex.test(cleanQuery)) {
            return { name: test, confidence: 0.8 };
        }
    }

    // Look for "test" keyword and extract surrounding words
    const testPattern = /([a-z0-9\s\-]+?)\s+(?:test|profile|scan|examination|screening)/i;
    const testMatch = cleanQuery.match(testPattern);

    if (testMatch) {
        return { name: testMatch[0].trim(), confidence: 0.6 };
    }

    // If query is short and specific, it might be a test name
    // BUT check if it's just a lab name first
    const cleanName = cleanQuery.trim();
    if (cleanName.split(/\s+/).length <= 3 && cleanName.length > 2) {
        // Validation: Don't treat it as a test if it looks like a lab name
        if (findBestLabMatch(cleanName)) {
            return null;
        }
        return { name: cleanName, confidence: 0.5 };
    }

    return null;
}

/**
 * Find best matching lab from known labs
 * @param {string} candidate - Lab name candidate
 * @returns {string|null} Best matching lab name
 */
function findBestLabMatch(candidate) {
    const normalized = candidate.toLowerCase().trim();

    // Exact match
    if (KNOWN_LABS.includes(normalized)) {
        return normalized;
    }

    // Partial match
    for (const lab of KNOWN_LABS) {
        if (normalized.includes(lab) || lab.includes(normalized)) {
            return lab;
        }
    }

    return null;
}

/**
 * Check if query is a greeting
 * @param {string} query - Normalized query
 * @returns {boolean}
 */
function isGreeting(query) {
    const cleaned = query.replace(/[.?!]$/g, '').trim();
    const greetings = [
        'hi', 'hello', 'hey', 'hey there', 'good morning',
        'good afternoon', 'good evening', 'asalam', 'salaam',
        'assalam alaikum', 'hi assistant', 'hello assistant',
        'menu', 'start', 'help'
    ];

    return greetings.includes(cleaned);
}

/**
 * Check if query is asking for price
 * @param {string} query - Normalized query
 * @returns {boolean}
 */
function isPriceQuery(query) {
    const priceKeywords = ['price', 'cost', 'how much', 'rate', 'charges', 'fee', 'pkr', 'rupees'];
    return priceKeywords.some(keyword => query.includes(keyword));
}

/**
 * Check if query is a medical question
 * @param {string} query - Normalized query
 * @returns {boolean}
 */
function isMedicalQuery(query) {
    const medicalKeywords = [
        'what is', 'what are', 'how to', 'why', 'when should',
        'symptoms', 'disease', 'condition', 'treatment', 'diagnosis',
        'normal range', 'healthy', 'infection', 'vitamin', 'deficiency'
    ];

    return medicalKeywords.some(keyword => query.includes(keyword));
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
    classifyIntent,
    extractEntities,
    isGreeting,
    isPriceQuery,
    isMedicalQuery
};
