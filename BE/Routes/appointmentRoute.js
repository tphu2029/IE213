import express from "express";
import { appointmentController } from "../Controllers/appointmentController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

// Đặt lịch khám: Yêu cầu đăng nhập và có role là "patient"
router.post(
  "/book",
  verifyToken,
  checkRole("patient"),
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
