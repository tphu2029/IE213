import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },

  amount: Number,

  method: {
    type: String,
    enum: ["cash", "transfer", "online"],
  },

  status: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid",
  },

  payment_date: Date,
});

export default mongoose.model("Payment", paymentSchema);
