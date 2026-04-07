import { userModel } from "../Models/userModel.js";
import { patientModel } from "../Models/patientModel.js";
const getAllPatients = async () => {
  const patients = await userModel.getUsersByRole("patient");
  return patients;
};

const createPatient = async (data) => {
  const { user_id, gender, birth_date, address, cccd } = data;
  //Check user tồn tại
  const user = await userModel.getUserById(user_id);
  if (!user) {
    throw new Error("User không tồn tại");
  }

  let patient = await patientModel.getPatientByUserId(user_id);
  if (patient) {
    patient = await patientModel.updatePatient(patient._id, { gender, birth_date, address, cccd });
  } else {
    patient = await patientModel.createPatient({
      user_id,
      gender,
      birth_date,
      address,
      cccd,
    });
  }
  return patient;
};

export const patientService = {
  getAllPatients,
  createPatient,
};
