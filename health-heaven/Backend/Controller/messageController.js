const mongoose = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/Newuser");
const Ddoctor = require("../models/DdoctorModel");
const notificationModel = require("../models/notificationModel");
const Chat = require("../models/Chat");

// ✅ Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { message, chatId, receiver, receiverModel, sender, senderModel, senderName } = req.body;
    const io = req.io;

    if (!io) {
      return res.status(500).json({ message: "Socket.io is not initialized" });
    }

    console.log("🔍 Debug: Receiver ID:", receiver, "Receiver Model:", receiverModel);

    if (!receiver || !receiverModel) {
      return res.status(400).json({ message: "Receiver ID or model is missing" });
    }

    // ✅ Check if receiver exists dynamically
    const receiverExists = receiverModel === "Newuser" 
      ? await User.findById(receiver) 
      : await Ddoctor.findById(receiver);

    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // ✅ Save message to the database
    const newMessage = new Message({
      chatId,
      sender,
      senderModel,
      receiver,
      receiverModel,
      content: message,
      status: "sent",
    });

    await newMessage.save();

    // ✅ Emit real-time message event
    io.to(chatId).emit("newMessage", newMessage);

    // ✅ Store notification in the database
    const notification = new notificationModel({
      user: new mongoose.Types.ObjectId(receiver),
      userModel: receiverModel,
      type: "message",
      content: `New message from ${senderName}`,
      chatId,
      createdAt: new Date(),
      read: false,
    });

    await notification.save();

    // ✅ Notify receiver in real-time
    io.to(receiver).emit("newNotification", {
      type: "message",
      content: `New message from ${senderName}`,
      chatId,
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
    return res.status(500).json({ message: "Error sending message", error: error.message });
  }
};


exports.getMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    console.log("🔍 Fetching message with ID:", messageId); // Debugging

    let message = await Message.findById(messageId)
      .populate("sender", "fullName email")
      .populate("chatId");

    console.log("🟢 Retrieved Message:", message); // Debugging

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ✅ Update status to "read" only if the requesting user is NOT the sender
    if (String(message.sender._id) !== String(req.user.id) && message.status !== "read") {
      message.status = "read";
      await message.save();
      console.log("✅ Message marked as read");
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("❌ Error fetching message:", error);
    res.status(500).json({ message: "Error retrieving message", error: error.message });
  }
};



exports.editMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (String(message.sender) !== String(req.user.id)) {
      return res.status(403).json({ message: "You can only edit your own messages" });
    }

    message.content = content;
    message.updatedAt = Date.now();
    await message.save();

    // 🔹 Emit WebSocket event (notify users of edited message)
    global.io.to(message.chatId.toString()).emit("messageEdited", message);

    res.json({ message: "Message updated", updatedMessage: message });
  } catch (error) {
    res.status(500).json({ message: "Error updating message", error: error.message });
  }
};


exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);

    if (!message) {
      console.log("❌ Message not found");
      return res.status(404).json({ message: "Message not found" });
    }

    console.log("🔍 Debugging Delete Message");
    console.log("Message Sender ID:", String(message.sender));
    console.log("Requesting User ID:", String(req.user.id));

    if (String(message.sender) !== String(req.user.id)) {
      console.log("❌ IDs do not match - Unauthorized");
      return res.status(403).json({ message: "You can only delete your own messages" });
    }

    // Option 1: Soft delete (mark as deleted)
    // message.deleted = true;
    // await message.save();

    // Option 2: Hard delete (permanently remove)
    await message.deleteOne();

    console.log("✅ Message deleted successfully!");

    // 🔴 Emit WebSocket event for real-time update
    req.io.to(message.chatId.toString()).emit("messageDeleted", { messageId });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("❌ Error deleting message:", error.message);
    res.status(500).json({ message: "Error deleting message", error: error.message });
  }
};


exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body; // New status (delivered, read)
    const message = await Message.findById(req.params.messageId);

    if (!message) return res.status(404).json({ message: "Message not found" });

    // ✅ Prevent redundant updates
    if (message.status === "read") {
      return res.status(200).json({ message: "Message already read", updatedMessage: message });
    }

    // ✅ Only update if moving forward in status (sent → delivered → read)
    const validUpdates = { sent: ["delivered", "read"], delivered: ["read"] };
    if (message.status === status || !validUpdates[message.status]?.includes(status)) {
      return res.status(400).json({ message: "Invalid status transition" });
    }

    message.status = status;
    await message.save();

    res.json({ message: "Message status updated", updatedMessage: message });
  } catch (error) {
    res.status(500).json({ message: "Error updating message status", error: error.message });
  }
};
