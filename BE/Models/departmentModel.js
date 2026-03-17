import mongoose from "mongoose";

const COLLECTION_NAME = "departments";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

const Department = mongoose.model(COLLECTION_NAME, departmentSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createDepartment = async (departmentData) => {
  return await Department.create(departmentData);
};

const getAllDepartments = async () => {
  return await Department.find();
};

const getDepartmentById = async (id) => {
  return await Department.findById(id);
};

const updateDepartment = async (id, updateData) => {
  return await Department.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDepartment = async (id) => {
  return await Department.findByIdAndDelete(id);
};

export const departmentModel = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
