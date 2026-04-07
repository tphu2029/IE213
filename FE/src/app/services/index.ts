import api from "../../lib/axios";

// --- AUTH & USERS ---
export const authService = {
  login: (creds: any) => api.post("/auth/login", creds),
  register: (data: any) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  // Lấy profile user (dùng cho trang cá nhân)
  getProfile: (id: string | "me") => api.get(`/users/${id}`),
  // Cập nhật thông tin cơ bản (username, phone, avatar)
  updateProfile: (data: any) => api.patch("/users/", data),
};

// --- HỒ SƠ BỆNH NHÂN (BẮT BUỘC ĐỂ ĐẶT LỊCH) ---
export const patientService = {
  // Tạo hồ sơ bệnh nhân (gender, birth_date, address, cccd)
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
  // Lấy tất cả bác sĩ (Dùng cho trang Doctors)
  getAllDoctors: () => api.get("/doctors/"),
  getDoctorsByDept: (id: string) => api.get(`/departments/${id}/doctors`),
  getDoctorSchedules: (doctorId: string) =>
    api.get(`/schedules/doctor/${doctorId}`),
  bookAppointment: (data: any) => api.post("/appointments/book", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
};

// --- DOCTOR PORTAL ---
export const doctorService = {
  // Lấy lịch hẹn của bác sĩ đang đăng nhập
  getMyDoctorAppointments: () => api.get("/appointments/doctor-appointments"),
  // Cập nhật trạng thái lịch hẹn (confirmed, in_progress, completed)
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  // Lấy profile bác sĩ của user đang đăng nhập
  getDoctorProfile: () => api.get("/doctors/me"),
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

// --- ADMIN ---
export const adminService = {
  // Thống kê tổng quan
  getDashboardStats: () => api.get("/reports"),
  // Quản lý lịch hẹn
  getAllAppointments: () => api.get("/appointments/admin/all"),
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  deleteAppointment: (id: string) => api.delete(`/appointments/${id}`),
  // Quản lý user
  getAllUsers: () => api.get("/users/admin/all"),
  // Quản lý bác sĩ
  getAllDoctors: () => api.get("/doctors/"),
};
