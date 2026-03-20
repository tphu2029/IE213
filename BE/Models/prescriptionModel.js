import mongoose from "mongoose";

const COLLECTION_NAME = "prescriptions";
const prescriptionSchema = new mongoose.Schema({
  record_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medical_records",
  },

  medicine_name: String,

  dosage: String,

  duration: String,
});

const Prescription = mongoose.model(COLLECTION_NAME, prescriptionSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createPrescription = async (prescriptionData) => {
  return await Prescription.create(prescriptionData);
};

const getPrescriptionsByRecordId = async (recordId) => {
  return await Prescription.find({ record_id: recordId });
};

const updatePrescription = async (id, updateData) => {
  return await Prescription.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePrescription = async (id) => {
  return await Prescription.findByIdAndDelete(id);
};

export const prescriptionModel = {
  createPrescription,
  getPrescriptionsByRecordId,
  updatePrescription,
  deletePrescription,
};
