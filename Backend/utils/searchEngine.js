/**
 * Search for lab tests based on user query
 * @param {string} query - User search query
 * @param {Array} labTests - Array of normalized lab test objects
 * @returns {Array} Array of matching tests with relevance scores
 */
function searchTests(query, labTests) {
    if (!query || !labTests || labTests.length === 0) {
        return [];
    }

    // Normalize and tokenize query
    let queryTokens = query
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(token => token.length > 0);

    // Filter out common/generic words if there are other specific words
    const genericWords = ['test', 'lab', 'tests', 'diagnostics', 'diagnostic', 'routine', 'count'];
    if (queryTokens.length > 1) {
        const specificTokens = queryTokens.filter(t => !genericWords.includes(t));
        if (specificTokens.length > 0) {
            queryTokens = specificTokens;
        }
    }

    if (queryTokens.length === 0) return [];

    const results = [];

    // Search through all tests
    for (const test of labTests) {
        const score = calculateRelevanceScore(test, queryTokens, query.toLowerCase());

        if (score > 0) {
            results.push({
                ...test,
                relevanceScore: score
            });
        }
    }

    // Sort by relevance score (highest first)
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    if (results.length === 0) return [];

    // Filter results: 
    // 1. Must have at least a decent base score (e.g. 30)
    // 2. Or must be close to the best result (e.g. at least 50% of top score)
    const topScore = results[0].relevanceScore;
    const filteredResults = results.filter(r =>
        r.relevanceScore >= 30 || (r.relevanceScore >= topScore * 0.2)
    );

    // Return the filtered results (no slice limit as per user request, 
    // but filtered for quality)
    return filteredResults;
}

/**
 * Calculate relevance score for a test based on query tokens
 * @param {Object} test - Normalized test object
 * @param {Array} queryTokens - Array of query tokens
 * @param {string} fullQuery - Full query string (lowercase)
 * @returns {number} Relevance score
 */
function calculateRelevanceScore(test, queryTokens, fullQuery) {
    let score = 0;

    const testName = test.testName.toLowerCase();
    const shortDesc = (test.shortDescription || '').toLowerCase();
    const description = (test.description || '').toLowerCase();

    // Exact full match in test name (highest priority)
    if (testName === fullQuery) {
        return 1000; // Absolute best match
    }

    // Full query as a distinct phrase in test name
    const fullQueryRegex = new RegExp(`\\b${escapeRegExp(fullQuery)}\\b`, 'i');
    if (fullQueryRegex.test(testName)) {
        score += 500;
    }

    let tokenMatchInName = false;
    let matchCount = 0;

    // Token-based matching with word boundaries
    for (const token of queryTokens) {
        if (token.length < 2) continue;

        const tokenRegex = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'i');

        // Token in test name
        if (tokenRegex.test(testName)) {
            score += 100;
            tokenMatchInName = true;
            matchCount++;
        } else if (testName.includes(token) && token.length > 4) {
            score += 40;
            matchCount++;
        }

        // Token in descriptions (only if we have a name match or if token is specific enough)
        if (tokenRegex.test(shortDesc)) {
            score += 20;
            matchCount++;
        }
        if (tokenRegex.test(description)) {
            score += 10;
            matchCount++;
        }
    }

    // STRICT MATCHING: If no tokens matched at all, or if it's a short query 
    // and no token matched the NAME, discard it.
    if (matchCount === 0) return 0;
    if (queryTokens.length <= 2 && !tokenMatchInName && score < 100) {
        return 0; // Prevent "CBC" matching unrelated tests where it's only in description
    }

    return score;
}



/**
 * Helper to escape regex special characters
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/**
 * Removes redundant lab info tags from test names
 * e.g. "CBC at Chughtai Lab" -> "CBC"
 * @param {string} name - Raw test name
 * @returns {string} Cleaned test name
 */
function cleanTestName(name) {
    if (!name) return "";

    // Remove "at Lab Name" patterns
    // Matches: "(at ...)", "( At ... )", " (At ...)", " at LabName"
    return name
        .replace(/\s*[(\[]\s*(?:at|At|@)\s+[^)\]]+\s*[)\]]/gi, '') // (at Lab Name)
        .replace(/\s+(?:at|At|@)\s+[^,.-]+$/gi, '')              // at Lab Name (end of string)
        .trim();
}

/**
 * Format search results for display to user
 * @param {Array} results - Array of search results
 * @param {string} query - Original user query
 * @returns {string} Formatted response string
 */
function formatSearchResults(results, query) {
    if (!results || results.length === 0) {
        return null; // No results found
    }

    let response = `Found ${results.length} lab test${results.length > 1 ? 's' : ''} matching "${query}":\n\n`;

    results.forEach((test, index) => {
        const cleanedName = cleanTestName(test.testName);
        response += `${index + 1}. **${cleanedName}** - ${test.labName}\n`;

        if (test.salePrice > 0) {
            response += `   - Sale Price: PKR ${test.salePrice.toLocaleString()}\n`;
        }
    });

    return response.trim();
}

/**
 * Check if query looks like a test search query
 * @param {string} query - User query
 * @returns {boolean} True if likely a test search
 */
function isTestSearchQuery(query) {
    const lowerQuery = query.toLowerCase();

    // Common test-related keywords
    const testKeywords = [
        'test', 'blood', 'urine', 'serum', 'level', 'count', 'profile',
        'screening', 'analysis', 'examination', 'scan', 'ultrasound',
        'biopsy', 'culture', 'antibody', 'antigen', 'hormone', 'vitamin',
        'cbc', 'lft', 'rft', 'thyroid', 'sugar', 'cholesterol', 'hemoglobin'
    ];

    return testKeywords.some(keyword => lowerQuery.includes(keyword));
}

/**
 * Find exact test match for a specific lab and test name
 * @param {string} labName - Lab name to search in
 * @param {string} testName - Test name to search for
 * @param {Array} labTests - Array of all lab tests
 * @returns {Object|null} Exact match or null
 */
function findExactTest(labName, testName, labTests) {
    if (!labName || !testName || !labTests) return null;

    const normalizedLab = labName.toLowerCase().trim();
    const normalizedTest = testName.toLowerCase().trim();

    // First, try exact match
    for (const test of labTests) {
        const testLabName = test.labName.toLowerCase();
        const testTestName = test.testName.toLowerCase();

        // Check if lab matches
        const labMatches = testLabName.includes(normalizedLab) || normalizedLab.includes(testLabName);

        // Check if test matches
        const testMatches = testTestName.includes(normalizedTest) || normalizedTest.includes(testTestName);

        if (labMatches && testMatches) {
            return test;
        }
    }

    return null;
}

// Synonym map for common tests
const TEST_SYNONYMS = {
    'blood sugar': ['bsr', 'bsf', 'glucose', 'blood glucose', 'random blood sugar', 'fasting blood sugar'],
    'sugar test': ['bsr', 'bsf', 'glucose', 'blood glucose'],
    'urine routine': ['urine r/e', 'urine complete', 'urine analysis', 'urinalysis'],
    'cbc': ['cp', 'complete picture', 'blood cp'],
    'lft': ['liver function'],
    'rft': ['renal function', 'kidney function']
};

/**
 * Search for a test by name across all labs (without lab specification)
 * @param {string} testName - Test name to search for
 * @param {Array} labTests - Array of all lab tests
 * @returns {Array} Array of matching tests from different labs
 */
function searchTestByName(testName, labTests) {
    if (!testName || !labTests) return [];

    const normalizedTest = testName.toLowerCase().trim();

    // Get synonyms/related terms
    let searchTerms = [normalizedTest];
    for (const [key, synonyms] of Object.entries(TEST_SYNONYMS)) {
        if (normalizedTest.includes(key)) {
            searchTerms = [...searchTerms, ...synonyms];
        }
    }

    const results = [];

    for (const test of labTests) {
        const testTestName = test.testName.toLowerCase();
        let maxScore = 0;

        // Check against all search terms (original + synonyms)
        for (const term of searchTerms) {
            let score = 0;

            // Exact match
            if (testTestName === term) {
                score = 1000;
            }
            // Contains as whole word
            else if (new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i').test(testTestName)) {
                score = 500;
            }
            // Partial match
            else if (testTestName.includes(term)) {
                score = 200;
            }
            // Check if all words from query are in test name
            else {
                const queryWords = term.split(/\s+/);
                const matchedWords = queryWords.filter(word =>
                    testTestName.includes(word) && word.length > 2
                );

                if (matchedWords.length === queryWords.length && queryWords.length > 0) {
                    score = 300;
                } else if (matchedWords.length > 0) {
                    score = 100 * matchedWords.length;
                }
            }

            if (score > maxScore) maxScore = score;
        }

        if (maxScore > 0) {
            results.push({
                ...test,
                relevanceScore: maxScore
            });
        }
    }

    // Sort by score and return top matches only (high confidence)
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Only return results with score > 150 (meaningful matches)
    return results.filter(r => r.relevanceScore > 150);
}

module.exports = {
    searchTests,
    formatSearchResults,
    calculateRelevanceScore,
    isTestSearchQuery,
    cleanTestName,
    findExactTest,
    searchTestByName
};

