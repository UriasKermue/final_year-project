const cron = require('node-cron');
const { checkAndSendDueReminders } = require('../reminderController');
const Reminder = require('../../models/Reminder'); // Ensure correct path to your Reminder model
const moment = require('moment');

// Schedule the cron job to run every minute (adjust as needed)
cron.schedule('* * * * *', async () => {
  try {
    console.log('Cron job triggered at:', moment().format()); // Log the timestamp of each cron job trigger

    // Find all reminders in the database that are due
    const reminders = await Reminder.find({ date: { $lte: moment().toDate() } });

    if (reminders.length === 0) {
      console.log('No reminders due for notification');
      return; // Exit early if no reminders are due
    }

    
    // Proceed with checking and sending notifications
    await checkAndSendDueReminders(reminders);

    // Log that the reminders were processed
    console.log('Due reminders processed and notifications sent');
    
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});