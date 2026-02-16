const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/userModel');

async function findLatestCode() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const latestUser = await User.findOne().sort({ createdAt: -1 });

        if (latestUser) {
            console.log('\n-------------------------------------------');
            console.log('最新的验证码 (Latest Verification Code):');
            console.log('🔑 CODE:', latestUser.verificationCode);
            console.log('👤 USER:', latestUser.name, `(${latestUser.mobile})`);
            console.log('📅 CREATED AT:', latestUser.createdAt);
            console.log('-------------------------------------------\n');
        } else {
            console.log('No users found in database.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

findLatestCode();
