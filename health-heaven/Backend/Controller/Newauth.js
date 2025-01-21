const NewUser = require('../models/Newuser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const WelcomeEmail = require('../utils/test/WelcomeEmail');


// Register User
const register = async (req, res) => {
  try {
    const {
      fullName,
      age,
      bloodType,
      email,
      phone,
      address,
      allergies,
      chronicConditions,
      password,
      confirmPassword,
    } = req.body;

    // Validate required fields
    if (!fullName || !age || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled!' });
    }

    // Age validation
    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ success: false, message: 'Age must be a valid number greater than 0!' });
    }

    // Password validation
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long, include a special character, an uppercase letter, and a number',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match!' });
    }

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format!' });
    }

    // Check if email already exists
    const existingUser = await NewUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already in use!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new NewUser({
      fullName,
      age,
      bloodType,
      email,
      phone,
      address,
      allergies,
      chronicConditions,
      password: hashedPassword,
    });

    await newUser.save();

   // Generate HTML content for the welcome email
   const htmlContent = WelcomeEmail(fullName);
   console.log("HTML Content Generated: ", htmlContent); // Debugging HTML content

   // Send welcome emailk
   try {
     await sendEmail({
       to: email, // Ensure this is correctly populated
       subject: 'Welcome Message',
       text: 'Registration Done.', // Plain text fallback
       html: htmlContent, // Pass the generated HTML content here
     });
     console.log(`Welcome email sent successfully to: ${email}`);
   } catch (emailError) {
     console.error('Error sending welcome email:', emailError); // More detailed logs
     return res.status(500).json({ success: false, message: 'Account created but email delivery failed' });
   }

   res.status(201).json({ success: true, message: `Welcome, ${fullName}! Account created successfully.` });
 } catch (error) {
   console.error('Error registering user:', error);
   res.status(500).json({ success: false, message: 'Internal server error' });
 }
};


// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required!' });
    }

    const user = await NewUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password!' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, fullName: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      expiresIn: 3600,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { register, login };
