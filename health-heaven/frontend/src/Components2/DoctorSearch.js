import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const DoctorSearch = () => {
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/doctors?specialty=${specialty}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    navigate('/appointment-scheduler'); // Navigate to the AppointmentScheduler page
  };

  return (
    <div>
      <h2>Search for Doctors</h2>
      <input
        type="text"
        placeholder="Enter specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {doctors.length > 0 && (
        <div>
          <h3>Doctors Found</h3>
          {doctors.map((doctor) => (
            <div key={doctor._id} style={{ display: 'flex', marginBottom: '20px' }}>
              <img
                src={doctor.photoUrl} // Display doctor's photo
                alt={doctor.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginRight: '20px',
                }}
              />
              <div>
                <h4>{doctor.name}</h4>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
                <p><strong>Consultation Fees:</strong> ₹{doctor.consultationFees}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Available Times:</strong></p>
                <ul>
                  {doctor.availableTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                  ))}
                </ul>
                {/* Add the onClick to navigate when the button is clicked */}
                <button onClick={handleBookAppointment}>Book Appointment</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;
