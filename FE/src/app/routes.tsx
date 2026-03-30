import { createBrowserRouter } from "react-router";

// Layouts
import { RootLayout } from "./components/layout/RootLayout";
import { AdminLayout } from "./pages/admin/AdminLayout";

// Public Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Doctors } from "./pages/Doctors";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Medicines } from "./pages/Medicines";
import { SymptomLookup } from "./pages/SymptomLookup";

// Patient Pages (Protected)
import { Dashboard } from "./pages/Dashboard";
import { BookAppointment } from "./pages/BookAppointment";
import { MedicalRecords } from "./pages/MedicalRecords";
import { MedicalHistory } from "./pages/MedicalHistory";
import { Invoices } from "./pages/Invoices";
import { Profile } from "./pages/Profile";

// Admin Pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminOverview } from "./pages/admin/AdminOverview";
import { AdminAppointments } from "./pages/admin/AdminAppointments";
import { AdminDoctors } from "./pages/admin/AdminDoctors";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminPaymentMethods } from "./pages/admin/AdminPaymentMethods";

// Route Guards
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // --- Public Routes ---
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "doctors", Component: Doctors },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "medicines", Component: Medicines },
      { path: "lookup", Component: SymptomLookup }, // Trang tra cứu thủ công + AI sơ bộ

      // --- Patient Routes (Yêu cầu đăng nhập) ---
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "book-appointment",
        element: (
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "medical-records",
        element: (
          <ProtectedRoute>
            <MedicalRecords />
          </ProtectedRoute>
        ),
      },
      {
        path: "medical-history",
        element: (
          <ProtectedRoute>
            <MedicalHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "invoices",
        element: (
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // --- Admin Routes ---
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, Component: AdminOverview },
      { path: "appointments", Component: AdminAppointments },
      { path: "doctors", Component: AdminDoctors },
      { path: "users", Component: AdminUsers },
      { path: "payments", Component: AdminPaymentMethods },
    ],
  },

  // --- 404 Page (Tùy chọn) ---
  {
    path: "*",
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">404 - Không tìm thấy trang</h1>
        <a href="/" className="mt-4 text-blue-600 hover:underline">
          Quay lại trang chủ
        </a>
      </div>
    ),
  },
]);
