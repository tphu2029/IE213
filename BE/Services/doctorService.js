import mongoose from "mongoose";

const getAllDoctors = async () => {
  //Chuyển sang aggregation pipeline để đọc duy nhất một lần toàn bộ hồ sơ bác sĩ và lịch trực
  return await mongoose.model("doctors").aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user_id",
      },
    },
    { $unwind: "$user_id" },
    {
      $lookup: {
        from: "departments",
        localField: "department_id",
        foreignField: "_id",
        as: "department_id",
      },
    },
    { $unwind: { path: "$department_id", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "doctor_schedules",
        localField: "_id",
        foreignField: "doctor_id",
        as: "schedules",
      },
    },
    {
      $project: {
        "user_id.password": 0,
        "user_id.refreshToken": 0,
      },
    },
  ]);
};

const getDoctorById = async (doctorId) => {
  const doctor = await mongoose
    .model("doctors")
    .findById(doctorId)
    .populate("user_id")
    .populate("department_id");
  if (!doctor) throw new Error("Doctor not found");
  return doctor;
};

const createDoctor = async (data) => {
  return await mongoose.model("doctors").create(data);
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
};
