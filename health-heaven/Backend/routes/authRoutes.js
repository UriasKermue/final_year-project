const express = require('express');
const { register, login } = require('../Controller/auth');
const router = express.Router();

// Signup Route
router.post('/signup', register);

// Login Route
router.post('/login', login);

module.exports = router;
