import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Doctors } from './pages/Doctors';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { BookAppointment } from './pages/BookAppointment';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminAppointments } from './pages/admin/AdminAppointments';
import { AdminDoctors } from './pages/admin/AdminDoctors';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminPaymentMethods } from './pages/admin/AdminPaymentMethods';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'services', Component: Services },
      { path: 'doctors', Component: Doctors },
      { path: 'contact', Component: Contact },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'book-appointment',
        element: (
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/admin/login',
    Component: AdminLogin,
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, Component: AdminOverview },
      { path: 'appointments', Component: AdminAppointments },
      { path: 'doctors', Component: AdminDoctors },
      { path: 'users', Component: AdminUsers },
      { path: 'payments', Component: AdminPaymentMethods },
    ],
  },
]);