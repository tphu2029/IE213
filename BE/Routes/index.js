import e from "express";
import { authRoute } from "./authRoute.js";
import { userRoute } from "./userRoute.js";
import { patientRoute } from "./patientRoute.js";
import { googleRoute } from "./googleRoute.js";
import { appointmentRoute } from "./appointmentRoute.js";
import { doctorRoute } from "./doctorRoute.js";
import { doctorScheduleRoute } from "./doctorScheduleRoute.js";
import { departmentRoute } from "./departmentRoute.js";
import { medicalRecordRoute } from "./medicalRecordRoute.js";
import { medicalHistoryRoute } from "./medicalHistoryRoute.js";
import { prescriptionRoute } from "./prescriptionRoute.js";
import { medicineRoute } from "./medicineRoute.js";
import { invoiceRoute } from "./invoiceRoute.js";
import { paymentRoute } from "./paymentRoute.js"; // Import mới
import { notificationRoute } from "./notificationRoute.js";
import { reportRoute } from "./reportRoute.js";

const router = e.Router();

router.use("/auth", authRoute);
router.use("/auth", googleRoute);
router.use("/users", userRoute);
router.use("/doctors", doctorRoute);
router.use("/appointments", appointmentRoute);
router.use("/patients", patientRoute);
router.use("/departments", departmentRoute);
router.use("/schedules", doctorScheduleRoute);
router.use("/medical-records", medicalRecordRoute);
router.use("/medical-histories", medicalHistoryRoute);
router.use("/prescriptions", prescriptionRoute);
router.use("/medicines", medicineRoute);
router.use("/invoices", invoiceRoute);
router.use("/payments", paymentRoute); // Đăng ký route Webhook
router.use("/notifications", notificationRoute);
router.use("/reports", reportRoute);

export const API_v1 = router;
