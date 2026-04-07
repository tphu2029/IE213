import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        {/* RouterProvider quản lý toàn bộ các trang */}
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors duration={2000} />
      </AdminProvider>
    </AuthProvider>
  );
}
