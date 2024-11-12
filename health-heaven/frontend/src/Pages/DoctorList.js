import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]); // Holds the doctor data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors
  const [searchTerm, setSearchTerm] = useState(''); // Search input for specialty

  // Fetch doctors data when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors'); // Update with your correct API endpoint
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
    padding: '40px', // Increased padding around the entire container
    backgroundColor: '#f9f9f9',
    maxWidth: '1200px', // Limit width of the container for better readability
    margin: '0 auto', // Center the container
  };

  const doctorCardsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-evenly', // Space out the doctor cards evenly
  };

  const doctorCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '280px', // Adjusted width for better layout
    textAlign: 'center', // Center text in each card
  };

  const doctorImageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '15px', // Add some space between image and text
  };

  const doctorInfoStyle = {
    marginTop: '10px',
    textAlign: 'left', // Align text to the left for better readability
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 20px', // Slightly bigger button for better interaction
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px', // Add spacing above the button
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
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
                src={doctor.photoUrl} // Ensure you have a photoUrl field in the doctor schema
                alt={doctor.name}
                style={doctorImageStyle}
              />
              <div style={doctorInfoStyle}>
                <h3>{doctor.name}</h3>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Consultation Fees:</strong> ₹{doctor.consultationFees}</p>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                  onClick={() => alert(`Booking appointment with ${doctor.name}`)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
