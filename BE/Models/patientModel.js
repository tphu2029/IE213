import mongoose from "mongoose";

const COLLECTION_NAME = "patients";

const patientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  gender: { type: String },
  birth_date: { type: Date },
  address: { type: String },
  cccd: { type: String, unique: true },

  // --- THÔNG TIN BHYT ---
  bhyt_code: { type: String, default: "" },
  bhyt_initial_clinic: { type: String, default: "" },
  bhyt_expiration_date: { type: Date },
  bhyt_proof_image: { type: String, default: "" },
  bhyt_status: {
    type: String,
    enum: ["none", "pending", "verified", "rejected"],
    default: "none",
  },
  bhyt_note: { type: String, default: "" },
});

const Patient = mongoose.model(COLLECTION_NAME, patientSchema);

export const patientModel = {
  createPatient: (data) => Patient.create(data),
  getPatientById: (id) => Patient.findById(id).populate("user_id"),
  getPatientByUserId: (userId) =>
    Patient.findOne({ user_id: userId }).populate("user_id"),
  updatePatient: (id, data) =>
    Patient.findByIdAndUpdate(id, data, { new: true }),
  updatePatientByUserId: (userId, data) =>
    Patient.findOneAndUpdate({ user_id: userId }, data, { new: true }),
  deletePatient: (id) => Patient.findByIdAndDelete(id),
  countPatients: () => Patient.countDocuments(),
  getAllPatients: () => Patient.find().populate("user_id"), // Thêm để Admin load danh sách
};
