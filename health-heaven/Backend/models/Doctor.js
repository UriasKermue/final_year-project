const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  consultationFees: { type: Number, required: true },
  availableTimes: [{ type: String }], // e.g., ["Monday 10:00 AM", "Tuesday 2:00 PM"]
  experience: { type: Number }, // Years of experience
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    website: { type: String },
  },
  education: [{ type: String }], // A list of qualifications like MBBS, MD, etc.
  imageUrl: { type: String }, // Add image URL field here
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
