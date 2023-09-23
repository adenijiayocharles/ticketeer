'use strict';
const express = require('express');
const router = express.Router();

const updateProfileValidation = require('../middlewares/validators/validate-profile-update');
const updatePasswordValidation = require('../middlewares/validators/validate-password-change');

const authMiddleware = require('../middlewares/auth');

const userController = require('../controllers/userController');

router.put(
    '/profile',
    [authMiddleware, updateProfileValidation],
    userController.updateProfile
);

router.put(
    '/password',
    [authMiddleware, updatePasswordValidation],
    userController.changePassword
);

module.exports = router;
