const mongoose = require('mongoose');

const getDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Successfully connected to mongoose.`);
  }
  catch (err) {
    console.log(`Error while connecting to mongoose. ${err}`);
  }
}

module.exports = getDB;