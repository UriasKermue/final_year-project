const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Newuser = require('./routes/Newuser'); // Ensure the path is correct
const newauthRoutes = require('../Backend/routes/newauthRoutes'); // Ensure the path is correct
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import Appointment routes
const doctorRoutes = require('../Backend/routes/doctorRoutes')
const reminderRoutes = require('./routes/reminderRoutes');
const cronJob = require('../Backend/Controller/Service/cron'); // Import the cron job
const medicalRecordRoutes = require('../Backend/routes/medicalRecordRoutes'); // Import the new medical record routes
// const errorHandler = require('../Backend/middlewares/errorMiddleware');
const predictionRoutes = require("./routes/predictionRoutes");
// const adminRoutes = require('./routes/er'); 

const adminRoutes = require('./routes/adminRoutes'); // Make sure this path is correct


const passwordRoutes = require('./routes/passwordRoutes'); // Import the password routes
const connectDB = require('../Backend/DB'); // DB connection

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

// path to the public directory
// The general upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/admin', adminRoutes);
// Use the admin routes
app.use('/api/newusers', Newuser);
app.use('/api/newauth', newauthRoutes);
app.use('/api/appointments', appointmentRoutes); // Use Appointment routes
app.use('/api/doctors', doctorRoutes);
app.use('/api', reminderRoutes); // Use reminder routes
app.use('/api/medical-records', medicalRecordRoutes);
// app.use(errorHandler); 
// Apply after all other routes and middlewares
app.use("/api", predictionRoutes);
app.use('/api/password', passwordRoutes); // Use the password routes

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
