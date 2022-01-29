const mongoose = require('mongoose');
const { mongo } = require('../config/vars');

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Successfully connected to mongoose.`);
    return connection;
  } catch (err) {
    console.log(`Error while connecting to mongoose. ${err}`);
  }
};

module.exports = {
  connect: connectToDB,
};
