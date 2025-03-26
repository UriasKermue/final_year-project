const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "participantModel", // Dynamic reference to allow both User & Doctor
      },
    ],
    participantModel: {
      type: String,
      enum: ["Newuser", "Ddoctor"], // Can be either a user or a doctor
    },
    isGroupChat: { type: Boolean, default: false },
    chatName: { type: String },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Stores last message for quick access
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
