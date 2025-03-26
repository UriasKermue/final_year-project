const { v4: uuidv4 } = require("uuid"); // Import UUID
const mongoose = require("mongoose");
const Call = require("../models/Call");
const notificationModel = require("../models/notificationModel");

// ✅ Initiate a Call
exports.initiateCall = async (req, res) => {
  try {
    const { receiver, receiverModel, callType } = req.body;
    const caller = req.user.id;
    const callerModel = req.user.role === "Doctor" ? "Ddoctor" : req.user.role;

    if (!receiver || !receiverModel || !callType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Ensure calls are only between Doctor and User
    if (
      !(
        (callerModel === "Ddoctor" && receiverModel === "Newuser") ||
        (callerModel === "Newuser" && receiverModel === "Ddoctor")
      )
    ) {
      return res.status(400).json({ message: "Calls must be between a Doctor and a User" });
    }

    const newCall = new Call({
      caller,
      callerModel,
      receiver,
      receiverModel,
      callType,
      callId: uuidv4(),
      status: "ongoing",
    });

    await newCall.save();

    // ✅ Ensure `req.io` exists before emitting an event
    if (req.io) {
      req.io.to(receiver).emit("incomingCall", {
        callId: newCall.callId,
        caller,
        callerModel,
        callType,
      });
      console.log("Incoming call event emitted:", newCall.callId);
    } else {
      console.error("Socket.io is not initialized");
    }

    res.status(201).json({
      message: "Call initiated successfully",
      call: {
        callId: newCall.callId,
        caller: newCall.caller,
        callerModel: newCall.callerModel,
        receiver: newCall.receiver,
        receiverModel: newCall.receiverModel,
        callType: newCall.callType,
        status: newCall.status,
        createdAt: newCall.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error initiating call", error: error.message });
  }
};

// ✅ Update Call Status (Ongoing, Completed, or Missed)
exports.updateCallStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, duration } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid call ID format" });
    }

    const call = await Call.findById(id);
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }

    // ✅ Validate status values
    const validStatuses = ["ongoing", "completed", "missed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid call status" });
    }

    call.status = status;
    if (duration) call.duration = duration;

    await call.save();
    res.json({ message: "Call status updated", call });
  } catch (error) {
    res.status(500).json({ message: "Error updating call status", error: error.message });
  }
};

// ✅ Get Call History for a User with Pagination
exports.getUserCalls = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 calls per page

    const calls = await Call.find({
      $or: [{ caller: userId }, { receiver: userId }],
    })
      .populate("caller", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ page, limit, calls });
  } catch (error) {
    res.status(500).json({ message: "Error fetching call history", error: error.message });
  }
};
