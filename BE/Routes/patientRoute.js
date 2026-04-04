import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { patientController } from "../Controllers/patientController.js";

const router = express.Router();

// Thêm verifyToken vào đây để lấy được thông tin user từ JWT
router.post("/", verifyToken, patientController.createPatient);
router.get("/", verifyToken, patientController.getPatients);

export const patientRoute = router;
