'use strict';
const express = require('express');
const router = express.Router();

const registerValidation = require('../middlewares/validators/validate-account-registration');
const loginValidation = require('../middlewares/validators/validate-account-login');
const passwordResetValidation = require('../middlewares/validators/validate-password-reset');
const passwordChangeValidation = require('../middlewares/validators/validate-password-change');

const accountController = require('../controllers/accountController');

router.post('/register', registerValidation, accountController.register);
router.post('/login', loginValidation, accountController.login);
router.post(
    '/password-reset',
    passwordResetValidation,
    accountController.resetPassword
);
router.post(
    '/password-change',
    passwordChangeValidation,
    accountController.changePassword
);

module.exports = router;
