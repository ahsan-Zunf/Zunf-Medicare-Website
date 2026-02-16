// Test API key validity with raw fetch
require('dotenv').config();

async function testApiKey() {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('🔍 Testing API Key:', apiKey.substring(0, 20) + '...\n');

    // Test 1: List models endpoint
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        if (!response.ok) {
            const error = await response.text();
            console.log('❌ API Key Test Failed:');
            console.log('Status:', response.status);
            console.log('Error:', error);
            return;
        }

        const data = await response.json();
        console.log('✅ API Key is VALID!\n');
        console.log('Available models:');
        data.models?.slice(0, 5).forEach(m => {
            console.log(`  - ${m.name}`);
        });

    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
}

testApiKey();
