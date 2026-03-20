import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { requirePatient } from "../Middlewares/patientContextMiddleware.js";
import { medicalHistoryController } from "../Controllers/medicalHistoryController.js";

const router = express.Router();

const clinical = ["doctor", "admin"];

router.post(
  "/",
  verifyToken,
  checkRole(...clinical),
  medicalHistoryController.create,
);

router.get(
  "/me",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  medicalHistoryController.getMine,
);

router.get(
  "/patient/:patientId",
  verifyToken,
  checkRole(...clinical),
  medicalHistoryController.getByPatient,
);

router.get(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  medicalHistoryController.getById,
);

router.patch(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  medicalHistoryController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  medicalHistoryController.remove,
);

export const medicalHistoryRoute = router;
