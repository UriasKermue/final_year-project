const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

// Controller to create a new appointment
const createAppointment = async (req, res) => {
  const { doctorName, email, date, time, notes, doctorImage } = req.body; // Extract doctorImage as well

  try {
    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      doctorName,
      date,
      time,
    });

    if (conflictingAppointment) {
      return res.status(400).json({ message: "Doctor is unavailable at this time." });
    }

    // Create a new appointment
    const appointment = new Appointment({
      doctorName, 
      email, 
      date, 
      time, 
      notes,
      doctorImage: doctorImage || null,  // Optional field for doctorImage
    });

    // Save the appointment to the database
    await appointment.save();

    // Set up the email transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email notification to system owner
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_RECEIVER,
        subject: "New Appointment Scheduled",
        text: `New appointment scheduled:\n\nDoctor: ${doctorName}\nDate: ${date}\nTime: ${time}`,
      });
      console.log('Email sent successfully');
    } catch (err) {
      console.error('Error sending email:', err.message);
      return res.status(500).json({ message: "Error notifying system owner via email", error: err.message });
    }

    // Respond with the saved appointment data
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err.message);
    res.status(500).json({ message: "Error creating appointment", error: err.message });
  }
};

// Controller to get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err.message);
    res.status(500).json({ message: "Error fetching appointments", error: err.message });
  }
};

// Controller to delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error('Error deleting appointment:', err.message);
    res.status(500).json({ message: "Error deleting appointment", error: err.message });
  }
};

// Export the controller functions
module.exports = { createAppointment, getAppointments, deleteAppointment };
