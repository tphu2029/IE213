import mongoose from "mongoose";

const COLLECTION_NAME = "appointments";

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
    },
    appointment_date: {
      type: Date,
    },
    time_slot: {
      type: String,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
//Hệ thống sẽ tự động ném ra lỗi nếu cố tình lưu 2 lịch giống nhau.
appointmentSchema.index(
  { doctor_id: 1, appointment_date: 1, time_slot: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "completed" } } } 
);

const Appointment = mongoose.model(COLLECTION_NAME, appointmentSchema);

// --- CÁC HÀM THAO TÁC VỚI DATABASE ---

const createAppointment = async (appointmentData) => {
  return await Appointment.create(appointmentData);
};

const getAllAppointments = async () => {
  return await Appointment.find().populate("patient_id").populate("doctor_id");
};

const getAppointmentById = async (id) => {
  return await Appointment.findById(id)
    .populate("patient_id")
    .populate("doctor_id");
};

const updateAppointment = async (id, updateData) => {
  return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

// Các hàm Appointment
const getAppointmentsByDoctor = async (doctorId) => {
  return await Appointment.find({ doctor_id: doctorId });
};

const getAppointmentsByPatient = async (patientId) => {
  return await Appointment.find({ patient_id: patientId });
};

// CÁC HÀM THỐNG KÊ 
const countAppointments = async () => {
  return await Appointment.countDocuments();
};

const getAppointmentsCountByStatus = async () => {
  return await Appointment.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
};

export const appointmentModel = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  countAppointments,
  getAppointmentsCountByStatus,
};
