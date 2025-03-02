// const express = require("express");
// const router = express.Router();
// const {
//   loginAdmin,
//   verifyAdminOTP,
// } = require("../Controller/adaminController");
// const {
//   getPendingDoctors,
//   approveDoctor,
//   rejectDoctor,
//   toggleUserBan,
// } = require("../Controller/adminManagment");
// const verifyToken = require("../middlewares/authMiddleware");
// const { verifyRole } = require("../middlewares/roleMiddleware");

// // Admin login and OTP verification
// router.post("/login", loginAdmin);
// router.post("/verify-otp", verifyAdminOTP);

// // ✅ Allow both SuperAdmin and Admin to view pending doctors
// router.get(
//   "/pending-doctors",
//   verifyToken,
//   verifyRole(["SuperAdmin", "Admin"]),
//   getPendingDoctors
// );

// // ✅ Only SuperAdmin can approve/reject doctors
// router.post(
//   "/approve-doctor/:id",
//   verifyToken,
//   verifyRole(["SuperAdmin"]),
//   approveDoctor
// );

// router.post(
//   "/reject-doctor/:id",
//   verifyToken,
//   verifyRole(["SuperAdmin"]),
//   rejectDoctor
// );

// // ✅ Only SuperAdmin can ban/unban users
// router.put(
//   "/ban-user/:id",
//   verifyToken,
//   verifyRole(["SuperAdmin"]),
//   toggleUserBan
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  verifyAdminOTP,
  createAdmin,
  deleteAdmin, // Import the new function
} = require("../Controller/adaminController");
const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  toggleUserBan,
} = require("../Controller/adminManagment");  
const verifyToken = require("../middlewares/authMiddleware");
const { verifyRole } = require("../middlewares/roleMiddleware");



// ✅ Admin login and OTP verification
router.post("/login", loginAdmin);
router.post("/verify-otp",verifyToken,verifyAdminOTP);
// router.post("/superadmin/login", loginAdmin);

// ✅ SuperAdmin can create new Admins
router.post(
  "/create-admin",
  verifyToken,
  verifyRole(["SuperAdmin"]),
  createAdmin
);
router.delete(
  "/delete-admin/:adminId",
  verifyToken,
  verifyRole(["SuperAdmin"]),
  deleteAdmin
);

// ✅ Allow both SuperAdmin and Admin to view pending doctors
router.get(
  "/pending-doctors",
  verifyToken,
  verifyRole(["SuperAdmin", "Admin"]),
  getPendingDoctors
);

// ✅ Only SuperAdmin can approve/reject doctors
router.post(
  "/approve-doctor/:id",
  verifyToken,
  verifyRole(["SuperAdmin"]),
  approveDoctor
);

router.post(
  "/reject-doctor/:id",
  verifyToken,
  verifyRole(["SuperAdmin"]),
  rejectDoctor
);

// ✅ Only SuperAdmin can ban/unban users
router.put(
  "/ban-user/:id",
  verifyToken,
  verifyRole(["SuperAdmin"]),
  toggleUserBan
);

module.exports = router;
