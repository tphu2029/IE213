import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { requirePatient } from "../Middlewares/patientContextMiddleware.js";
import { medicalRecordController } from "../Controllers/medicalRecordController.js";

const router = express.Router();

const clinical = ["doctor", "admin"];

router.post(
  "/",
  verifyToken,
  checkRole(...clinical),
  medicalRecordController.create,
);

router.get(
  "/me",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  medicalRecordController.getMine,
);

router.get(
  "/me/:id",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  medicalRecordController.getMyById,
);

router.get(
  "/patient/:patientId",
  verifyToken,
  checkRole(...clinical),
  medicalRecordController.getByPatient,
);

router.get(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  medicalRecordController.getById,
);

router.patch(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  medicalRecordController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  medicalRecordController.remove,
);

export const medicalRecordRoute = router;
