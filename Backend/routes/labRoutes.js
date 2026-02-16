const express = require('express');
const labController = require('../controllers/labController');

const router = express.Router();

router.get('/', labController.listLabs);
router.get('/:labId', labController.getLabTests);

module.exports = router;

