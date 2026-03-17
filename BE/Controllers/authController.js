import { authService } from "../Services/authService.js";

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(200).json({ message: "User registered successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    await authService.logout(token);

    res.clearCookie("refreshToken");

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
  logout,
};
