const axios = require('axios');

async function testChatbot() {
    const baseUrl = 'http://localhost:5000/chat';

    const tests = [
        { query: 'CBC at Chughtai', description: 'Exact lab + test query' },
        { query: 'CBC test', description: 'Test without lab' },
        { query: 'hello', description: 'Greeting' },
        { query: 'urine routine', description: 'Test search' },
        { query: 'blood test', description: 'Generic query' }
    ];

    console.log('🧪 Testing Chatbot Redesign\\n');
    console.log('='.repeat(60));

    for (const test of tests) {
        try {
            console.log(`\\n📝 Test: ${test.description}`);
            console.log(`   Query: "${test.query}"`);

            const response = await axios.post(baseUrl, { message: test.query });

            console.log(`   ✅ Response:`);
            console.log(`   ${response.data.response.substring(0, 200)}...`);
            console.log('-'.repeat(60));
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
            console.log('-'.repeat(60));
        }
    }
}

testChatbot();
