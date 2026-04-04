import api from "../../lib/axios";

// --- AUTH & USERS ---
export const authService = {
  login: (creds: any) => api.post("/auth/login", creds),
  register: (data: any) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  // Lấy profile user (dùng cho trang cá nhân)
  getProfile: () => api.get("/users/me"),

  // Cập nhật thông tin cơ bản (username, phone, avatar)
  updateProfile: (data: any) => api.patch("/users/", data),
};

// --- HỒ SƠ BỆNH NHÂN (BẮT BUỘC ĐỂ ĐẶT LỊCH) ---
export const patientService = {
  // Tạo hồ sơ bệnh nhân (gender, birth_date, address)
  createPatientProfile: (data: {
    user_id: string;
    gender: string;
    birth_date: string;
    address: string;
  }) => api.post("/patients/", data),
  getPatients: () => api.get("/patients/"),
};

// --- BỆNH VIỆN & ĐẶT LỊCH ---
export const hospitalService = {
  getDepartments: () => api.get("/departments/"),
  // Lấy tất cả bác sĩ (Dùng cho trang Doctors)
  getAllDoctors: () => api.get("/doctors/"),
  getDoctorsByDept: (id: string) => api.get(`/departments/${id}/doctors`),
  getDoctorSchedules: (doctorId: string) =>
    api.get(`/schedules/doctor/${doctorId}`),
  bookAppointment: (data: any) => api.post("/appointments/book", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
};

// --- Y TẾ (BỆNH ÁN, TIỀN SỬ, THUỐC) ---
export const medicalService = {
  // Bệnh án (Medical Records)
  getMyRecords: () => api.get("/medical-records/me"),
  getRecordById: (id: string) => api.get(`/medical-records/me/${id}`),

  // Tiền sử (Medical Histories)
  getMyHistory: () => api.get("/medical-histories/me"),
  updateHistory: (data: any) => api.post("/medical-histories/", data),

  // Thuốc
  getMedicines: () => api.get("/medicines/"),
  getMedicineById: (id: string) => api.get(`/medicines/${id}`),
};

// --- HÓA ĐƠN & THANH TOÁN (BILLING) ---
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
