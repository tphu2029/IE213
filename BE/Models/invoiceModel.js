import mongoose from "mongoose";

const COLLECTION_NAME = "invoices";

const invoiceSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
  },

  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointments",
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

const Invoice = mongoose.model(COLLECTION_NAME, invoiceSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createInvoice = async (invoiceData) => {
  return await Invoice.create(invoiceData);
};

const getAllInvoices = async () => {
  return await Invoice.find().populate("patient_id").populate("appointment_id");
};

const getInvoiceById = async (id) => {
  return await Invoice.findById(id)
    .populate("patient_id")
    .populate("appointment_id");
};

const updateInvoice = async (id, updateData) => {
  return await Invoice.findByIdAndUpdate(id, updateData, { new: true })
    .populate("patient_id")
    .populate("appointment_id");
};
const deleteInvoice = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};

export const invoiceModel = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
