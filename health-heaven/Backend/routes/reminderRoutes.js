const express = require('express');
const { createReminder } = require('../Controller/reminderController');

const router = express.Router();

router.post('/reminders', (req, res) => {
  console.log("POST request to /api/reminders received");
  createReminder(req, res);
});

module.exports = router;
