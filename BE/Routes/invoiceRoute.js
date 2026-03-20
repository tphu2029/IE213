import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { checkRole } from "../Middlewares/roleMiddleware.js";
import { requirePatient } from "../Middlewares/patientContextMiddleware.js";
import { invoiceController } from "../Controllers/invoiceController.js";

const router = express.Router();

const readers = ["admin", "receptionist", "doctor"];
const writers = ["admin", "receptionist"];

router.get(
  "/me",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  invoiceController.getMine,
);

router.get(
  "/me/:id",
  verifyToken,
  checkRole("patient"),
  requirePatient,
  invoiceController.getMyById,
);

router.get(
  "/",
  verifyToken,
  checkRole(...readers),
  invoiceController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole(...readers),
  invoiceController.getById,
);

router.post(
  "/",
  verifyToken,
  checkRole(...writers),
  invoiceController.create,
);

router.patch(
  "/:id",
  verifyToken,
  checkRole(...writers),
  invoiceController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(...writers),
  invoiceController.remove,
);

export const invoiceRoute = router;
