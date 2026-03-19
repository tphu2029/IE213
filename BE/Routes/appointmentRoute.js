import express from "express";
import { appointmentController } from "../Controllers/appointmentController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { validateBookAppointment } from "../Middlewares/appointmentValidate.js";
const router = express.Router();

// Đặt lịch khám không trùng lịch
router.post(
  "/book",
  verifyToken,
  validateBookAppointment,
  appointmentController.createAppointment
);

// Lấy danh sách lịch khám của bệnh nhân: Yêu cầu đăng nhập và role "patient"
router.get(
  "/my-appointments",
  verifyToken,
  checkRole("patient"),
  appointmentController.getMyHistory
);

export const appointmentRoute = router;
