const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Make sure this path is correct
const authMiddleware = require('../middlewares/authMiddleware'); // Make sure this path is correct

// Example routes

// Get all users (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

// Get a single user by ID (protected route)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

module.exports = router;
