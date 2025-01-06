const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ensure the path is correct
const authRoutes = require('../Backend/routes/authRoutes'); // Ensure the path is correct
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import Appointment routes
const doctorRoutes = require('../Backend/routes/doctorRoutes')
const reminderRoutes = require('./routes/reminderRoutes');
const cronJob = require('../Backend/Controller/Service/cron'); // Import the cron job
const medicalRecordRoutes = require('../Backend/routes/medicalRecordRoutes'); // Import the new medical record routes
const errorHandler = require('../Backend/middlewares/uploadMiddleware');
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
app.use('/api', reminderRoutes); // Use reminder routes
app.use('/api/medical-records', medicalRecordRoutes);
app.use(errorHandler); // Apply after all other routes and middlewares


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
