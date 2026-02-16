const mongoose = require('mongoose');

const healthCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    address: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      default: '',
    },
    organizationName: {
      type: String,
      default: '',
    },
    employeeId: {
      type: String,
      default: '',
    },
    healthCardNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    qrCode: {
      type: String,
      default: '',
    },
    issueDate: {
      type: Date,
    },
    validity: {
      type: Date,
    },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    medicalConditions: {
      type: String,
      default: '',
    },
    allergies: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthCard', healthCardSchema);


