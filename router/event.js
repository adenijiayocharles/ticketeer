'use strict';
const express = require('express');
const router = express.Router();

const createEventValidation = require('../middlewares/validators/validate-event-create');

const eventController = require('../controllers/eventController');

const authMiddleware = require('../middlewares/auth');

router.post(
    '/create',
    [authMiddleware, createEventValidation],
    eventController.create
);

module.exports = router;
