const express = require('express');
const { register, login } = require('../Controller/Newauth');
const router = express.Router();

// Signup Route
router.post('/signup', register);

// Login Route
router.post('/login', login);

module.exports = router;
