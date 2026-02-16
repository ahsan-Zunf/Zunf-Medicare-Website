const express = require('express');
const healthCardController = require('../controllers/healthCardController');
const authController = require('../controllers/authController');

const router = express.Router();

// All routes require authentication
router.use(authController.verifyToken);

router.post('/', healthCardController.createOrUpdateHealthCard);
router.get('/', healthCardController.getHealthCard);
router.get('/download', healthCardController.downloadHealthCard);

module.exports = router;


