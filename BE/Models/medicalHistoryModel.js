import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  allergies: String,

  chronic_diseases: String,

  notes: String,
});

export default mongoose.model("MedicalHistory", medicalHistorySchema);
