import React, { useContext } from "react";
import NotificationContext from "../Components2/NotificationContext";

const NotificationPage = () => {
  const { notifications, markAsRead, deleteNotification, clearNotifications } =
    useContext(NotificationContext);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {notifications.map((n, index) => (
            <div
              key={index}
              className={`p-3 border-b flex justify-between items-center ${
                n.read ? "bg-gray-100" : "bg-yellow-50"
              }`}
            >
              <span
                className={`text-gray-700 ${
                  n.read ? "opacity-50" : "font-bold"
                }`}
              >
                {n.content}
              </span>
              <div className="space-x-2">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearNotifications}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
