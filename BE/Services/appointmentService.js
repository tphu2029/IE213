import { appointmentModel } from "../Models/appointmentModel.js";
import { doctorScheduleModel } from "../Models/doctorScheduleModel.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

const bookAppointment = async (patient_id, appointmentData) => {
  const { doctor_id, appointment_date, time_slot, reason } = appointmentData;

  // KIỂM TRA LỊCH LÀM VIỆC CỦA BÁC SĨ ---

  // Tìm xem appointment_date là thứ mấy trong tuần
  // dayjs().day() trả về từ 0 (Chủ nhật) đến 6 (Thứ 7)
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const dayIndex = dayjs(appointment_date).day();

  const appointmentDayName = daysOfWeek[dayIndex];

  // Lấy lịch làm việc của bác sĩ từ DB
  const doctorSchedules = await doctorScheduleModel.getDoctorScheduleByDoctorId(
    doctor_id
  );

  // Kiểm tra xem bác sĩ có lịch làm việc vào ngày đó không
  const scheduleForDay = doctorSchedules.find(
    (schedule) => schedule.day_of_week === appointmentDayName
  );

  if (!scheduleForDay) {
    throw new Error("DOCTOR_NOT_AVAILABLE_DATE"); // Bác sĩ nghỉ ngày này
  }

  // Kiểm tra khung giờ (time_slot) có nằm trong ca làm việc không
  if (
    time_slot < scheduleForDay.start_time ||
    time_slot > scheduleForDay.end_time
  ) {
    throw new Error("INVALID_TIME_SLOT"); // Chọn giờ ngoài ca làm việc
  }

  // KIỂM TRA TRÙNG LỊCH CỦA NGƯỜI KHÁC

  const existingAppointment = await mongoose.model("appointments").findOne({
    doctor_id,
    appointment_date,
    time_slot,
    status: { $in: ["pending", "confirmed"] },
  });

  if (existingAppointment) {
    throw new Error("CONFLICT_SCHEDULE");
  }
  // LƯU VÀO DB
  const newAppointment = await appointmentModel.createAppointment({
    patient_id,
    doctor_id,
    appointment_date,
    time_slot,
    reason,
    status: "pending",
  });

  return newAppointment;
};

const getPatientAppointments = async (patient_id) => {
  const appointments = await appointmentModel.getAppointmentById(patient_id);
  return appointments;
};

export const appointmentService = {
  getPatientAppointments,
  bookAppointment,
};
