const mongoose = require('mongoose');
const newuserSchema = require('./Newuser'); // Assuming Newuser schema is defined

const reminderSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Full date (e.g., 2024-11-15)
  time: { type: String, required: true }, // Time in HH:mm format (e.g., "14:30")
  recurrence: { 
    type: String, 
    enum: ['None', 'Daily', 'Weekly', 'Monthly', 'Custom'],  // Enum values should match exactly as defined
    default: 'None' 
  },
  notifications: {
    push: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
  },
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Newuser', required: true }, // Reference to the User model
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
