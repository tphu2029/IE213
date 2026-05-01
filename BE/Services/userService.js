import { userModel } from "../Models/userModel.js";
import { patientModel } from "../Models/patientModel.js";
import bcrypt from "bcrypt";

/**
 * Lấy thông tin chi tiết hồ sơ người dùng kèm thông tin bệnh nhân và BHYT
 */
const getProfileById = async (userId) => {
  // 1. Tìm thông tin cơ bản trong bảng Users
  const user = await userModel.getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Chuyển Mongoose Document sang Object thuần để thao tác
  const userProfile = user.toObject();

  // Bảo mật: Xóa các trường nhạy cảm trước khi gửi về Client
  delete userProfile.password;
  delete userProfile.refreshToken;

  // 2. Tìm thông tin chi tiết trong bảng Patients
  const patient = await patientModel.getPatientByUserId(userId);

  if (patient) {
    // Gán thông tin cá nhân mở rộng
    userProfile.gender = patient.gender;
    userProfile.birth_date = patient.birth_date;
    userProfile.address = patient.address;
    userProfile.cccd = patient.cccd;

    // Gán thông tin Bảo hiểm y tế (BHYT) - GIÚP GIỮ DỮ LIỆU KHI CHUYỂN TRANG
    userProfile.bhyt_code = patient.bhyt_code;
    userProfile.bhyt_initial_clinic = patient.bhyt_initial_clinic;
    userProfile.bhyt_expiration_date = patient.bhyt_expiration_date;
    userProfile.bhyt_status = patient.bhyt_status;
    userProfile.bhyt_proof_image = patient.bhyt_proof_image;
    userProfile.bhyt_note = patient.bhyt_note;
  } else {
    // Nếu chưa có hồ sơ bệnh nhân, gán mặc định để tránh lỗi ở FE
    userProfile.bhyt_status = "none";
  }

  return userProfile;
};

/**
 * Cập nhật thông tin cơ bản (Username, Phone, Avatar)
 */
const updateProfile = async (user_id, updateData) => {
  const { username, email, phone, avatar } = updateData;

  // Chuẩn hóa đường dẫn ảnh (thay dấu \ thành / để trình duyệt đọc được)
  const normalizedAvatar = avatar ? avatar.replace(/\\/g, "/") : undefined;

  const updatedUser = await userModel.updateUser(user_id, {
    username,
    email,
    phone,
    ...(normalizedAvatar && { avatar: normalizedAvatar }),
  });

  if (!updatedUser) {
    throw new Error("Failed to update profile");
  }

  const userProfile = updatedUser.toObject();
  delete userProfile.refreshToken;
  delete userProfile.password;

  return userProfile;
};

/**
 * Đổi mật khẩu người dùng
 */
const changePassword = async (userId, passwordData) => {
  const { oldPassword, newPassword } = passwordData;

  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Kiểm tra mật khẩu cũ
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Invalid old password");
  }

  // Mã hóa và lưu mật khẩu mới
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await userModel.updateUser(userId, { password: hashedNewPassword });

  return { message: "Password changed successfully" };
};

/**
 * Lấy danh sách toàn bộ người dùng (Dành cho Admin)
 */
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
