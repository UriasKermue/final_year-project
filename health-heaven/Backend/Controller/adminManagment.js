const Doctor = require("../models/DdoctorModel");
const User = require("../models/Newuser");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose")
// ✅ Get All Pending Doctors
exports.getPendingDoctors = async (req, res) => {
  try {
    console.log("Fetching pending doctors...");
    const pendingDoctors = await Doctor.find({ status: "Pending" });

    if (pendingDoctors.length === 0) {
      return res.status(404).json({ message: "No pending doctors found." });
    }

    res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error("Error fetching pending doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Approve Doctor
exports.approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Raw ID from params:", id, "Length:", id.length);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.status === "Approved") {
      return res.status(400).json({ message: "Doctor is already approved." });
    }

    doctor.status = "Approved";
    await doctor.save();

    await sendEmail(
      doctor.email,
      "Account Approved",
      "Your account has been approved!"
    );

    res.status(200).json({ message: "Doctor approved successfully." });
  } catch (error) {
    console.error("Error approving doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Reject Doctor
exports.rejectDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required." });
    }

    console.log("Rejecting doctor with ID:", id);

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.status === "Rejected") {
      return res.status(400).json({ message: "Doctor is already rejected." });
    }

    doctor.status = "Rejected";
    await doctor.save();

    await sendEmail(
      doctor.email,
      "Application Rejected",
      `Your application was rejected: ${reason}`
    );

    res.status(200).json({ message: "Doctor rejected successfully." });
  } catch (error) {
    console.error("Error rejecting doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Ban/Unban User
exports.toggleUserBan = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Toggling user ban status for ID:", id);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = user.status === "Banned" ? "Active" : "Banned";
    await user.save();

    await sendEmail(
      user.email,
      "Account Status Update",
      `Your account status has been changed to ${user.status}`
    );

    res.status(200).json({
      message: `User successfully ${
        user.status === "Banned" ? "banned" : "unbanned"
      }.`,
    });
  } catch (error) {
    console.error("Error toggling user ban status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
