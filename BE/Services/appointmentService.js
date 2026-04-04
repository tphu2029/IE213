import { appointmentModel } from "../Models/appointmentModel.js";
import { doctorScheduleModel } from "../Models/doctorScheduleModel.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

const bookAppointment = async (patient_id, appointmentData) => {
  const { doctor_id, appointment_date, time_slot, reason } = appointmentData;

  // 1. KIỂM TRA LỊCH LÀM VIỆC CỦA BÁC SĨ
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

  const doctorSchedules =
    await doctorScheduleModel.getDoctorScheduleByDoctorId(doctor_id);
  const scheduleForDay = doctorSchedules.find(
    (s) => s.day_of_week === appointmentDayName,
  );

  if (!scheduleForDay) throw new Error("DOCTOR_NOT_AVAILABLE_DATE");

  if (
    time_slot < scheduleForDay.start_time ||
    time_slot > scheduleForDay.end_time
  ) {
    throw new Error("INVALID_TIME_SLOT");
  }

  // 2. KIỂM TRA TRÙNG LỊCH
  const existingAppointment = await mongoose.model("appointments").findOne({
    doctor_id,
    appointment_date,
    time_slot,
    status: { $in: ["pending", "confirmed"] },
  });

  if (existingAppointment) throw new Error("CONFLICT_SCHEDULE");

  // 3. LƯU VÀO DB
  return await appointmentModel.createAppointment({
    patient_id,
    doctor_id,
    appointment_date,
    time_slot,
    reason,
    status: "pending",
  });
};

const getPatientAppointments = async (patient_id) => {
  // Gọi hàm lấy danh sách theo Patient ID
  const appointments =
    await appointmentModel.getAppointmentsByPatient(patient_id);
  return appointments;
};

export const appointmentService = {
  getPatientAppointments,
  bookAppointment,
};
