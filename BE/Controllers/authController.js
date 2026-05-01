import { authService } from "../Services/authService.js";
import {
  setAuthCookies,
  clearAuthCookies,
  AUTH_COOKIE_OPTIONS,
} from "../utils/authCookies.js";

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(200).json({ message: "User registered successfully", result });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({
        message: "Email already exists",
        error: error.message,
      });
    }
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Error registering user", stack: error.stack });
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
      message: "User logged in successfully",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    if (error.message === "USE_GOOGLE_LOGIN") {
      return res.status(400).json({
        message:
          "Tài khoản này đăng ký qua Google. Vui lòng đăng nhập bằng Google.",
        error: error.message,
      });
    }
    if (error.message === "User not found" || error.message === "Invalid password") {
      return res.status(401).json({
        message: "Email hoặc mật khẩu không đúng",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

/** Lấy access token mới từ cookie refreshToken (không cần Bearer access) */
const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    const result = await authService.refreshAccessToken(token);

    res.cookie("accessToken", result.accessToken, AUTH_COOKIE_OPTIONS);

    res.status(200).json({
      message: "Token refreshed",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Refresh failed",
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    await authService.logout(token);

    clearAuthCookies(res);

    return res.sendStatus(204);
  } catch (error) {
    console.error("logout error", error);
    return res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};

export const authController = {
  register,
  login,
  refresh,
  logout,
};
