const express = require('express');
const controller = require('../controller/taskController');
const router = new express.Router();

// Get all tasks
router.get('/', controller.getAll);

// Create new task
router.post('/', controller.create);

// Get a task
router.get('/:id', controller.find, controller.get);

// Delete a task
router.delete('/:id', controller.find, controller.delete);

// Update a task
router.patch('/:id', controller.find, controller.update);

module.exports = router;
