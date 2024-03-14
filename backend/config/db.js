const mongoose = require('mongoose'),
      { DB_USER, DB_PASS, DB_CLUSTER } = require('../config')
      

const connectToDB = async () => {
  try {
    const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.wbvi7g9.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(
      MONGO_URI,
      {
        dbName: 'shtor'
      }
    );
    console.log('Connected to MongoDB');

    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = connectToDB;
