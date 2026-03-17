import mongoose from "mongoose";

const COLLECTION_NAME = "doctors";

const doctorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  specialization: {
    type: String,
  },

  experience: {
    type: Number,
  },
});

const Doctor = mongoose.model(COLLECTION_NAME, doctorSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createDoctor = async (doctorData) => {
  return await Doctor.create(doctorData);
};

const getAllDoctors = async () => {
  return await Doctor.find().populate("user_id").populate("department_id");
};

const getDoctorById = async (id) => {
  return await Doctor.find.findBy.populate("user_id").populate("department_id");
};

const updateDoctor = async (id, updateData) => {
  return await Doctor.findByIdAndUpdate
    .findByIdAndUpdate(id, updateData, { new: true })
    .populate("user_id")
    .populate("department_id");
};

const deleteDoctor = async (id) => {
  return await Doctor.findByIdAndDelete(id);
};

// Các hàm đặc thù cho Doctor
const getDoctorsByDepartment = async (departmentId) => {
  return await Doctor.find({ department_id: departmentId }).populate("user_id");
};

// --- EXPORT TƯƠNG TỰ USER ---
export const doctorModel = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorsByDepartment,
};
