import { doctorModel } from "../Models/doctorModel.js";

import { doctorScheduleModel } from "../Models/doctorScheduleModel.js";

const getAllDoctors = async () => {
  const doctors = await doctorModel.getAllDoctors();
  
  // Lấy lịch trình của tất cả bác sĩ và gắn vào
  const doctorsWithSchedules = await Promise.all(
    doctors.map(async (doc) => {
      const schedules = await doctorScheduleModel.getDoctorScheduleByDoctorId(doc._id);
      return { ...doc.toObject(), schedules };
    })
  );

  return doctorsWithSchedules;
};

const createDoctor = async (data) => {
  const { user_id, department_id, specialization, experience } = data;
  return await doctorModel.createDoctor(data);
};

const getDoctorById = async (doctorId) => {
  const doctor = await doctorModel.getDoctorById(doctorId);
  if (!doctor) throw new Error("Doctor not found");
  return doctor;
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
};
