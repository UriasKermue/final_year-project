const jwt = require("jsonwebtoken");
const User = require("../models/Newuser");
const Ddoctor = require("../models/DdoctorModel");

const chatMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // ✅ Support both `userId` and `id`
    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid token structure" });
    }

    console.log("Searching for user:", userId);
    let user = await User.findById(userId);

    if (!user) {
      console.log("Searching for doctor:", userId);
      user = await Ddoctor.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User or Doctor not found" });
    }

    // ✅ Allow "Active" users and "Approved" doctors
    if ((decoded.role === "Doctor" && user.status.toLowerCase() !== "approved") ||
        (decoded.role !== "Doctor" && user.status.toLowerCase() !== "active")) {
      return res.status(403).json({ message: `Access denied. User is ${user.status}` });
    }

    req.user = {
      id: user._id,
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = chatMiddleware;
