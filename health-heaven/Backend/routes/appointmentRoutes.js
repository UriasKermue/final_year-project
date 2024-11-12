const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor'); // Import the Doctor model

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Public
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Public
router.post('/', async (req, res) => {
  console.log(req.body)
  const { doctorName, email, date, time, notes } = req.body;

  try {
    // Check if the doctor exists in the database
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return res.status(400).json({ message: 'Doctor not found in the system' });
    }

    // Proceed with appointment creation
    const newAppointment = await Appointment.create({
      doctorName,
      email,
      date,
      time,
      notes,
    });

    // const appointment = await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create appointment' });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.remove();
    res.json({ message: 'Appointment removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update an existing appointment
// @access  Public
router.put('/:id', async (req, res) => {
  const { doctorName, email, date, time, notes } = req.body;

  try {
    // Check if the doctor exists in the database
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return res.status(400).json({ message: 'Doctor not found in the system' });
    }

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment details
    appointment.doctorName = doctorName;
    appointment.email = email;
    appointment.date = date;
    appointment.time = time;
    appointment.notes = notes;

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update appointment' });
  }
});

module.exports = router;
