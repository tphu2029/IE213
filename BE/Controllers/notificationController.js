import { notificationService } from "../Services/notificationService.js";

const create = async (req, res) => {
  try {
    const data = await notificationService.createNotification(req.body);
    res.status(201).json({ message: "Notification created", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMine = async (req, res) => {
  try {
    const data = await notificationService.getMine(req.user.id);
    res.json({ message: "Notifications", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const data = await notificationService.markAsRead(req.params.id, req.user.id);
    res.json({ message: "Notification updated", data });
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await notificationService.deleteMine(req.params.id, req.user.id);
    res.sendStatus(204);
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const notificationController = {
  create,
  getMine,
  markRead,
  remove,
};
