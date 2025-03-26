
const express = require("express");
const router = express.Router();
const messageController = require("../Controller/messageController");

const chatMiddleware = require("../middlewares/chatMiddleware");

// ✅ Both users and doctors can send messages
router.post("/send/:chatId", chatMiddleware, messageController.sendMessage);

// ✅ Users & doctors can get a message by ID
router.get("/receive/:messageId", chatMiddleware,  messageController.getMessageById);

// ✅ Only sender (user or doctor) can edit their own message
router.put("/editMessage/:messageId", chatMiddleware, messageController.editMessage);

// ✅ Users can delete their own messages, but doctors may delete patient messages if needed
router.delete("/deleteMessage/:messageId", chatMiddleware, messageController.deleteMessage);

// for status update
router.put("/updateStatus/:messageId", chatMiddleware, messageController.updateMessageStatus);

// ✅ Special route: Doctors can delete any message if they have admin privileges
router.delete("/:id", chatMiddleware, messageController.deleteMessage);

module.exports = router;
