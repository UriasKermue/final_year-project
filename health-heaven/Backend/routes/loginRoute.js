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
        // Validate credentials using the model method (ensure it's defined)
        const user = await User.findByCredentials(username, password);

        // Generate JWT token (userId and username as the payload)
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
        console.error('Login Error:', err); // Log detailed error for debugging
        res.status(400).json({ message: 'Invalid username or password', error: err.message });
    }
});

module.exports = router;
