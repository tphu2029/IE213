import { departmentModel } from "../Models/departmentModel.js";
import { doctorModel } from "../Models/doctorModel.js";
const createDepartment = async (data) => {
  return await departmentModel.createDepartment(data);
};

const getAllDepartments = async () => {
  return await departmentModel.getAllDepartments();
};

const getDepartmentById = async (id) => {
  const department = await departmentModel.getDepartmentById(id);
  if (!department) throw new Error("Không tìm thấy chuyên khoa");
  return department;
};

const updateDepartment = async (id, data) => {
  return await departmentModel.updateDepartment(id, data);
};

const deleteDepartment = async (id) => {
  return await departmentModel.deleteDepartment(id);
};

const getDoctorsByDepartment = async (departmentId) => {
  return await doctorModel.getDoctorsByDepartment(departmentId);
};

export const departmentService = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDoctorsByDepartment,
};
