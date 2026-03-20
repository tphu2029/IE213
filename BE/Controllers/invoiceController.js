import { invoiceService } from "../Services/invoiceService.js";

const create = async (req, res) => {
  try {
    const data = await invoiceService.createInvoice(req.body);
    res.status(201).json({ message: "Invoice created", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await invoiceService.getAll();
    res.json({ message: "Invoices", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await invoiceService.getById(req.params.id);
    res.json({ message: "Invoice", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await invoiceService.updateInvoice(req.params.id, req.body);
    res.json({ message: "Invoice updated", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await invoiceService.deleteInvoice(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const getMine = async (req, res) => {
  try {
    const data = await invoiceService.getByPatient(req.patientId);
    res.json({ message: "My invoices", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyById = async (req, res) => {
  try {
    const data = await invoiceService.getByIdForPatient(
      req.params.id,
      req.patientId,
    );
    res.json({ message: "Invoice", data });
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

export const invoiceController = {
  create,
  getAll,
  getById,
  getMine,
  getMyById,
  update,
  remove,
};
