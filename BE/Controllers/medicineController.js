import { medicineService } from "../Services/medicineService.js";

const create = async (req, res) => {
  try {
    const data = await medicineService.createMedicine(req.body);
    res.status(201).json({ message: "Medicine created", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await medicineService.getAll();
    res.json({ message: "Medicines", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await medicineService.getById(req.params.id);
    res.json({ message: "Medicine", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await medicineService.updateMedicine(req.params.id, req.body);
    res.json({ message: "Medicine updated", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await medicineService.deleteMedicine(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const medicineController = {
  create,
  getAll,
  getById,
  update,
  remove,
};
