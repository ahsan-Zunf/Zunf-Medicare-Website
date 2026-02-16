// Minimal test server to isolate the issue
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = 5001; // Different port to avoid conflicts
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Simple test route
app.post('/chat', async (req, res) => {
    console.log('📨 Received chat request:', req.body.message);

    try {
        // Test without loading context first
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent(req.body.message);
        const response = result.response.text();

        console.log('✅ Response generated');
        return res.json({ response });

    } catch (error) {
        console.error('❌ Error:', error.message);
        return res.status(500).json({
            error: 'Failed',
            response: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Test server running on http://localhost:${PORT}`);
});
