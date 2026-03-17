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

export const patientController = {
  getPatients,
};
