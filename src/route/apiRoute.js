const express = require('express');
const taskRoute = require('../route/taskRoute');

/** Module providing task related routes
 * @module router/api
 * @requires express
 */

/**
 * Router for mounting task routes
 * @type {object}
 * @const
 * @namespace apiRouter
 */
const router = new express.Router();

router.use('/tasks', taskRoute);

module.exports = router;
