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
import { paymentRoute } from "./paymentRoute.js";
import { notificationRoute } from "./notificationRoute.js";
import { reportRoute } from "./reportRoute.js";

const router = e.Router();

//auth
router.use("/auth", authRoute);
router.use("/auth", googleRoute);

//user
router.use("/users", userRoute);

//doctor
router.use("/doctors", doctorRoute);

//appointment
router.use("/appointments", appointmentRoute);

//patient
router.use("/patients", patientRoute);

//departments
router.use("/departments", departmentRoute);

//schedules
router.use("/schedules", doctorScheduleRoute);

// clinical & catalog
router.use("/medical-records", medicalRecordRoute);
router.use("/medical-histories", medicalHistoryRoute);
router.use("/prescriptions", prescriptionRoute);
router.use("/medicines", medicineRoute);

// billing
router.use("/invoices", invoiceRoute);
router.use("/payments", paymentRoute);

// notifications
router.use("/notifications", notificationRoute);

// reports
router.use("/reports", reportRoute);

export const API_v1 = router;
