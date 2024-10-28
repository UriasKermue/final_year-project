import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, InputAdornment, Box, Alert } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

// Define a component for the file upload
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

  const handleSave = () => {
    // Basic validation
    if (!recordTitle || !date || !category) {
      setError('Please fill in all required fields.');
      setSuccess('');
      return;
    }

    // Clear error
    setError('');
    
    // Handle the save functionality here
    console.log('Record Title:', recordTitle);
    console.log('Description:', description);
    console.log('Date:', date);
    console.log('Category:', category);
    console.log('File:', file);

    // Show success message
    setSuccess('Medical record saved successfully.');
  };

  return (
    <Container>
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        sx={{ color:"primary", marginBottom: 3, paddingTop: 3 }}
      >
        Manage Medical Records
      </Typography>

      {/* Error and Success Messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Record Title"
            fullWidth
            margin="normal"
            value={recordTitle}
            onChange={(e) => setRecordTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the medical record (optional)"
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        >
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Appointment">Appointment</MenuItem>
          <MenuItem value="Prescriptions">Prescriptions</MenuItem>
          <MenuItem value="Lab Results">Lab Results</MenuItem>
        </Select>
      </FormControl>

      <FileUpload onFileChange={(file) => setFile(file)} fileName={file ? file.name : ''} />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSave}
      >
        Save Record
      </Button>
    </Container>
  );
};

export default MedicalRecord;
