import e, { Router } from "express";
import { doctorController } from "../Controllers/doctorController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
const router = e.Router();

router.get(
  "/",
  verifyToken,
  checkRole("doctor", "admin"),
  doctorController.getDoctors
);
router.get(
  "/:id",
  verifyToken,
  checkRole("doctor", "admin"),
  doctorController.getDoctorDetail
);

export const doctorRoute = router;
