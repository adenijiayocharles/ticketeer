'use strict';
const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const registerValidation = require('../middlewares/validators/validate-account-registration');
const loginValidation = require('../middlewares/validators/validate-account-login');

router.post('/register', registerValidation, accountController.register);
router.post('/login', loginValidation, accountController.login);

module.exports = router;
