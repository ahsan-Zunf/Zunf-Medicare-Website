const axios = require('axios');

const BASE_URL = 'http://localhost:5000'; // Default from .env

async function testChat(query, description) {
    console.log(`\n--- TEST: ${description} ---`);
    console.log(`Input: "${query}"`);
    try {
        const response = await axios.post(`${BASE_URL}/chat`, { message: query });
        console.log(`Response: ${response.data.response}`);
    } catch (error) {
        if (error.response) {
            console.log(`Error Status: ${error.response.status}`);
            console.log(`Error Data:`, error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

async function runTests() {
    // 1. Medical Query (Valid)
    await testChat('What are the lab tests available at testzone?', 'Medical Query (Valid)');

    // 2. Non-Medical Query
    await testChat('What is the weather today?', 'Non-Medical Query (Should be rejected)');

    // 3. Missing Info
    await testChat('How do I build a rocket?', 'Clearly non-medical/missing info');

    // 4. Missing Medical Info
    await testChat('What is the treatment for rare tropical disease X?', 'Medical but missing info');
}

runTests();
