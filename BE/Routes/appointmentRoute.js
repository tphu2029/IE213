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

// [DOCTOR] Lấy lịch hẹn của bác sĩ đang đăng nhập
router.get(
  "/doctor-appointments",
  verifyToken,
  checkRole("doctor"),
  appointmentController.getDoctorAppointments
);

// [DOCTOR/ADMIN] Cập nhật trạng thái lịch hẹn
router.patch(
  "/:id/status",
  verifyToken,
  checkRole("doctor", "admin"),
  appointmentController.updateStatus
);

// [ADMIN] Lấy tất cả lịch hẹn
router.get(
  "/admin/all",
  verifyToken,
  checkRole("admin"),
  appointmentController.getAllAppointments
);

// [ADMIN] Xóa lịch hẹn
router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  appointmentController.deleteAppointment
);

export const appointmentRoute = router;
