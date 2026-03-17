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
router.use("/users", userRoute);

//doctor
router.use("/doctors", doctorRoute);

//appointment
router.use("/appointments", appointmentRoute);

//patient
router.use("/check", patientRoute);

export const API_v1 = router;
