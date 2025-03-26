const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel", // Dynamic reference (Newuser or Ddoctor)
      required: true,
    },
    senderModel: {
      type: String,
      enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
      required: true,
    },
    fileUrl: { type: String, required: true }, // Cloudinary/S3 URL
    fileType: { type: String, required: true }, // e.g., "image", "pdf", "video"
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
module.exports = File;
