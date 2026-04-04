import e from "express";
import { upload } from "../utils/upload.js";
import { userController } from "../Controllers/userController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";

const router = e.Router();

// Route này để người dùng (Patient/Doctor) tự lấy profile của mình
router.get("/me", verifyToken, userController.getProfile);

// Route cập nhật thông tin cá nhân
router.patch(
  "/",
  verifyToken,
  upload.single("avatar"),
  userController.updateProfile,
);

// Route đổi mật khẩu
router.patch("/reset-password", verifyToken, userController.changePassword);

// Route dành cho Admin: Lấy danh sách tất cả user hoặc xem profile cụ thể của ai đó
router.get("/", verifyToken, checkRole("admin"), userController.getAllUsers);
router.get("/:id", verifyToken, checkRole("admin"), userController.getProfile);

export const userRoute = router;
