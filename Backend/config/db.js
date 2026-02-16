const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);

  isConnected = true;
  console.log('✅ MongoDB connected');

  return mongoose.connection;
}

module.exports = connectDB;


