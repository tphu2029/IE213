import { invoiceModel } from "../Models/invoiceModel.js";

const createInvoice = async (data) => {
  return await invoiceModel.createInvoice(data);
};

const getAll = async () => {
  return await invoiceModel.getAllInvoices();
};

const getByPatient = async (patientId) => {
  return await invoiceModel.getInvoicesByPatientId(patientId);
};

const getById = async (id) => {
  const doc = await invoiceModel.getInvoiceById(id);
  if (!doc) {
    throw new Error("Invoice not found");
  }
  return doc;
};

const updateInvoice = async (id, updateData) => {
  const doc = await invoiceModel.updateInvoice(id, updateData);
  if (!doc) {
    throw new Error("Invoice not found");
  }
  return doc;
};

const getByIdForPatient = async (id, patientId) => {
  const doc = await invoiceModel.getInvoiceById(id);
  if (!doc) {
    throw new Error("Invoice not found");
  }
  const pid = doc.patient_id?._id ?? doc.patient_id;
  if (String(pid) !== String(patientId)) {
    throw new Error("Forbidden");
  }
  return doc;
};

const deleteInvoice = async (id) => {
  const doc = await invoiceModel.deleteInvoice(id);
  if (!doc) {
    throw new Error("Invoice not found");
  }
  return doc;
};

export const invoiceService = {
  createInvoice,
  getAll,
  getByPatient,
  getById,
  getByIdForPatient,
  updateInvoice,
  deleteInvoice,
};
