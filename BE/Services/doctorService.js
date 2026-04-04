import { doctorModel } from "../Models/doctorModel.js";

const getAllDoctors = async () => {
  const doctors = await doctorModel.getAllDoctors();
  return doctors;
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
