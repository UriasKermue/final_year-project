const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/loginModel'); // Ensure this path is correct

const router = express.Router();

// Environment variables
const { JWT_SECRET } = process.env;

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByCredentials(username, password);

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
        console.error('Login Error:', err); // Log detailed error
        res.status(400).json({ message: 'Invalid username or password', error: err.message });
    }
});

module.exports = router;
