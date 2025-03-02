const Appointment = require("../models/AppointmentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Ddoctor = require("../models/DdoctorModel");
const cloudinary = require("cloudinary").v2;
const {
  doctorRegistrationTemplate,
  adminAlertTemplate,
} = require("../utils/doctorRegistrationTemplate");

// ✅ Doctor Registration
exports.registerDoctor = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      specialty,
      experience,
      hospitalAffiliation,
      fees,
      location,
    } = req.body;

    // Basic validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !specialty ||
      !experience
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Files uploaded by Multer
    const { profilePicture, certificate, govID } = req.files;

    // ✅ Check if doctor already exists
    const existingDoctor = await Ddoctor.findOne({ email });
    if (existingDoctor)
      return res.status(400).json({ message: "Email already exists." });

    // ✅ Upload profile picture to Cloudinary
    let profilePictureUrl = "";
    if (profilePicture) {
      const uploadedImage = await cloudinary.uploader.upload(
        profilePicture[0].path,
        {
          folder: "doctor_profiles", // Specify folder in Cloudinary for profile pictures
        }
      );
      profilePictureUrl = uploadedImage.secure_url;
    }

    // ✅ Upload certificate to Cloudinary
    let certificateUrl = "";
    if (certificate) {
      const uploadedCertificate = await cloudinary.uploader.upload(
        certificate[0].path,
        {
          folder: "doctor_certificates", // Specify folder in Cloudinary for certificates
        }
      );
      certificateUrl = uploadedCertificate.secure_url;
    }

    // ✅ Upload government ID to Cloudinary
    let govIDUrl = "";
    if (govID) {
      const uploadedGovID = await cloudinary.uploader.upload(govID[0].path, {
        folder: "doctor_gov_ids", // Specify folder in Cloudinary for government IDs
      });
      govIDUrl = uploadedGovID.secure_url;
    }

    // ✅ Log the password before hashing to ensure it is valid
    console.log("Password:", password);

    // ✅ Hash password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Ddoctor({
      fullName,
      email,
      phone,
      password: hashedPassword,
      specialty,
      experience,
      fees,
      location,
      hospitalAffiliation,
      certificateUrl, // Save the uploaded certificate URL
      govIDUrl, // Save the uploaded government ID URL
      profilePictureUrl, // Save the profile picture URL
      status: "Pending", // Default to pending approval
    });

    await newDoctor.save();

    // ✅ Generate email templates
    const doctorEmail = doctorRegistrationTemplate(fullName);
    const adminEmail = adminAlertTemplate(fullName);

    // ✅ Send Email to the Doctor
    await sendEmail({
      to: email,
      subject: doctorEmail.subject,
      text: doctorEmail.text,
      htmlContent: doctorEmail.html,
    });

    // ✅ Send Email to Admin
    await sendEmail({
      to: "hcare948@gmail.com",
      subject: adminEmail.subject,
      text: adminEmail.text,
      htmlContent: adminEmail.html,
    });

    res
      .status(201)
      .json({ message: "Registration successful! Pending admin approval." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error registering doctor", error: error.message });
  }
};
// ✅ Doctor Login
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Find doctor
    const doctor = await Ddoctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // ✅ Check if account is approved
    if (doctor.status !== "Approved")
      return res.status(403).json({ message: "Account pending approval" });

    // ✅ Validate password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, role: "Doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
exports.getAllApprovedDoctors = async (req, res) => {
  try {
    // ✅ Fetch only approved doctors
    const approvedDoctors = await Ddoctor.find({ status: "Approved" }).select(
      "fullName email phone specialty experience hospitalAffiliation profilePictureUrl fees location "
    );

    // ✅ Check if no approved doctors are found
    if (!approvedDoctors.length) {
      return res.status(404).json({ message: "No approved doctors found" });
    }

    res.status(200).json(approvedDoctors);
  } catch (error) {
    console.error("Error fetching approved doctors:", error);
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message });
  }
};

// ✅ Update Doctor Profile (Restricted Fields Cannot be Changed)
exports.updateDoctorProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      specialty,
      experience,
      hospitalAffiliation,
      certificateUrl,
      govIDUrl,
      profilePictureUrl,
    } = req.body;

    // ✅ Prevent status update
    const updatedDoctor = await Ddoctor.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        phone,
        specialty,
        experience,
        hospitalAffiliation,
        certificateUrl,
        govIDUrl,
        profilePictureUrl,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.json({
      message: "Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

// ✅ Get Doctor’s Appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    }).populate("user", "fullName email phone");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};

// ✅ Approve or Reject Appointment
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ Allow only "Approved" or "Rejected"
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    // ✅ Fetch appointment by ID
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 🛑 Debugging logs to check IDs
    console.log("🔹 Doctor ID from Token:", req.user.id);
    console.log("🔹 Doctor ID in Appointment:", appointment.doctor.toString());

    // ✅ Ensure only the assigned doctor can update the status
    if (String(appointment.doctor) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized to modify this appointment" });
    }

    // ✅ Update appointment status
    appointment.status = status;
    await appointment.save();

    // ✅ Notify user about appointment status
    await sendEmail({
      to: appointment.user.email,
      subject: "Your Appointment Status",
      text: `Your appointment has been ${status}.`,
      htmlContent: `<p>Your appointment has been <strong>${status}</strong>.</p>`,
    });

    res.json({ message: `Appointment ${status} successfully` });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};
