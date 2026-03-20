import { paymentService } from "../Services/paymentService.js";

const create = async (req, res) => {
  try {
    const data = await paymentService.createPayment(req.body);
    res.status(201).json({ message: "Payment created", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await paymentService.getAll();
    res.json({ message: "Payments", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await paymentService.getById(req.params.id);
    res.json({ message: "Payment", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await paymentService.updatePayment(req.params.id, req.body);
    res.json({ message: "Payment updated", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await paymentService.deletePayment(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const getMine = async (req, res) => {
  try {
    const data = await paymentService.getByPatient(req.patientId);
    res.json({ message: "My payments", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyById = async (req, res) => {
  try {
    const data = await paymentService.getByIdForPatient(
      req.params.id,
      req.patientId,
    );
    res.json({ message: "Payment", data });
  } catch (error) {
    const status =
      error.message === "Forbidden"
        ? 403
        : error.message.includes("not found")
          ? 404
          : 500;
    res.status(status).json({ message: error.message });
  }
};

export const paymentController = {
  create,
  getAll,
  getById,
  getMine,
  getMyById,
  update,
  remove,
};
