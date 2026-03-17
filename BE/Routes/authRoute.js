import express from "express";
import { authController } from "../Controllers/authController.js";
import {
  registerValidate,
  loginValidate,
} from "../Middlewares/authValidate.js";

import { verifyToken } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidate, authController.register);

router.post("/login", loginValidate, authController.login);

router.post("/logout", verifyToken, authController.logout);

export const authRoute = router;
