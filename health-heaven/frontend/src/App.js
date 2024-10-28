import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components2/Header1'; 
import Footer from './Components2/Footer'; 
import Dashboard from './Pages/Dashboard'; // Import the Dashboard component
import HomePage from './Pages/HomePage'; 
import AppointmentScheduler from './Components2/AppointmentScheduler';
import MedicationReminder from './Components2/MedicationReminder';
import MedicalRecord from './Components2/MedicalRecord';
import MetricsPage from './Pages/MetricsPage';
import EducationResources from './Components2/EducationResources'; // Import the EducationResources component
import AboutPage from './Pages/AboutPage'; // Import the About page component
import SupportPage from './Pages/SupportPage'; // Import the Support page component
import LoginPage from './Pages/LoginPage'; // Import the Login page component
import SignupPage from './Pages/SignupPage'; // Import the Signup page component

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/reminders" element={<MedicationReminder />} />
          <Route path="/records" element={<MedicalRecord />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/education" element={<EducationResources />} />
          <Route path="/about" element={<AboutPage />} /> {/* Add About route */}
          <Route path="/support" element={<SupportPage />} /> {/* Add Support route */}
          <Route path="/login" element={<LoginPage />} /> {/* Add Login route */}
          <Route path="/signup" element={<SignupPage />} /> {/* Add Signup route */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
