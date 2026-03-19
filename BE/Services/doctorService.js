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

const createDoctor = async (data) => {
  const { user_id, department_id, specialization, experience } = data;
  console.log(data);
  // 1. Check user tồn tại
  const user = await userModel.getUserById(user_id);
  if (!user) {
    throw new Error("User không tồn tại");
  }

  // 2. Check role phải là doctor
  if (user.role !== "doctor") {
    throw new Error("User này không phải là doctor");
  }

  // 3. Check đã có doctor profile chưa
  const existingDoctor = await doctorModel.findByUserId(user_id);
  if (existingDoctor) {
    throw new Error("Doctor profile đã tồn tại");
  }

  // 4. Tạo doctor
  const newDoctor = await doctorModel.createDoctor({
    user_id,
    department_id,
    specialization,
    experience,
  });

  return newDoctor;
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
  createDoctor,
};
