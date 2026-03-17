import e from "express";

import { userController } from "../Controllers/userController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
const router = e.Router();

router
  .get("/:id", verifyToken, userController.getProfile)
  .patch("/", verifyToken, userController.updateProfile)
  .get("/", verifyToken, checkRole("admin"), userController.getAllUsers)
  .patch("/reset-password", verifyToken, userController.changePassword);
export const userRoute = router;
