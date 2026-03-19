import { appointmentService } from "../Services/appointmentService.js";
import dayjs from "dayjs";

const createAppointment = async (req, res) => {
  try {
    const { appointmentDate } = req.body;

    const patient_id = req.user.id;

    // Kiểm tra ngày đặt lịch
    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp ngày đặt lịch (appointmentDate)",
      });
    }

    const isPast = dayjs(appointmentDate).isBefore(dayjs());
    if (isPast) {
      return res.status(400).json({
        success: false,
        message: "Không thể đặt lịch khám trong quá khứ!",
      });
    }
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
