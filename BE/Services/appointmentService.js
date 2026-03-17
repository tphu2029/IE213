import { appointmentModel } from "../Models/appointmentModel.js";

const bookAppointment = async (patient_id, appointmentData) => {
  const { doctor_id, appointment_date, time_slot, reason } = appointmentData;

  const newAppointment = appointmentModel.createAppointment({
    patient_id,
    doctor_id,
    appointment_date,
    time_slot,
    reason,
    status: "pending",
  });

  return newAppointment;
};

const getPatientAppointments = async (patient_id) => {
  const appointments = await appointmentModel.getAppointmentById(patient_id);
  return appointments;
};

export const appointmentService = {
  getPatientAppointments,
  bookAppointment,
};
