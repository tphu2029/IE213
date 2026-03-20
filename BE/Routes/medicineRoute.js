import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { medicineController } from "../Controllers/medicineController.js";

const router = express.Router();

const readers = ["doctor", "admin", "receptionist", "patient"];

router.get(
  "/",
  verifyToken,
  checkRole(...readers),
  medicineController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole(...readers),
  medicineController.getById,
);

router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  medicineController.create,
);

router.patch(
  "/:id",
  verifyToken,
  checkRole("admin"),
  medicineController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  medicineController.remove,
);

export const medicineRoute = router;
