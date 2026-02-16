const mongoose = require('mongoose');
require('dotenv').config();
const CouponUsage = require('./models/couponUsageModel');

async function checkUsage() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await CouponUsage.countDocuments({ labId: 'chughtai-lab' });
        console.log(`Total coupons used for Chughtai Lab: ${count}`);

        const latest = await CouponUsage.find({ labId: 'chughtai-lab' })
            .sort({ createdAt: -1 })
            .limit(5);

        console.log('Latest coupon usage:', JSON.stringify(latest, null, 2));

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkUsage();
