const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Chat reference
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel", // Dynamic reference to either User or Doctor
      required: true,
    },
    senderModel: {
      type: String,
      enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "receiverModel", // Dynamic reference to either User or Doctor
      required: true,
    },
    receiverModel: {
      type: String,
      enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
      required: true,
    },
    content: { 
      type: String, 
      trim: true, 
      validate: {
        validator: function(value) {
          return value || this.fileUrl; // Content is required unless there's a file
        },
        message: "Message must have text or a file.",
      },
    },
    fileUrl: { type: String, sparse: true }, // ✅ Only stored if a file exists
    fileType: {
      type: String,
      enum: ["image", "video", "audio", "document"],
    }, // ✅ No default value, optional

    status: { 
      type: String, 
      enum: ["sent", "delivered", "read"], 
      default: "sent" // New messages start as "sent"
    }, 
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
