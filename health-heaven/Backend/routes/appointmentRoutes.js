const express = require("express");
const router = express.Router();
const { bookAppointment, editAppointment, deleteAppointment, getUserAppointments } = require("../Controller/appointmentController");
const userAuthMiddleware = require("../middlewares/userMiddleware");

router.post("/book", userAuthMiddleware, bookAppointment);
router.put("/edit/:id", userAuthMiddleware, editAppointment);
router.delete("/delete/:id", userAuthMiddleware, deleteAppointment);
router.get("/my-appointments", userAuthMiddleware, getUserAppointments);

module.exports = router;