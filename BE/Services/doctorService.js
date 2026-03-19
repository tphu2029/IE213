import { userModel } from "../Models/userModel.js";
import { doctorModel } from "../Models/doctorModel.js";

const getAllDoctors = async () => {
  // Lấy danh sách user có role là doctor
  const doctors = await userModel.getUsersByRole("doctor");
  // Lọc bỏ thông tin nhạy cảm trước khi trả về
  return doctors.map((doc) => {
    const { password, refreshToken, ...docInfo } = doc.toObject();
    return docInfo;
  });
};

const createDoctor = async (userId) => {
  if (!userId) {
  }
  return await doctorModel.createDoctor(doctorData);
};

const getDoctorById = async (doctorId) => {
  const doctor = await userModel.getUserById(doctorId);

  if (!doctor || doctor.role !== "doctor") {
    throw new Error("Doctor not found");
  }
  const { password, refreshToken, ...docInfo } = doctor.toObject();

  return docInfo;
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
};
