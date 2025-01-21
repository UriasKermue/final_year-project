const multer = require('multer');
const path = require('path');

// Storage configuration for doctor upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Path to the folder where doctor files will be uploaded
    cb(null, path.resolve('./uploads'));
  },
  filename: (req, file, cb) => {
    // Generating a unique filename for each upload
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for validating the file type
const fileFilter = (req, file, cb) => {
  // List of allowed MIME types (PDF, JPEG, PNG)
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // If file type is valid
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.'));
  }
};

// Multer upload configuration for doctor files
const upload = multer({
  storage,
  fileFilter,
}).single('profileImage'); // Field name in the form (e.g., profileImage)

// Exporting the middleware to be used in routes
module.exports = upload;
