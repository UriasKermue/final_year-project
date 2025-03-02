const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Newuser", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Ddoctor", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("AppointmentModel", appSchema);