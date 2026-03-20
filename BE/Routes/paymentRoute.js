import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { requirePatient } from "../Middlewares/patientContextMiddleware.js";
import { paymentController } from "../Controllers/paymentController.js";

const router = express.Router();

const readers = ["admin", "receptionist", "doctor"];
const writers = ["admin", "receptionist"];

router.get(
  "/me",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  paymentController.getMine,
);

router.get(
  "/me/:id",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  paymentController.getMyById,
);

router.get(
  "/",
  verifyToken,
  checkRole(...readers),
  paymentController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole(...readers),
  paymentController.getById,
);

router.post(
  "/",
  verifyToken,
  checkRole(...writers),
  paymentController.create,
);

router.patch(
  "/:id",
  verifyToken,
  checkRole(...writers),
  paymentController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(...writers),
  paymentController.remove,
);

export const paymentRoute = router;
