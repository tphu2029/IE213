import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  symptoms: String,

  diagnosis: String,

  prescription: String,

  visit_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MedicalRecord", medicalRecordSchema);
