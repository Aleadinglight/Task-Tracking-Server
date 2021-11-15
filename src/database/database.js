const { MongoClient } = require('mongodb')
require('dotenv').config()

export default getDB = async() => {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = await client.db(process.env.DB_NAME);
    return db;
}