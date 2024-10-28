import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Alert } from '@mui/material';

const AppointmentScheduler = () => {
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Example API call
      // await api.scheduleAppointment(appointmentData);
      console.log('Appointment Data:', appointmentData);
      
      // Simulate success
      setSuccess('Appointment scheduled successfully!');
      
      // Reset form
      setAppointmentData({
        name: '',
        email: '',
        date: '',
        time: '',
      });
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
        Schedule an Appointment
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Use the form below to schedule, reschedule, or cancel your medical appointments.
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              value={appointmentData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={appointmentData.email}
              onChange={handleChange}
              required
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="date"
              name="date"
              label="Appointment Date"
              type="date"
              value={appointmentData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="time"
              name="time"
              label="Appointment Time"
              type="time"
              value={appointmentData.time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Schedule Appointment
        </Button>
      </Box>
    </Container>
  );
};

export default AppointmentScheduler;