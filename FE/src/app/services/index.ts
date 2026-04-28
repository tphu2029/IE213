import api from "../../lib/axios";

// --- AUTH & USERS ---
export const authService = {
  login: (creds: any) => api.post("/auth/login", creds),
  register: (data: any) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  getProfile: (id: string | "me") => api.get(`/users/${id}`),
  updateProfile: (data: any) => api.patch("/users/", data),
};

// --- HỒ SƠ BỆNH NHÂN ---
export const patientService = {
  createPatientProfile: (data: {
    user_id: string;
    gender: string;
    birth_date: string;
    address: string;
    cccd?: string;
  }) => api.post("/patients/", data),
  getPatients: () => api.get("/patients/"),
};

// --- BỆNH VIỆN & ĐẶT LỊCH ---
export const hospitalService = {
  getDepartments: () => api.get("/departments/"),
  getAllDoctors: () => api.get("/doctors/"),
  getAvailableDoctors: (date: string, shift: string, deptId: string) =>
    api.get(`/doctors/available?date=${date}&shift=${shift}&deptId=${deptId}`),
  getDoctorsByDept: (id: string) => api.get(`/departments/${id}/doctors`),
  getDoctorSchedules: (doctorId: string) =>
    api.get(`/schedules/doctor/${doctorId}`),
  bookAppointment: (data: {
    doctor_id: string;
    appointment_date: string;
    shift: string;
    reason?: string;
    hasInsurance: boolean;
  }) => api.post("/appointments/book", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
  checkAppointmentStatus: (id: string) =>
    api.get(`/appointments/check-status/${id}`),
};

// --- DOCTOR PORTAL ---
export const doctorService = {
  getMyDoctorAppointments: () => api.get("/appointments/doctor-appointments"),
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  getDoctorProfile: () => api.get("/doctors/me"),
};

// --- Y TẾ (BỆNH ÁN, TIỀN SỬ, THUỐC) ---
export const medicalService = {
  getMyRecords: () => api.get("/medical-records/me"),
  getRecordById: (id: string) => api.get(`/medical-records/me/${id}`),
  getMyHistory: () => api.get("/medical-histories/me"),
  updateHistory: (data: any) => api.post("/medical-histories/", data),
  getMedicines: () => api.get("/medicines/"),
  getMedicineById: (id: string) => api.get(`/medicines/${id}`),
};

// --- HÓA ĐƠN & THANH TOÁN ---
export const billingService = {
  getMyInvoices: () => api.get("/invoices/me"),
  getInvoiceById: (id: string) => api.get(`/invoices/me/${id}`),
  getMyPayments: () => api.get("/payments/me"),
};

// --- THÔNG BÁO ---
export const notificationService = {
  getMine: () => api.get("/notifications/me"),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
};

// --- ADMIN ---
export const adminService = {
  getDashboardStats: () => api.get("/reports"),
  getAllAppointments: () => api.get("/appointments/admin/all"),
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  deleteAppointment: (id: string) => api.delete(`/appointments/${id}`),
  getAllUsers: () => api.get("/users/admin/all"),
  getAllDoctors: () => api.get("/doctors/"),
};
