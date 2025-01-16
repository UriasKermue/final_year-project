const multer = require('multer');
const path = require('path');

// Define the directory where files will be stored
const uploadDir = process.env.UPLOAD_DIR || './uploads';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(uploadDir));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to only accept specific file types (e.g., PDFs, images)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
  }
};

// Create the multer instance with the storage configuration and file filter
const upload = multer({ storage, fileFilter });

// Export the middleware for single file upload with field name 'profileImage'
module.exports = upload.single('profileImage');
