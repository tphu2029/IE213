import mongoose from "mongoose";

const COLLECTION_NAME = "medical_histories";

const medicalHistorySchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  allergies: String,

  chronic_diseases: String,

  notes: String,
});

const MedicalHistory = mongoose.model(COLLECTION_NAME, medicalHistorySchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createMedicalHistory = async (historyData) => {
  return await MedicalHistory.create(historyData);
};

const getMedicalHistoryByPatientId = async (patientId) => {
  return await MedicalHistory.findOne({ patient_id: patientId });
};

const updateMedicalHistory = async (id, updateData) => {
  return await MedicalHistory.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMedicalHistory = async (id) => {
  return await MedicalHistory.findByIdAndDelete(id);
};

export const medicalHistoryModel = {
  createMedicalHistory,
  getMedicalHistoryByPatientId,
  updateMedicalHistory,
  deleteMedicalHistory,
};
