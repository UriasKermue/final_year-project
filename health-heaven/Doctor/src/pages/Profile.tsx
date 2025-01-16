import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Building, Award, Save } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Dr. John Smith',
    email: 'john.smith@healthify.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    experience: '15 years',
    location: 'New York, NY',
    hospital: 'Metropolitan General Hospital',
    education: 'MD - Harvard Medical School',
    certifications: ['Board Certified in Cardiology', 'Advanced Cardiac Life Support'],
    languages: ['English', 'Spanish'],
    bio: 'Experienced cardiologist specializing in preventive cardiology and heart disease management. Dedicated to providing comprehensive cardiac care using the latest medical technologies and evidence-based practices.'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="pb-4">
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-blue-100">{profile.specialization}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.hospital}
                      onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.hospital}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Experience</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.experience}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Education</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.education}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Languages</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.languages.join(', ')}
                      onChange={(e) => setProfile({ ...profile, languages: e.target.value.split(', ') })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.languages.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-600">{profile.bio}</p>
            )}
          </div>

          {/* Certifications */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
            <div className="space-y-2">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => {
                        const newCerts = [...profile.certifications];
                        newCerts[index] = e.target.value;
                        setProfile({ ...profile, certifications: newCerts });
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-600">{cert}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}