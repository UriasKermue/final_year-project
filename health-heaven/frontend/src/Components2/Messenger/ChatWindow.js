import React, { useState, useEffect, useRef } from "react";
import { Phone, Video } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import AudioCall from "./AudioCall";
// import VideoCall from "./VideoCall";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatWindow = ({ chatId }) => {
  const [isAudioCall, setIsAudioCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!chatId) return;

    const fetchChatDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/chats/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentChat(res.data);
      } catch (error) {
        console.error("Error fetching chat details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/messages/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
    fetchMessages();

    // Mark messages as read
    const markAsRead = async () => {
      try {
        const token = localStorage.getItem("token");
    
        console.log("Chat ID:", chatId); // ✅ Check if chatId is valid
    
        await axios.put(
          `http://localhost:5000/api/chats/${chatId}/read`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    };
    
    markAsRead();
    

    // Listen for new messages
    socket.on("newMessage", (message) => {
      if (message.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Listen for typing events
    socket.on("typing", ({ chatId: typingChatId, isTyping }) => {
      if (typingChatId === chatId) {
        // You can add a typing indicator state here if needed
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("typing");
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle typing notification
  const handleTyping = (isTyping) => {
    socket.emit("typing", {
      chatId,
      isTyping,
    });
  };

  const handleSendMessage = async (content, file) => {
    if (!content.trim() && !file) return;

    const userId = localStorage.getItem("userId");
    
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", content);
      
      if (file) {
        formData.append("file", file);
      }
      
      const response = await axios.post(
        `http://localhost:5000/api/messages`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
          params: { chatId }
        }
      );
      
      // No need to manually add the message to the state
      // as it will come back via the socket connection
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Show a temporary message if sending fails
      const tempMessage = {
        _id: Date.now().toString(),
        content,
        sender: { _id: userId },
        createdAt: new Date(),
        status: "error",
      };
      
      setMessages((prevMessages) => [...prevMessages, tempMessage]);
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  if (loading && !currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatParticipantName = () => {
    if (!currentChat) return "Loading...";
    
    if (currentChat.isGroupChat) {
      return currentChat.chatName || "Group Chat";
    }
    
    const userId = localStorage.getItem("userId");
    const otherParticipant = currentChat.participants?.find(p => p._id !== userId);
    
    if (!otherParticipant) return "Chat";
    
    // Format name based on available fields
    if (otherParticipant.role === "doctor") {
      return `Dr. ${otherParticipant.firstName || ''} ${otherParticipant.lastName || ''}`.trim();
    }
    
    return `${otherParticipant.firstName || ''} ${otherParticipant.lastName || ''}`.trim();
  };
  
  const getParticipantAvatar = () => {
    if (!currentChat) return "/default-avatar.png";
    
    if (currentChat.isGroupChat) {
      return "/group-avatar.png";
    }
    
    const userId = localStorage.getItem("userId");
    const otherParticipant = currentChat.participants?.find(p => p._id !== userId);
    
    if (!otherParticipant) return "/default-avatar.png";
    
    // Return profile picture depending on role
    return otherParticipant.role === "doctor" 
      ? otherParticipant.profilePictureUrl || "/default-avatar.png"
      : otherParticipant.profileImage || "/default-avatar.png";
  };
  
  const isParticipantOnline = () => {
    if (!currentChat) return false;
    
    if (currentChat.isGroupChat) return false;
    
    const userId = localStorage.getItem("userId");
    const otherParticipant = currentChat.participants?.find(p => p._id !== userId);
    
    return otherParticipant?.isOnline || false;
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={getParticipantAvatar()}
              alt={formatParticipantName()}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                isParticipantOnline() ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div className="ml-3">
            <h2 className="font-medium text-gray-900">{formatParticipantName()}</h2>
            <p className="text-sm text-gray-500">
              {isParticipantOnline() ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsAudioCall(true);
              setIsVideoCall(false);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Phone className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={() => {
              setIsVideoCall(true);
              setIsAudioCall(false);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Video className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble 
              key={message._id} 
              message={{
                id: message._id,
                text: message.content,
                sender: message.sender._id === localStorage.getItem("userId") ? "user" : "other",
                timestamp: new Date(message.createdAt),
                status: message.status || "read",
                file: message.file,
              }} 
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput 
        onSend={handleSendMessage}
        onTyping={handleTyping}
      />

      {isAudioCall && (
        <AudioCall
          onEnd={() => setIsAudioCall(false)}
          isOutgoing={true}
          recipient={formatParticipantName()}
          avatar={getParticipantAvatar()}
        />
      )}
      {/* {isVideoCall && (
        <VideoCall
          onEnd={() => setIsVideoCall(false)}
          isOutgoing={true}
          recipient={formatParticipantName()}
          avatar={getParticipantAvatar()}
        />
      )} */}
    </div>
  );
};

export default ChatWindow;