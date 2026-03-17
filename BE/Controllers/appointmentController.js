import { get } from "mongoose";
import { appointmentService } from "../Services/appointmentService.js";

const createAppointment = async (req, res) => {
  try {
    const patient_id = req.user_id;

    const appointment = await appointmentService.bookAppointment(
      patient_id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyHistory = async (req, res) => {
  try {
    const patient_id = req.user.id;
    const appointments = await appointmentService.getPatientAppointments(
      patient_id
    );

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentController = {
  getMyHistory,
  createAppointment,
};
