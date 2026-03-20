import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { requirePatient } from "../Middlewares/patientContextMiddleware.js";
import { prescriptionController } from "../Controllers/prescriptionController.js";

const router = express.Router();

const clinical = ["doctor", "admin"];

router.post(
  "/",
  verifyToken,
  checkRole(...clinical),
  prescriptionController.create,
);

router.get(
  "/me/record/:recordId",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  prescriptionController.getMineByRecord,
);

router.get(
  "/record/:recordId",
  verifyToken,
  checkRole(...clinical),
  prescriptionController.getByRecord,
);

router.patch(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  prescriptionController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(...clinical),
  prescriptionController.remove,
);

export const prescriptionRoute = router;
