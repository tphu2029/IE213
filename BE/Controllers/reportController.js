import { reportService } from "../Services/reportService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const result = await reportService.getDashboardStats();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
