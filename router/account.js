'use strict';
const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const userValidation = require('../middlewares/validators/validate-account-registration');

router.post('/register', userValidation, accountController.register);

module.exports = router;
