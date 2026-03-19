import mongoose from "mongoose";

const COLLECTION_NAME = "patients";

const patientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  gender: {
    type: String,
  },

  birth_date: {
    type: Date,
  },

  address: {
    type: String,
  },
});

const Patient = mongoose.model(COLLECTION_NAME, patientSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

const getPatientById = async (id) => {
  return await Patient.findById(id).populate("user_id");
};

const getPatientByUserId = async (userId) => {
  return await Patient.findOne({ user_id: userId }).populate("user_id");
};

const updatePatient = async (id, updateData) => {
  return await Patient.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("user_id");
};

const deletePatient = async (id) => {
  return await Patient.findByIdAndDelete(id);
};

export const patientModel = {
  createPatient,
  getPatientById,
  getPatientByUserId,
  updatePatient,
  deletePatient,
};
