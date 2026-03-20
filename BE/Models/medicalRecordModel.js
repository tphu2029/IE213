import mongoose from "mongoose";

const COLLECTION_NAME = "medical_records";
const medicalRecordSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
  },

  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
  },

  symptoms: String,

  diagnosis: String,

  prescription: String,

  visit_date: {
    type: Date,
    default: Date.now,
  },
});

const MedicalRecord = mongoose.model(COLLECTION_NAME, medicalRecordSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createMedicalRecord = async (recordData) => {
  return await MedicalRecord.create(recordData);
};

const getMedicalRecordsByPatientId = async (patientId) => {
  return await MedicalRecord.find({ patient_id: patientId }).populate(
    "doctor_id"
  );
};

const getMedicalRecordById = async (id) => {
  return await MedicalRecord.findById(id)
    .populate("patient_id")
    .populate("doctor_id");
};

const updateMedicalRecord = async (id, updateData) => {
  return await MedicalRecord.findByIdAndUpdate(id, updateData, { new: true })
    .populate("patient_id")
    .populate("doctor_id");
};

const deleteMedicalRecord = async (id) => {
  return await MedicalRecord.findByIdAndDelete(id);
};

export const medicalRecordModel = {
  createMedicalRecord,
  getMedicalRecordsByPatientId,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
};
