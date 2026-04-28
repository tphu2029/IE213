import { appointmentService } from "../Services/appointmentService.js";
import { patientModel } from "../Models/patientModel.js";
import { doctorModel } from "../Models/doctorModel.js";
import { appointmentModel } from "../Models/appointmentModel.js";

const resolvePatientId = async (userId) => {
  const patient = await patientModel.getPatientByUserId(userId);
  if (!patient) throw new Error("PATIENT_PROFILE_REQUIRED");
  return patient._id;
};

const createAppointment = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    const appointment = await appointmentService.bookAppointment(
      patient_id,
      req.body,
    );
    res
      .status(200)
      .json({ success: true, message: "Success", data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// THÊM HÀM NÀY
const checkStatus = async (req, res) => {
  try {
    const appointment = await appointmentService.checkStatus(req.params.id);
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyHistory = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    const appointments =
      await appointmentService.getPatientAppointments(patient_id);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await doctorModel.findDoctorByUserId(req.user.id);
    const appointments = await appointmentService.getDoctorAppointments(
      doctor._id,
    );
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const updated = await appointmentService.updateAppointmentStatus(
      req.params.id,
      req.body.status,
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    await appointmentModel.deleteAppointment(req.params.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentController = {
  createAppointment,
  checkStatus, // Export mới
  getMyHistory,
  getDoctorAppointments,
  updateStatus,
  getAllAppointments,
  deleteAppointment,
};
