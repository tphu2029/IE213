import { userModel } from "../Models/userModel.js";

const getAllPatients = async () => {
  const patients = await userModel.getUsersByRole("patient");
  return patients;
};

export const patientService = {
  getAllPatients,
};
