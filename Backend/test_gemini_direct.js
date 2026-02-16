// Direct test of Gemini API to diagnose the issue
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    console.log('🔍 Testing Gemini API...\n');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ GEMINI_API_KEY not found in .env');
        return;
    }

    console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: 'You are a helpful assistant.'
        });

        console.log('📡 Sending test request to Gemini...\n');

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: 'Say hello' }] }],
        });

        const response = result.response.text();
        console.log('✅ SUCCESS! Gemini responded:', response);

    } catch (error) {
        console.error('\n❌ GEMINI API ERROR:\n');
        console.error('Error message:', error.message);

        if (error.message && error.message.includes('API has not been used')) {
            console.error('\n🔧 FIX REQUIRED:');
            console.error('1. Go to: https://console.cloud.google.com/');
            console.error('2. Select your project');
            console.error('3. Search for "Generative Language API"');
            console.error('4. Click "Enable"');
            console.error('5. Wait 1-2 minutes for activation');
            console.error('6. Try again\n');
        }
    }
}

testGemini();
