import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments'); // Replace with your API endpoint
        const data = await response.json();
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  // Handle appointment status update (approve or cancel)
  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        // Update the appointment list in the frontend
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id ? { ...appointment, status } : appointment
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">All Appointments</h1>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 border-b">
                Appointment ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 border-b">
                Patient Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 border-b">
                Doctor Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 border-b">
                Date
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 border-b">
                Status
              </th>
              <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-sm text-gray-700">{appointment.id}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{appointment.patientName}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{appointment.doctorName}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{appointment.date}</td>
                  <td
                    className={`py-3 px-6 text-sm font-semibold ${
                      appointment.status === 'Approved'
                        ? 'text-green-500'
                        : appointment.status === 'Canceled'
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {appointment.status}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {appointment.status === 'Pending' && (
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center"
                          onClick={() => updateAppointmentStatus(appointment.id, 'Approved')}
                        >
                          <FaCheckCircle className="mr-2" /> Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center"
                          onClick={() => updateAppointmentStatus(appointment.id, 'Canceled')}
                        >
                          <FaTimesCircle className="mr-2" /> Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 px-6 text-center text-sm text-gray-500 font-medium"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
