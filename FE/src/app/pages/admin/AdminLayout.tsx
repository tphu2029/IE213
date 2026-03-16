import { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router';
import {
  Users,
  Calendar,
  Stethoscope,
  LogOut,
  LayoutDashboard,
  CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';
import { User } from '../../contexts/AuthContext';
import { Doctor, Appointment, PaymentMethod } from './types';

export interface AdminContextType {
  appointments: Appointment[];
  doctors: Doctor[];
  users: User[];
  paymentMethods: PaymentMethod[];
  updateAppointmentStatus: (id: string, status: 'confirmed' | 'cancelled' | 'completed') => void;
  deleteAppointment: (id: string) => void;
  deleteDoctor: (id: string) => void;
  saveDoctor: (doctor: Doctor) => void;
  savePaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: string) => void;
  togglePaymentMethodStatus: (id: string) => void;
}

export function AdminLayout() {
  const { admin, adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load appointments
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(allAppointments);

    // Load users
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);

    // Load doctors
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || JSON.stringify([
      { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', qualifications: 'MD, FACC', experience: '20+ years', education: 'Harvard Medical School', rating: 4.9 },
      { id: '2', name: 'Dr. Michael Chen', specialty: 'Neurology', qualifications: 'MD, PhD', experience: '15+ years', education: 'Johns Hopkins University', rating: 4.8 },
      { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', qualifications: 'MD, FAAP', experience: '12+ years', education: 'Stanford Medical School', rating: 5.0 },
      { id: '4', name: 'Dr. James Thompson', specialty: 'Orthopedic Surgery', qualifications: 'MD, FAAOS', experience: '18+ years', education: 'Yale Medical School', rating: 4.9 },
      { id: '5', name: 'Dr. Lisa Park', specialty: 'Internal Medicine', qualifications: 'MD, FACP', experience: '14+ years', education: 'Columbia Medical School', rating: 4.8 },
      { id: '6', name: 'Dr. Robert Martinez', specialty: 'Emergency Medicine', qualifications: 'MD, FACEP', experience: '16+ years', education: 'Duke Medical School', rating: 4.9 },
    ]));
    setDoctors(storedDoctors);
    if (!localStorage.getItem('doctors')) {
      localStorage.setItem('doctors', JSON.stringify(storedDoctors));
    }

    // Load payment methods
    const storedPaymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || JSON.stringify([
      { id: '1', name: 'Credit/Debit Card', provider: 'Stripe', type: 'credit_card', status: 'active', isDefault: true },
      { id: '2', name: 'PayPal', provider: 'PayPal', type: 'digital_wallet', status: 'active', isDefault: false },
      { id: '3', name: 'Bank Transfer', provider: 'Direct', type: 'bank_transfer', status: 'active', isDefault: false },
    ]));
    setPaymentMethods(storedPaymentMethods);
    if (!localStorage.getItem('paymentMethods')) {
      localStorage.setItem('paymentMethods', JSON.stringify(storedPaymentMethods));
    }
  };

  const handleLogout = () => {
    adminLogout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const updateAppointmentStatus = (appointmentId: string, status: 'confirmed' | 'cancelled' | 'completed') => {
    const updated = appointments.map((apt: Appointment) =>
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated);
    toast.success(`Appointment ${status}`);
  };

  const deleteAppointment = (appointmentId: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    const updated = appointments.filter((apt: Appointment) => apt.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated);
    toast.success('Appointment deleted');
  };

  const deleteDoctor = (doctorId: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    const updated = doctors.filter(d => d.id !== doctorId);
    setDoctors(updated);
    localStorage.setItem('doctors', JSON.stringify(updated));
    toast.success('Doctor deleted');
  };

  const saveDoctor = (doctor: Doctor) => {
    let updated;
    // Check if doctor already exists
    const existingIndex = doctors.findIndex(d => d.id === doctor.id);
    
    if (existingIndex >= 0) {
      updated = doctors.map(d => d.id === doctor.id ? doctor : d);
      toast.success('Doctor updated');
    } else {
      const newDoctor = { ...doctor, id: Date.now().toString() };
      updated = [...doctors, newDoctor];
      toast.success('Doctor added');
    }
    
    setDoctors(updated);
    localStorage.setItem('doctors', JSON.stringify(updated));
  };

  const savePaymentMethod = (method: PaymentMethod) => {
    let updated;
    if (method.isDefault) {
      // Unset previous default
      paymentMethods.forEach(m => m.isDefault = false);
    }
    const existingIndex = paymentMethods.findIndex(m => m.id === method.id);
    
    if (existingIndex >= 0) {
      updated = paymentMethods.map(m => m.id === method.id ? method : m);
      toast.success('Payment method updated');
    } else {
      const newMethod = { ...method, id: Date.now().toString() };
      updated = [...paymentMethods, newMethod];
      toast.success('Payment method added');
    }
    
    setPaymentMethods(updated);
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
  };

  const deletePaymentMethod = (id: string) => {
    if (!confirm('Are you sure you want to delete this payment method?')) return;
    const updated = paymentMethods.filter(m => m.id !== id);
    setPaymentMethods(updated);
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
    toast.success('Payment method deleted');
  };

  const togglePaymentMethodStatus = (id: string) => {
    const updated = paymentMethods.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' as const } : m);
    setPaymentMethods(updated);
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
    toast.success('Payment method status updated');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `py-4 border-b-2 transition-colors ${
      isActive
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-600 hover:text-gray-900'
    }`;

  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {admin?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-[88px] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            <NavLink to="/admin/dashboard" end className={navLinkClass}>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </div>
            </NavLink>
            <NavLink to="/admin/dashboard/appointments" className={navLinkClass}>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Appointments ({pendingAppointments})
              </div>
            </NavLink>
            <NavLink to="/admin/dashboard/doctors" className={navLinkClass}>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Doctors ({doctors.length})
              </div>
            </NavLink>
            <NavLink to="/admin/dashboard/users" className={navLinkClass}>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users ({users.length})
              </div>
            </NavLink>
            <NavLink to="/admin/dashboard/payments" className={navLinkClass}>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Methods
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{
          appointments,
          doctors,
          users,
          paymentMethods,
          updateAppointmentStatus,
          deleteAppointment,
          deleteDoctor,
          saveDoctor,
          savePaymentMethod,
          deletePaymentMethod,
          togglePaymentMethodStatus
        } satisfies AdminContextType} />
      </div>
    </div>
  );
}
