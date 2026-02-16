// Test different Gemini model versions
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModel(modelName) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent('Say hello');
        const response = result.response.text();
        console.log(`✅ ${modelName}: SUCCESS - ${response.substring(0, 50)}...`);
        return true;
    } catch (error) {
        console.log(`❌ ${modelName}: ${error.message.substring(0, 100)}`);
        return false;
    }
}

async function main() {
    console.log('🔍 Testing Gemini models...\n');

    const modelsToTest = [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-2.0-flash-exp',
    ];

    for (const model of modelsToTest) {
        await testModel(model);
    }
}

main();
