const messageService = require('../services/messageService');

/**
 * Handle booking form submission
 */
exports.submitBookingForm = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      message,
      preferredDate,
      preferredTime
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    console.log('📱 [BOOKING] Sending booking confirmation SMS to:', phone);

    // Send SMS notification to customer
    try {
      await messageService.sendBookingSms({
        name,
        phone,
        service: service || 'General Service',
        preferredDate: preferredDate || 'Not specified',
        preferredTime: preferredTime || 'Not specified'
      });
      console.log('✅ [BOOKING] SMS sent successfully to customer');
    } catch (smsError) {
      console.error('❌ [BOOKING] Failed to send SMS to customer:', smsError.message);
      // Continue even if SMS fails - don't block the booking
    }

    res.status(200).json({
      success: true,
      message: 'Booking request submitted successfully. We will contact you soon!'
    });
  } catch (error) {
    console.error('❌ [BOOKING] Error submitting booking form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit booking request. Please try again later.'
    });
  }
};


