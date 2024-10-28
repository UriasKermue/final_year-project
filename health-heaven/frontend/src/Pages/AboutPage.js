import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';

// Importing images
import uriasImage from '../assets/images/Urias Kermue.jpg';
import sahilImage from '../assets/images/Sahil Kumar.jpeg';
import nyasijinImage from '../assets/images/Nyasijin Kuol Mathiang.webp';
import nehaImage from '../assets/images/Neha Bharti.jpeg';
import abhigyaImage from '../assets/images/Abhigya Ishan.jpeg';

// Team members data
const teamMembers = [
  {
    name: 'Abhigya Ishan',
    department: 'IT-01',
    image: abhigyaImage, // Using the imported image for Abhigya Ishan
  },
  {
    name: 'Sahil Kumar',
    department: 'IT-03',
    image: sahilImage, // Using the imported image for Sahil Kumar
  },
  {
    name: 'Urias Kermue',
    department: 'IT-03',
    image: uriasImage, // Using the imported image for Urias Kermue
  },
  {
    name: 'Neha Bharti',
    department: 'IT-03',
    image: nehaImage, // Using the imported image for Neha Bharti
  },
  {
    name: 'Nyasijin Kuol Mathiang',
    department: 'IT-03',
    image: nyasijinImage, // Using the imported image for Nyasijin Kuol Mathiang
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}
      >
        About Us
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              paragraph
              align="center"
              sx={{ color: 'text.secondary' }}
            >
              At Health Heaven, our mission is to provide the best resources and
              support for your wellness journey. We are committed to delivering
              high-quality information and tools to help you achieve your health
              goals.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
            >
              Meet the Team
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {teamMembers.map((member) => (
                <Grid item xs={12} sm={4} md={2} key={member.name}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'center',
                      height: '100%', // Ensures all cards have the same height
                      borderRadius: 2, // Adds some smooth border-radius for better design
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={member.image}
                      alt={member.name}
                      sx={{
                        width: '100%',
                        height: 180,
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0', // Rounded top corners
                      }}
                    />
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}
                      >
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Department: {member.department}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
