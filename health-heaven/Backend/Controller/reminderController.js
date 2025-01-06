const Reminder = require('../models/Reminder');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail'); // Import your existing email function

// Create reminder
const createReminder = async (req, res) => {
  const { date, time, recurrence, notifications, message, userId } = req.body;

  try {
    // Validate the required fields
    if (!date || !time || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Combine date and time to create a full Date object
    const reminderDate = moment(date).set({
      hour: moment(time, 'HH:mm').hour(),
      minute: moment(time, 'HH:mm').minute(),
      second: 0,
      millisecond: 0
    });

    // Create a new reminder instance
    const reminder = new Reminder({
      date: reminderDate.toDate(),
      time: time,  // Storing time as string in HH:mm format
      recurrence,
      notifications,
      message,
      user: userId, // Assuming you pass the user's ID for patient
    });

    // Save the reminder to the database
    await reminder.save();

    res.status(201).json({
      message: 'Reminder created successfully',
      reminder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create reminder', error: error.message });
  }
};

// Function to send notifications (email, push, sms)
const sendReminderNotifications = (reminder) => {
  if (reminder.notifications.email) {
    sendEmail(reminder.user.email, 'Medication Reminder', reminder.message); // Assuming user has email field
  }

  // Similarly, you can implement SMS and Push notification logic
};

// Function to check and trigger reminders
const checkAndSendDueReminders = async () => {
  try {
    const now = moment();
    const reminders = await Reminder.find({ date: { $lte: now.toDate() } });

    reminders.forEach(async reminder => {
      sendReminderNotifications(reminder);

      // Handle recurrence (update next reminder)
      if (reminder.recurrence === 'Daily') {
        reminder.date = moment(reminder.date).add(1, 'days').toDate();
      } else if (reminder.recurrence === 'Weekly') {
        reminder.date = moment(reminder.date).add(1, 'weeks').toDate();
      } else if (reminder.recurrence === 'Monthly') {
        reminder.date = moment(reminder.date).add(1, 'months').toDate();
      } else if (reminder.recurrence === 'Custom') {
        // Custom recurrence logic (e.g., every X days)
        reminder.date = moment(reminder.date).add(3, 'days').toDate(); // Custom recurrence example (adjust accordingly)
      }

      await reminder.save(); // Save updated reminder with new date
    });
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};

module.exports = {
  createReminder,
  checkAndSendDueReminders,
};
