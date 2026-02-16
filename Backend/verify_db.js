const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function verify() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const Order = require('./models/orderModel');

        // 1. Check EXACT match
        const emailToTest = 'admin@zunf.com';
        const exactOrders = await Order.find({ 'customer.email': emailToTest }).lean();
        console.log(`\n📋 EXACT MATCH for '${emailToTest}': ${exactOrders.length} orders`);

        // 2. Check CASE-INSENSITIVE match
        const ciOrders = await Order.find({ 'customer.email': { $regex: new RegExp('^' + emailToTest + '$', 'i') } }).lean();
        console.log(`📋 CASE-INSENSITIVE MATCH for '${emailToTest}': ${ciOrders.length} orders`);

        // 3. Dump first order details
        if (ciOrders.length > 0) {
            console.log('\n🔍 First found order (CI) details:');
            console.log(JSON.stringify({
                id: ciOrders[0]._id,
                customer_email: ciOrders[0].customer?.email,
                customer_email_type: typeof ciOrders[0].customer?.email,
                createdAt: ciOrders[0].createdAt
            }, null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

verify();
