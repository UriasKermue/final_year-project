const Reminder = require('../models/Reminder');
const Newuser = require('../models/Newuser');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail'); // Replace with your actual email function

// Create Reminder
const createReminder = async (req, res) => {
  const { date, time, recurrence, notifications, message, userId } = req.body;

  try {
    // Validate required fields
    if (!date || !time || !message || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate recurrence
    const validRecurrences = ['None', 'Daily', 'Weekly', 'Monthly', 'Custom'];
    if (!validRecurrences.includes(recurrence)) {
      return res.status(400).json({ message: 'Invalid recurrence value. Please select a valid recurrence.' });
    }

    // Validate user
    const userExists = await Newuser.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Combine date and time
    const reminderDate = moment(date).set({
      hour: moment(time, 'HH:mm').hour(),
      minute: moment(time, 'HH:mm').minute(),
      second: 0,
      millisecond: 0,
    });

    // Create reminder
    const reminder = new Reminder({
      date: reminderDate.toDate(),
      time,
      recurrence,
      notifications,
      message,
      user: userId,
    });

    await reminder.save();

    res.status(201).json({ message: 'Reminder created successfully', reminder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create reminder', error: error.message });
  }
};


// Send Reminder Notifications
const sendReminderNotifications = (reminder) => {
  try {
    if (reminder.notifications.email) {
      sendEmail(reminder.user.email, 'Reminder Notification', reminder.message); // Assuming `user.email` exists
    }
    // Add SMS and push notification logic here
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Check and Send Due Reminders
const checkAndSendDueReminders = async () => {
  try {
    const now = moment();
    const reminders = await Reminder.find({ date: { $lte: now.toDate() } }).populate('user');

    for (const reminder of reminders) {
      sendReminderNotifications(reminder);

      // Handle recurrence
      if (reminder.recurrence === 'Daily') {
        reminder.date = moment(reminder.date).add(1, 'days').toDate();
      } else if (reminder.recurrence === 'Weekly') {
        reminder.date = moment(reminder.date).add(1, 'weeks').toDate();
      } else if (reminder.recurrence === 'Monthly') {
        reminder.date = moment(reminder.date).add(1, 'months').toDate();
      } else if (reminder.recurrence === 'Custom' && reminder.customRecurrenceDays) {
        reminder.date = moment(reminder.date).add(reminder.customRecurrenceDays, 'days').toDate();
      }

      await reminder.save();
    }
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};

// Schedule the function using a cron job or a queue system
module.exports = {
  createReminder,
  checkAndSendDueReminders,
};
