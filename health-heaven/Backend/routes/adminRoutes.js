const express = require('express');
const adminController = require('../Controller/adminController');
const upload = require('../middlewares/uploadMiddleware'); // Correctly importing the multer instance

const router = express.Router();

// POST route to add a doctor with a doctorImage
router.post(
  '/add-doctor',
  upload.fields([{ name: 'doctorImage', maxCount: 1 }]),
  adminController.addDoctor
);

// PUT route to edit a doctor with a new doctorImage
router.put(
  '/edit-doctor/:id',
  upload.fields([{ name: 'doctorImage', maxCount: 1 }]),
  adminController.editDoctor
);

// DELETE route to delete a doctor
router.delete('/delete-doctor/:id', adminController.deleteDoctor);

module.exports = router;
