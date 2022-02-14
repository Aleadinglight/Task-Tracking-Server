const Task = require('../model/task');

/** Express router providing user related routes
 * @module controller/taskController
 */

/**
 * Get a list of all task
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @return {Array.<module:model/taskModel~taskSchema>} - Array of task objects
 */
exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

/**
 * Create a new task
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @return {module:model/taskModel~taskSchema} - Return the newly created task object
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
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @param {express.Next} next - Express next function
 */
exports.find = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).send({
        message: `Cannot find task with id=${req.params.id}`,
      });
    }
    req.task = task;
    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

/**
 * Return a task using id
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @return {module:model/taskModel~taskSchema} - Return the task with corresponding id
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
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @return {Object} - Return an Object containing a message field informing the status of the delete operation
 */
exports.delete = async (req, res) => {
  try {
    await req.task.remove();
    res.status(200).json({
      message: 'Deleted task',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

/**
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @return {module:model/taskModel~taskSchema} - Return the updated task
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
