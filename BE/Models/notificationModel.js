import mongoose from "mongoose";

const COLLECTION_NAME = "notifications";
const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  message: String,

  status: {
    type: String,
    enum: ["unread", "read"],
    default: "unread",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model(COLLECTION_NAME, notificationSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
};

const getNotificationsByUserId = async (userId) => {
  return await Notification.find({ user_id: userId });
};

const updateNotificationStatus = async (id, status) => {
  return await Notification.findById
    .findByIdAndUpdate(id, { status }, { new: true })
    .populate("user_id");
};

const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

export const notificationModel = {
  createNotification,
  getNotificationsByUserId,
  updateNotificationStatus,
  deleteNotification,
};
