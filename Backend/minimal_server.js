// Test if server stays alive
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Add global error handlers
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

app.post('/chat', async (req, res) => {
    console.log('📨 Chat request received');
    res.json({ response: 'Server is alive!' });
});

app.listen(PORT, () => {
    console.log(`✅ Minimal server running on http://localhost:${PORT}`);
    console.log('⏳ Waiting for requests...');
});

// Keep alive
setInterval(() => {
    console.log('💓 Server heartbeat - still running');
}, 5000);
