import { userService } from "../Services/userService.js";

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await userService.getProfileById(userId);

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.file) {
      req.body.avatar = req.file.path;
    }

    const updatedUser = await userService.updateProfile(userId, req.body);
    res
      .status(200)
      .json({ success: true, message: "Profile updated", data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await userService.changePassword(userId, req.body);

    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userController = {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
};
