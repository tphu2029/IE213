import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors duration={2000} />
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

