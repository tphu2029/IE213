// 1. NGƯỜI DÙNG
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  phone?: string;
  role: "admin" | "doctor" | "patient" | "receptionist";
}

// 2. LỊCH HẸN
export interface Appointment {
  _id: string;
  patient_id: any;
  doctor_id: {
    _id: string;
    user_id: { username: string };
    specialization: string;
  };
  appointment_date: string;
  time_slot: string;
  reason: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
}

// 3. HỒ SƠ BỆNH ÁN
export interface MedicalRecord {
  _id: string;
  patient_id: any;
  doctor_id: any;
  symptoms: string;
  diagnosis: string;
  prescription: string;
  visit_date: string;
}

// 4. TIỀN SỬ BỆNH LÝ
export interface MedicalHistory {
  _id?: string;
  patient_id: string;
  allergies: string;
  chronic_diseases: string;
  notes: string;
}

// 5. THUỐC
export interface Medicine {
  _id: string;
  name: string;
  description: string;
  price: number;
}

// 6. HÓA ĐƠN
export interface Invoice {
  _id: string;
  patient_id: any;
  appointment_id: any;
  total_amount: number;
  status: "unpaid" | "paid";
  created_at: string;
}
