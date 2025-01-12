import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { // Updated to match the correct route
        username,
        password
      });

      const { token, message } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Navigate to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error); // Log error details to console
      setError(error.response ? error.response.data.message : 'Error logging in');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 14 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: 2,
            mb:2
          }}
        >
          Healthify Solutions
        </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
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
        <div className='text-2xl font-bold mb-4 text-center text-align-center' >
          Log In
        </div>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Log In
        </Button>
        <div className='flex flex-row justify-between' >
         <Link to="/forgetpassword" className='text-sm mt-4 text-blue-600' >
              Forgot Password?
            </Link>
            <Link to="/signup" className='text-sm mt-4 text-blue-600' >
              create account
            </Link>  

        </div>
      </Box>
    </Container>
  );
};

export default LoginPage;
