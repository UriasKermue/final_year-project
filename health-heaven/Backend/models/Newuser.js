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
  resetToken: { type: String }, // New field for password reset tokens
  tokenExpiry: { type: Date }, 
  status: { type: String, enum: ["Active", "Banned"], default: "Active" }, // New field for token expiry timestamps
}, { timestamps: true });

const User = mongoose.model('Newuser', NewuserSchema);

module.exports = User;
