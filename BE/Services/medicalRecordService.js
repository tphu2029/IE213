import { medicalRecordModel } from "../Models/medicalRecordModel.js";

const createRecord = async (data) => {
  return await medicalRecordModel.createMedicalRecord(data);
};

const getByPatient = async (patientId) => {
  return await medicalRecordModel.getMedicalRecordsByPatientId(patientId);
};

const getById = async (id) => {
  const doc = await medicalRecordModel.getMedicalRecordById(id);
  if (!doc) {
    throw new Error("Medical record not found");
  }
  return doc;
};

const updateRecord = async (id, updateData) => {
  const doc = await medicalRecordModel.updateMedicalRecord(id, updateData);
  if (!doc) {
    throw new Error("Medical record not found");
  }
  return doc;
};

const deleteRecord = async (id) => {
  const doc = await medicalRecordModel.deleteMedicalRecord(id);
  if (!doc) {
    throw new Error("Medical record not found");
  }
  return doc;
};

const getByIdForPatient = async (recordId, patientId) => {
  const doc = await medicalRecordModel.getMedicalRecordById(recordId);
  if (!doc) {
    throw new Error("Medical record not found");
  }
  const pid = doc.patient_id?._id ?? doc.patient_id;
  if (String(pid) !== String(patientId)) {
    throw new Error("Forbidden");
  }
  return doc;
};

export const medicalRecordService = {
  createRecord,
  getByPatient,
  getById,
  getByIdForPatient,
  updateRecord,
  deleteRecord,
};
