// const express = require("express");
// const router = express.Router();
// const { getUserNotifications, markNotificationAsRead } = require("../Controller/notificationController");
// const chatMiddleware = require("../middlewares/chatMiddleware");

// // ✅ Fetch user notifications
// router.get("/", chatMiddleware, getUserNotifications);

// // ✅ Mark notification as read
// router.put("/:id/read", chatMiddleware, markNotificationAsRead);

// module.exports = router;

const express = require("express");
const router = express.Router();

module.exports = (io) => {
  const {
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    createNotification, // ✅ Added route to create notifications
  } = require("../Controller/notificationController") // Pass io to the controller

  const chatMiddleware = require("../middlewares/chatMiddleware");

  // ✅ Fetch user notifications
  router.get("/", chatMiddleware, getUserNotifications);

  // ✅ Mark a single notification as read
  router.put("/:id/read", chatMiddleware, markNotificationAsRead);

  // ✅ Mark all notifications as read
  router.put("/mark-as-read", chatMiddleware, markAllNotificationsAsRead);

  // ✅ Create a new notification (for testing or manual creation)
  router.post("/create", chatMiddleware, createNotification);

  return router;
};


