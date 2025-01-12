import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

import feature1 from '../assets/images/feature1.jpeg';
import feature2 from '../assets/images/feature2.jpeg';
import feature3 from '../assets/images/feature3.jpeg';
import article1 from '../assets/images/testimonial1.png';
import article2 from '../assets/images/testimonial2.jpeg';
import article3 from '../assets/images/testimonial3.jpeg';
import partner1 from '../assets/images/partner1.jpeg';
import partner2 from '../assets/images/partner2.jpeg';
import partner3 from '../assets/images/partner3.png';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Hero Section */}
      <section
  style={{
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, hsl(200 85% 45%), hsl(170 80% 45%))", 
    padding: "8rem 0",
    height: "auto",
    width: "100%",
    color: "#ffffff",
  }}
>
  {/* Background Image Overlay */}
  <div
    style={{
      position: "absolute",
      inset: "0",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=2940')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: "0.2", // Increased opacity for a darker background
    }}
  ></div>

  {/* Content Section */}
  <div
    style={{
      position: "relative",
      zIndex: "10",
      maxWidth: "1140px",
      margin: "0 auto",
      padding: "0 1rem",
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: "48rem",
        textAlign: "center",
      }}
    >
      {/* Main Heading */}
      <h1
        style={{
          marginBottom: "1.5rem",
          fontSize: "4rem", // Increased font size for a bigger impact
          fontWeight: "800", // Bold and strong text for the headline
          lineHeight: "1.4",
          color: "inherit",
        }}
      >
        Welcome to Healthify Solutions
      </h1>

      {/* Subheading or Short Description */}
      <p
        style={{
          marginBottom: "2.5rem", // Added space between sections
          fontSize: "1.5rem", // Increased font size for better readability
          color: "rgba(255, 255, 255, 0.85)", // Slightly less opaque text
        }}
      >
Managing health care has never been easier. Schedule appointments, receive medication reminders, and track medical records all in one place.
      </p>

      {/* Additional Information */}
      <div
        style={{
          marginBottom: "2rem",
          fontSize: "1.25rem", // Increased font size for the features section
          color: "rgba(255, 255, 255, 0.9)",
          textAlign: "center",
        }}
      >
        {/* <p>Our platform offers:</p>
        <ul style={{ listStyle: "none", padding: "0", marginTop: "1rem" }}>
          <li>🩺 Easy access to your healthcare schedule</li>
          <li>💊 Automated medication reminders</li>
          <li>📑 Secure storage for your medical records</li>
        </ul> */}
      </div>
    </div>
  </div>
</section>




      {/* Quick Access Section */}
      <Grid
  container
  spacing={4}
  style={{
    margin: "40px auto",
    maxWidth: "1200px", // Added maximum width for centering
    padding: "0 20px", // Added padding for margins on both sides
    justifyContent: "center",
  }}
>
  <Grid item xs={12} sm={4}>
    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Book an Appointment
      </Typography>
      <Typography variant="body2" paragraph>
        Schedule your appointments with ease and never miss an important
        check-up.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/appointments"
        style={{ backgroundColor: "#2196f3", color: "#fff" }} // Blue color
      >
        Schedule Now
      </Button>
    </Paper>
  </Grid>

  <Grid item xs={12} sm={4}>
    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Set Medication Reminders
      </Typography>
      <Typography variant="body2" paragraph>
        Never miss a dose with timely reminders for your medications.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/reminders"
        style={{ backgroundColor: "#2196f3", color: "#fff" }} // Blue color
      >
        Set Reminders
      </Button>
    </Paper>
  </Grid>

  <Grid item xs={12} sm={4}>
    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Track Medical Records
      </Typography>
      <Typography variant="body2" paragraph>
        Securely manage and access your medical records whenever needed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/records"
        style={{ backgroundColor: "#2196f3", color: "#fff" }} // Blue color
      >
        Manage Records
      </Button>
    </Paper>
  </Grid>
</Grid>

{/* Features Section */}
<Grid
  container
  spacing={4}
  style={{
    margin: "60px auto", // Added vertical spacing
    maxWidth: "1200px", // Maximum width for alignment
    padding: "0 20px", // Side padding for margins
    justifyContent: "center",
  }}
>
  <Grid item xs={12}>
    <Typography
      variant="h4"
      component="h2"
      style={{
        marginBottom: "20px",
        textAlign: "center",
        color: "#388e3c",
      }}
    >
      Explore Our Features
    </Typography>
  </Grid>

  {/* Feature Cards */}
  <Grid item xs={12} sm={6} md={4}>
    <Card style={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={feature1}
        alt="Appointment Scheduling"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Appointment Scheduling
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Easily schedule and manage your medical appointments with healthcare
          providers, ensuring you never miss an important check-up.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/appointments"
          fullWidth
          style={{
            marginTop: "10px",
            backgroundColor: "#2196f3",
            color: "#fff",
          }}
        >
          Schedule Now
        </Button>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
    <Card style={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={feature2}
        alt="Medication Reminders"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Medication Reminders
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Set medication reminders to ensure you never miss a dose, helping you
          stay on track with your treatment plan.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/reminders"
          fullWidth
          style={{
            marginTop: "10px",
            backgroundColor: "#2196f3",
            color: "#fff",
          }}
        >
          Set Reminders
        </Button>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
    <Card style={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={feature3}
        alt="Medical Records Tracking"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Medical Records Tracking
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Securely store and manage your medical records in one place, easily
          accessible whenever you need them.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/records"
          fullWidth
          style={{
            marginTop: "10px",
            backgroundColor: "#2196f3",
            color: "#fff",
          }}
        >
          Manage Records
        </Button>
      </CardContent>
    </Card>
  </Grid>
</Grid>


      {/* Featured Articles Section */}
      <Container style={{ marginTop: '60px' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          style={{ marginBottom: '30px', color: '#388e3c' }}
        >
          Featured Articles
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article1}
                alt="Article 1"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Article Title 1
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  A brief summary of the first featured article. This summary
                  should give readers a glimpse of what the article is about.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/articles/1"
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#2196f3',
                    color: '#fff',
                  }} // Blue color
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article2}
                alt="Article 2"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Article Title 2
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  A brief summary of the second featured article. This summary
                  should give readers a glimpse of what the article is about.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/articles/2"
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#2196f3',
                    color: '#fff',
                  }} // Blue color
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article3}
                alt="Article 3"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Article Title 3
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  A brief summary of the third featured article. This summary
                  should give readers a glimpse of what the article is about.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/articles/3"
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#2196f3',
                    color: '#fff',
                  }} // Blue color
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      
      {/* Call to Action Section */}
      <Container
        style={{
          marginTop: '60px',
          padding: '40px 20px',
          backgroundColor: '#2196f3',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to take control of your health?
        </Typography>
        <Typography variant="h6" paragraph>
          Sign up now to access personalized health management features and
          stay on top of your medical care.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
          style={{
            padding: '10px 30px',
            fontSize: '18px',
            backgroundColor: '#fff',
            color: '#2196f3',
          }}
        >
          Join Now
        </Button>
      </Container>
    </>
  );
};

export default HomePage;
