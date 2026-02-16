const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Check if credentials are missing
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn('⚠️ [EMAIL SERVICE] SMTP_USER or SMTP_PASS is missing in .env. Emails will fail to send.');
}

/**
 * Send verification email
 */
exports.sendVerificationEmail = async (email, code) => {
  console.log('📧 [EMAIL SERVICE] Sending verification code to:', email);

  const mailOptions = {
    from: `"ZUNF Medicare" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: 'Verify Your ZUNF Medicare Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; rounded-lg">
        <h2 style="color: #94ca43; text-align: center;">Welcome to ZUNF Medicare!</h2>
        <p>Thank you for registering. Please use the following code to verify your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 5px;">${code}</span>
        </div>
        <p>This code will expire in 24 hours. If you did not request this, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888; text-align: center;">© 2026 ZUNF Medicare. All rights reserved.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ [EMAIL SERVICE] Verification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ [EMAIL SERVICE] SMTP Error Details:');
    console.error('   - Message:', error.message);
    console.error('   - Code:', error.code);
    console.error('   - Command:', error.command);
    console.error('   - SMTP Host:', process.env.SMTP_HOST);
    throw error;
  }
};

/**
 * Send password reset email
 */
exports.sendPasswordResetEmail = async (email, code) => {
  console.log('📧 [EMAIL SERVICE] Sending password reset code to:', email);

  const mailOptions = {
    from: `"ZUNF Medicare" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1;">
        <h2 style="color: #94ca43; text-align: center;">Password Reset</h2>
        <p>You requested a password reset. Please use the following code to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 5px;">${code}</span>
        </div>
        <p>This code will expire in 1 hour. If you did not request this, please change your password immediately.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888; text-align: center;">© 2026 ZUNF Medicare. All rights reserved.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ [EMAIL SERVICE] Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ [EMAIL SERVICE] Failed to send password reset email:', error.message);
    throw error;
  }
};
