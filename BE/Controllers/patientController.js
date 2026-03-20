import { patientService } from "../Services/patientService.js";

const getPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();

    res.json({
      message: "List of patients",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patients",
      error: error.message,
    });
  }
};

const createPatient = async (req, res) => {
  try {
    const patient = await patientService.createPatient(req.body);
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
export const patientController = {
  getPatients,
  createPatient,
};
