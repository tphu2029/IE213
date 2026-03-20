import mongoose from "mongoose";

const COLLECTION_NAME = "payments";

const paymentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
  },

  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointments",
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

const Payment = mongoose.model(COLLECTION_NAME, paymentSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};

const getAllPayments = async () => {
  return await Payment.find().populate("patient_id").populate("appointment_id");
};

const getPaymentsByPatientId = async (patientId) => {
  return await Payment.find({ patient_id: patientId })
    .populate("patient_id")
    .populate("appointment_id");
};

const getPaymentById = async (id) => {
  return await Payment.findById(id)
    .populate("patient_id")
    .populate("appointment_id");
};

const updatePayment = async (id, updateData) => {
  return await Payment.findByIdAndUpdate(id, updateData, { new: true })
    .populate("patient_id")
    .populate("appointment_id");
};

const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};

export const paymentModel = {
  createPayment,
  getAllPayments,
  getPaymentsByPatientId,
  getPaymentById,
  updatePayment,
  deletePayment,
};
