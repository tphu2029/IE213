import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { patientController } from "../Controllers/patientController.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// --- ROUTE CHO ADMIN  ---
router.get(
  "/admin/all",
  verifyToken,
  checkRole("admin"),
  patientController.getAllPatients,
);
router.patch(
  "/admin/verify/:id",
  verifyToken,
  checkRole("admin"),
  patientController.adminVerifyBHYT,
);

// --- ROUTE CHO USER ---
router.patch("/profile", verifyToken, patientController.updatePatientProfile);
router.patch(
  "/update-bhyt",
  verifyToken,
  upload.single("bhyt_image"),
  patientController.updateBHYTInfo,
);

// --- ROUTE CHUNG ---
router.get(
  "/",
  verifyToken,
  checkRole("doctor", "admin"),
  patientController.getPatients,
);
router.post("/", patientController.createPatient);

export const patientRoute = router;
