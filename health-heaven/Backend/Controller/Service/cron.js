const cron = require('node-cron');
const { checkAndSendDueReminders } = require('../reminderController');
const Reminder = require('../../models/Reminder'); // Replace with your actual Reminder model

// Schedule the cron job to run every minute (adjust as needed)
cron.schedule('* * * * *', async () => {
  try {
    // Check if there are any reminders in the database
    const reminders = await Reminder.find({});
    
    if (reminders.length === 0) {
      console.log('No reminders to check');
      return; // Exit early if no reminders are set
    }

    // Proceed with checking and sending due reminders
    console.log('Checking for due reminders...');
    await checkAndSendDueReminders();
  } catch (error) {
    console.error('Error checking for due reminders:', error);
  }
});
