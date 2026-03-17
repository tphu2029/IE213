import mongoose from "mongoose";

const COLLECTION_NAME = "users";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "doctor", "patient", "receptionist"],
      default: "patient",
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model(COLLECTION_NAME, userSchema);

const createUser = async (userData) => {
  return await UserModel.create(userData);
};

const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

const getAllUsers = async () => {
  return await UserModel.find();
};

const getUserById = async (id) => {
  return await UserModel.findById(id);
};

const updateUser = async (id, updateData) => {
  return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

const getUsersByRole = async (role) => {
  return await UserModel.find({ role });
};

export const userModel = {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByRole,
};
