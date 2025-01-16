import React, { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Doctor } from '../types';
import DoctorForm from '../components/DoctorForm';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      specialty: 'Cardiology',
      dateJoined: '2023-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    },
    // Add more sample doctors as needed
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleAddDoctor = (data: Omit<Doctor, 'id'>) => {
    const newDoctor: Doctor = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      dateJoined: new Date().toISOString().split('T')[0],
    };
    setDoctors([...doctors, newDoctor]);
    setShowForm(false);
  };

  const handleEditDoctor = (data: Omit<Doctor, 'id'>) => {
    if (editingDoctor) {
      setDoctors(doctors.map(d => 
        d.id === editingDoctor.id ? { ...data, id: d.id, dateJoined: d.dateJoined } : d
      ));
      setEditingDoctor(null);
    }
  };

  const handleDeleteDoctor = (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Doctor
        </button>
      </div>

      {(showForm || editingDoctor) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h2>
            <DoctorForm
              doctor={editingDoctor || undefined}
              onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
              onCancel={() => {
                setShowForm(false);
                setEditingDoctor(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={doctor.imageUrl}
                      alt={doctor.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.specialty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(doctor.dateJoined), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingDoctor(doctor)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsPage;