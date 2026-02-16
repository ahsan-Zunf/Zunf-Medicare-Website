const mongoose = require('mongoose');

const messageQuotaSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true }, // 0-based (Jan = 0)
    count: { type: Number, default: 0 },
    lastSentAt: { type: Date },
  },
  { timestamps: true }
);

messageQuotaSchema.index({ mobile: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('MessageQuota', messageQuotaSchema);


