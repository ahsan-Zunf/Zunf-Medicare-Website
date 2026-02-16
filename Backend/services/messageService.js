const axios = require('axios');
const MessageQuota = require('../models/messageQuotaModel');

const MONTHLY_SMS_LIMIT = 3;
const VEEVOTECH_API_URL = process.env.VEEVOTECH_API_URL;
const VEEVOTECH_API_KEY = process.env.VEEVOTECH_API_KEY;

if (!VEEVOTECH_API_URL || !VEEVOTECH_API_KEY) {
  console.warn('VEEVOTECH API credentials are missing. SMS sending will fail until configured.');
}

const getCurrentPeriod = () => {
  const now = new Date();
  return { year: now.getUTCFullYear(), month: now.getUTCMonth() };
};

exports.ensureQuotaOrThrow = async (mobile, isChughtaiOrder = false) => {
  if (!mobile) {
    throw new Error('Mobile number is required for quota validation');
  }

  // Only enforce quota for Chughtai orders
  if (!isChughtaiOrder) {
    return {
      used: 0,
      remaining: Infinity,
    };
  }

  const normalizedMobile = String(mobile).trim();
  const { year, month } = getCurrentPeriod();
  const quota = await MessageQuota.findOne({ mobile: normalizedMobile, year, month });

  if (quota && quota.count >= MONTHLY_SMS_LIMIT) {
    const error = new Error('You have reached the only limit of test booking at chughtai');
    error.statusCode = 429;
    error.code = 'SMS_QUOTA_EXCEEDED';
    throw error;
  }

  return {
    used: quota?.count ?? 0,
    remaining: MONTHLY_SMS_LIMIT - (quota?.count ?? 0),
  };
};

exports.recordSuccessfulSend = async (mobile, isChughtaiOrder = false) => {
  // Only record quota for Chughtai orders
  if (!isChughtaiOrder) {
    return;
  }

  const normalizedMobile = String(mobile).trim();
  const { year, month } = getCurrentPeriod();

  await MessageQuota.findOneAndUpdate(
    { mobile: normalizedMobile, year, month },
    { $inc: { count: 1 }, $set: { lastSentAt: new Date() } },
    { upsert: true, new: true }
  );
};

exports.sendSms = async ({ receivernum, sendernum, textmessage }) => {
  const payload = {
    hash: VEEVOTECH_API_KEY,
    receivernum,
    sendernum: sendernum || 'ZUNF',
    textmessage,
  };

  const response = await axios.post(VEEVOTECH_API_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};

/**
 * Send verification code SMS
 */
exports.sendVerificationSms = async (mobile, code) => {
  console.log('📱 [SMS SERVICE] Sending verification code to:', mobile);
  console.log('📱 [SMS SERVICE] Verification Code:', code);

  if (!VEEVOTECH_API_URL || !VEEVOTECH_API_KEY) {
    throw new Error('VeevoTech API credentials are not configured');
  }

  const message = `ZUNF Medicare: Your verification code is ${code}. This code will expire in soon. Do not share this code with anyone.`;

  try {
    const result = await exports.sendSms({
      receivernum: mobile,
      sendernum: 'ZUNF',
      textmessage: message,
    });

    console.log('✅ [SMS SERVICE] Verification SMS sent successfully');
    return result;
  } catch (error) {
    console.error('❌ [SMS SERVICE] Failed to send verification SMS:', error.message);
    throw error;
  }
};

/**
 * Send password reset code SMS
 */
exports.sendPasswordResetSms = async (mobile, code) => {
  console.log('📱 [SMS SERVICE] Sending password reset code to:', mobile);
  console.log('📱 [SMS SERVICE] Reset Code:', code);

  if (!VEEVOTECH_API_URL || !VEEVOTECH_API_KEY) {
    throw new Error('VeevoTech API credentials are not configured');
  }

  const message = `ZUNF Medicare: Your password reset code is ${code}. This code will expire in 1 hour. If you didn't request this, please ignore this message.`;

  try {
    const result = await exports.sendSms({
      receivernum: mobile,
      sendernum: 'ZUNF',
      textmessage: message,
    });

    console.log('✅ [SMS SERVICE] Password reset SMS sent successfully');
    return result;
  } catch (error) {
    console.error('❌ [SMS SERVICE] Failed to send password reset SMS:', error.message);
    throw error;
  }
};

/**
 * Send booking confirmation SMS
 */
exports.sendBookingSms = async ({ name, phone, service, preferredDate, preferredTime }) => {
  console.log('📱 [SMS SERVICE] Sending booking confirmation to:', phone);
  console.log('📱 [SMS SERVICE] Service:', service);

  if (!VEEVOTECH_API_URL || !VEEVOTECH_API_KEY) {
    throw new Error('VeevoTech API credentials are not configured');
  }

  const message = `ZUNF Medicare: Dear ${name}, your ${service} booking request has been received. Preferred: ${preferredDate} at ${preferredTime}. Thank you!`;

  try {
    const result = await exports.sendSms({
      receivernum: phone,
      sendernum: 'ZUNF',
      textmessage: message,
    });

    console.log('✅ [SMS SERVICE] Booking confirmation SMS sent successfully');
    return result;
  } catch (error) {
    console.error('❌ [SMS SERVICE] Failed to send booking SMS:', error.message);
    throw error;
  }
};


