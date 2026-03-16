import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },

  total_amount: Number,

  status: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Invoice", invoiceSchema);
