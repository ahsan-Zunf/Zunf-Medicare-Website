const { parseCSVFiles } = require('./utils/csvParser');
const { searchTests } = require('./utils/searchEngine');
const path = require('path');

const INFO_DIR = path.join(__dirname, 'info');
const labTestsData = parseCSVFiles(INFO_DIR);

console.log('\n--- SEARCH VERIFICATION ---');

const biotechTests = labTestsData.filter(t => t.labName === 'BioTech Lab');
console.log(`BioTech Lab total tests: ${biotechTests.length}`);

const spermSearch = searchTests('sperm count test', biotechTests);
console.log(`"sperm count test" in BioTech -> Matches: ${spermSearch.length}`);
if (spermSearch.length > 0) {
    console.log(`Top match: ${spermSearch[0].testName} (Score: ${spermSearch[0].relevanceScore})`);
}

const cbcSearch = searchTests('CBC Test', labTestsData);
console.log(`\n"CBC Test" total matches: ${cbcSearch.length}`);
cbcSearch.slice(0, 10).forEach((r, i) => {
    console.log(`${i + 1}. ${r.testName} (${r.labName}) - Score: ${r.relevanceScore}`);
});

const chughtaiTests = labTestsData.filter(t => t.labName === 'Chughtai Lab');
const semenSearch = searchTests('sperm count test', chughtaiTests);
console.log(`\n"sperm count test" in Chughtai -> Matches: ${semenSearch.length}`);
if (semenSearch.length > 0) {
    console.log(`Top match: ${semenSearch[0].testName} (Score: ${semenSearch[0].relevanceScore})`);
}
