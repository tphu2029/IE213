import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  record_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalRecord",
  },

  medicine_name: String,

  dosage: String,

  duration: String,
});

export default mongoose.model("Prescription", prescriptionSchema);
