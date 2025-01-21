const Doctor = require('../models/Doctor');

// Controller to handle doctor creation
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      specialty,
      location,
      consultationFees,
      availableTimes,
      experience,
      contactInfo,
      education,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // If image uploaded, use the file URL

    const doctorData = {
      name,
      specialty,
      location,
      consultationFees: Number(consultationFees),
      availableTimes: availableTimes.split(',').map((time) => time.trim()), // Convert comma-separated string to array
      experience: Number(experience),
      contactInfo: {
        phone: contactInfo.phone,
        email: contactInfo.email,
      },
      education: education.split(',').map((edu) => edu.trim()), // Convert comma-separated string to array
      imageUrl, // Store the image URL
    };

    // Create a new doctor document and save it
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res.status(201).json({
      message: 'Doctor added successfully!',
      doctor: newDoctor,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error while adding doctor',
    });
  }
};

module.exports = { addDoctor };
