const Task = require('../model/task');

/**
 * Return a list of all tasks
 */

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

/**
 * Create a new task
 */

exports.create = async (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      due: req.body.due,
    });
    const newTask = await task.save();
    // 201 means successfully created an object
    res.status(201).send(newTask);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

/**
 * Middleware for finding a task using id
 */

exports.find = async (req, res, next) => {
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).send({
        message: `Cannot find task with id=${req.params.id}`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }

  req.task = task;
  next();
};

/**
 * Return a task using id
 */

exports.get = async (req, res) => {
  try {
    res.status(200).send(req.task);
  } catch (err) {
    res.send(`Error when getting task with id: ${req.params.id}. ${err}`);
  }
};

/**
 * Delete a task using id
 */

exports.delete = async (req, res) => {
  try {
    await req.task.remove();
    res.json({
      message: 'Delete Subscriber',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

/**
 * Update a task with id
 */

exports.update = async (req, res) => {
  try {
    if (req.body.name != null) {
      req.task.name = req.body.name;
    }
    if (req.body.description != null) {
      req.task.description = req.body.description;
    }
    if (req.body.priority != null) {
      req.task.priority = req.body.priority;
    }
    if (req.body.status != null) {
      req.task.status = req.body.status;
    }
    if (req.body.due != null) {
      req.task.due = req.body.due;
    }

    const updateTask = await req.task.save();
    res.send(updateTask);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
