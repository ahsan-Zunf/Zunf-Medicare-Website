const { parseCSVFiles } = require('./utils/csvParser');
const path = require('path');

const INFO_DIR = path.join(__dirname, 'info');
const labTestsData = parseCSVFiles(INFO_DIR);

console.log('Total tests:', labTestsData.length);
const allLabNames = [...new Set(labTestsData.map(t => t.labName))];
console.log('Lab names:', JSON.stringify(allLabNames, null, 2));

const { searchTests, calculateRelevanceScore } = require('./utils/searchEngine');

const biotechTests = labTestsData.filter(t => t.labName === 'BioTech Lab');

console.log(`\nBioTech "sperm count" top match:`);
const spermResults = searchTests('sperm count test', biotechTests);
if (spermResults.length > 0) {
    console.log(`${spermResults[0].testName} - Score: ${spermResults[0].relevanceScore}`);
} else {
    console.log('No matches found.');
}

console.log(`\nBioTech "CBC" top match:`);
const cbcResults = searchTests('CBC Test', biotechTests);
if (cbcResults.length > 0) {
    console.log(`${cbcResults[0].testName} - Score: ${cbcResults[0].relevanceScore}`);
} else {
    console.log('No matches found.');
}

const query = 'CBC';
const queryTokens = query.toLowerCase().split(/\s+/);
const results = searchTests(query, labTestsData);

console.log('\nTop 5 results for "CBC":');
results.slice(0, 5).forEach((r, i) => {
    console.log(`${i + 1}. ${r.testName} (${r.labName}) - Score: ${r.relevanceScore}`);
});

const foleyExact = labTestsData.find(t => t.testName.toLowerCase().includes('foley'));
if (foleyExact) {
    const foleyScore = calculateRelevanceScore(foleyExact, queryTokens, query.toLowerCase());
    console.log('\nScore for "Foley" on target "CBC":', foleyScore);
}
