import { appointmentService } from "../Services/appointmentService.js";
import { patientModel } from "../Models/patientModel.js";

const resolvePatientId = async (userId) => {
  // Tìm hồ sơ bệnh nhân gắn với tài khoản đang đăng nhập
  const patient = await patientModel.getPatientByUserId(userId);
  if (!patient) {
    throw new Error("PATIENT_PROFILE_REQUIRED");
  }
  return patient._id;
};

const createAppointment = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    const appointment = await appointmentService.bookAppointment(
      patient_id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    const status = error.message === "PATIENT_PROFILE_REQUIRED" ? 403 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const getMyHistory = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    // Gọi service đã sửa ở Bước 1
    const appointments =
      await appointmentService.getPatientAppointments(patient_id);

    res.status(200).json({
      success: true,
      data: appointments, // Trả về mảng danh sách lịch hẹn
    });
  } catch (error) {
    const status = error.message === "PATIENT_PROFILE_REQUIRED" ? 403 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const appointmentController = {
  getMyHistory,
  createAppointment,
};
