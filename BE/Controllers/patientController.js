import { patientService } from "../Services/patientService.js";

const createPatient = async (req, res) => {
  try {
    // Lấy ID từ token đã được verify ở Middleware
    const user_id = req.user.id;

    // Gộp user_id vào cùng dữ liệu body
    const patientData = { ...req.body, user_id };

    const patient = await patientService.createPatient(patientData);
    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const patientController = { getPatients, createPatient };
