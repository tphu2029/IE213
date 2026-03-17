import e from "express";
import { authRoute } from "./authRoute.js";
import { userRoute } from "./userRoute.js";
import { patientRoute } from "./patientRoute.js";

const router = e.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/check", patientRoute);

export const API_v1 = router;
