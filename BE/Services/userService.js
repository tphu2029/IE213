import { userModel } from "../Models/userModel.js";

const getProfileById = async (userId) => {
  const user = await userModel.getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const userProfile = user.toObject();
  delete userProfile.password;
  delete userProfile.refreshToken;

  return userProfile;
};

export const userService = {
  getProfileById,
};
