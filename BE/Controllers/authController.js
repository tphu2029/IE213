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
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};

export const authController = {
  register,
  login,
};
