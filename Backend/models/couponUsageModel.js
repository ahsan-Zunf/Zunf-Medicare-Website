const mongoose = require('mongoose');

const couponUsageSchema = new mongoose.Schema(
  {
    labId: { type: String, required: true },
    codeId: { type: Number, required: true },
    couponNumber: { type: Number, required: true },
    expiryDate: { type: Date },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    recipientMobile: { type: String },
    status: {
      type: String,
      enum: ['reserved', 'sent'],
      default: 'reserved',
    },
    reservedAt: { type: Date, default: Date.now },
    sentAt: { type: Date },
  },
  { timestamps: true }
);

couponUsageSchema.index({ labId: 1, couponNumber: 1 }, { unique: true });

module.exports = mongoose.model('CouponUsage', couponUsageSchema);


