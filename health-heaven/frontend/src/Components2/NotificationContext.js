// import { createContext, useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // ✅ Connect to WebSocket Server
//   useEffect(() => {
//     const socket = io("http://localhost:5000", { withCredentials: true });

//     socket.on("newNotification", (notification) => {
//       setNotifications((prev) => [notification, ...prev]);
//       setUnreadCount((prev) => prev + 1);
//     });

//     return () => socket.disconnect();
//   }, []);

//   // ✅ Fetch Notifications from DB
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get("/api/notifications");
//         setNotifications(res.data);
//         setUnreadCount(res.data.filter((n) => !n.read).length);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   // ✅ Mark Notifications as Read
//   const markAsRead = async () => {
//     try {
//       await axios.put("/api/notifications/mark-as-read");
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error marking notifications as read:", error);
//     }
//   };

//   return (
//     <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export default NotificationContext;

import { createContext, useState, useEffect } from "react";
import axios from "axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // ✅ Fetch Notifications from DB
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");
        setNotifications(res.data);
        setUnreadCount(res.data.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // ✅ Mark Notifications as Read
  const markAsRead = async () => {
    try {
      await axios.put("/api/notifications/mark-as-read");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
