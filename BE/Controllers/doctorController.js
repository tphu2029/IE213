import { doctorService } from "../Services/doctorService.js";
import { appointmentService } from "../Services/appointmentService.js";

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctorDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorService.getDoctorById(id);
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// [DOCTOR] Lấy profile của bác sĩ đang đăng nhập
const getMyDoctorProfile = async (req, res) => {
  try {
    const { doctorModel } = await import("../Models/doctorModel.js");
    const doctor = await doctorModel.findDoctorByUserId(req.user.id);
    if (!doctor)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy hồ sơ bác sĩ." });
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [NEW LOGIC] Lấy bác sĩ trống lịch theo Ngày, Buổi và Khoa
const getAvailableDoctors = async (req, res) => {
  try {
    const { date, shift, deptId } = req.query;

    // Kiểm tra dữ liệu đầu vào
    if (!date || !shift || !deptId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Thiếu tham số truy vấn (date, shift, deptId)",
        });
    }

    const doctors = await appointmentService.getAvailableDoctors(
      date,
      shift,
      deptId,
    );

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error("Lỗi Controller getAvailableDoctors:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorController = {
  getDoctors,
  getDoctorDetail,
  createDoctor,
  getMyDoctorProfile,
  getAvailableDoctors,
};
