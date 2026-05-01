import e from "express";
import { upload } from "../utils/upload.js";
import { userController } from "../Controllers/userController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { userService } from "../Services/userService.js";
const router = e.Router();

router
  .get("/admin/all", verifyToken, checkRole("admin"), userController.getAllUsers)
  .get("/:id", verifyToken, userController.getProfile)
  .patch(
    "/",
    verifyToken,
    upload.single("avatar"),
    userController.updateProfile
  )
  .patch("/reset-password", verifyToken, userController.changePassword);
export const userRoute = router;
