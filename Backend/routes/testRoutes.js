const express = require('express');
const labController = require('../controllers/labController');

const router = express.Router();

// Fetch single test aggregated data
router.get('/:testId', labController.getTestDetails);

module.exports = router;