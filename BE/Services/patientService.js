import { userModel } from "../Models/userModel.js";
import { patientModel } from "../Models/patientModel.js";

const createPatient = async (data) => {
  const {
    user_id,
    gender,
    birth_date,
    address,
    blood_group,
    height,
    weight,
    allergies,
    chronic_diseases,
  } = data;

  const user = await userModel.getUserById(user_id);
  if (!user) throw new Error("User không tồn tại");

  const existingPatient = await patientModel.getPatientByUserId(user_id);

  const payload = {
    gender,
    birth_date,
    address,
    blood_group,
    height,
    weight,
    allergies,
    chronic_diseases,
  };

  if (existingPatient) {
    return await patientModel.updatePatient(existingPatient._id, payload);
  } else {
    return await patientModel.createPatient({ user_id, ...payload });
  }
};

export const patientService = { createPatient };
