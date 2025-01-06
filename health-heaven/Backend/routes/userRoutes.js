const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Make sure this path is correct
const authMiddleware = require('../middlewares/authMiddleware'); // Make sure this path is correct

// Get current authenticated user data (protected route)
router.get('/user', authMiddleware, async (req, res) => {
  try {
    // req.user is set by the authMiddleware when token is verified
    const user = await User.findById(req.user.userId).select('username email'); // Fetching only the needed data
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error retrieving user data', error });
  }
});

module.exports = router;
