const {
  ensureQuotaOrThrow,
  recordSuccessfulSend,
  sendSms,
} = require('../services/messageService');

exports.sendMessage = async (req, res) => {
  try {
    const { receivernum, sendernum, textmessage } = req.body;

    // Validate required fields
    if (!receivernum || !textmessage) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'receivernum and textmessage are required'
      });
    }

    // Manual messages are not subject to quota limits (only Chughtai orders have limits)
    await ensureQuotaOrThrow(receivernum, false);

    const data = await sendSms({ receivernum, sendernum, textmessage });
    // Manual messages don't count towards quota
    await recordSuccessfulSend(receivernum, false);

    return res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      data,
    });

  } catch (error) {
    if (error.code === 'SMS_QUOTA_EXCEEDED') {
      return res.status(error.statusCode || 429).json({
        success: false,
        error: 'Quota exceeded',
        message: error.message,
      });
    }

    console.error('Error sending SMS:', error);
    
    // Handle axios errors
    if (error.response) {
      return res.status(error.response.status || 500).json({
        success: false,
        error: 'Failed to send SMS',
        message: error.response.data || error.message
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        success: false,
        error: 'Service unavailable',
        message: 'No response from SMS service'
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }
};

