import api from "../../lib/axios";
import {
  Appointment,
  MedicalHistory,
  MedicalRecord,
  User,
  Medicine,
  Invoice,
} from "./types";

// AUTH & USERS
export const authService = {
  login: (creds: any) => api.post("/auth/login", creds),
  register: (data: any) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  // Nếu là "me" thì gọi thẳng vào /users/
  getProfile: (id: string | "me") =>
    api.get(id === "me" ? "/users/" : `/users/${id}`),
  updateProfile: (data: any) => api.patch("/users/", data),
};

// HOSPITAL (DEPT, DOCTOR, SCHEDULE, APPOINTMENT)
export const hospitalService = {
  getDepartments: () => api.get("/departments/"),
  getDoctorsByDept: (id: string) => api.get(`/departments/${id}/doctors`),
  getDoctorSchedules: (doctorId: string) =>
    api.get(`/schedules/doctor/${doctorId}`),
  bookAppointment: (data: any) => api.post("/appointments/book", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}`, { status }),
};

// MEDICAL (RECORDS, HISTORY, MEDICINES)
export const medicalService = {
  getMyRecords: () => api.get("/medical-records/me"),
  getRecordById: (id: string) => api.get(`/medical-records/me/${id}`),
  createRecord: (data: any) => api.post("/medical-records/", data),

  getMyHistory: () => api.get("/medical-histories/me"),
  updateHistory: (data: any) => api.post("/medical-histories/", data),

  getMedicines: () => api.get("/medicines/"),
  getMedicineById: (id: string) => api.get(`/medicines/${id}`),

  getPrescription: (recordId: string) =>
    api.get(`/prescriptions/me/record/${recordId}`),
};

// BILLING (INVOICE, PAYMENT, NOTIF)
export const billingService = {
  getMyInvoices: () => api.get("/invoices/me"),
  createInvoice: (data: any) => api.post("/invoices/", data),
  getMyPayments: () => api.get("/payments/me"),
  getNotifications: () => api.get("/notifications/me"),
  markNotifRead: (id: string) => api.patch(`/notifications/${id}/read`),
};
