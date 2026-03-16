import e from "express";
import { authRoute } from "./authRoute.js";
import { userRoute } from "./userRoute.js";
const router = e.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);

export const API_v1 = router;
