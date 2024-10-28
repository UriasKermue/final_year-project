require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const userRoutes = require('../Backend/routes/userRotes'); // Ensure this path is correct
const authRoutes = require('../Backend/routes/authRoutes'); // Ensure this path is correct
const connectDB = require('../Backend/DB'); // Ensure the path to DB.js is correct

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/auth', authRoutes);   // Authentication routes

// Log environment variables for debugging
console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
console.log(`PORT: ${process.env.PORT}`);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000; // Use default port if not set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
