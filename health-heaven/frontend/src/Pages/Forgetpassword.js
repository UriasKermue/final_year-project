import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Material-UI Heartbeat icon

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for email:', email);
    // Add password reset logic here
};

  return (
      <Container 
      maxWidth="sm" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        mt: 5, 
        mb: 5 
      }}
      >
      
      {/* Form Wrapper */}
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
          textAlign: 'center',
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
        
        </Box>

        {/* Forgot Password Form Section */}
        <Typography variant="h5" component="h2" gutterBottom>
          Forgot Your Password?
        </Typography>

        {/* Email Field */}
        <TextField
          label="Enter Your Email"
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          value={email}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
    
        >
          Send Reset Link
        </Button>

        {/* Back to Login Link */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#1976d2', cursor: 'pointer' }}
            onClick={() => window.location.href = '/login'} // Navigate to login page
          >
            Back to Login
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
