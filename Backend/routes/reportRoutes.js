const express = require('express');
const router = express.Router();
const { uploadReport, getUserReports, deleteReport, renameReport } = require('../controllers/reportController');

// Multer middleware jo humne config mein banaya tha
const { upload } = require('../config/cloudinary'); 

// POST API - File upload karne ke liye (frontend 'reportFile' ke naam se file bhejega)
router.post('/upload', upload.single('reportFile'), uploadReport);

// GET API - User ki reports dekhne ke liye
router.get('/user/:userId', getUserReports);

// DELETE API - Report delete karne ke liye
router.delete('/:id', deleteReport);

// PATCH API - Report ka naam (title) change karne ke liye
router.patch('/:id', renameReport);

module.exports = router;