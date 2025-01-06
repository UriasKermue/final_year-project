import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]); // Holds the doctor data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors
  const [searchTerm, setSearchTerm] = useState(''); // Search input for specialty

  // Fetch doctors data when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors'); // Correct API endpoint
        setDoctors(response.data); // Set doctors data
        setLoading(false); // Stop loading
      } catch (err) {
        setError('Error fetching doctors data'); // Set error state
        setLoading(false); // Stop loading
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array means this runs once when component mounts

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter(doctor =>
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Inline style objects
  const containerStyle = {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const doctorCardsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-evenly',
  };

  const doctorCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '280px',
    textAlign: 'center',
  };

  const doctorImageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '15px',
  };

  const doctorInfoStyle = {
    marginTop: '10px',
    textAlign: 'left',
  };

  const buttonStyle = {
    marginTop: '10px',
  };

  // If the component is loading, show a loading message
  if (loading) {
    return <p>Loading doctors...</p>;
  }

  // If there's an error, display it
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Doctors List</h2>

      {/* Search Input */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '250px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Display Filtered Doctors */}
      <div style={doctorCardsStyle}>
        {filteredDoctors.length === 0 ? (
          <p>No doctors found with this specialty.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} style={doctorCardStyle}>
              <img
                src={doctor.imageUrl || 'https://via.placeholder.com/120'}
                alt={doctor.name}
                style={doctorImageStyle}
              />
              <div style={doctorInfoStyle}>
                <h3>{doctor.name}</h3>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Consultation Fees:</strong> ₹{doctor.consultationFees}</p>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/appointments"
                  style={buttonStyle}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
