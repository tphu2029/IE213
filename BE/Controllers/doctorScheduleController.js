import { doctorScheduleService } from "../Services/doctorScheduleService.js";

const createSchedule = async (req, res) => {
  try {
    // Nếu là bác sĩ tự tạo lịch, lấy ID từ token. Nếu admin tạo dùm, lấy từ body
    const doctor_id =
      req.user.role === "doctor" ? req.user.id : req.body.doctor_id;

    if (!doctor_id) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin doctor_id" });
    }

    const scheduleData = { ...req.body, doctor_id };
    const newSchedule = await doctorScheduleService.createSchedule(
      scheduleData
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Tạo lịch làm việc thành công",
        data: newSchedule,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorSchedules = async (req, res) => {
  try {
    const { doctorId } = req.params; // Lấy ID bác sĩ từ URL
    const schedules = await doctorScheduleService.getSchedulesByDoctor(
      doctorId
    );

    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await doctorScheduleService.updateSchedule(
      id,
      req.body
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Cập nhật lịch thành công",
        data: updatedSchedule,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await doctorScheduleService.deleteSchedule(id);

    res
      .status(200)
      .json({ success: true, message: "Xóa lịch làm việc thành công" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const doctorScheduleController = {
  createSchedule,
  getDoctorSchedules,
  updateSchedule,
  deleteSchedule,
};
