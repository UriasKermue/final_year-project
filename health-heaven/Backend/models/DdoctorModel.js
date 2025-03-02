const mongoose = require("mongoose");

const DdoctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fees: { type: Number, required: true },
  location: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  hospitalAffiliation: { type: String },
  certificateUrl: { type: String },
  govIDUrl: { type: String },
  profilePictureUrl: { type: String },
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Banned"], default: "Pending" },
});



module.exports = mongoose.model("Ddoctor", DdoctorSchema);