const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Newuser = require('../models/Newuser');  // Updated import to 'Newuser.js'
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Newuser({ username, email, password: hashedPassword });  // Updated to use 'Newuser'
    await newUser.save();

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Health Heaven!',
      text: 'Thank you for signing up.'
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Newuser.findOne({ username });  // Updated to use 'Newuser'
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
