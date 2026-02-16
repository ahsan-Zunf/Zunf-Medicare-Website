const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    serviceType: {
        type: String,
        trim: true,
    },
    programName: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'resolved', 'cancelled'],
        default: 'new',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lead', leadSchema);
