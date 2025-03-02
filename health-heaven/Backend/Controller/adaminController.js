const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAndSendOTP } = require("../utils/otpService");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

// ✅ SuperAdmin: Create a New Admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Ensure all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if admin already exists (by email or username)
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin with this email or username already exists.",
      });
    }

    // Normalize and hash the password (trim to avoid whitespace issues)
    const trimmedPassword = password.trim();
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Create a new Admin (default role: "Admin", status: "active")
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "Admin",
      status: "active",
    });

    await newAdmin.save();

    // ✅ Generate JWT token (Use adminId consistently)
    const token = jwt.sign(
      { adminId: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send welcome email to the new admin
    await sendEmail(
      email,
      "Admin Account Created",
      `Hello ${username}, your admin account has been successfully created. You can now log in.`
    );

    res.status(201).json({
      message: "Admin created successfully.",
      admin: newAdmin,
      token,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Admin & SuperAdmin Login (OTP for Admin Only)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // ✅ Allow both Admin and SuperAdmin to log in
    const admin = await Admin.findOne({
      email,
      role: { $in: ["Admin", "SuperAdmin"] },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // Compare provided password with hashed password
    const trimmedPassword = password.trim();
    const isMatch = await bcrypt.compare(trimmedPassword, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password! Try resetting it if necessary.",
      });
    }

    // Ensure admin is active (prevent inactive logins)
    if (admin.status !== "active") {
      return res.status(403).json({
        message: "Account is inactive. Please contact the SuperAdmin.",
      });
    }

    // ✅ Skip OTP for SuperAdmin (immediate login)
    if (admin.role === "SuperAdmin") {
      const token = jwt.sign(
        { adminId: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "SuperAdmin logged in successfully.",
        token,
      });
    }

    // ✅ Generate and send OTP for Admin
    await generateAndSendOTP(admin._id, admin.email);

    // ✅ Generate a temporary JWT for OTP verification (Use adminId)
    const tempToken = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message:
        "OTP sent to admin's email. Please verify it to complete the login process.",
      tempToken,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Verify Admin OTP (Updated for Admin Model)
exports.verifyAdminOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const adminId = req.user.adminId;

    console.log("🔹 Verifying OTP for Admin ID:", adminId);
    console.log("🔹 Received OTP:", otp);

    const admin = await Admin.findById(adminId);
    if (!admin) {
      console.log("❌ Admin not found!");
      return res.status(404).json({ message: "Admin not found!" });
    }

    console.log("🔹 Stored OTP:", admin.otp);
    console.log("🔹 Stored OTP Expiry (Raw):", admin.otpExpiry);
    console.log("🔹 Stored OTP Expiry (Timestamp):", new Date(admin.otpExpiry).getTime());
    console.log("🔹 Current Time (Timestamp):", Date.now());

    // ✅ Ensure OTP and Expiry are checked properly
    if (!admin.otp || String(admin.otp) !== String(otp) || new Date(admin.otpExpiry).getTime() < Date.now()) {
      console.log("❌ Invalid or expired OTP!");
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    console.log("✅ OTP Verified Successfully!");

    // ✅ Clear OTP after verification
    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    // ✅ Ensure the admin is active
    if (admin.status !== "active") {
      console.log("❌ Admin account is inactive.");
      return res.status(403).json({
        message: "Account is inactive. Please contact the SuperAdmin.",
      });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { adminId: adminId, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Final Token Generated:", token);
    res.json({ message: "OTP verified successfully!", token });
  } catch (error) {
    console.error("❌ Error verifying admin OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteAdmin = async (req, res) => {
  try {
    console.log("🔹 Raw params:", req.params); // Log the full params object
    let adminId = req.params.adminId;

    // ✅ Log the extracted adminId before modification
    console.log("🔹 Extracted Admin ID:", adminId);

    // ✅ Remove any leading colons (`:`)
    adminId = adminId.replace(/^:/, "");

    console.log("🔹 Cleaned Admin ID:", adminId);

    // ✅ Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      console.log("❌ Invalid adminId format:", adminId);
      return res.status(400).json({ message: "Invalid adminId format." });
    }

    // ✅ Check if admin exists
    const adminToDelete = await Admin.findById(adminId);
    if (!adminToDelete) {
      console.log("❌ Admin not found.");
      return res.status(404).json({ message: "Admin not found." });
    }

    // ✅ Proceed to delete
    await Admin.findByIdAndDelete(adminId);
    console.log("✅ Admin deleted successfully:", adminId);
    
    res.json({ message: "Admin deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

