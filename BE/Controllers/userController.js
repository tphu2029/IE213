const getProfile = async (req, res) => {
  try {
    const userId = req.data;
    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const userController = {
  getProfile,
};
