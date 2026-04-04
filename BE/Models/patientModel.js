import mongoose from "mongoose";

const COLLECTION_NAME = "patients";

const patientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  gender: { type: String, default: "Nam" },
  birth_date: { type: Date },
  address: { type: String },
  blood_group: { type: String, default: "A" },
  height: { type: Number, default: 0 }, // cm
  weight: { type: Number, default: 0 }, // kg
  allergies: { type: String, default: "" },
  chronic_diseases: { type: String, default: "" },
});

const Patient = mongoose.model(COLLECTION_NAME, patientSchema);

const createPatient = async (data) => await Patient.create(data);

const getPatientByUserId = async (userId) => {
  return await Patient.findOne({ user_id: userId }).populate("user_id");
};

const updatePatient = async (id, updateData) => {
  return await Patient.findByIdAndUpdate(id, updateData, { new: true });
};

export const patientModel = {
  createPatient,
  getPatientByUserId,
  updatePatient,
};
