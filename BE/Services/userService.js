import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
// 1. Lấy thông tin cá nhân
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
// 2. Cập nhật thông tin cá nhân
const updateProfile = async (user_id, updateData) => {
  const { username, email, phone, avatar } = updateData;
  const updatedUser = await userModel.updateUser(user_id, {
    username,
    email,
    phone,
    avatar,
  });
  if (!updateProfile) {
    throw new Error("Failed to update profile");
  }
  const userProfile = updatedUser.toObject();
  delete userProfile.refreshToken;

  return userProfile;
};

// 3. Đổi mật khẩu
const changePassword = async (userId, passwordData) => {
  const { oldPassword, newPassword } = passwordData;

  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Kiểm tra mật khẩu cũ có khớp không
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Invalid old password");
  }

  // Mã hóa mật khẩu mới và lưu lại
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await userModel.updateUser(userId, { password: hashedNewPassword });

  return { message: "Password changed successfully" };
};

// 4. Lấy danh sách tất cả user (Dành cho Admin)
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
