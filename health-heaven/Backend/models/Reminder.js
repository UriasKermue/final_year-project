const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Full date (e.g., 2024-11-15)
  time: { type: String, required: true }, // Time in HH:mm format (e.g., "14:30")
  recurrence: { type: String, enum: ['None', 'Daily', 'Weekly', 'Monthly', 'Custom'], default: 'None' },
  notifications: {
    push: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
  },
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model for patient
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
