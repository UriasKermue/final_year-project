const express = require('express');
const { register, login, getUserDetails } = require('../Controller/Newauth');
const NewauthMiddleware = require('../middlewares/NewauthMiddleware');

const router = express.Router();

// Signup Route
router.post('/signup', register);

// Login Route
router.post('/login', login);
router.get('/user',NewauthMiddleware, getUserDetails);

module.exports = router;
