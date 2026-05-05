// ==================== COMMON ====================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
}

// ==================== USER & AUTH ====================
export interface User {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  role: "admin" | "doctor" | "patient";
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "doctor" | "patient";
  username?: string;
  avatar?: string;
}

// ==================== PATIENT ====================
export interface Patient {
  _id: string;
  user_id: User | string;
  gender?: string;
  birth_date?: string;
  address?: string;
  cccd?: string;
  bhyt_code?: string;
  bhyt_initial_clinic?: string;
  bhyt_expiration_date?: string;
  bhyt_proof_image?: string;
  bhyt_status: "none" | "pending" | "verified" | "rejected";
  bhyt_note?: string;
}

// ==================== DOCTOR ====================
export interface Doctor {
  _id: string;
  user_id: User | string;
  department_id: Department | string;
  specialization?: string;
  experience_years?: number;
  bio?: string;
}

// ==================== DEPARTMENT ====================
export interface Department {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
}

// ==================== APPOINTMENT ====================
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Appointment {
  _id: string;
  patient_id: Patient | string;
  doctor_id: Doctor | string;
  appointment_date: string;
  shift: "Morning" | "Afternoon";
  stt?: number;
  hasInsurance: boolean;
  reason?: string;
  status: AppointmentStatus;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== INVOICE ====================
export type InvoiceStatus = "unpaid" | "paid" | "cancelled";

export interface Invoice {
  _id: string;
  patient_id: Patient | string;
  appointment_id: Appointment | string;
  total_amount: number;
  status: InvoiceStatus;
  paymentCode?: string;
  createdAt?: string;
}

// ==================== NOTIFICATION ====================
export interface Notification {
  _id: string;
  user_id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt?: string;
}

// ==================== MEDICAL ====================
export interface MedicalRecord {
  _id: string;
  patient_id: Patient | string;
  appointment_id: Appointment | string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  createdAt?: string;
}

export interface MedicalHistory {
  _id: string;
  patient_id: Patient | string;
  condition?: string;
  allergies?: string;
  medications?: string;
  notes?: string;
}

// ==================== SCHEDULE ====================
export interface DoctorSchedule {
  _id: string;
  doctor_id: Doctor | string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}
