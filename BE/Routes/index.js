import e from "express";
import { authRoute } from "./authRoute.js";
import { userRoute } from "./userRoute.js";
import { patientRoute } from "./patientRoute.js";
import { googleRoute } from "./googleRoute.js";
import { appointmentRoute } from "./appointmentRoute.js";
import { doctorRoute } from "./doctorRoute.js";

const router = e.Router();

//auth
router.use("/auth", authRoute);
router.use("/auth", googleRoute);

//user
router.use("/user", userRoute);

//doctor
router.use("/doctor", doctorRoute);

//appointment
router.use("/appointment", appointmentRoute);

//patient
router.use("/check", patientRoute);

export const API_v1 = router;
