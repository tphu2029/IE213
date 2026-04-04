import { authService } from "../Services/authService.js";
import {
  setAuthCookies,
  clearAuthCookies,
  AUTH_COOKIE_OPTIONS,
} from "../utils/authCookies.js";

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
    // Bắt lỗi trùng Email (Tránh lỗi 500)
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: "Email này đã được đăng ký!" });
    }
    res
      .status(500)
      .json({ message: "Lỗi hệ thống khi đăng ký", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    setAuthCookies(res, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    res.status(200).json({
      message: "Logged in",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    res.status(401).json({ message: error.message || "Đăng nhập thất bại" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) await authService.logout(token);

    clearAuthCookies(res);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    clearAuthCookies(res); // Luôn clear cookies
    return res.status(200).json({ message: "Forced logout successful" });
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    const result = await authService.refreshAccessToken(token);
    res.cookie("accessToken", result.accessToken, AUTH_COOKIE_OPTIONS);
    res
      .status(200)
      .json({ accessToken: result.accessToken, user: result.user });
  } catch (error) {
    res.status(401).json({ message: "Refresh session expired" });
  }
};

export const authController = { register, login, refresh, logout };
