const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/userModel');

async function testConnection() {
    const uri = process.env.MONGODB_URI;
    console.log('🔌 Connecting to MongoDB Atlas...');
    console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

    try {
        await mongoose.connect(uri);
        console.log('✅ Connected successfully to MongoDB Atlas!');

        // Create a test user
        const testEmail = `test_verification_${Date.now()}@example.com`;
        const testUser = new User({
            email: testEmail,
            password: 'testPassword123',
            isEmailVerified: false,
            verificationCode: '123456',
            // Explicitly matching the structure requested
            verificationCodeExpiry: new Date(Date.now() + 10 * 60000)
        });

        console.log('📝 Saving test user...');
        const savedUser = await testUser.save();
        console.log('✅ User saved successfully!');
        console.log('DOCUMENT STRUCTURE:');
        console.log(JSON.stringify(savedUser.toObject(), null, 2));

        // Verify properties match request
        const check = (prop) => {
            if (savedUser[prop] !== undefined) console.log(`✅ Has property: ${prop}`);
            else console.log(`❌ MSSING property: ${prop}`);
        };

        ['_id', 'email', 'password', 'isEmailVerified', 'verificationCode', 'createdAt', 'updatedAt', '__v'].forEach(check);

        // Clean up
        console.log('🧹 Cleaning up test user...');
        await User.findByIdAndDelete(savedUser._id);
        console.log('✅ Test user deleted.');

    } catch (err) {
        console.error('❌ Error testing connection:', err);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected.');
    }
}

testConnection();
