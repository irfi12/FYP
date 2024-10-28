const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route POST /register
// @desc Register user
router.post('/register', register);

// @route POST /login
// @desc Login user
router.post('/login', login);

module.exports = router;
