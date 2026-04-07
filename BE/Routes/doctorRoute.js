import e from "express";
import { doctorController } from "../Controllers/doctorController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
const router = e.Router();

router.get(
  "/",
  verifyToken,
  checkRole("doctor", "admin", "patient"),
  doctorController.getDoctors,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("doctor", "admin", "patient"),
  doctorController.getDoctorDetail,
);

router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  doctorController.createDoctor,
);

export const doctorRoute = router;
