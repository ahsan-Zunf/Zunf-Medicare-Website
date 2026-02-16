const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/userModel');

async function listRecent() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find().sort({ createdAt: -1 }).limit(5);

        let output = `Current Time: ${new Date()}\n\n`;
        users.forEach(u => {
            output += `USER: ${u.name} (${u.mobile})\n`;
            output += `CODE: ${u.verificationCode}\n`;
            output += `CREATED: ${u.createdAt}\n`;
            output += `-------------------\n`;
        });
        fs.writeFileSync('recent_users.txt', output);
    } catch (error) {
        fs.writeFileSync('recent_users.txt', 'Error: ' + error.message);
    } finally {
        await mongoose.connection.close();
    }
}

listRecent();
