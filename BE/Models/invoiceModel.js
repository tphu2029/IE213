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
  paymentCode: { type: String, unique: true }, // Thêm field để đối soát Sepay
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model(COLLECTION_NAME, invoiceSchema);

const createInvoice = async (invoiceData) => {
  return await Invoice.create(invoiceData);
};

const getAllInvoices = async () => {
  return await Invoice.find().populate("patient_id").populate("appointment_id");
};

const getInvoicesByPatientId = async (patientId) => {
  return await Invoice.find({ patient_id: patientId })
    .populate("patient_id")
    .populate("appointment_id");
};

const getInvoiceById = async (id) => {
  return await Invoice.findById(id)
    .populate("patient_id")
    .populate("appointment_id");
};

// THÊM HÀM NÀY
const getInvoiceByCode = async (code) => {
  return await Invoice.findOne({ paymentCode: code });
};

const updateInvoice = async (id, updateData) => {
  return await Invoice.findByIdAndUpdate(id, updateData, { new: true })
    .populate("patient_id")
    .populate("appointment_id");
};

const deleteInvoice = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};

const getTotalRevenue = async () => {
  const result = await Invoice.aggregate([
    { $match: { status: "paid" } },
    { $group: { _id: null, total: { $sum: "$total_amount" } } },
  ]);
  return result.length > 0 ? result[0].total : 0;
};

const getRevenueByMonth = async () => {
  const currentYear = new Date().getFullYear();
  return await Invoice.aggregate([
    {
      $match: {
        status: "paid",
        created_at: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$created_at" },
        total: { $sum: "$total_amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

export const invoiceModel = {
  createInvoice,
  getAllInvoices,
  getInvoicesByPatientId,
  getInvoiceById,
  getInvoiceByCode, // Export mới
  updateInvoice,
  deleteInvoice,
  getTotalRevenue,
  getRevenueByMonth,
};
