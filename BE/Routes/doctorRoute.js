import e from "express";
import { doctorController } from "../Controllers/doctorController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";

const router = e.Router();

// Lấy danh sách bác sĩ chung (Public)
router.get(
  "/",
  doctorController.getDoctors,
);

// [NEW] Lấy bác sĩ trống lịch (Đặt TRƯỚC :id để tránh bị nhầm là parameter)
router.get("/available", verifyToken, doctorController.getAvailableDoctors);

// Lấy profile bác sĩ của user đang đăng nhập
router.get(
  "/me",
  verifyToken,
  checkRole("doctor"),
  doctorController.getMyDoctorProfile,
);

// Chi tiết bác sĩ theo ID 
router.get(
  "/:id",
  doctorController.getDoctorDetail,
);

// Admin tạo bác sĩ mới
router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  doctorController.createDoctor,
);

export const doctorRoute = router;
