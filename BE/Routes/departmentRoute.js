import e from "express";
import { departmentController } from "../Controllers/departmentController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";

const router = e.Router();

// Public APIs (Ai cũng xem được khoa và bác sĩ để đặt lịch)
router
  .get("/", departmentController.getAllDepartments)
  .get("/:id", departmentController.getDepartmentById)
  .get("/:id/doctors", departmentController.getDoctorsInDepartment); // API lấy bác sĩ theo khoa
// Admin APIs (Chỉ Admin mới được thêm/sửa/xóa Khoa)
router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  departmentController.createDepartment
);

export const departmentRoute = router;
