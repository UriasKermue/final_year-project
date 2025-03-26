import { useEffect, useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import Schedule from "../components/shedule";

const getColorClass = (color) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };
  return colors[color] || colors.blue;
};

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [latestBooking, setLatestBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated. Please log in.");

        const response = await fetch(
          "http://localhost:5000/api/appointments/doctor-appointments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch appointments.");

        const data = await response.json();
        setAppointments(data);
        setTotalAppointments(data.length);

        const completedCount = data.filter((appointment) => appointment.status === "Approved").length;
        setCompletedAppointments(completedCount);

        if (data.length > 0) {
          const latest = data.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest
          );
          setLatestBooking(latest);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const stats = [
    {
      title: "Total Appointments",
      value: loading ? "Loading..." : totalAppointments,
      trend: "+12%",
      color: "purple",
      icon: "Calendar",
    },
    {
      title: "Appointments Completed",
      value: loading ? "Loading..." : completedAppointments,
      trend: "+8%",
      color: "purple",
      icon: "CheckCircle",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Doctor</h1>
        <p className="text-gray-600">Here's what's happening with your patients today.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${getColorClass(stat.color)}`}>
                {stat.icon === "Calendar" && <Calendar className="h-6 w-6" />}
                {stat.icon === "CheckCircle" && <CheckCircle className="h-6 w-6" />}
              </div>
              <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* LATEST BOOKING */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Booking</h3>
        {latestBooking ? (
          <div>
            {/* <p><strong>Patient:</strong> {latestBooking.fullName}</p> */}
            <p><strong>Date:</strong> {latestBooking.date}</p>
            <p><strong>Time:</strong> {latestBooking.time}</p>
          </div>
        ) : (
          <p className="text-gray-500">No recent bookings available.</p>
        )}
      </div>
      <Schedule/>
    </>
  );
}
