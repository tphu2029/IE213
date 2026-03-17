import { userService } from "../Services/userService.js";

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await userService.getProfileById(userId);

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const userController = {
  getProfile,
};
