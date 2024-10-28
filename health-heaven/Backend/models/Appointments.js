const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true },
    notes: { type: String }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
