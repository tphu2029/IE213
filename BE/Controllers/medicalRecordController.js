import { medicalRecordService } from "../Services/medicalRecordService.js";

const create = async (req, res) => {
  try {
    const data = await medicalRecordService.createRecord(req.body);
    res.status(201).json({ message: "Medical record created", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByPatient = async (req, res) => {
  try {
    const data = await medicalRecordService.getByPatient(req.params.patientId);
    res.json({ message: "Medical records", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await medicalRecordService.getById(req.params.id);
    res.json({ message: "Medical record", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await medicalRecordService.updateRecord(req.params.id, req.body);
    res.json({ message: "Medical record updated", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await medicalRecordService.deleteRecord(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

/** Bệnh nhân: danh sách bệnh án của mình */
const getMine = async (req, res) => {
  try {
    const data = await medicalRecordService.getByPatient(req.patientId);
    res.json({ message: "My medical records", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Bệnh nhân: một bệnh án nếu thuộc về mình */
const getMyById = async (req, res) => {
  try {
    const data = await medicalRecordService.getByIdForPatient(
      req.params.id,
      req.patientId,
    );
    res.json({ message: "Medical record", data });
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

export const medicalRecordController = {
  create,
  getByPatient,
  getById,
  getMine,
  getMyById,
  update,
  remove,
};
