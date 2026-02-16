const CouponUsage = require('../models/couponUsageModel');

// Load coupon codes with error handling
let chughtaiCoupons = [];
try {
  chughtaiCoupons = require('../codes/chughtai.json');
} catch (error) {
  console.warn('Warning: Could not load chughtai.json coupon codes:', error.message);
  chughtaiCoupons = [];
}

const CHUGHTAI_LAB_ID = 'chughtai-lab';

exports.reserveChughtaiCoupon = async ({ orderId, recipientMobile }) => {
  if (!chughtaiCoupons || chughtaiCoupons.length === 0) {
    console.warn('No Chughtai coupons available');
    return null;
  }

  // Start from the 50th coupon (index 49) as requested
  const START_INDEX = 49;
  const availableCoupons = chughtaiCoupons.slice(START_INDEX);

  for (const coupon of availableCoupons) {
    try {
      const usage = await CouponUsage.create({
        labId: CHUGHTAI_LAB_ID,
        codeId: coupon.id,
        couponNumber: coupon.couponNumber,
        expiryDate: coupon.expiryDate ? new Date(coupon.expiryDate) : undefined,
        orderId,
        recipientMobile,
        status: 'reserved',
      });

      return usage;
    } catch (error) {
      if (error.code === 11000) {
        continue;
      }
      throw error;
    }
  }

  return null;
};

exports.markCouponAsSent = async (usageId) => {
  if (!usageId) return;
  await CouponUsage.findByIdAndUpdate(usageId, { status: 'sent', sentAt: new Date() });
};

exports.releaseCoupon = async (usageId) => {
  if (!usageId) return;
  await CouponUsage.findByIdAndDelete(usageId);
};

exports.CHUGHTAI_LAB_ID = CHUGHTAI_LAB_ID;


