import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderIcon from '@mui/icons-material/Folder';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import Dashboard Icon

const Header = () => {
  const iconStyle = { fontSize: '18px', marginRight: '8px' }; // Adjust icon size

  return (
    <Box>
      {/* First Header (Green Gradient Background for Health) */}
      <AppBar 
        position="static" 
        style={{ background: 'linear-gradient(45deg, #66bb6a, #4CAF50)' }}
      >
        <Toolbar>
          <Typography 
            variant="h5" 
            style={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', letterSpacing: '1px' }}
          >
            Health Heaven
          </Typography>
          <Button color="inherit" component={Link} to="/">
            <HomeIcon style={iconStyle} /> Home
          </Button>
          <Button color="inherit" component={Link} to="/appointments">
            <CalendarTodayIcon style={iconStyle} /> Appointments
          </Button>
          <Button color="inherit" component={Link} to="/records">
            <FolderIcon style={iconStyle} /> Records
          </Button>
          <Button color="inherit" component={Link} to="/metrics">
            <BarChartIcon style={iconStyle} /> Metrics
          </Button>
          <Button color="inherit" component={Link} to="/dashboard"> {/* Add Dashboard link */}
            <DashboardIcon style={iconStyle} /> Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/education">
            <SchoolIcon style={iconStyle} /> Education
          </Button>
        </Toolbar>
      </AppBar>

      {/* Second Header (Flat Background Color, Reduced Height) */}
      <AppBar 
        position="static" 
        style={{ backgroundColor: '#1976d2', height: '40px' }} // Flat background color and reduced height
      >
        <Toolbar style={{ minHeight: '40px' }}> {/* Reduce toolbar height */}
          <Typography 
            variant="body2" 
            style={{ flexGrow: 1, fontFamily: 'Arial, sans-serif', color: '#fff' }}
          >
            Contact us: (555) 555-5555 | Email: info@healthheaven.com
          </Typography>
          <Button color="inherit" component={Link} to="/about">
            <InfoIcon style={iconStyle} /> About Us
          </Button>
          <Button color="inherit" component={Link} to="/support">
            <ContactMailIcon style={iconStyle} /> Support
          </Button>
          <Button color="inherit" component={Link} to="/login">
            <LoginIcon style={iconStyle} /> Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            <PersonAddIcon style={iconStyle} /> Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
