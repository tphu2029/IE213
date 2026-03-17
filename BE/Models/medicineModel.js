import mongoose from "mongoose";

const COLLECTION_NAME = "medicines";

const medicineSchema = new mongoose.Schema({
  name: String,

  description: String,

  price: Number,
});

const Medicine = mongoose.model(COLLECTION_NAME, medicineSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createMedicine = async (medicineData) => {
  return await Medicine.create(medicineData);
};

const getAllMedicines = async () => {
  return await Medicine.find();
};

const getMedicineById = async (id) => {
  return await Medicine.findById(id);
};

const updateMedicine = async (id, updateData) => {
  return await Medicine.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMedicine = async (id) => {
  return await Medicine.findByIdAndDelete(id);
};

export const medicineModel = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
