const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Logging middleware for chat routes
router.use((req, res, next) => {
  console.log('💬 [ROUTE] Chat route hit:', req.method, req.path);
  console.log('💬 [ROUTE] Timestamp:', new Date().toISOString());
  next();
});

router.post('/', chatController.chat);

module.exports = router;


