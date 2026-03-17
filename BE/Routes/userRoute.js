import e from "express";

import { userController } from "../Controllers/userController.js";

const router = e.Router();

router.get("/", userController.getProfile);

export const userRoute = router;
