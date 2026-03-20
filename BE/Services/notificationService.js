import { notificationModel } from "../Models/notificationModel.js";

const createNotification = async (data) => {
  return await notificationModel.createNotification(data);
};

const getMine = async (userId) => {
  return await notificationModel.getNotificationsByUserId(userId);
};

const markAsRead = async (id, currentUserId) => {
  const notif = await notificationModel.getNotificationById(id);
  if (!notif) {
    throw new Error("Notification not found");
  }
  if (String(notif.user_id) !== String(currentUserId)) {
    throw new Error("Forbidden");
  }
  return await notificationModel.updateNotificationStatus(id, "read");
};

const deleteMine = async (id, currentUserId) => {
  const notif = await notificationModel.getNotificationById(id);
  if (!notif) {
    throw new Error("Notification not found");
  }
  if (String(notif.user_id) !== String(currentUserId)) {
    throw new Error("Forbidden");
  }
  return await notificationModel.deleteNotification(id);
};

export const notificationService = {
  createNotification,
  getMine,
  markAsRead,
  deleteMine,
};
