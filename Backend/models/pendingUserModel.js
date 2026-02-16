const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        verificationCode: {
            type: String,
            required: true,
        },
        verificationCodeExpiry: {
            type: Date,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 86400, // Automatically delete after 24 hours (TTL index)
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('PendingUser', pendingUserSchema);
