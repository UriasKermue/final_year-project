const express = require('express');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail function
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    // Send email on successful signup
    const emailText = `Hi ${username},\n\nWelcome to Health Heaven! Your account has been created successfully.\n\nRegards,\nHealth Heaven Team`;
    await sendEmail(email, 'Welcome to Health Heaven', emailText);

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
