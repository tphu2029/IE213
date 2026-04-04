import { userModel } from "../Models/userModel.js";
import { patientModel } from "../Models/patientModel.js";

const getProfileById = async (userId) => {
  const user = await userModel.getUserById(userId);
  if (!user) throw new Error("User not found");

  const patientData = await patientModel.getPatientByUserId(userId);
  const userProfile = user.toObject();

  delete userProfile.password;
  delete userProfile.refreshToken;

  return {
    ...userProfile,
    gender: patientData?.gender || "Nam",
    birth_date: patientData?.birth_date || "",
    address: patientData?.address || "",
    blood_group: patientData?.blood_group || "A",
    height: patientData?.height || 0,
    weight: patientData?.weight || 0,
    allergies: patientData?.allergies || "",
    chronic_diseases: patientData?.chronic_diseases || "",
  };
};

const updateProfile = async (user_id, updateData) => {
  const { username, phone } = updateData;
  const updatedUser = await userModel.updateUser(user_id, { username, phone });
  return updatedUser;
};

export const userService = {
  getProfileById,
  updateProfile,
};
