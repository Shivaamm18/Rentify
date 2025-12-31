const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Connecting to:', 'mongodb://127.0.0.1:27017/rentify');
    await mongoose.connect('mongodb://127.0.0.1:27017/rentify');
    console.log('MongoDB connection successful');
    process.exit(0);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

testConnection();
