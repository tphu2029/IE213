import mongoose from "mongoose";

const COLLECTION_NAME = "appointments";

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "patients" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "doctors" },
    appointment_date: { type: Date },
    time_slot: { type: String },
    reason: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

appointmentSchema.index(
  { doctor_id: 1, appointment_date: 1, time_slot: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" } } },
);

const Appointment = mongoose.model(COLLECTION_NAME, appointmentSchema);

const createAppointment = async (data) => await Appointment.create(data);

const getAllAppointments = async () => {
  return await Appointment.find().populate("patient_id").populate("doctor_id");
};

const getAppointmentById = async (id) => {
  return await Appointment.findById(id)
    .populate("patient_id")
    .populate("doctor_id");
};

// --- Deep Populate để lấy tên bác sĩ ---
const getAppointmentsByPatient = async (patientId) => {
  return await Appointment.find({ patient_id: patientId })
    .populate({
      path: "doctor_id",
      populate: {
        path: "user_id",
        select: "username", // Chỉ lấy field username của bác sĩ
      },
    })
    .sort({ createdAt: -1 }); // Hiện lịch mới nhất lên đầu
};

export const appointmentModel = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByPatient,
};
