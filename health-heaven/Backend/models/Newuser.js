// models/User.js
const mongoose = require('mongoose');

const NewuserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  bloodType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  allergies: { type: String },
  chronicConditions: { type: String },
  profileImage: { type: String }, // Store the URL of the uploaded image
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('Newuser', NewuserSchema);

module.exports = User;
