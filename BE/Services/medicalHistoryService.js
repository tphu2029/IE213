import { medicalHistoryModel } from "../Models/medicalHistoryModel.js";

const createHistory = async (data) => {
  const existing = await medicalHistoryModel.getMedicalHistoryByPatientId(
    data.patient_id,
  );
  if (existing) {
    throw new Error("Medical history already exists for this patient");
  }
  return await medicalHistoryModel.createMedicalHistory(data);
};

const getByPatient = async (patientId) => {
  const doc = await medicalHistoryModel.getMedicalHistoryByPatientId(patientId);
  if (!doc) {
    throw new Error("Medical history not found for this patient");
  }
  return doc;
};

/** Cho bệnh nhân xem tiền sử — chưa có thì trả null */
const getByPatientOrNull = async (patientId) => {
  return await medicalHistoryModel.getMedicalHistoryByPatientId(patientId);
};

const getById = async (id) => {
  const doc = await medicalHistoryModel.getMedicalHistoryById(id);
  if (!doc) {
    throw new Error("Medical history not found");
  }
  return doc;
};

const updateHistory = async (id, updateData) => {
  const doc = await medicalHistoryModel.updateMedicalHistory(id, updateData);
  if (!doc) {
    throw new Error("Medical history not found");
  }
  return doc;
};

const deleteHistory = async (id) => {
  const doc = await medicalHistoryModel.deleteMedicalHistory(id);
  if (!doc) {
    throw new Error("Medical history not found");
  }
  return doc;
};

export const medicalHistoryService = {
  createHistory,
  getByPatient,
  getByPatientOrNull,
  getById,
  updateHistory,
  deleteHistory,
};
