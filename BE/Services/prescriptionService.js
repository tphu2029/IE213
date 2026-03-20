import { prescriptionModel } from "../Models/prescriptionModel.js";
import { medicalRecordModel } from "../Models/medicalRecordModel.js";

const createPrescription = async (data) => {
  return await prescriptionModel.createPrescription(data);
};

const getByRecord = async (recordId) => {
  return await prescriptionModel.getPrescriptionsByRecordId(recordId);
};

const getByRecordForPatient = async (recordId, patientId) => {
  const record = await medicalRecordModel.getMedicalRecordById(recordId);
  if (!record) {
    throw new Error("Medical record not found");
  }
  const pid = record.patient_id?._id ?? record.patient_id;
  if (String(pid) !== String(patientId)) {
    throw new Error("Forbidden");
  }
  return await prescriptionModel.getPrescriptionsByRecordId(recordId);
};

const updatePrescription = async (id, updateData) => {
  const doc = await prescriptionModel.updatePrescription(id, updateData);
  if (!doc) {
    throw new Error("Prescription not found");
  }
  return doc;
};

const deletePrescription = async (id) => {
  const doc = await prescriptionModel.deletePrescription(id);
  if (!doc) {
    throw new Error("Prescription not found");
  }
  return doc;
};

export const prescriptionService = {
  createPrescription,
  getByRecord,
  getByRecordForPatient,
  updatePrescription,
  deletePrescription,
};
