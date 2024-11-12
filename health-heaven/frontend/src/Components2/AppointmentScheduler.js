import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Alert, Modal, CircularProgress } from '@mui/material';
import axios from 'axios';

const AppointmentScheduler = () => {
  const [appointmentData, setAppointmentData] = useState({
    doctorName: '',
    email: '',
    date: '',
    time: '',
    notes: '',
  });
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // List of doctors
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    // Fetch doctors and appointments when the component mounts
    axios.get('http://localhost:5000/api/doctors')
      .then(response => {
        setDoctors(response.data); // Set the list of doctors
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
      });

    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
      });
  }, []);

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!appointmentData.doctorName) errors.doctorName = 'Doctor name is required';
    else if (!doctors.some(doctor => doctor.name.toLowerCase() === appointmentData.doctorName.toLowerCase())) {
      errors.doctorName = 'Doctor name does not match any available doctor';
    }
    if (!appointmentData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(appointmentData.email)) errors.email = 'Email address is invalid';
    if (!appointmentData.date) errors.date = 'Appointment date is required';
    if (!appointmentData.time) errors.time = 'Appointment time is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      setAppointments([...appointments, response.data]);
      setSuccess('Appointment scheduled successfully!');
      setAppointmentData({
        doctorName: '',
        email: '',
        date: '',
        time: '',
        notes: '',
      });
      setFormErrors({});
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
      setSuccess('Appointment deleted successfully!');
    } catch (err) {
      setError('Failed to delete appointment. Please try again.');
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setAppointmentData({
      doctorName: appointment.doctorName,
      email: appointment.email,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes,
    });
    setOpenEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/api/appointments/${editingAppointment._id}`, appointmentData);
      const updatedAppointments = appointments.map((appt) => 
        appt._id === editingAppointment._id ? response.data : appt
      );
      setAppointments(updatedAppointments);
      setSuccess('Appointment updated successfully!');
      setOpenEditModal(false);
      setAppointmentData({
        doctorName: '',
        email: '',
        date: '',
        time: '',
        notes: '',
      });
      setFormErrors({});
    } catch (err) {
      setError('Failed to update appointment. Please try again.');
    } finally {
      setLoading(false);
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
              id="doctorName"
              name="doctorName"
              label="Doctor Name"
              value={appointmentData.doctorName}
              onChange={handleChange}
              required
              variant="outlined"
              error={Boolean(formErrors.doctorName)}
              helperText={formErrors.doctorName}
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
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
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
              InputLabelProps={{ shrink: true }}
              required
              variant="outlined"
              error={Boolean(formErrors.date)}
              helperText={formErrors.date}
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
              InputLabelProps={{ shrink: true }}
              required
              variant="outlined"
              error={Boolean(formErrors.time)}
              helperText={formErrors.time}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="notes"
              name="notes"
              label="Additional Notes"
              value={appointmentData.notes}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          {loading ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Your Appointments
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {appointments.length === 0 ? (
            <Typography variant="body1">No appointments scheduled.</Typography>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment._id}>
                  <Typography variant="body1">
                    <strong>{appointment.doctorName}</strong><br />
                    {new Date(appointment.date).toLocaleString()}<br />
                    <em>{appointment.notes}</em>
                  </Typography>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(appointment._id)}>Cancel</Button>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(appointment)}>Edit</Button>
                </li>
              ))}
            </ul>
          )}
        </Box>
      )}

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Appointment
          </Typography>
          <Box component="form" onSubmit={handleEditSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="doctorName"
                  name="doctorName"
                  label="Doctor Name"
                  value={appointmentData.doctorName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={Boolean(formErrors.doctorName)}
                  helperText={formErrors.doctorName}
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
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
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
                  InputLabelProps={{ shrink: true }}
                  required
                  variant="outlined"
                  error={Boolean(formErrors.date)}
                  helperText={formErrors.date}
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
                  InputLabelProps={{ shrink: true }}
                  required
                  variant="outlined"
                  error={Boolean(formErrors.time)}
                  helperText={formErrors.time}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="notes"
                  name="notes"
                  label="Additional Notes"
                  value={appointmentData.notes}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              {loading ? "Updating..." : "Update Appointment"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default AppointmentScheduler;
