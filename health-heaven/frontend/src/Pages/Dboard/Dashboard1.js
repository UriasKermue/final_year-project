import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import DashboardContent from '../Dboard/pages/Dashboard'; // Renamed import
import AppointmentsPage from './pages/Appointments';
import HealthMetricsPage from './pages/HealthMetrics';
import AnalyticsPage from './pages/Analytics';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [userProfile, setUserProfile] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState([]);

  const navigate = useNavigate(); // Initialize navigate for redirecting

  // Fetch user data, appointments, and health metrics from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        if (!token) {
          console.log("No token found");
          navigate("/login"); // Redirect to login if no token
          return;
        }

        // Log token to confirm it's being retrieved correctly
        console.log("Token:", token);

        // Fetch user profile data with the token
        const userResponse = await axios.get('http://localhost:5000/api/newauth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUserProfile(userResponse.data.user);
         // Set user profile from response
          console.log("User Data:", userResponse.data.user);
        // Fetch appointments
        // const appointmentsResponse = await axios.get('http://localhost:5000/api/appointments', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   }
        // });
        // setAppointments(appointmentsResponse.data); // Set appointments from response

        // Fetch health metrics
        // const healthMetricsResponse = await axios.get('http://localhost:5000/api/health-metrics', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   }
        // });
        // setHealthMetrics(healthMetricsResponse.data); // Set health metrics from response

      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, handle errors here (e.g., showing an alert or redirecting to login)
        navigate("/login"); // Redirect to login if there’s any error
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [navigate]);

  // Render the page based on the active tab
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent appointments={appointments} healthMetrics={healthMetrics} />;
      case 'appointments':
        return <AppointmentsPage appointments={appointments} />;
      case 'health':
        return <HealthMetricsPage healthMetrics={healthMetrics} />;
      case 'analytics':
        return <AnalyticsPage healthMetrics={healthMetrics} />;
      case 'profile':
        // Check if userProfile has been fetched, if so pass it to ProfilePage
        return userProfile ? <ProfilePage userProfile={userProfile} /> : <div>Loading...</div>;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardContent appointments={appointments} healthMetrics={healthMetrics} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        healthMetrics={healthMetrics}
      />

      <div className="flex-1">
        <Header activeTab={activeTab} userProfile={userProfile} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
