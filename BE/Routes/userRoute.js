import e from "express";

import { userController } from "../Controllers/userController.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";
const router = e.Router();

router.get("/", verifyToken, userController.getProfile);

export const userRoute = router;
