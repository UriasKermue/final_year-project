import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Grid, FormControl, InputLabel, 
  Select, MenuItem, InputAdornment, Box, Alert
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';

// Define a component for file upload
const FileUpload = ({ onFileChange, fileName }) => (
  <Box mt={2}>
    <Button
      variant="contained"
      color="default"
      component="label"
      startIcon={<AttachFileIcon />}
    >
      {fileName ? `File: ${fileName}` : 'Attach File'}
      <input
        type="file"
        hidden
        onChange={(e) => onFileChange(e.target.files[0])}
      />
    </Button>
  </Box>
);

const MedicalRecord = () => {
  const [recordTitle, setRecordTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    if (!recordTitle || !date || !category) {
      setError('Please fill in all required fields.');
      setSuccess('');
      return;
    }

    const formData = new FormData();
    formData.append('recordTitle', recordTitle);
    formData.append('description', description);
    formData.append('date', date.toISOString());
    formData.append('category', category);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/records', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Medical record saved successfully.');
      setError('');
    } catch (error) {
      setError('Error saving medical record.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Medical Records
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Record Title"
            fullWidth
            value={recordTitle}
            onChange={(e) => setRecordTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Appointment">Appointment</MenuItem>
              <MenuItem value="Prescriptions">Prescriptions</MenuItem>
              <MenuItem value="Lab Results">Lab Results</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FileUpload onFileChange={(file) => setFile(file)} fileName={file ? file.name : ''} />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Record
        </Button>
      </Box>
    </Container>
  );
};

export default MedicalRecord;
