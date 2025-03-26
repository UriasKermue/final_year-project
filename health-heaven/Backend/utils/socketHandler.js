module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
  
      // ✅ Listen for messages
      socket.on("sendMessage", (message) => {
        io.to(message.chatId).emit("newMessage", message);
        io.to(message.receiver).emit("newNotification", {
          type: "message",
          content: `New message from ${message.senderName}`,
          messageId: message._id,
        });
      });
  
      // ✅ Listen for calls
      socket.on("initiateCall", (call) => {
        io.to(call.receiver).emit("incomingCall", call);
        io.to(call.receiver).emit("newNotification", {
          type: "call",
          content: `Incoming ${call.callType} call from ${call.callerName}`,
          callId: call.callId,
        });
      });
  
      // ✅ Allow users to join their personal notification room
      socket.on("Notifications", (userId) => {
        if (userId) {
          socket.join(userId);
          console.log(`User ${userId} joined notifications room`);
        }
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  };
  