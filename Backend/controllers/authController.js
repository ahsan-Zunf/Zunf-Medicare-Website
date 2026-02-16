const User = require('../models/userModel');
const PendingUser = require('../models/pendingUserModel');
const jwt = require('jsonwebtoken');
const messageService = require('../services/messageService');
const emailService = require('../services/emailService');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '15d'; // 15 days

// Note: Email is used as username/identifier only
// All verification codes are sent via SMS to mobile number

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Sign up a new user
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (!mobile) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry

    // Create or update pending user
    let pendingUser = await PendingUser.findOne({ mobile });
    if (pendingUser) {
      pendingUser.name = name;
      pendingUser.email = email;
      pendingUser.password = password;
      pendingUser.verificationCode = verificationCode;
      pendingUser.verificationCodeExpiry = verificationCodeExpiry;
      await pendingUser.save();
    } else {
      pendingUser = new PendingUser({
        name,
        email,
        mobile,
        password,
        verificationCode,
        verificationCodeExpiry,
      });
      await pendingUser.save();
    }

    // Send verification EMAIL
    let emailSent = false;

    try {
      await emailService.sendVerificationEmail(email, verificationCode);
      emailSent = true;
      console.log('✅ Verification EMAIL sent successfully to:', email);
      console.log('📧 [TERMINAL LOG] Verification Code for', email, ':', verificationCode);
    } catch (error) {
      console.error('❌ Failed to send verification EMAIL:', error.message);
      console.log('📧 [TERMINAL LOG] Verification Code for', email, ':', verificationCode);
    }

    // Send response with Email status
    res.status(201).json({
      message: emailSent
        ? 'Verification code sent. Please check your email.'
        : 'User data saved. Failed to send email, please use the resend option.',
      emailSent: emailSent,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    console.log('🔵 [BACKEND] Login request received:', { email, mobile, hasPassword: !!password });

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (!email && !mobile) {
      return res.status(400).json({ message: 'Email or mobile number is required' });
    }

    // Find user by email or mobile
    let user;
    if (mobile) {
      user = await User.findOne({ mobile });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user has mobile number (for backward compatibility)
    if (!user.mobile) {
      return res.status(403).json({
        message: 'Please update your account with a mobile number. Contact support for assistance.',
        needsMobileUpdate: true,
      });
    }

    // No verification check required for login - users can login directly

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

/**
 * Verify mobile with code
 */
exports.verifyMobile = async (req, res) => {
  try {
    const { mobile, code } = req.body;

    if (!mobile || !code) {
      return res.status(400).json({ message: 'Mobile number and verification code are required' });
    }

    // Convert code to string to ensure proper comparison
    const codeStr = String(code).trim();

    const pendingUser = await PendingUser.findOne({ mobile });
    if (!pendingUser) {
      // Check if user is already verified and exists in main User collection
      const existingUser = await User.findOne({ mobile });
      if (existingUser) {
        return res.status(400).json({ message: 'Account already verified and created.' });
      }
      return res.status(404).json({ message: 'No pending signup found for this mobile number.' });
    }

    console.log('🔍 [VERIFY] Pending user found:', pendingUser.mobile);
    console.log('🔍 [VERIFY] Stored code:', pendingUser.verificationCode, 'Type:', typeof pendingUser.verificationCode);
    console.log('🔍 [VERIFY] Received code:', codeStr, 'Type:', typeof codeStr);
    console.log('🔍 [VERIFY] Code match:', pendingUser.verificationCode === codeStr);

    // Check verification code
    if (pendingUser.verificationCode !== codeStr) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Check if code expired
    if (new Date() > pendingUser.verificationCodeExpiry) {
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Create final user record
    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      mobile: pendingUser.mobile,
      password: pendingUser.password,
      isEmailVerified: true,
      isMobileVerified: true,
    });

    await user.save();

    // Delete pending record
    await PendingUser.deleteOne({ email });

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Mobile number verified and account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error('Verify mobile error:', error);
    res.status(500).json({ message: 'Server error during verification', error: error.message });
  }
};

/**
 * Resend verification code
 */
exports.resendVerificationCode = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }

    const pendingUser = await PendingUser.findOne({ mobile });
    if (!pendingUser) {
      // Check if already in main User collection
      const existingUser = await User.findOne({ mobile });
      if (existingUser) {
        return res.status(400).json({ message: 'Account already verified.' });
      }
      return res.status(404).json({ message: 'No pending signup found for this mobile number.' });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry

    pendingUser.verificationCode = verificationCode;
    pendingUser.verificationCodeExpiry = verificationCodeExpiry;
    await pendingUser.save();

    // Send verification SMS
    let smsSent = false;

    try {
      await messageService.sendVerificationSms(mobile, verificationCode);
      smsSent = true;
      console.log('✅ Verification code resent successfully to:', mobile);
      console.log('📱 [TERMINAL LOG] New Verification Code for', mobile, ':', verificationCode);
    } catch (error) {
      console.error('❌ Failed to resend verification code:', error.message);
      console.log('📱 [TERMINAL LOG] New Verification Code for', mobile, ':', verificationCode);
    }

    res.json({
      message: smsSent
        ? 'Verification code resent successfully'
        : 'Failed to send verification code. Please try again.',
      smsSent: smsSent,
    });
  } catch (error) {
    console.error('Resend verification code error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get current user (protected route)
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -verificationCode');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        mobile: user.mobile,
        isEmailVerified: user.isEmailVerified,
        isMobileVerified: user.isMobileVerified,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Request password reset
 */
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security
      return res.json({
        message: 'If an account exists with this email, a password reset code has been sent to your mobile.',
        smsSent: true,
      });
    }

    // Check if user has mobile number
    if (!user.mobile) {
      return res.status(400).json({
        message: 'No mobile number associated with this account. Please contact support to reset your password.'
      });
    }

    // Check if mobile is verified
    if (!user.isMobileVerified) {
      return res.status(400).json({
        message: 'Please verify your mobile number first before resetting password.'
      });
    }

    // Generate reset code
    const resetCode = generateVerificationCode();
    const resetCodeExpiry = new Date();
    resetCodeExpiry.setHours(resetCodeExpiry.getHours() + 1); // 1 hour expiry

    user.resetCode = resetCode;
    user.resetCodeExpiry = resetCodeExpiry;
    await user.save();

    // Send reset EMAIL
    let emailSent = false;
    try {
      await emailService.sendPasswordResetEmail(user.email, resetCode);
      emailSent = true;
      console.log('✅ Password reset EMAIL sent successfully to:', user.email);
    } catch (error) {
      console.error('❌ Failed to send password reset EMAIL:', error.message);
    }

    res.json({
      message: 'If an account exists with this email, a password reset code has been sent to your email address.',
      emailSent: emailSent,
    });
  } catch (error) {
    console.error('Request password reset error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Verify password reset code
 */
exports.verifyPasswordResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and reset code are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.resetCode || user.resetCode !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    if (!user.resetCodeExpiry || new Date() > user.resetCodeExpiry) {
      return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    res.json({ message: 'Reset code verified successfully' });
  } catch (error) {
    console.error('Verify password reset code error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Reset password
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Email, reset code, and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.resetCode || user.resetCode !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    if (!user.resetCodeExpiry || new Date() > user.resetCodeExpiry) {
      return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    // Update password
    user.password = newPassword;
    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();

    res.json({ message: 'Password reset successfully. You can now login with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Middleware to verify JWT token
 */
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};


