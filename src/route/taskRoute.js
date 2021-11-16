const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()
const Task = require('../model/task')

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.send(tasks);
  }
  catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      due: req.body.due
    })
    const newTask = await task.save();
    // 201 means successfully created an object
    res.status(201).send(newTask);
  }
  catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

getTask = async (req, res, next) => {
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).send({
        message: `Cannot find task with id=${req.params.id}`
      })
    }
  }
  catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }

  req.task = task;
  next();
}

// Get task using id
router.get('/:id', getTask, async (req, res) => {
  try {
    res.status(200).send(req.task);
  } catch (err) {
    res.send(`Error when getting task with id: ${req.params.id}. ${err}`);
  }
});

module.exports = router;
