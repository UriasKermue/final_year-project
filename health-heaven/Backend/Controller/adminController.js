const Doctor = require('../models/Doctor');
const fs = require('fs');
const path = require('path');

// Add a new doctor
exports.addDoctor = async (req, res) => {
  try {
    const { name, specialty, location, consultationFees, availableTimes, experience, contactInfo, education } = req.body;
    const doctorImage = req.files && req.files.doctorImage ? req.files.doctorImage[0].filename : null;

    const newDoctor = new Doctor({
      name,
      specialty,
      location,
      consultationFees,
      availableTimes,
      experience,
      contactInfo,
      education,
      doctorImage,
    });

    await newDoctor.save();

    res.status(201).json({
      message: 'Doctor added successfully!',
      doctor: newDoctor,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error adding doctor',
      error: err.message,
    });
  }
};

// Edit an existing doctor
exports.editDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If there's a new image, handle replacing the old one
    if (req.files && req.files.doctorImage) {
      const doctor = await Doctor.findById(id);
      if (doctor && doctor.doctorImage) {
        const oldImagePath = path.join('./uploads/doctors', doctor.doctorImage);
        if (fs.existsSync(oldImagePath)) {
          await fs.promises.unlink(oldImagePath); // Remove the old image
        }
      }
      updates.doctorImage = req.files.doctorImage[0].filename;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({
      message: 'Doctor updated successfully!',
      doctor: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating doctor',
      error: err.message,
    });
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (doctor.doctorImage) {
      const imagePath = path.join('./uploads/doctors', doctor.doctorImage);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath); // Delete the image
      }
    }

    res.status(200).json({ message: 'Doctor deleted successfully!' });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting doctor',
      error: err.message,
    });
  }
};
