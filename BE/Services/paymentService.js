import { paymentModel } from "../Models/paymentModel.js";

const createPayment = async (data) => {
  return await paymentModel.createPayment(data);
};

const getAll = async () => {
  return await paymentModel.getAllPayments();
};

const getByPatient = async (patientId) => {
  return await paymentModel.getPaymentsByPatientId(patientId);
};

const getById = async (id) => {
  const doc = await paymentModel.getPaymentById(id);
  if (!doc) {
    throw new Error("Payment not found");
  }
  return doc;
};

const updatePayment = async (id, updateData) => {
  const doc = await paymentModel.updatePayment(id, updateData);
  if (!doc) {
    throw new Error("Payment not found");
  }
  return doc;
};

const getByIdForPatient = async (id, patientId) => {
  const doc = await paymentModel.getPaymentById(id);
  if (!doc) {
    throw new Error("Payment not found");
  }
  const pid = doc.patient_id?._id ?? doc.patient_id;
  if (String(pid) !== String(patientId)) {
    throw new Error("Forbidden");
  }
  return doc;
};

const deletePayment = async (id) => {
  const doc = await paymentModel.deletePayment(id);
  if (!doc) {
    throw new Error("Payment not found");
  }
  return doc;
};

export const paymentService = {
  createPayment,
  getAll,
  getByPatient,
  getById,
  getByIdForPatient,
  updatePayment,
  deletePayment,
};
