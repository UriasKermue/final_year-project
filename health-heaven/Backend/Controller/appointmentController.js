const mongoose = require("mongoose");
const Appointment = require("../models/AppointmentModel");
const User = require("../models/Newuser");
const Doctor = require("../models/DdoctorModel");
const sendEmail = require("../utils/sendEmail");

// Book an Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, notes } = req.body;

    if (!req.user || !req.user.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const doctor = await Doctor.findById(doctorId);
    const user = await User.findById(req.user.userId);

    if (!doctor || doctor.status !== "Approved") {
      return res.status(400).json({ message: "Doctor is not available." });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const appointment = new Appointment({
      user: req.user.userId,
      doctor: doctorId,
      date,
      time,
      notes,
      status: "Pending",
    });

    await appointment.save();

    // Send Email Notifications
    await sendEmail({
      to: user.email,
      subject: "Appointment Pending Doctor's Approval",
      text: `Your appointment with Dr. ${doctor.fullName} on ${date} at ${time} is pending approval.`,
    });

    await sendEmail({
      to: doctor.email,
      subject: "New Appointment Request",
      text: `You have a new appointment request from ${user.fullName} on ${date} at ${time}.`,
    });

    await sendEmail({
      to: "hcare948@gmail.com",
      subject: "New Appointment Request",
      text: `${user.fullName} has booked an appointment with Dr. ${doctor.fullName} on ${date} at ${time}.`,
    });

    res
      .status(201)
      .json({ message: "Appointment booked! Waiting for doctor approval." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking appointment", error: error.message });
  }
};

// Edit Appointment
exports.editAppointment = async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    if (appointment.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized: Access denied" });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.notes = notes || appointment.notes;
    await appointment.save();

    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating appointment", error: error.message });
  }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    if (appointment.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can't delete this appointment" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting appointment", error: error.message });
  }
};

// Get User Appointments
exports.getUserAppointments = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const appointments = await Appointment.find({
      user: req.user.userId,
    }).populate("doctor");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};
