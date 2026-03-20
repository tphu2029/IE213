import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { notificationController } from "../Controllers/notificationController.js";

const router = express.Router();

router.get("/me", verifyToken, notificationController.getMine);

router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  notificationController.create,
);

router.patch("/:id/read", verifyToken, notificationController.markRead);

router.delete("/:id", verifyToken, notificationController.remove);

export const notificationRoute = router;
