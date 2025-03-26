const express = require("express");
const router = express.Router();
const callController = require("../Controller/callController");
const chatMiddleware = require("../middlewares/chatMiddleware");

// ✅ Initiate a call
router.post("/initiate", chatMiddleware, callController.initiateCall);

// ✅ Update call status
router.put("/:id/status", chatMiddleware, callController.updateCallStatus);

// ✅ Get user call history (with pagination)
router.get("/history", chatMiddleware, callController.getUserCalls);

module.exports = router;
