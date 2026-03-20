import { userModel } from "../Models/userModel.js";
import { patientModel } from "../Models/patientModel.js";
const getAllPatients = async () => {
  const patients = await userModel.getUsersByRole("patient");
  return patients;
};

const createPatient = async (data) => {
  const { user_id, gender, birth_date, address } = data;
  //Check user tồn tại
  const user = await userModel.getUserById(user_id);
  if (!user) {
    throw new Error("User không tồn tại");
  }

  const patient = await patientModel.createPatient({
    user_id,
    gender,
    birth_date,
    address,
  });
  return patient;
};

export const patientService = {
  getAllPatients,
  createPatient,
};
