import { departmentService } from "../Services/departmentService.js";
import { doctorModel } from "../Models/doctorModel.js";

const createDepartment = async (req, res) => {
  try {
    const department = await departmentService.createDepartment(req.body);
    res.status(201).json({
      success: true,
      message: "Tạo khoa thành công",
      data: department,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy danh sách bác sĩ thuộc 1 khoa cụ thể
const getDoctorsInDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const doctors = await departmentService.getDoctorsByDepartment(
      departmentId
    );

    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    res.status(200).json({ success: true, data: department });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const departmentController = {
  createDepartment,
  getAllDepartments,
  getDoctorsInDepartment,
  getDepartmentById,
};
