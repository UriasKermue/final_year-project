import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatItem = ({ chat, isSelected, onClick }) => {
  const { participants, lastMessage, unread, isGroupChat, chatName } = chat;
  const userId = localStorage.getItem("userId");
  const [isOnline, setIsOnline] = useState(false);
  const [typing, setTyping] = useState(false);
  const [lastActive, setLastActive] = useState(null);

  useEffect(() => {
    socket.on("userStatus", ({ userId: updatedUserId, status }) => {
      if (participants && participants.some((p) => p._id === updatedUserId) && updatedUserId !== userId) {
        setIsOnline(status.isOnline);
        setLastActive(status.lastActive);
      }
    });

    socket.on("typing", ({ chatId, userId: typingUserId, isTyping }) => {
      if (chat._id === chatId && typingUserId !== userId) {
        setTyping(isTyping);
      }
    });

    return () => {
      socket.off("userStatus");
      socket.off("typing");
    };
  }, [chat._id, participants, userId]);

  // 🟢 Determine the correct name for the chat
  const name = chatName || "Unknown Chat";

  // 🟢 Determine the correct avatar for the chat
  let avatar = "/default-avatar.png"; // Default fallback

  if (isGroupChat) {
    avatar = "/group-avatar.png";
  } else if (participants && participants.length > 1) {
    // Find the other participant
    const otherParticipant = participants.find((p) => p._id !== userId);

    if (otherParticipant) {
      // Assign the correct profile picture field
      avatar = otherParticipant.role === "doctor" 
        ? otherParticipant.profilePictureUrl || "/default-avatar.png"
        : otherParticipant.profileImage || "/default-avatar.png";
    }
  }

  // 🟢 Get the message content from lastMessage object
  const messageContent = lastMessage?.content || "No messages yet";

  // 🟢 Format the timestamp from lastMessage.createdAt
  const messageTime = lastMessage?.createdAt 
    ? formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })
    : "";

  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors ${
        isSelected ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {name}
            </h3>
            <span className="text-xs text-gray-500">
              {messageTime}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 truncate">
              {typing ? <span className="text-blue-500">Typing...</span> : messageContent}
            </p>
            {unread > 0 && (
              <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
