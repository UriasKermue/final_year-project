const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Route to get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new doctor
router.post('/', async (req, res) => {
  const { name, specialty, location, consultationFees, availableTimes, experience, contactInfo, education, imageUrl } = req.body;

  try {
    // Check if a doctor with the same name or contact info already exists
    const existingDoctor = await Doctor.findOne({ $or: [{ name }, { contactInfo }] });

    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Create new doctor if not already exists
    const newDoctor = new Doctor({
      name,
      specialty,
      location,
      consultationFees,
      availableTimes,
      experience,
      contactInfo,
      education,
      imageUrl, // Add imageUrl to the doctor data
    });

    // Save the new doctor to the database
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Error adding doctor', error: error.message });
  }
});

module.exports = router;
