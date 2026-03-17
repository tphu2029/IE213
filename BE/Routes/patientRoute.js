import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { patientController } from "../Controllers/patientController.js";

const router = express.Router();

router.get(
  "/patients",
  verifyToken,
  checkRole("doctor", "admin"),
  patientController.getPatients
);

export const patientRoute = router;
