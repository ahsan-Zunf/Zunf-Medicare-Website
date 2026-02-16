const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { verifyToken } = require('../controllers/authController');

// Public route to submit a lead
router.post('/', leadController.createLead);

// Protected routes for Admin
// Note: Assuming there's a way to check for admin role, for now just verifying token
router.get('/', leadController.getAllLeads);
router.patch('/:id/status', leadController.updateLeadStatus);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
