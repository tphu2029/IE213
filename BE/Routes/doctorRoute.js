import e, { Router } from "express";
import { doctorController } from "../Controllers/doctorController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
const router = e.Router();

router.get(
  "/",
  verifyToken,
  doctorController.getDoctors
);

router.get(
  "/:id",
  verifyToken,
  doctorController.getDoctorDetail
);

router.post("/", verifyToken,
  checkRole("admin"),doctorController.createDoctor);

export const doctorRoute = router;
