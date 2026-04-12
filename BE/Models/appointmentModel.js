import mongoose from "mongoose";

const COLLECTION_NAME = "appointments";

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: true,
    },
    appointment_date: { type: Date, required: true },
    shift: { type: String, enum: ["Morning", "Afternoon"], required: true },
    stt: { type: Number },
    hasInsurance: { type: Boolean, default: false },
    reason: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

// Index quan trọng: Chặn trùng STT trong cùng 1 ngày/buổi/bác sĩ
appointmentSchema.index(
  { doctor_id: 1, appointment_date: 1, shift: 1, stt: 1 },
  { unique: true },
);

const Appointment = mongoose.model(COLLECTION_NAME, appointmentSchema);

const createAppointment = async (appointmentData) => {
  return await Appointment.create(appointmentData);
};

const getAllAppointments = async () => {
  return await Appointment.find()
    .populate({ path: "patient_id", populate: { path: "user_id" } })
    .populate({ path: "doctor_id", populate: { path: "user_id" } })
    .sort({ createdAt: -1 });
};

const getAppointmentById = async (id) => {
  return await Appointment.findById(id)
    .populate({ path: "patient_id", populate: { path: "user_id" } })
    .populate({ path: "doctor_id", populate: { path: "user_id" } });
};

const updateAppointment = async (id, updateData) => {
  return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

const getAppointmentsByDoctor = async (doctorId) => {
  return await Appointment.find({ doctor_id: doctorId });
};

const getAppointmentsByPatient = async (patientId) => {
  return await Appointment.find({ patient_id: patientId })
    .populate({ path: "doctor_id", populate: { path: "user_id" } })
    .sort({ createdAt: -1 });
};

const getAppointmentsByDoctorPopulated = async (doctorId) => {
  return await Appointment.find({ doctor_id: doctorId })
    .populate({ path: "patient_id", populate: { path: "user_id" } })
    .sort({ appointment_date: 1, shift: 1, stt: 1 });
};

const countAppointments = async (filter = {}) => {
  return await Appointment.countDocuments(filter);
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
  getAppointmentsByDoctorPopulated,
  countAppointments,
  getAppointmentsCountByStatus,
};
