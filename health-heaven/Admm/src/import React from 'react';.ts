import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import DashboardPage from './pages/DashboardPage';
import DoctorsPage from './pages/DoctorsPage';
import PatientsPage from './pages/PatientsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';

function App() {
  const location = useLocation(); // Get the current path

  // Check if the current path is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar and TopNav are rendered only when not on the login page */}
      {!isLoginPage && <Sidebar />}
      <div className={`flex-1 ${!isLoginPage ? 'ml-64' : ''}`}>
        {!isLoginPage && <TopNav />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

// Wrap the App component with Router
export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
