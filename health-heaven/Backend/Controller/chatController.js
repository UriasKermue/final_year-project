const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/Newuser");
const Doctor = require("../models/DdoctorModel");
const mongoose = require("mongoose");

// ✅ Get all chats for the logged-in user or doctor
exports.getUserChats = async (req, res) => {
  try {
    // Validate if req.user.id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const chats = await Chat.find({ participants: req.user.id })
      .populate({
        path: "participants",
        select: "fullName profileImage profilePictureUrl role",

      })
      .populate({
        path: "lastMessage",
        select: "content sender fileUrl fileType createdAt",
      })
      .lean();

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats", error: error.message });
  }
};

// ✅ Get messages in a chat
exports.getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chat ID format" });
    }

    const messages = await Message.find({ chatId })
      .populate("sender", "fullName email")
      .sort({ createdAt: 1 })
      .lean(); // Improve performance

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

// ✅ Send a message in a chat
// exports.sendMessage = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { content, fileUrl, fileType } = req.body;

//     if (!req.user?.id) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(chatId)) {
//       return res.status(400).json({ message: "Invalid chat ID format" });
//     }

//     // ✅ Populate participants to get user details
//     const chat = await Chat.findById(chatId).populate("participants");
//     if (!chat) {
//       return res.status(404).json({ message: "Chat not found" });
//     }

//     if (!content && !fileUrl) {
//       return res.status(400).json({ message: "Message content or file is required" });
//     }

//     // ✅ Identify sender dynamically
//     let sender = await Doctor.findById(req.user.id).select("fullName profilePictureUrl");
//     let senderModel = "Ddoctor";
//     if (!sender) {
//       sender = await User.findById(req.user.id).select("fullName profilePictureUrl");
//       senderModel = "Newuser";
//     }
//     if (!sender) {
//       return res.status(404).json({ message: "Sender not found in database" });
//     }

//     // ✅ Identify the receiver dynamically
//     const receiver = chat.participants.find((p) => p._id.toString() !== req.user.id);
//     if (!receiver) {
//       return res.status(400).json({ message: "Receiver not found in chat" });
//     }

//     let receiverDetails = await Doctor.findById(receiver._id).select("fullName profilePictureUrl");
//     let receiverModel = "Ddoctor";
//     if (!receiverDetails) {
//       receiverDetails = await User.findById(receiver._id).select("fullName profilePictureUrl");
//       receiverModel = "Newuser";
//     }
//     if (!receiverDetails) {
//       return res.status(404).json({ message: "Receiver details not found" });
//     }

//     // ✅ Extract necessary fields
//     const senderFullName = sender.fullName || "Unknown Sender";
//     const senderProfilePic = sender.profilePictureUrl || "/default-avatar.png";
//     const receiverFullName = receiverDetails.fullName || "Unknown Receiver";
//     const receiverProfilePic = receiverDetails.profilePictureUrl || "/default-avatar.png";

//     // ✅ Create the message
//     const message = new Message({
//       chatId,
//       sender: req.user.id,
//       senderModel,
//       receiver: receiver._id,
//       receiverModel,
//       content,
//       fileUrl: fileUrl || null,
//       fileType: fileType || null,
//       status: "sent",
//     });

//     await message.save();

//     // ✅ Update last message in chat
//     chat.lastMessage = message._id;
//     await chat.save();

//     // ✅ Send updated message with full sender & receiver details
//     const messageData = {
//       ...message.toObject(),
//       senderFullName,
//       senderProfilePic,
//       receiverFullName,
//       receiverProfilePic,
//     };

//     // ✅ WebSocket: Notify chat participants
//     req.io.to(chatId).emit("newMessage", messageData);
//     req.io.to(receiver._id.toString()).emit("newNotification", {
//       type: "message",
//       content: `New message from ${senderFullName}`,
//       messageId: message._id,
//     });

//     res.status(201).json(messageData);
//   } catch (error) {
//     res.status(500).json({ message: "Error sending message", error: error.message });
//   }
// };

// hjl
exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, fileUrl, fileType } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chat ID format" });
    }

    // ✅ Populate participants to get user details
    const chat = await Chat.findById(chatId).populate("participants");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!content && !fileUrl) {
      return res.status(400).json({ message: "Message content or file is required" });
    }

    // ✅ Identify sender dynamically
    let sender = await Doctor.findById(req.user.id).select("fullName profilePictureUrl");
    let senderModel = "Ddoctor";
    let senderProfilePic = sender?.profilePictureUrl || "/default-avatar.png";

    if (!sender) {
      sender = await User.findById(req.user.id).select("fullName profileImage");
      senderModel = "Newuser";
      senderProfilePic = sender?.profileImage || "/default-avatar.png";
    }
    
    if (!sender) {
      return res.status(404).json({ message: "Sender not found in database" });
    }

    // ✅ Identify the receiver dynamically
    const receiver = chat.participants.find((p) => p._id.toString() !== req.user.id);
    if (!receiver) {
      return res.status(400).json({ message: "Receiver not found in chat" });
    }

    let receiverDetails = await Doctor.findById(receiver._id).select("fullName profilePictureUrl");
    let receiverModel = "Ddoctor";
    let receiverProfilePic = receiverDetails?.profilePictureUrl || "/default-avatar.png";

    if (!receiverDetails) {
      receiverDetails = await User.findById(receiver._id).select("fullName profileImage");
      receiverModel = "Newuser";
      receiverProfilePic = receiverDetails?.profileImage || "/default-avatar.png";
    }

    if (!receiverDetails) {
      return res.status(404).json({ message: "Receiver details not found" });
    }

    // ✅ Extract necessary fields
    const senderFullName = sender.fullName || "Unknown Sender";
    const receiverFullName = receiverDetails.fullName || "Unknown Receiver";

    // ✅ Create the message
    const message = new Message({
      chatId,
      sender: req.user.id,
      senderModel,
      receiver: receiver._id,
      receiverModel,
      content,
      fileUrl: fileUrl || null,
      fileType: fileType || null,
      status: "sent",
    });

    await message.save();

    // ✅ Update last message in chat
    chat.lastMessage = message._id;
    await chat.save();

    // ✅ Send updated message with full sender & receiver details
    const messageData = {
      ...message.toObject(),
      senderFullName,
      senderProfilePic,
      receiverFullName,
      receiverProfilePic,
    };

    // ✅ WebSocket: Notify chat participants
    req.io.to(chatId).emit("newMessage", messageData);
    req.io.to(receiver._id.toString()).emit("newNotification", {
      type: "message",
      content: `New message from ${senderFullName}`,
      messageId: message._id,
    });

    res.status(201).json(messageData);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};


// ✅ Delete a chat (Soft Delete)
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chat ID format" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Soft delete: Set an "isDeleted" flag instead of removing
    chat.isDeleted = true;
    await chat.save();

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chat", error: error.message });
  }
};

// ✅ Mark all messages in a chat as read
exports.getUnreadChats = async (req, res) => {
  try {
    const unreadChats = await Chat.find({ participants: req.user.id, status: "unread" })
      .populate("lastMessage")
      .lean();

    res.json(unreadChats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching unread chats", error: error.message });
  }
};


// ✅ Get unread messages in a chat
exports.markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chat ID format" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // ✅ Update all unread messages
    await Message.updateMany(
      { chatId, sender: { $ne: req.user.id }, isRead: false },
      { $set: { isRead: true } }
    );

    // ✅ Update chat status
    chat.status = "active";
    await chat.save();

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error marking messages as read", error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId)
      .populate("sender", "fullName email")
      .populate("chatId"); // Optional: Include chat details

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("❌ Error fetching message:", error);
    res.status(500).json({ message: "Error retrieving message", error: error.message });
  }
};
