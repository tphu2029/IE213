import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import Session from "../Models/sessionModel.js";

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

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // lưu session vào DB
  await Session.create({
    userId: user._id,
    refreshToken,
  });

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
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
  logout,
};
