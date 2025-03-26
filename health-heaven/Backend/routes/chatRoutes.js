const express = require("express");
const router = express.Router();
const chatController = require("../Controller/chatController");
const chatMiddleware = require("../middlewares/chatMiddleware");

// ✅ Users & Doctors: Get all chats
router.get("/allChats/", chatMiddleware, chatController.getUserChats);

// ✅ Users & Doctors: Get messages in a chat
router.get("/:chatId/", chatMiddleware, chatController.getChatMessages);

// ✅ Get a single message by ID
router.get("/message/:messageId", chatMiddleware, chatController.getMessageById);


// ✅ Users & Doctors: Send a message
router.post("/send/:chatId/", chatMiddleware, chatController.sendMessage);

router.delete("delete/:chatId", chatMiddleware, chatController.deleteChat);
// ✅ Mark messages in a chat as read
router.put("/:chatId/read", chatMiddleware, chatController.markAsRead);

// ✅ Get unread messages in a chat
router.get("/unread/:chatId", chatMiddleware, chatController.getUnreadChats);


module.exports = router;
