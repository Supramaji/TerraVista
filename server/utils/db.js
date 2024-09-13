const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database!');
  } catch (err) {
    console.error('Connection failed!', err);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDb;
