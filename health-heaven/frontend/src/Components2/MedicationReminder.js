import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

// Helper function to format date and time
const formatDateTime = (date) => {
  if (!date) return '';
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const SetReminder = () => {
  // State variables
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [recurrence, setRecurrence] = useState('None');
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifySMS, setNotifySMS] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    const reminder = {
      date: date ? formatDateTime(date) : '',
      time: time ? formatDateTime(time) : '',
      recurrence,
      notifications: {
        push: notifyPush,
        email: notifyEmail,
        sms: notifySMS,
      },
      message,
    };
    console.log('Reminder Data:', reminder);
    // Logic to save the reminder, e.g., API call
  };

  return (
    <Container sx={{ marginTop: '30px', padding: '20px', maxWidth: '600px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <Typography variant="h3" gutterBottom align="center" fontWeight="bold" color="primary.main">
        Set Reminder
      </Typography>

      {/* Date and Time Selection */}
      <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">
        Date and Time
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select Time"
              value={time}
              onChange={(newTime) => setTime(newTime)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* Recurrence Options */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ marginTop: '20px' }} color="text.primary">
        Recurrence
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Recurrence</InputLabel>
        <Select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Custom">Custom</MenuItem>
        </Select>
      </FormControl>

      {/* Notification Methods */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ marginTop: '20px' }} color="text.primary">
        Notification Methods
      </Typography>
      <FormControlLabel
        control={<Switch checked={notifyPush} onChange={() => setNotifyPush(!notifyPush)} />}
        label="Push Notifications"
        sx={{ display: 'block', marginBottom: '10px' }}
      />
      <FormControlLabel
        control={<Switch checked={notifyEmail} onChange={() => setNotifyEmail(!notifyEmail)} />}
        label="Email Notifications"
        sx={{ display: 'block', marginBottom: '10px' }}
      />
      <FormControlLabel
        control={<Switch checked={notifySMS} onChange={() => setNotifySMS(!notifySMS)} />}
        label="SMS Alerts"
        sx={{ display: 'block', marginBottom: '10px' }}
      />

      {/* Message Content */}
      <TextField
        label="Reminder Message"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }}
      />

      {/* Save Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: '30px',
          padding: '12px 24px', // Increased padding for a larger button
          fontSize: '16px', // Larger font size for better readability
          fontWeight: 'bold', // Make the text bold
          borderRadius: '8px', // Rounded corners for a modern look
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          transition: 'background-color 0.3s ease', // Smooth hover transition
          '&:hover': {
            backgroundColor: '#0056b3', // Slightly darker blue on hover
          },
        }}
        onClick={handleSubmit}
        fullWidth // Makes the button span the full width of its container
      >
        Save Reminder
      </Button>
    </Container>
  );
};

export default SetReminder;