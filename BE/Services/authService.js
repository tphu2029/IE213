import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import Session from "../Models/sessionModel.js";

const toPublicUser = (user) => ({
  id: user._id,
  email: user.email,
  role: user.role,
});

/** Tạo JWT + lưu Session — dùng chung cho login email và Google */
const createSessionAndTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await Session.create({
    userId: user._id,
    refreshToken,
  });

  return {
    user: toPublicUser(user),
    accessToken,
    refreshToken,
  };
};

const register = async (body) => {
  const { username, email, phone, password, role } = body;

  const existUser = await userModel.findUserByEmail(email);

  if (existUser) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.createUser({
    username,
    email,
    phone,
    password: hashPassword,
    role,
  });

  return newUser;
};

const login = async (body) => {
  const { email, password } = body;

  const user = await userModel.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error("USE_GOOGLE_LOGIN");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid password");
  }

  return createSessionAndTokens(user);
};

/** Sau khi Passport Google xác thực xong — cùng luồng token/session với login */
const completeOAuthLogin = async (user) => {
  return createSessionAndTokens(user);
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is missing");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new Error("Invalid or expired refresh token");
  }

  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw new Error("Session not found or revoked");
  }

  const user = await userModel.getUserById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    user: toPublicUser(user),
  };
};

const logout = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error("Refresh token is missing");
    }

    const session = await Session.findOneAndDelete({ refreshToken });

    if (!session) {
      throw new Error("Session not found");
    }

    return {
      message: "Logout successful",
    };
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};

export const authService = {
  register,
  login,
  completeOAuthLogin,
  refreshAccessToken,
  logout,
};
