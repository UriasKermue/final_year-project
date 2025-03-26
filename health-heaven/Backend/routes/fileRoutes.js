const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer"); // ✅ Using existing multer middleware
const { uploadFile, getFilesByChat, deleteFile } = require("../Controller/fileController");

router.post("/upload", upload.single("file"), uploadFile); // Upload File
router.get("/:chatId", getFilesByChat); // Get Files by Chat ID
router.delete("/:id", deleteFile); // Delete File

module.exports = router;
