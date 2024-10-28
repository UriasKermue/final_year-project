import React from 'react';
import { Box, Grid, Paper, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Home, Schedule, Medication, HealthAndSafety, Assessment, Logout } from '@mui/icons-material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Sample data for each chart
const caloriesData = [
  { day: 'Mon', calories: 400 },
  { day: 'Tue', calories: 700 },
  { day: 'Wed', calories: 600 },
  { day: 'Thu', calories: 500 },
  { day: 'Fri', calories: 900 },
  { day: 'Sat', calories: 800 },
  { day: 'Sun', calories: 1000 },
];

const heartRateData = [
  { day: 'Mon', bpm: 70 },
  { day: 'Tue', bpm: 80 },
  { day: 'Wed', bpm: 75 },
  { day: 'Thu', bpm: 78 },
  { day: 'Fri', bpm: 85 },
  { day: 'Sat', bpm: 88 },
  { day: 'Sun', bpm: 90 },
];

const sleepData = [
  { day: 'Mon', hours: 7 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 6 },
  { day: 'Thu', hours: 7.5 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 6.5 },
  { day: 'Sun', hours: 9 },
];

const stepsData = [
  { day: 'Mon', steps: 3000 },
  { day: 'Tue', steps: 4000 },
  { day: 'Wed', steps: 3500 },
  { day: 'Thu', steps: 5000 },
  { day: 'Fri', steps: 6000 },
  { day: 'Sat', steps: 7500 },
  { day: 'Sun', steps: 8000 },
];

const Dashboard = () => {
  const fullName = localStorage.getItem('fullName'); // Get full name from localStorage
  const email = localStorage.getItem('email'); // Get email from localStorage
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName'); // Remove full name on logout
    localStorage.removeItem('username'); // Optionally remove username if stored
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, backgroundColor: '#1976d2', color: '#fff', minHeight: '100vh', padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <Avatar sx={{ width: 60, height: 60, marginRight: 2 }} alt={fullName} src="/static/images/avatar/1.jpg" />
          <Box>
            <Typography variant="h6">Welcome, {fullName}</Typography> {/* Display full name */}
            <Typography variant="body2">{email}</Typography> {/* Display email */}
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: '#fff' }} />

        {/* Navigation Menu */}
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Schedule sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Medication sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Reminders" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HealthAndSafety sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Medical Records" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Assessment sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Metrics" />
          </ListItem>
          <Divider sx={{ backgroundColor: '#fff' }} />
          {/* Logout Button */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Main Dashboard Content */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
        <Grid container spacing={3}>
          {/* Health Metrics: Calories Burned */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Calories Burned</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={caloriesData}>
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Health Metrics: Heart Rate */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Heart Rate</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={heartRateData}>
                  <Line type="monotone" dataKey="bpm" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Health Metrics: Sleep Duration */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Sleep Duration</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sleepData}>
                  <Line type="monotone" dataKey="hours" stroke="#ff7300" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Health Metrics: Steps Count */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Steps Count</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stepsData}>
                  <Line type="monotone" dataKey="steps" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
