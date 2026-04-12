import { userModel } from "../Models/userModel.js";
import { patientModel } from "../Models/patientModel.js";
import bcrypt from "bcrypt";

const getProfileById = async (userId) => {
  const user = await userModel.getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const userProfile = user.toObject();
  delete userProfile.password;
  delete userProfile.refreshToken;

  const patient = await patientModel.getPatientByUserId(userId);
  if (patient) {
    userProfile.gender = patient.gender;
    userProfile.birth_date = patient.birth_date;
    userProfile.address = patient.address;
    userProfile.cccd = patient.cccd;
  }

  return userProfile;
};

const updateProfile = async (user_id, updateData) => {
  const { username, email, phone, avatar } = updateData;

  // Xử lý chuyển đổi kí tự Windows file path `\` thành `/` cho trình duyệt web đọc
  const normalizedAvatar = avatar ? avatar.replace(/\\/g, "/") : undefined;

  const updatedUser = await userModel.updateUser(user_id, {
    username,
    email,
    phone,
    ...(normalizedAvatar && { avatar: normalizedAvatar }),
  });

  //Kiểm tra đúng biến cập nhật thay vì tên của hàm
  if (!updatedUser) {
    throw new Error("Failed to update profile");
  }

  const userProfile = updatedUser.toObject();
  delete userProfile.refreshToken;
  delete userProfile.password;

  return userProfile;
};

const changePassword = async (userId, passwordData) => {
  const { oldPassword, newPassword } = passwordData;

  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Invalid old password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await userModel.updateUser(userId, { password: hashedNewPassword });

  return { message: "Password changed successfully" };
};

const getAllUsers = async () => {
  const users = await userModel.getAllUsers();

  return users.map((user) => {
    const userInfo = user.toObject();
    delete userInfo.password;
    delete userInfo.refreshToken;
    return userInfo;
  });
};

export const userService = {
  getProfileById,
  updateProfile,
  changePassword,
  getAllUsers,
};
