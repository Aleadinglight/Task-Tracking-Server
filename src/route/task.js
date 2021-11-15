const express = require('express')
const router = express.Router()
const database = require('../database/database')
const db = await database.getDB();

// Get task using id
router.get('/task/:id', async (req, res) => {
  try {
    let collection = db.collection(process.env.DB_TASK);
    let query = {
      id: req.params.id
    }
    let task = await collection.findOne(query, {});
    res.send(task);
  } catch (err) {
    res.send(`Error when getting task with id: ${req.params.id}. ${err}`);
  }
});

router.post('/task/new/', async (req, res) => {
});

