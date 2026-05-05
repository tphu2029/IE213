import express from "express";
import { appointmentController } from "../Controllers/appointmentController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { validateBookAppointment } from "../Middlewares/appointmentValidate.js";
const router = express.Router();

router.post(
  "/book",
  verifyToken,
  validateBookAppointment,
  appointmentController.createAppointment,
);
router.get(
  "/my-appointments",
  verifyToken,
  checkRole("patient"),
  appointmentController.getMyHistory,
);
router.get(
  "/doctor-appointments",
  verifyToken,
  checkRole("doctor"),
  appointmentController.getDoctorAppointments,
);
router.patch(
  "/:id/status",
  verifyToken,
  checkRole("doctor", "admin"),
  appointmentController.updateStatus,
);
// Bệnh nhân tự huỷ lịch của mình
router.patch(
  "/:id/cancel",
  verifyToken,
  checkRole("patient"),
  appointmentController.cancelAppointment,
);
router.get(
  "/admin/all",
  verifyToken,
  checkRole("admin"),
  appointmentController.getAllAppointments,
);
router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  appointmentController.deleteAppointment,
);

// Route để FE kiểm tra tiền đã về chưa
router.get("/check-status/:id", verifyToken, appointmentController.checkStatus);

export const appointmentRoute = router;

