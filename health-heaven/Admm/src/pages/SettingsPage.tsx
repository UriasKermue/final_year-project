import React from 'react';
import { User, Lock, Bell, Globe } from 'lucide-react';

const SettingsPage = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      settings: [
        { label: 'Name', value: 'Dr. John Smith' },
        { label: 'Email', value: 'john.smith@healthcare.com' },
        { label: 'Phone', value: '+1 (555) 123-4567' },
        { label: 'Specialty', value: 'General Practice' }
      ]
    },
    {
      title: 'Security',
      icon: Lock,
      settings: [
        { label: 'Password', value: '••••••••' },
        { label: 'Two-factor Authentication', value: 'Enabled' },
        { label: 'Login History', value: 'View History' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { label: 'Email Notifications', value: 'Enabled' },
        { label: 'SMS Notifications', value: 'Disabled' },
        { label: 'App Notifications', value: 'Enabled' }
      ]
    },
    {
      title: 'System',
      icon: Globe,
      settings: [
        { label: 'Language', value: 'English' },
        { label: 'Time Zone', value: 'UTC-5 (Eastern Time)' },
        { label: 'Date Format', value: 'MM/DD/YYYY' }
      ]
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <section.icon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{setting.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">{setting.value}</span>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;