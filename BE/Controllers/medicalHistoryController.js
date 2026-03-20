import { medicalHistoryService } from "../Services/medicalHistoryService.js";

const create = async (req, res) => {
  try {
    const data = await medicalHistoryService.createHistory(req.body);
    res.status(201).json({ message: "Medical history created", data });
  } catch (error) {
    const status =
      error.message.includes("already exists") ? 409 : 500;
    res.status(status).json({ message: error.message });
  }
};

const getByPatient = async (req, res) => {
  try {
    const data = await medicalHistoryService.getByPatient(req.params.patientId);
    res.json({ message: "Medical history", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await medicalHistoryService.getById(req.params.id);
    res.json({ message: "Medical history", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await medicalHistoryService.updateHistory(req.params.id, req.body);
    res.json({ message: "Medical history updated", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await medicalHistoryService.deleteHistory(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

/** Bệnh nhân: tiền sử của mình (có thể null) */
const getMine = async (req, res) => {
  try {
    const data = await medicalHistoryService.getByPatientOrNull(req.patientId);
    res.json({
      message: data ? "Medical history" : "No medical history yet",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const medicalHistoryController = {
  create,
  getByPatient,
  getById,
  getMine,
  update,
  remove,
};
