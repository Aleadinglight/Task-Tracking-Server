const { MongoClient } = require('mongodb')
require('dotenv').config()

const getDB = async () => {
    try {
        const uri = process.env.DB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = await client.db(process.env.DB_NAME);
        console.log(`Successfully connected to MongoDB.`);
    }
    catch (err) {
        console.log(`Error while connecting to MongoDB. ${err}`);
    }
}

module.exports = getDB;