import { createBrowserRouter, Navigate } from "react-router";
import { useAuth } from "./contexts/AuthContext";

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
import { DoctorDashboard } from "./pages/DoctorDashboard";

// Admin Pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminOverview } from "./pages/admin/AdminOverview";
import { AdminAppointments } from "./pages/admin/AdminAppointments";
import { AdminDoctors } from "./pages/admin/AdminDoctors";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminPaymentMethods } from "./pages/admin/AdminPaymentMethods";
import { AdminBHYTVerify } from "./pages/admin/AdminBHYTVerify";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { NotFoundPage } from "./pages/NotFoundPage";

// Doctor route guard - chỉ cho phép role "doctor"
function DoctorRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user || user.role !== "doctor") return <Navigate to="/login" />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "doctors", Component: Doctors },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "medicines", Component: Medicines },
      { path: "lookup", Component: SymptomLookup },

      // --- Patient Routes (Yêu cầu đăng nhập) ---
      {
        path: "my-appointments",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "book",
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
        path: "users",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // --- Doctor Portal ---
  {
    path: "/doctors/dashboard",
    element: (
      <DoctorRoute>
        <DoctorDashboard />
      </DoctorRoute>
    ),
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
      { path: "bhyt", Component: AdminBHYTVerify },
    ],
  },

  // --- 404 Page ---
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
