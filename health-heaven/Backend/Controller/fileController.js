const File = require("../models/File");
const notificationModel = require("../models/notificationModel");
const Chat = require("../models/Chat");
const cloudinary = require("cloudinary").v2;
const path = require("path");

// ✅ Upload File (Hybrid Notification)
exports.uploadFile = async (req, res) => {
  try {
    const { chatId, fileType } = req.body;
    const sender = req.user.id;
    const senderModel = req.user.role; // "Newuser" or "Ddoctor"

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    // ✅ Save file details in DB
    const newFile = new File({
      chatId,
      sender,
      senderModel,
      fileUrl: result.secure_url,
      fileType,
    });

    await newFile.save();

    // ✅ Find receiver (other user in chat)
    const chat = await Chat.findById(chatId);
    const receiverId = chat.users.find(user => user.toString() !== sender);

    // ✅ Store notification in DB
    const notification = new notificationModel({
      user: receiverId,
      type: "file_upload",
      content: `📂 ${req.user.fullName} uploaded a new file.`,
      createdAt: new Date(),
      read: false,
    });

    await notification.save();

    // 🔹 Emit WebSocket event (notify chat participants)
    global.io.to(chatId).emit("newFile", newFile);
    global.io.to(receiverId.toString()).emit("newNotification", notification);

    res.status(201).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
};

// ✅ Get Files by Chat ID
exports.getFilesByChat = async (req, res) => {
  try {
    const files = await File.find({ chatId: req.params.chatId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error: error.message });
  }
};

// ✅ Delete a File (Hybrid Notification)
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // ✅ Ensure only sender can delete the file
    if (String(file.sender) !== String(req.user.id)) {
      return res.status(403).json({ message: "You can only delete your own files" });
    }

    // ✅ Extract Cloudinary public ID correctly
    const urlPath = new URL(file.fileUrl).pathname;
    const publicId = path.parse(urlPath).name;

    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {
      console.error("❌ Cloudinary deletion failed:", cloudinaryError.message);
      return res.status(500).json({ message: "Cloudinary deletion failed", error: cloudinaryError.message });
    }

    // ✅ Remove from DB after successful Cloudinary deletion
    await file.deleteOne();

    // ✅ Find receiver
    const chat = await Chat.findById(file.chatId);
    const receiverId = chat.users.find(user => user.toString() !== file.sender);

    // ✅ Store notification in DB
    const notification = new notificationModel({
      user: receiverId,
      type: "file_deleted",
      content: `🗑️ ${req.user.fullName} deleted a file.`,
      createdAt: new Date(),
      read: false,
    });

    await notification.save();

    // 🔹 Emit WebSocket event (notify chat participants)
    global.io.to(file.chatId.toString()).emit("fileDeleted", { fileId: file._id });
    global.io.to(receiverId.toString()).emit("newNotification", notification);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file", error: error.message });
  }
};
