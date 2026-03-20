import { prescriptionService } from "../Services/prescriptionService.js";

const create = async (req, res) => {
  try {
    const data = await prescriptionService.createPrescription(req.body);
    res.status(201).json({ message: "Prescription created", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByRecord = async (req, res) => {
  try {
    const data = await prescriptionService.getByRecord(req.params.recordId);
    res.json({ message: "Prescriptions", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await prescriptionService.updatePrescription(req.params.id, req.body);
    res.json({ message: "Prescription updated", data });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await prescriptionService.deletePrescription(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

/** Bệnh nhân: đơn thuốc theo bệnh án của mình */
const getMineByRecord = async (req, res) => {
  try {
    const data = await prescriptionService.getByRecordForPatient(
      req.params.recordId,
      req.patientId,
    );
    res.json({ message: "Prescriptions", data });
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

export const prescriptionController = {
  create,
  getByRecord,
  getMineByRecord,
  update,
  remove,
};
