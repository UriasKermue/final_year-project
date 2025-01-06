const express = require('express');
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const router = express.Router();

// Set up the email transporter (using .env variables)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route to get all appointments
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all appointments...');
    const appointments = await Appointment.find();
    console.log('Appointments retrieved:', appointments);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to add a new appointment
router.post('/', async (req, res) => {
  const { doctorName, doctorImage, email, date, time, notes } = req.body;  // doctorImage is URL here
  console.log('Received data:', req.body);

  try {
    console.log('Checking if appointment slot is available...');
    const existingAppointment = await Appointment.findOne({
      doctorName,
      date,
      time,
    });

    if (existingAppointment) {
      console.log('Appointment slot is unavailable.');
      return res.status(400).json({ message: 'Doctor is not available at this time' });
    }

    console.log('Creating new appointment...');
    const newAppointment = new Appointment({
      doctorName,
      doctorImage,  // Save the doctorImage URL to the appointment
      email,
      date,
      time,
      notes,
    });

    const savedAppointment = await newAppointment.save();
    console.log('Appointment saved:', savedAppointment);

    // Send an email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to system owner
      subject: 'New Appointment Scheduled',
      text: `A new appointment has been scheduled by ${email} for ${doctorName} on ${new Date(date).toLocaleDateString()} at ${time}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
});

// Route to confirm an appointment
router.put('/:id/confirm', async (req, res) => {
  try {
    console.log('Confirming appointment:', req.params.id);
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      console.log('Appointment not found.');
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Confirmed';
    const updatedAppointment = await appointment.save();
    console.log('Appointment confirmed:', updatedAppointment);
    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error confirming appointment:', error.message);
    res.status(500).json({ message: 'Error confirming appointment', error: error.message });
  }
});

// Route to cancel an appointment
router.put('/:id/cancel', async (req, res) => {
  try {
    console.log('Cancelling appointment:', req.params.id);
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      console.log('Appointment not found.');
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Cancelled';
    const updatedAppointment = await appointment.save();
    console.log('Appointment cancelled:', updatedAppointment);
    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error cancelling appointment:', error.message);
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
  }
});

module.exports = router;
