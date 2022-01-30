const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'unknown',
    required: true,
  },
  description: {
    type: String,
    default: 'unknown',
  },
  priority: {
    type: String,
    default: '0',
    required: true,
  },
  status: {
    type: String,
    default: '0',
    required: true,
  },
  due: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
