const nodemailer = require('nodemailer');

const sendEmail = async (subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zunfmedicare91@gmail.com',
        pass: process.env.EMAIL_PASS // Yeh wo App Password hai jo .env mein rakha
      }
    });

    const mailOptions = {
      from: '"ZUNF Medicare Alerts" <zunfmedicare91@gmail.com>',
      to: 'zunfmedicare91@gmail.com', // Admin ko alert jayega
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin Alert Email Sent! ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email bhejne mein masla:', error);
    return false;
  }
};

module.exports = sendEmail;