import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components2/Header1';
import Footer from './Components2/Footer';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/HomePage';
import AppointmentScheduler from './Components2/AppointmentScheduler';
import MedicationReminder from './Components2/MedicationReminder';
import MedicalRecord from './Components2/MedicalRecord';
import Forgetpassword from './Pages/Forgetpassword';
import EducationResources from './Components2/EducationResources';
import AboutPage from './Pages/AboutPage';
import SupportPage from './Pages/SupportPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DoctorList from './Pages/DoctorList';
import Start from './Pages/Start';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  // Check if the current route is the Start, Login, or Signup page
  const isNoHeaderFooterPage = ['/','/login', '/signup', '/forgetpassword'].includes(location.pathname);

  return (
    <>
      {/* Conditionally render Header and Footer */}
      {!isNoHeaderFooterPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/reminders" element={<MedicationReminder />} />
          <Route path="/records" element={<MedicalRecord />} />
          <Route path="/doctor" element={<DoctorList />} />
          <Route path="/education" element={<EducationResources />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      {/* Conditionally render Footer */}
      {!isNoHeaderFooterPage && <Footer />}
    </>
  );
};

export default App;
