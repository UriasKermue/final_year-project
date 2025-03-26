// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Newuser = require('./routes/Newuser'); 
// // Ensure the path is correct

// // Ensure the path is correct
// const appointmentRoutes = require('./routes/appointmentRoutes'); // Import Appointment routes
// const reminderRoutes = require('./routes/reminderRoutes');
// const cronJob = require('../Backend/Controller/Service/cron'); // Import the cron job
// const medicalRecordRoutes = require('../Backend/routes/medicalRecordRoutes'); 
// const predictionRoutes = require("./routes/predictionRoutes");
// const passwordRoutes = require('./routes/passwordRoutes'); // Import the password routes
// const connectDB = require('../Backend/DB'); // DB connection
// const connectCloudinary = require('./config/cloudinary');
// const dRoutes = require('./routes/DRoutes');
// const adminRoutes =   require("./routes/adminRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// // const superAdminRoutes = require("./routes/superAdmin");

// const app = express();



// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // Use the admin routes
// app.use('/api/newusers', Newuser);

// app.use('/api/appointments', appointmentRoutes); 
// app.use("/api/admin", adminRoutes)
// // app.use("/api", superAdminRoutes);
// app.use('/api/doctor', dRoutes );
// app.use('/api', reminderRoutes); 
// app.use('/api/medical-records', medicalRecordRoutes);
// app.use("/api", predictionRoutes);
// app.use('/api/password', passwordRoutes); 
// app.use('/api/blog', blogRoutes);
// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
// console.log(`PORT: ${process.env.PORT}`);

// // Connect to MongoDB
// connectDB();

// connectCloudinary();
// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// New Implimentations:
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./DB"); // Connect MongoDB
const connectCloudinary = require("./config/cloudinary");
const socketHandler = require("./utils/socketHandler"); // Import WebSocket events

// Import Routes
const Newuser = require("./routes/Newuser");
const appointmentRoutes = require("./routes/appointmentRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const dRoutes = require("./routes/DRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const chatRoutes = require("./routes/chatRoutes");
const callRoutes = require("./routes/callRoutes");
const fileRoutes = require("./routes/fileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notifcationRoute");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Attach `io` to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Register Routes
app.use("/api/newusers", Newuser);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", dRoutes);
app.use("/api", reminderRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api", predictionRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/calls", callRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// Connect MongoDB & Cloudinary
connectDB();
connectCloudinary();

// WebSocket Events
socketHandler(io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const fs = require("fs");
// const path = require("path");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const connectDB = require("../Backend/DB"); // DB connection
// const connectCloudinary = require("./config/cloudinary");

// // Import Routes
// const Newuser = require("./routes/Newuser");
// const appointmentRoutes = require("./routes/appointmentRoutes");
// const reminderRoutes = require("./routes/reminderRoutes");
// const medicalRecordRoutes = require("../Backend/routes/medicalRecordRoutes");
// const predictionRoutes = require("./routes/predictionRoutes");
// const passwordRoutes = require("./routes/passwordRoutes");
// const dRoutes = require("./routes/DRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const chatRoutes = require("./routes/chatRoutes"); // Chat API Routes
// const callRoutes = require("./routes/callRoutes");
// const fileRoutes = require("./routes/fileRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const notificationRoutes = require("./routes/notifcationRoute");

// const app = express();
// const server = http.createServer(app); // Enable WebSocket Server
// const io = socketIo(server, { 
//   cors: { 
//     origin: "http://localhost:3000",  // Allow frontend origin
//     methods: ["GET", "POST"], 
//     credentials: true // Allow credentials (cookies, sessions, etc.)
//   } 
// });
//  // Allow Cross-Origin WebSocket connections

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Attach `io` to every request (IMPORTANT!)
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Register API Routes
// app.use("/api/newusers", Newuser);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/doctor", dRoutes);
// app.use("/api", reminderRoutes);
// app.use("/api/medical-records", medicalRecordRoutes);
// app.use("/api", predictionRoutes);
// app.use("/api/password", passwordRoutes);
// app.use("/api/blog", blogRoutes);
// app.use("/api/chats", chatRoutes); // New Chat API
// app.use("/api/calls", callRoutes);
// app.use("/api/files", fileRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/notifications", notificationRoutes);


// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
// console.log(`PORT: ${process.env.PORT}`);

// // Connect to MongoDB & Cloudinary
// connectDB();
// connectCloudinary();

// // WebSocket Logic
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // ✅ Listen for and broadcast messages
//   socket.on("sendMessage", (message) => {
//     io.to(message.chatId).emit("newMessage", message);

//     // ✅ Send a real-time notification to the message receiver
//     io.to(message.receiver).emit("newNotification", {
//       type: "message",
//       content: `New message from ${message.senderName}`,
//       messageId: message._id,
//     });
//   });

//   // ✅ Listen for and broadcast calls
//   socket.on("initiateCall", (call) => {
//     io.to(call.receiver).emit("incomingCall", call);

//     // ✅ Send a real-time notification to the receiver
//     io.to(call.receiver).emit("newNotification", {
//       type: "call",
//       content: `Incoming ${call.callType} call from ${call.callerName}`,
//       callId: call.callId,
//     });
//   });

//   // ✅ Allow users to join their personal notification room
//   socket.on("Notifications", (userId) => {
//     // 
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
