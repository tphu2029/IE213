import { appointmentService } from "../Services/appointmentService.js";
import { patientModel } from "../Models/patientModel.js";

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
    // Ngày/giờ khám đã được validate ở validateBookAppointment (appointment_date)
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
    if (error.message === "PATIENT_PROFILE_REQUIRED") {
      return res.status(403).json({
        success: false,
        message:
          "Tài khoản chưa có hồ sơ bệnh nhân. Vui lòng tạo hồ sơ trước khi đặt lịch.",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyHistory = async (req, res) => {
  try {
    const patient_id = await resolvePatientId(req.user.id);
    const appointments = await appointmentService.getPatientAppointments(
      patient_id,
    );

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    if (error.message === "PATIENT_PROFILE_REQUIRED") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản chưa có hồ sơ bệnh nhân.",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentController = {
  getMyHistory,
  createAppointment,
};
