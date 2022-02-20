const mongoose = require('mongoose');

/**
 * @module model/taskModel
 */

/**
 * @constructor
 * @property {string} name - Name of the task
 * @property {string} description - Detail description of the task
 * @property {string} priority - Priority of the task
 * @property {string} status - Status of the task
 * @property {Date} due - Due time of the task
 */
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  due: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
