import e from "express";
import { authController } from "../Controllers/authController.js";

const router = e.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

export const authRoute = router;
