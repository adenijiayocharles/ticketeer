'use strict';
const express = require('express');
const router = express.Router();

const createEventValidation = require('../middlewares/validators/validate-event-create');

const eventController = require('../controllers/eventController');

const authMiddleware = require('../middlewares/auth');

router.post(
    '/',
    [authMiddleware, createEventValidation],
    eventController.create
);
router.get('/', authMiddleware, eventController.findAll);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
