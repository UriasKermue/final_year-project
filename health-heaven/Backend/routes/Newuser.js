const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken');
const Newuser = require('../models/Newuser'); // Adjusted to use Newuser model
const upload = require('../middlewares/uploadMiddleware'); // Import multer middleware for uploads
const NewauthMiddleware = require('../middlewares/NewauthMiddleware'); // Adjusted to use NewauthMiddleware

const router = express.Router();

/**
 * POST Route: Create a new user with profile image upload
 */
router.post('/newuser', upload.single('userImage'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      age,
      bloodType,
      phone,
      address,
      allergies,
      chronicConditions,
      password,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required.' });
    }

    // Check if the user already exists
    const existingUser = await Newuser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10

    // Get the profile image URL if uploaded
    const profileImage = req.file ? `/uploads/users/${req.file.filename}` : null;

    // Create a new user
    const newUser = new Newuser({
      fullName,
      email,
      age,
      bloodType,
      phone,
      address,
      allergies,
      chronicConditions,
      profileImage,
      password: hashedPassword, // Store hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Return selective user details for the response
    res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user.', error: error.message });
  }
});

/**
 * GET Route: Fetch authenticated user's details
 */
router.get('/newuser', NewauthMiddleware, async (req, res) => {
  try {
    // Validate if userId is present in the decoded token
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized. Please log in again.' });
    }

    // Fetch user data from the database
    const user = await Newuser.findById(req.user.userId).select(
      'fullName email age bloodType phone address allergies chronicConditions profileImage'
    );

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Respond with user data
    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      age: user.age,
      bloodType: user.bloodType,
      phone: user.phone,
      address: user.address,
      allergies: user.allergies,
      chronicConditions: user.chronicConditions,
      profileImage: user.profileImage, // Include profileImage if available
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Error retrieving user data.', error: error.message });
  }
});

module.exports = router;
