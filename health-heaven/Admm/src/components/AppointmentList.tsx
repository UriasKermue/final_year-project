import React from 'react';
import { Clock } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientImage: string;
  doctorName: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Connor',
    patientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
    doctorName: 'Dr. Marcus Wright',
    time: '09:00 AM',
    status: 'upcoming',
    type: 'General Checkup'
  },
  {
    id: '2',
    patientName: 'John Connor',
    patientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
    doctorName: 'Dr. Sarah Johnson',
    time: '10:30 AM',
    status: 'upcoming',
    type: 'Dental Cleaning'
  },
  {
    id: '3',
    patientName: 'Kyle Reese',
    patientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
    doctorName: 'Dr. Miles Dyson',
    time: '11:45 AM',
    status: 'upcoming',
    type: 'Consultation'
  }
];

const AppointmentList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={appointment.patientImage}
                alt={appointment.patientName}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{appointment.patientName}</p>
                <p className="text-sm text-gray-500">{appointment.type}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{appointment.time}</span>
              </div>
              <p className="text-sm text-gray-500">{appointment.doctorName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;