import express from "express";
import { getDashboardStats } from "../Controllers/reportController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  checkRole("admin"),
  getDashboardStats
);

export const reportRoute = router;
