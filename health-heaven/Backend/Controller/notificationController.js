const Notification = require("../models/notificationModel");

// ✅ Fetch user notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// ✅ Mark a single notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking notification as read", error: error.message });
  }
};

// ✅ Create a new notification and send it in real-time
exports.createNotification = async (req, res) => {
  try {
    const { user, message, type } = req.body;

    if (!user || !message) {
      return res.status(400).json({ message: "User and message are required" });
    }

    // Save the notification in the database
    const newNotification = new Notification({
      user,
      message,
      type: type || "general",
    });

    await newNotification.save();

    // Emit real-time notification via Socket.io
    const io = req.app.get("io"); // Get socket.io instance
    if (io) {
      const userSocket = io.sockets.sockets.get(user);
      if (userSocket) {
        userSocket.emit("newNotification", newNotification);
      }
    }

    res.status(201).json({ message: "Notification created successfully", notification: newNotification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification", error: error.message });
  }
};
