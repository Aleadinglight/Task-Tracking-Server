const express = require('express');
const controller = require('../controller/taskController');

/** Module providing task related routes
 * @module router/api/tasks
 * @requires express
 */

/**
 * Router for mounting task routes
 * @type {object}
 * @const
 * @namespace taskRouter
 */
const router = new express.Router();

/**
 * GET endpoint/tasks/
 * @name get
 * @function
 * @memberof module:router/tasks~taskRouter
 * @inner
 * @param {string} path - Express path
 * @param {module:controller/taskController.getAll} middleware - Express middleware.
 */
router.get('/', controller.getAll);

/**
 * POST endpoint/tasks/
 * @name post
 * @function
 * @memberof module:router/tasks~taskRouter
 * @inner
 * @param {string} path - Express path
 * @param {module:controller/taskController.create} middleware - Express middleware.
 */
router.post('/', controller.create);

/**
 * GET endpoint/tasks/:id
 * @name get
 * @function
 * @memberof module:router/tasks~taskRouter
 * @inner
 * @param {string} path - Express path
 * @param {module:controller/taskController.get} middleware - Express middleware.
 */
router.get('/:id', controller.find, controller.get);

/**
 * DELETE endpoint/tasks/:id
 * @name delete
 * @function
 * @memberof module:router/tasks~taskRouter
 * @inner
 * @param {string} path - Express path
 * @param {module:controller/taskController.delete} middleware - Express middleware.
 */
router.delete('/:id', controller.find, controller.delete);

/**
 * PATCH endpoint/tasks/:id
 * @name patch
 * @function
 * @memberof module:router/tasks~taskRouter
 * @inner
 * @param {string} path - Express path
 * @param {module:controller/taskController.update} middleware - Express middleware.
 */
router.patch('/:id', controller.find, controller.update);

module.exports = router;
