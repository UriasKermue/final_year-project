// Controller/auth.js
const NewUser = require('../models/Newuser'); // Use NewUser model for both registration and login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail function

// Register (Sign Up) user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await NewUser.findOne({ email }); // Use NewUser model for registration
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new NewUser({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await newUser.save();

    // Send email on successful signup
    const emailText = `Hi ${username},\n\nWelcome to Healthify! Your account has been created successfully.\n\nRegards,\nHealthify Team`;
    await sendEmail(email, 'Welcome to Healthify', emailText);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user (using the same model as registration)
const login = async (req, res) => {  // Renamed to 'login' for clarity
  try {
    const { email, password } = req.body; // Use email for login

    // Find user using the same model as used for registration
    const user = await NewUser.findOne({ email }); // Use NewUser model for login
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare password hashes
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login }; // Export login instead of newlogin
