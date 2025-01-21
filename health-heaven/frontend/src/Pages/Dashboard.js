import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Switch,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const iconStyle = { color: "#fff", marginRight: 8 };

const PatientDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileEditable, setProfileEditable] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    bloodGroup: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        if (!token) {
          console.log("No token found");
          navigate("/login"); // Redirect to login if no token
          return;
        }

        // Log token to confirm it's being retrieved correctly
        console.log("Token:", token);

        const response = await axios.get(
          "http://localhost:5000/api/newauth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
            },
          }
        );

        // Log the response to confirm the data
        console.log("User Data:", response.data);

        setUserData(response.data); // Ensure the backend returns the required fields: name, email, age, bloodGroup, profilePic
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]); // Run only when the component is mounted

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Handle Profile Edit
  const handleProfileEdit = () => setProfileEditable(!profileEditable);

  // Handle Logout
  const handleLogout = () => {
    console.log("Logged out!");
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login"); // Redirect to login page
  };

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps Taken",
        data: [3000, 4500, 5000, 3000, 4000, 6000, 5000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Calories Burnt",
        data: [200, 250, 300, 200, 180, 220, 250],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: "#1976d2",
          color: "#fff",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <Avatar
            sx={{ width: 60, height: 60, marginRight: 2 }}
            alt={userData.name}
            src={userData.profilePic || ""}
          />
          <Box>
            <Typography variant="h6">
              {userData.name || "Loading..."}
            </Typography>
            <Typography variant="body2">
              {userData.email || "Loading..."}
            </Typography>
            <IconButton onClick={handleProfileEdit} sx={{ color: "white" }}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Switch checked={isDarkMode} onChange={toggleDarkMode} />
          <Typography variant="body2" color="white" sx={{ marginLeft: 1 }}>
            Dark Mode
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HomeIcon style={iconStyle} /> Home
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link
              to="/appointments"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CalendarTodayIcon style={iconStyle} /> Appointments
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link
              to="/records"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FolderIcon style={iconStyle} /> Records
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            {/* <button onClick={handleLogout} > 
              logout
            </button> */}
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={handleLogout}
            >
              <LogoutIcon style={iconStyle} /> Logout123
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Welcome, {userData.name || "Loading..."}!
        </Typography>

        {/* Profile Info */}
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: "white" }}>
              <CardHeader
                title="Personal Information"
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              />
              <CardContent>
                <Typography variant="body1">Name: {userData.name}</Typography>
                <Typography variant="body1">Email: {userData.email}</Typography>
                <Typography variant="body1">Age: {userData.age}</Typography>
                <Typography variant="body1">
                  Blood Group: {userData.bloodGroup}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, boxShadow: 3, backgroundColor: "white" }}>
              <CardHeader
                title="Health Goals Tracker"
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              />
              <CardContent>
                <Typography variant="body1">
                  Steps Goal: 10000 | Current: 5000
                </Typography>
                <LinearProgress value={50} sx={{ marginTop: 2 }} />
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Calories Goal: 2500 | Current: 2000
                </Typography>
                <LinearProgress value={80} sx={{ marginTop: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientDashboard;

