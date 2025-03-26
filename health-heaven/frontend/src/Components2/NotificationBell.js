import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationContext from "../Components2/NotificationContext";

const NotificationBell = () => {
  const { unreadCount, notifications } = useContext(NotificationContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".notification-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative notification-dropdown">
      <button
        className="relative z-50"
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="fixed top-12 right-4 w-64 bg-white border shadow-lg rounded-lg z-[9999]">
          <div className="p-2 text-gray-700 font-bold border-b">Notifications</div>
          <div className="p-2 max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n, index) => (
                <div key={index} className="p-2 border-b text-gray-700">
                  {n.content}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No new notifications</p>
            )}
          </div>
          <div className="p-2 border-t text-right">
            <Link to="/notifications" className="text-blue-500 hover:underline">
              View All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
