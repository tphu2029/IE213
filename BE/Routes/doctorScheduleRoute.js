import e from "express";
import { doctorScheduleController } from "../Controllers/doctorScheduleController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";

const router = e.Router();

// 1. Tạo lịch làm việc mới (Chỉ Bác sĩ hoặc Admin mới được tạo)
router.post(
  "/",
  verifyToken,
  checkRole("doctor", "admin"),
  doctorScheduleController.createSchedule
);

// 2. Bệnh nhân xem lịch làm việc của một bác sĩ cụ thể
router.get("/doctor/:doctorId", doctorScheduleController.getDoctorSchedules);

// 3. Sửa lịch làm việc (Chỉ Bác sĩ hoặc Admin)
router.patch(
  "/:id",
  verifyToken,
  checkRole("doctor", "admin"),
  doctorScheduleController.updateSchedule
);

// 4. Xóa lịch làm việc (Chỉ Bác sĩ hoặc Admin)
router.delete(
  "/:id",
  verifyToken,
  checkRole("doctor", "admin"),
  doctorScheduleController.deleteSchedule
);

export const doctorScheduleRoute = router;
