const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../Backend/routes/userRotes'); // Ensure the path is correct
const authRoutes = require('../Backend/routes/authRoutes'); // Ensure the path is correct
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import Appointment routes
const doctorRoutes = require('../Backend/routes/doctorRoutes')
const connectDB = require('../Backend/DB'); // DB connection

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes); // Use Appointment routes
app.use('/api/doctors', doctorRoutes);

// Log environment variables for debugging
console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
console.log(`PORT: ${process.env.PORT}`);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
