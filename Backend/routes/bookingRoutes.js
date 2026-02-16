const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Submit booking form
router.post('/submit', bookingController.submitBookingForm);

module.exports = router;


