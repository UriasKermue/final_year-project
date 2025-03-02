import React, { useEffect, useState } from 'react';
import { FaUserMd, FaCalendarAlt, FaUsers, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    appointments: 0,
    patients: 0,
    earnings: 0,
  });

  useEffect(() => {
    // Fetch data for stats
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard-stats'); // Replace with your API endpoint
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Doctors Count */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="p-4 bg-blue-100 rounded-full text-blue-500">
            <FaUserMd size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{stats.doctors}</h2>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Appointments Count */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="p-4 bg-green-100 rounded-full text-green-500">
            <FaCalendarAlt size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{stats.appointments}</h2>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Patients Count */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="p-4 bg-purple-100 rounded-full text-purple-500">
            <FaUsers size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{stats.patients}</h2>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="p-4 bg-yellow-100 rounded-full text-yellow-500">
            <FaDollarSign size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">₹{stats.earnings}</h2>
            <p className="text-gray-500">Earnings</p>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h3>
            <ul>
              {/* Replace the following list items with dynamic data */}
              <li className="py-2 border-b">
                <p className="text-gray-700">John Doe - Dr. Smith</p>
                <span className="text-sm text-gray-500">Date: 2024-01-25</span>
              </li>
              <li className="py-2 border-b">
                <p className="text-gray-700">Jane Doe - Dr. Lee</p>
                <span className="text-sm text-gray-500">Date: 2024-01-24</span>
              </li>
              <li className="py-2">
                <p className="text-gray-700">Mike Ross - Dr. Wilson</p>
                <span className="text-sm text-gray-500">Date: 2024-01-23</span>
              </li>
            </ul>
          </div>

          {/* Appointments Status */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Appointments Status</h3>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-700">Pending</p>
              <p className="text-gray-500">{stats.pendingAppointments || 0}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-700">Approved</p>
              <p className="text-gray-500">{stats.approvedAppointments || 0}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Cancelled</p>
              <p className="text-gray-500">{stats.cancelledAppointments || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
