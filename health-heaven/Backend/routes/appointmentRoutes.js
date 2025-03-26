const express = require("express");
const router = express.Router();
const { bookAppointment, editAppointment, deleteAppointment, getUserAppointments, getAvailableSlots } = require("../Controller/appointmentController");
const userAuthMiddleware = require("../middlewares/userMiddleware");
const { getDoctorAppointments } = require("../Controller/Ddcontroller");
const doctorMiddleware = require("../middlewares/doctorMiddleware");

router.post("/book", userAuthMiddleware, bookAppointment);
router.put("/edit/:id", userAuthMiddleware, editAppointment);
router.delete("/delete/:id", userAuthMiddleware, deleteAppointment);
// router.delete("/appointment/:id", verifyToken, isDoctor, deleteAppointment);
router.get("/doctor-appointments",doctorMiddleware , getDoctorAppointments);

router.get("/my-appointments", userAuthMiddleware, getUserAppointments);
router.get("/available-slots/doctor/:id", getAvailableSlots);


module.exports = router;