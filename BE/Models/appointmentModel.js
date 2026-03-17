import mongoose from "mongoose";

const COLLECTION_NAME = "appointments";

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    appointment_date: {
      type: Date,
    },
    time_slot: {
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

// Các hàm đặc thù cho Appointment
const getAppointmentsByDoctor = async (doctorId) => {
  return await Appointment.find({ doctor_id: doctorId });
};

const getAppointmentsByPatient = async (patientId) => {
  return await Appointment.find({ patient_id: patientId });
};

export const appointmentModel = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
};
