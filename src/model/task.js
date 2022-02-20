/* eslint-disable space-before-function-paren */
const mongoose = require('mongoose');

/**
 * @module model/taskModel
 */

/**
 * @constructor
 * @property {string} name - Name of the task
 * @property {string} description - Detail description of the task
 * @property {Number} priority - Priority of the task
 * @property {Number} status - Status of the task
 * @property {Date} due - Due time of the task
 */
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0 && value < 4;
      },
      message: (props) => `${props.value} is not a valid priority!`,
    },
  },
  status: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0 && value < 3;
      },
      message: (props) => `${props.value} is not a valid status!`,
    },
  },
  due: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
