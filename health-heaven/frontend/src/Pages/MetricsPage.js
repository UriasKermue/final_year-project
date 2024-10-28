import React, { useState } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const healthMetricsData = [
  { name: 'Jan', heartRate: 72, steps: 8000, calories: 2200, sleep: 7 },
  { name: 'Feb', heartRate: 75, steps: 8500, calories: 2300, sleep: 6.5 },
  { name: 'Mar', heartRate: 70, steps: 9000, calories: 2400, sleep: 7.2 },
  { name: 'Apr', heartRate: 68, steps: 9200, calories: 2350, sleep: 6.8 },
  { name: 'May', heartRate: 74, steps: 8700, calories: 2250, sleep: 7.1 },
  // Add more data points as needed
];

const HealthMetrics = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [metricType, setMetricType] = useState('Heart Rate');

  const handleDateRangeChange = (e) => setDateRange(e.target.value);
  const handleMetricTypeChange = (e) => setMetricType(e.target.value);

  // Determine which metric data to use based on selected metric type
  const getMetricDataKey = () => {
    switch (metricType) {
      case 'Heart Rate':
        return 'heartRate';
      case 'Steps':
        return 'steps';
      case 'Calories Burned':
        return 'calories';
      case 'Sleep Duration':
        return 'sleep';
      default:
        return 'heartRate';
    }
  };

  return (
    <Container sx={{ marginTop: '30px', padding: '20px', maxWidth: '1200px' }}>
      <Typography variant="h3" gutterBottom align="center" fontWeight="bold" color="primary.main">
        Health Metrics Dashboard
      </Typography>

      {/* Date Range and Metric Type Filters */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              onChange={handleDateRangeChange}
              sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }}
            >
              <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
              <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
              <MenuItem value="Last 1 Year">Last 1 Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Metric Type</InputLabel>
            <Select
              value={metricType}
              onChange={handleMetricTypeChange}
              sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }}
            >
              <MenuItem value="Heart Rate">Heart Rate</MenuItem>
              <MenuItem value="Steps">Steps</MenuItem>
              <MenuItem value="Calories Burned">Calories Burned</MenuItem>
              <MenuItem value="Sleep Duration">Sleep Duration</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Health Metrics Chart */}
      <Card sx={{ marginTop: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="text.primary">
            {metricType} Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={healthMetricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={getMetricDataKey()} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export and Share Options */}
      <Grid container spacing={3} sx={{ marginTop: '30px' }}>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" fullWidth>
            Export Data
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="outlined" color="secondary" fullWidth>
            Share Report
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HealthMetrics;
