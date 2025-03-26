import React, { useState, useEffect } from "react";
import { Search, UserPlus } from "lucide-react";
import ChatItem from "./ChatItem";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatList = ({ onSelectChat, selectedChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/chats/allChats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched chats:", res.data);
        setChats(res.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();

    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === message.chatId
            ? { 
                ...chat, 
                lastMessage: {
                  _id: message._id,
                  content: message.content,
                  createdAt: message.createdAt,
                  sender: message.sender
                }, 
                unread: selectedChat === chat._id ? 0 : (chat.unread || 0) + 1 
              }
            : chat
        )
      );
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChat]);

  const handleChatClick = (chatId) => {
    onSelectChat(chatId);
    setChats(
      chats.map((chat) => (chat._id === chatId ? { ...chat, unread: 0 } : chat))
    );
  };

  // Adjust the filtering logic to work with the actual data structure
  const filteredChats = chats.filter((chat) => {
    // If no search query, show all chats
    if (!searchQuery) return true;
    
    // Search in chat name
    if (chat.chatName && chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    
    // Search in last message content if it exists
    if (chat.lastMessage && chat.lastMessage.content && 
        chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    
    return false;
  });
  
  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              isSelected={selectedChat === chat._id}
              onClick={() => handleChatClick(chat._id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <Search className="h-12 w-12 mb-2 text-gray-400" />
            <p className="text-center">No conversations found</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <UserPlus className="h-5 w-5" />
          <span>New Conversation</span>
        </button>
      </div>
    </div>
  );
};

export default ChatList;