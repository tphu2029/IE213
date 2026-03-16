import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  appointment_date: {
    type: Date,
  },

  time_slot: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "in_progress", "completed"],
    default: "pending",
  },
});

export default mongoose.model("Appointment", appointmentSchema);
