const mongoose = require('mongoose');
const { mongo } = require('../config/vars');

let connection = null;

const connectToDB = async () => {
  try {
    connection = await mongoose.connect(mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log(`Successfully connected to mongoose.`);
    return connection;
  } catch (err) {
    console.log(`Error while connecting to mongoose. ${err}`);
  }
};

const disconnect = async (callback) => {
  // Disconnect this connection
  await connection.disconnect(callback);
  // Run .close() on all connection in parallel
  await mongoose.disconnect();
};

module.exports = {
  connect: connectToDB,
  disconnect: disconnect,
};
