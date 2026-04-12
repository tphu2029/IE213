import { appointmentModel } from "../Models/appointmentModel.js";
import { invoiceModel } from "../Models/invoiceModel.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

/**
 * Logic đặt lịch khám:
 * 1. Reset STT theo Bác sĩ + Ngày + Buổi (Sáng/Chiều).
 * 2. Tự động tính giờ khám dựa trên giờ bắt đầu ca của bác sĩ (10 người/giờ).
 * 3. Tự động xác nhận lịch (confirmed).
 * 4. Tự tạo hóa đơn "Đã thanh toán" nếu không có BHYT.
 */
const bookAppointment = async (patient_id, appointmentData) => {
  try {
    const { doctor_id, appointment_date, shift, reason, hasInsurance } =
      appointmentData;

    // Chuẩn hóa ngày về mốc 00:00:00 để truy vấn đếm STT chính xác cho riêng ngày đó
    const startOfDate = new Date(appointment_date);
    startOfDate.setHours(0, 0, 0, 0);

    // 1. LOGIC ĐẾM VÀ RESET STT: Lọc theo 3 điều kiện (Bác sĩ, Ngày, Buổi)
    const currentCount = await appointmentModel.countAppointments({
      doctor_id: new mongoose.Types.ObjectId(doctor_id),
      appointment_date: startOfDate,
      shift: shift,
    });

    const nextSTT = (currentCount || 0) + 1;

    // Giới hạn mỗi buổi tối đa 40 bệnh nhân
    if (nextSTT > 40) {
      throw new Error("SHIFT_FULL");
    }

    // 2. LẤY GIỜ VÀO CA THỰC TẾ CỦA BÁC SĨ (Tìm trong bảng doctor_schedules)
    const dayName = dayjs(appointment_date).format("dddd"); // Chuyển ngày sang "Monday", "Tuesday"...
    const sched = await mongoose.model("doctor_schedules").findOne({
      doctor_id,
      day_of_week: dayName,
      // Ca sáng tính trước 12h, ca chiều tính sau 12h
      start_time: shift === "Morning" ? { $lt: "12:00" } : { $gte: "12:00" },
    });

    // Mốc giờ gốc để gửi về Frontend tính toán hiển thị trên Ticket
    // Ưu tiên giờ bác sĩ đăng ký, nếu không có lấy mặc định 08:00 hoặc 13:00
    const baseStartTime = sched
      ? sched.start_time
      : shift === "Morning"
        ? "08:00"
        : "13:00";

    // 3. TẠO BẢN GHI LỊCH HẸN (Trạng thái mặc định là confirmed như yêu cầu)
    const newAppointment = await appointmentModel.createAppointment({
      patient_id,
      doctor_id,
      appointment_date: startOfDate,
      shift,
      stt: nextSTT,
      reason: reason || "Khám sức khỏe",
      hasInsurance: hasInsurance === true || hasInsurance === "true",
      status: "confirmed",
    });

    // 4. LOGIC HÓA ĐƠN: Nếu không có BHYT, tự động tạo hóa đơn vào mục Hóa đơn y tế
    if (hasInsurance === false || hasInsurance === "false") {
      await invoiceModel.createInvoice({
        patient_id: patient_id,
        appointment_id: newAppointment._id,
        total_amount: 150000, // Phí khám mặc định
        status: "paid", // Gán trạng thái đã thanh toán online
      });
    }

    // Trả về dữ liệu lịch hẹn kèm giờ gốc của bác sĩ
    return {
      ...newAppointment.toObject(),
      baseStartTime,
    };
  } catch (error) {
    console.error("Lỗi tại Service bookAppointment:", error.message);
    throw error;
  }
};

/**
 * Lấy danh sách bác sĩ có lịch trực dựa trên Ngày, Buổi và Khoa
 */
const getAvailableDoctors = async (date, shift, deptId) => {
  try {
    const dayName = dayjs(date).format("dddd");

    // Tìm tất cả lịch trực của bác sĩ trong ngày đó (VD: Monday)
    const activeSchedules = await mongoose
      .model("doctor_schedules")
      .find({ day_of_week: dayName });

    // Lọc ra các DoctorID có ca làm việc khớp với buổi chọn (Sáng/Chiều)
    const doctorIds = activeSchedules
      .filter((s) => {
        if (shift === "Morning") return s.start_time < "12:00";
        return s.start_time >= "12:00";
      })
      .map((s) => s.doctor_id);

    // Truy vấn thông tin bác sĩ theo list ID trên và theo đúng chuyên khoa (deptId)
    return await mongoose
      .model("doctors")
      .find({
        _id: { $in: doctorIds },
        department_id: new mongoose.Types.ObjectId(deptId),
      })
      .populate("user_id", "username avatar");
  } catch (error) {
    console.error("Lỗi tại Service getAvailableDoctors:", error.message);
    throw error;
  }
};

/**
 * Các hàm lấy lịch sử cho Bệnh nhân, Admin và Bác sĩ (Kết nối trực tiếp tới Model)
 */
const getPatientAppointments = async (pid) => {
  return await appointmentModel.getAppointmentsByPatient(pid);
};

const getDoctorAppointments = async (did) => {
  return await appointmentModel.getAppointmentsByDoctorPopulated(did);
};

const updateAppointmentStatus = async (id, status) => {
  return await appointmentModel.updateAppointment(id, { status });
};

export const appointmentService = {
  bookAppointment,
  getAvailableDoctors,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};
