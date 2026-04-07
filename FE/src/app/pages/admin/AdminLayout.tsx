import { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { useNavigate, NavLink, Outlet } from 'react-router';
import {
  Users, Calendar, Stethoscope, LogOut, LayoutDashboard, CreditCard, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../services';

export interface AdminContextType {
  appointments: any[];
  doctors: any[];
  users: any[];
  stats: any;
  loadingData: boolean;
  updateAppointmentStatus: (id: string, status: string) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  reloadData: () => void;
  // Legacy stubs (AdminPaymentMethods, AdminDoctors)
  paymentMethods?: any[];
  saveDoctor?: (d: any) => void;
  deleteDoctor?: (id: string) => void;
  savePaymentMethod?: (m: any) => void;
  deletePaymentMethod?: (id: string) => void;
  togglePaymentMethodStatus?: (id: string) => void;
}

export function AdminLayout() {
  const { admin, adminLogout } = useAdmin();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const [aptsRes, usersRes, docsRes, statsRes] = await Promise.all([
        adminService.getAllAppointments(),
        adminService.getAllUsers(),
        adminService.getAllDoctors(),
        adminService.getDashboardStats(),
      ]);
      setAppointments(aptsRes.data?.data || []);
      setUsers(usersRes.data?.data || usersRes.data || []);
      setDoctors(docsRes.data?.data || []);
      setStats(statsRes.data?.data || null);
    } catch (err: any) {
      toast.error('Không thể tải dữ liệu admin: ' + (err?.response?.data?.message || err.message));
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    toast.success('Đã đăng xuất');
    navigate('/admin/login');
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      await adminService.updateAppointmentStatus(id, status);
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      toast.success('Cập nhật trạng thái thành công!');
    } catch {
      toast.error('Cập nhật thất bại');
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa lịch hẹn này?')) return;
    try {
      await adminService.deleteAppointment(id);
      setAppointments(prev => prev.filter(a => a._id !== id));
      toast.success('Đã xóa lịch hẹn');
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
      isActive
        ? 'border-blue-600 text-blue-600 font-bold'
        : 'border-transparent text-gray-500 hover:text-gray-900'
    }`;

  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black dark:text-white leading-none">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Xin chào, {admin?.name || 'Admin'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-bold"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </header>

      {/* Nav Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-[73px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            <NavLink to="/admin/dashboard" end className={navLinkClass}>
              <LayoutDashboard className="w-4 h-4" /> Tổng quan
            </NavLink>
            <NavLink to="/admin/dashboard/appointments" className={navLinkClass}>
              <Calendar className="w-4 h-4" /> Lịch hẹn {pendingCount > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{pendingCount}</span>}
            </NavLink>
            <NavLink to="/admin/dashboard/doctors" className={navLinkClass}>
              <Stethoscope className="w-4 h-4" /> Bác sĩ ({doctors.length})
            </NavLink>
            <NavLink to="/admin/dashboard/users" className={navLinkClass}>
              <Users className="w-4 h-4" /> Người dùng ({users.length})
            </NavLink>
            <NavLink to="/admin/dashboard/payments" className={navLinkClass}>
              <CreditCard className="w-4 h-4" /> Thanh toán
            </NavLink>
          </div>
        </div>
      </div>

      {/* Content */}
      {loadingData ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-blue-600">
          <Loader2 className="animate-spin" size={48} />
          <p className="font-black text-xs uppercase tracking-widest text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet context={{
            appointments, doctors, users, stats, loadingData,
            updateAppointmentStatus, deleteAppointment, reloadData: loadData
          } satisfies AdminContextType} />
        </div>
      )}
    </div>
  );
}
