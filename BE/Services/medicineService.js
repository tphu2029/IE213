import { medicineModel } from "../Models/medicineModel.js";

const createMedicine = async (data) => {
  return await medicineModel.createMedicine(data);
};

const getAll = async () => {
  return await medicineModel.getAllMedicines();
};

const getById = async (id) => {
  const doc = await medicineModel.getMedicineById(id);
  if (!doc) {
    throw new Error("Medicine not found");
  }
  return doc;
};

const updateMedicine = async (id, updateData) => {
  const doc = await medicineModel.updateMedicine(id, updateData);
  if (!doc) {
    throw new Error("Medicine not found");
  }
  return doc;
};

const deleteMedicine = async (id) => {
  const doc = await medicineModel.deleteMedicine(id);
  if (!doc) {
    throw new Error("Medicine not found");
  }
  return doc;
};

export const medicineService = {
  createMedicine,
  getAll,
  getById,
  updateMedicine,
  deleteMedicine,
};
