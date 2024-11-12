const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorName: {
    type:String
  },
  email: {
    type:String
  },
  date: {
    type:String
  },
  time: {
    type:String
  },
  notes: {
    type:String
  },
})
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
