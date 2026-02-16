const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/userModel');

async function findLatestCode() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const latestUser = await User.findOne().sort({ createdAt: -1 });

        let output = '';
        if (latestUser) {
            output += `CODE: ${latestUser.verificationCode}\n`;
            output += `USER: ${latestUser.name} (${latestUser.mobile})\n`;
            output += `CREATED: ${latestUser.createdAt}\n`;
        } else {
            output = 'No users found';
        }
        fs.writeFileSync('latest_auth_code.txt', output);
        console.log('Result written to latest_auth_code.txt');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

findLatestCode();
