import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, Phone, 
 MapPin, Calendar as CalendarIcon, Edit,
  Trash2,
  Bell,
  CheckCircle2,
  Clock4,
  XCircle,
  Sun,
  Moon,
  LogOut,
  Hand,
  Home,
  Droplet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null || []);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("Fetching appointments..."); // ✅ Check if function is running
  
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // ✅ Check if token exists
  
        if (!token) throw new Error("User not authenticated. Please log in.");
  
        const response = await fetch(
          "http://localhost:5000/api/appointments/my-appointments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("Response Status:", response.status); // ✅ Check API response status
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch appointments: ${errorText}`);
        }
  
        const data = await response.json();
        setAppointments(data);
        console.log("Fetched Data:", data); // ✅ Check fetched data
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert(error.message);
      }
    };
  
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated. Please log in.");

        const response = await fetch("http://localhost:5000/api/newusers/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch profile: ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched Profile Data:", data); // ✅ Debugging log
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } 
    
    
    };

    fetchProfile();
  }, []);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return isDarkMode 
          ? 'bg-green-900 text-green-200 ring-green-800' 
          : 'bg-green-100 text-green-800 ring-green-600/20';
      case 'pending':
        return isDarkMode 
          ? 'bg-yellow-900 text-yellow-200 ring-yellow-800' 
          : 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      case 'Rejected':
        return isDarkMode 
          ? 'bg-red-900 text-red-200 ring-red-800' 
          : 'bg-red-100 text-red-800 ring-red-600/20';
      default:
        return isDarkMode 
          ? 'bg-gray-800 text-gray-200 ring-gray-700' 
          : 'bg-gray-100 text-gray-800 ring-gray-600/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />;
      case 'pending':
        return <Clock4 className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />;
      case 'Rejected':
        return <XCircle className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />;
      default:
        return null;
    }
  };

  const appointmentStats = appointments.length > 0 ? {
    Approved: appointments.filter(a => a.status?.toLowerCase() === 'approved').length,
    pending: appointments.filter(a => a.status?.toLowerCase() === 'pending').length,
    cancelled: appointments.filter(a => a.status?.toLowerCase() === 'rejected').length
  } : { Approved: 0, pending: 0, cancelled: 0 };
  console.log(appointmentStats);
  
  
  
  const handleLogout = () => {
    // Clear authentication data (localStorage, session, etc.)
    localStorage.removeItem("token"); // Adjust based on your authentication method
    localStorage.removeItem("user");
  
    console.log("Logging out...");
  
    // Redirect to login page
    navigate("/login");
  };
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col gap-4">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
              {profile?.profileImage ? (
  <img
    src={profile.profileImage} // Directly include localhost
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
  />
) : (
  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
)}
                <div>
                  <div className="flex items-center gap-2">
                    <Hand className="w-5 h-5 text-yellow-500 animate-wave" />
                    <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Welcome back, {profile.fullName}!
                    </h2>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
                <button 
      onClick={() => navigate("/homepage")} // Navigates to homepage
      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors relative`}
    >
      <Home className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
    </button>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  } transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`${
                  activeTab === 'appointments'
                    ? 'border-blue-500 text-blue-600'
                    : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content */}
        {activeTab === 'appointments' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-md border p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Scheduled Appointments</p>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-2`}>{appointmentStats.Approved}</p>
                  </div>
                  <div className={`${isDarkMode ? 'bg-green-900' : 'bg-green-50'} p-3 rounded-full`}>
                    <CheckCircle2 className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-md border p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Appointments</p>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mt-2`}>{appointmentStats.pending}</p>
                  </div>
                  <div className={`${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50'} p-3 rounded-full`}>
                    <Clock4 className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  </div>
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-md border p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cancelled Appointments</p>
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'} mt-2`}>{appointmentStats.cancelled}</p>
                  </div>
                  <div className={`${isDarkMode ? 'bg-red-900' : 'bg-red-50'} p-3 rounded-full`}>
                    <XCircle className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments Table */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-lg border`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>My Appointments</h2>
                 
                </div>
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
  <thead>
    <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
      <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider rounded-tl-lg`}>Doctor</th>
      <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Time</th>
      <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Date</th>
      <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
      <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider rounded-tr-lg`}></th>
    </tr>
  </thead>
  <tbody className={`${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
    {appointments.map((appointment) => (
      <tr key={appointment._id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
        <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-3">
          {appointment.doctor.profilePictureUrl && (
            <img
              src={appointment.doctor.profilePictureUrl}
              alt={appointment.doctor.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
            {appointment.doctor.fullName}
          </span>
        </td>
        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{appointment.date}</td>
        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{appointment.time}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            {getStatusIcon(appointment.status)}
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="flex space-x-3">
            {/* <button className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900' : 'text-blue-600 hover:text-blue-900 hover:bg-blue-50'} transition-colors p-1 rounded`}>
              <Edit className="w-4 h-4" />
            </button> */}
            {/* <button className={`${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900' : 'text-red-600 hover:text-red-900 hover:bg-red-50'} transition-colors p-1 rounded`}>
              <Trash2 className="w-4 h-4" />
            </button> */}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-lg border`}>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Section */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Full Name
                  </label>
                  <div className="flex items-center space-x-3 border rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <User className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      value={profile.fullName}
                      placeholder="Enter full name"
                      className={`w-full bg-transparent outline-none text-sm ${
                        isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
        
                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email
                  </label>
                  <div className="flex items-center space-x-3 border rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="email"
                      value={profile.email}
                      placeholder="Enter email address"
                      className={`w-full bg-transparent outline-none text-sm ${
                        isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
        
              {/* Right Section */}
              <div className="space-y-6">
                {/* Phone Number */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Phone Number
                  </label>
                  <div className="flex items-center space-x-3 border rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="tel"
                      value={profile.phone}
                      placeholder="Enter phone number"
                      className={`w-full bg-transparent outline-none text-sm ${
                        isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
        
                {/* Address */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Address
                  </label>
                  <div className="flex items-center space-x-3 border rounded-lg px-3 py-2 bg-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      value={profile.address}
                      placeholder="Enter address"
                      className={`w-full bg-transparent outline-none text-sm ${
                        isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
        
                {/* Blood Type */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Blood Type
                  </label>
                  <div className="flex items-center space-x-3 border rounded-lg px-3 py-2 bg-transparent">
                    <Droplet className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {profile.bloodType || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
        
            {/* Save Button */}
            {/* <div className="mt-8 flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:shadow-sm flex items-center gap-2">
                Save Changes
              </button>
            </div> */}
          </div>
        </div>
        
        )}
      </main>
    </div>
  );
}

export default Dashboard;