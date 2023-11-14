'use strict';
const express = require('express');
const router = express.Router();

const createEventValidation = require('../middlewares/validators/validate-event-create');
const updateEventValidation = require('../middlewares/validators/validate-event-update');
const eventController = require('../controllers/eventController');

const authMiddleware = require('../middlewares/auth');

router.post(
    '/',
    [authMiddleware, createEventValidation],
    eventController.create
);
router.get('/', authMiddleware, eventController.findAll);
router.get('/:id', authMiddleware, eventController.findOne);
router.delete('/:id', authMiddleware, eventController.deleteEvent);
router.put(
    '/:id',
    [authMiddleware, updateEventValidation],
    eventController.update
);

module.exports = router;
