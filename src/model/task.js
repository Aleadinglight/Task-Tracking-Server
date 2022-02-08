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
    default: 'unknown',
  },
  description: {
    type: String,
    default: 'unknown',
  },
  priority: {
    type: String,
    default: '0',
  },
  status: {
    type: String,
    default: '0',
  },
  due: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
