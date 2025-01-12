import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Material-UI Heartbeat icon
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    bloodType: '',
    email: '',
    phone: '',
    address: '',
    allergies: '',
    chronicConditions: '',
    pastSurgeries: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add form submission logic here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <FavoriteIcon sx={{ width: 30, height: 30, color: '#1976d2', mr: 1 }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Healthify Solutions
        </Typography>
      </Box>

      {/* Form Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Register Your Details
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              name="fullName"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.age}
              onChange={handleChange}
              name="age"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Blood Type"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.bloodType}
              onChange={handleChange}
              name="bloodType"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.address}
              onChange={handleChange}
              name="address"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Allergies"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.allergies}
              onChange={handleChange}
              name="allergies"
            />
          </Grid>
      
          <Grid item xs={12} md={6}>
            <TextField
              label="Past Surgeries"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.pastSurgeries}
              onChange={handleChange}
              name="pastSurgeries"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>

        {/* Already have an account and Forgot Password links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Link to="/login"
            className='text-sm text-blue-600  text-align-center'
          >
            Already have an account? 
          </Link>
         
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
