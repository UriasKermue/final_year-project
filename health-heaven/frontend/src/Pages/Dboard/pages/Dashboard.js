import React, { useEffect, useState } from 'react';
import { Calendar, Heart, Moon, Scale, Bell, Activity, AlertCircle, ChevronRight, Clock } from 'lucide-react';

export default function Dashboard() {
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls since we don't have a backend
    setTimeout(() => {
      setHealthMetrics([
        { heartRate: 72, sleepHours: 7.5, weight: 70.5, date: '2024-03-12' },
        { heartRate: 75, sleepHours: 8, weight: 70.2, date: '2024-03-11' },
        { heartRate: 71, sleepHours: 7, weight: 70.8, date: '2024-03-10' }
      ]);
      setReminders([
        {
          id: 1,
          title: 'Annual Check-up',
          description: 'General health examination with Dr. Smith',
          dateTime: '2024-03-15T10:00:00',
          type: 'check-up',
          priority: 'high'
        },
        {
          id: 2,
          title: 'Take Blood Pressure Medicine',
          description: 'Daily medication reminder',
          dateTime: '2024-03-12T09:00:00',
          type: 'medication',
          priority: 'medium'
        },
        {
          id: 3,
          title: 'Dental Cleaning',
          description: 'Regular dental cleaning appointment',
          dateTime: '2024-03-20T14:30:00',
          type: 'dental',
          priority: 'normal'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Activity className="w-12 h-12 text-blue-500 animate-pulse mx-auto" />
          <p className="text-gray-600 font-medium">Loading your health data...</p>
        </div>
      </div>
    );
  }

  const avgHeartRate = (
    healthMetrics.reduce((acc, metric) => acc + metric.heartRate, 0) /
    healthMetrics.length
  ).toFixed(1);
  const avgSleepHours = (
    healthMetrics.reduce((acc, metric) => acc + metric.sleepHours, 0) /
    healthMetrics.length
  ).toFixed(1);
  const latestWeight = healthMetrics[0]?.weight || '-';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your health metrics and upcoming appointments
          </p>
        </div>

        {/* Health Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 transition duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Appointments</p>
                <p className="mt-2 text-3xl font-bold text-blue-600">{reminders.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Next in {Math.ceil(Math.random() * 7)} days</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 transition duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                <p className="mt-2 text-3xl font-bold text-rose-600">{avgHeartRate}</p>
              </div>
              <div className="bg-rose-50 p-3 rounded-lg">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Activity className="w-4 h-4 mr-1" />
              <span>BPM average</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 transition duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sleep</p>
                <p className="mt-2 text-3xl font-bold text-indigo-600">{avgSleepHours}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <Moon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Hours average</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 transition duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weight</p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">{latestWeight}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Scale className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Activity className="w-4 h-4 mr-1" />
              <span>kg latest</span>
            </div>
          </div>
        </div>

        {/* Reminders Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Reminders</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                {reminders.length} Active
              </span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {reminders.length > 0 ? (
              reminders.map((reminder) => (
                <div key={reminder.id} className="p-6 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        reminder.priority === 'high' 
                          ? 'bg-rose-50' 
                          : reminder.priority === 'medium'
                          ? 'bg-amber-50'
                          : 'bg-blue-50'
                      }`}>
                        <Bell className={`w-5 h-5 ${
                          reminder.priority === 'high'
                            ? 'text-rose-600'
                            : reminder.priority === 'medium'
                            ? 'text-amber-600'
                            : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{reminder.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(reminder.dateTime).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(reminder.dateTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reminders available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}