import React from 'react';
import { Calendar, UserRound } from 'lucide-react';
import DashboardStats from '../components/DashboardStats';
import AppointmentList from '../components/AppointmentList';

const DashboardPage = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Dr. John Smith</p>
      </div>
      <DashboardStats />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AppointmentList />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule New Appointment
            </button>
            <button className="w-full py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
              <UserRound className="h-5 w-5" />
              Add New Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;