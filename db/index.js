const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ruben:kakiko99@cluster0.vv40yds.mongodb.net/blog');
        console.log('Connected to database successfully');
      } catch (error) {
        console.error('Error connecting to database:', error.message);
      }
    };

module.exports = {connectDB}

