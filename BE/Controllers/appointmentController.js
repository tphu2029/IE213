import { appointmentService } from "../Services/appointmentService.js";
import { patientModel } from "../Models/patientModel.js";
import { doctorModel } from "../Models/doctorModel.js";

const resolvePatientId = async (userId) => {
  const patient = await patientModel.getPatientByUserId(userId);
  if (!patient) {
    const err = new Error("PATIENT_PROFILE_REQUIRED");
    throw err;
  }
  return patient._id;
};

const createAppointment = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    const appointment = await appointmentService.bookAppointment(patient_id, req.body);
    res.status(200).json({ success: true, message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    if (error.message === "PATIENT_PROFILE_REQUIRED") {
      return res.status(403).json({ success: false, message: "Tài khoản chưa có hồ sơ bệnh nhân. Vui lòng tạo hồ sơ trước khi đặt lịch." });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyHistory = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    const appointments = await appointmentService.getPatientAppointments(patient_id);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    if (error.message === "PATIENT_PROFILE_REQUIRED") {
      return res.status(403).json({ success: false, message: "Tài khoản chưa có hồ sơ bệnh nhân." });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// [DOCTOR] Lấy tất cả lịch hẹn của bác sĩ đang đăng nhập
const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await doctorModel.findDoctorByUserId(req.user.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Không tìm thấy hồ sơ bác sĩ." });

    const appointments = await appointmentService.getDoctorAppointments(doctor._id);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [DOCTOR/ADMIN] Cập nhật trạng thái lịch hẹn
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Trạng thái không hợp lệ." });
    }
    const updated = await appointmentService.updateAppointmentStatus(id, status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [ADMIN] Lấy tất cả lịch hẹn
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [ADMIN] Xóa lịch hẹn
const deleteAppointment = async (req, res) => {
  try {
    await appointmentModel.deleteAppointment(req.params.id);
    res.status(200).json({ success: true, message: "Đã xóa lịch hẹn." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentController = {
  getMyHistory,
  createAppointment,
  getDoctorAppointments,
  updateStatus,
  getAllAppointments,
  deleteAppointment,
};
