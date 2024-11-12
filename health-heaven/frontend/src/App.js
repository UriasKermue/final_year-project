import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components2/Header1';
import Footer from './Components2/Footer';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/HomePage';
import AppointmentScheduler from './Components2/AppointmentScheduler';
import MedicationReminder from './Components2/MedicationReminder';
import MedicalRecord from './Components2/MedicalRecord';
import DoctorSearch from './Pages/DoctorList'; // Correct path to DoctorSearch component
import EducationResources from './Components2/EducationResources';
import AboutPage from './Pages/AboutPage';
import SupportPage from './Pages/SupportPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DoctorList from './Pages/DoctorList';

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
          <Route path="/doctor" element={<DoctorList />} /> {/* Ensure consistency with path */}
          <Route path="/education" element={<EducationResources />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
