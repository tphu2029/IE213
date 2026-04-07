import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doctorService } from "../services";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Loader2,
  Stethoscope,
  Activity,
  LayoutDashboard,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; darkBg: string }> = {
  pending:     { label: "Chờ xác nhận", color: "text-yellow-600", bg: "bg-yellow-50",   darkBg: "dark:bg-yellow-900/20"  },
  confirmed:   { label: "Đã xác nhận",  color: "text-blue-600",   bg: "bg-blue-50",     darkBg: "dark:bg-blue-900/20"    },
  in_progress: { label: "Đang khám",    color: "text-purple-600", bg: "bg-purple-50",   darkBg: "dark:bg-purple-900/20"  },
  completed:   { label: "Hoàn tất",     color: "text-green-600",  bg: "bg-green-50",    darkBg: "dark:bg-green-900/20"   },
  cancelled:   { label: "Đã hủy",       color: "text-red-600",    bg: "bg-red-50",      darkBg: "dark:bg-red-900/20"     },
};

const NEXT_STATUS: Record<string, { label: string; value: string; icon: any; color: string }[]> = {
  pending:     [{ label: "Xác nhận",  value: "confirmed",   icon: CheckCircle, color: "bg-blue-600 hover:bg-blue-700"    },
                { label: "Hủy lịch", value: "cancelled",   icon: XCircle,     color: "bg-red-500 hover:bg-red-600"      }],
  confirmed:   [{ label: "Bắt đầu khám", value: "in_progress", icon: Activity,    color: "bg-purple-600 hover:bg-purple-700" },
                { label: "Hủy lịch",     value: "cancelled",   icon: XCircle,     color: "bg-red-500 hover:bg-red-600"      }],
  in_progress: [{ label: "Hoàn tất khám", value: "completed", icon: CheckCircle, color: "bg-green-600 hover:bg-green-700" }],
  completed:   [],
  cancelled:   [],
};

export function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"today" | "all">("today");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await doctorService.getMyDoctorAppointments();
      setAppointments(res.data.data || []);
    } catch (err: any) {
      toast.error("Không thể tải danh sách lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (aptId: string, newStatus: string) => {
    setUpdating(aptId);
    try {
      await doctorService.updateAppointmentStatus(aptId, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a._id === aptId ? { ...a, status: newStatus } : a))
      );
      toast.success(`Cập nhật trạng thái thành công!`);
    } catch {
      toast.error("Cập nhật thất bại, vui lòng thử lại.");
    } finally {
      setUpdating(null);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const todayApts = appointments.filter(
    (a) => new Date(a.appointment_date).toISOString().split("T")[0] === today
  );
  const displayApts = activeTab === "today" ? todayApts : appointments;

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 fixed left-0 top-0 z-40 shadow-sm hidden md:flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <p className="font-black text-gray-900 dark:text-white text-sm">Doctor Portal</p>
                <p className="text-xs text-gray-500">ModernHospital</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="p-6 border-b dark:border-gray-800">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000/uploads/${user.avatar}`} 
                  alt="Avatar" className="w-12 h-12 rounded-2xl object-cover" />
              ) : (
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                  <User size={24} className="text-blue-600" />
                </div>
              )}
              <div>
                <p className="font-black text-sm dark:text-white">{user?.username}</p>
                <p className="text-xs text-blue-600 font-bold">Bác sĩ</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-4 flex-grow">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold text-sm">
              <LayoutDashboard size={18} />
              Lịch hẹn của tôi
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 md:p-8 pt-24 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black dark:text-white mb-1">
              Chào mừng, <span className="text-blue-600">{user?.username}</span> 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Tổng lịch hẹn", value: stats.total,     icon: Calendar,     color: "text-blue-600",   bg: "bg-blue-50 dark:bg-blue-900/20" },
              { label: "Chờ xác nhận",  value: stats.pending,   icon: Clock,        color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
              { label: "Đã xác nhận",  value: stats.confirmed,  icon: CheckCircle,  color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
              { label: "Hoàn tất",      value: stats.completed, icon: Activity,     color: "text-green-600",  bg: "bg-green-50 dark:bg-green-900/20" },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-[24px] p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <p className="text-2xl font-black dark:text-white">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Appointment List */}
          <div className="bg-white dark:bg-gray-900 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("today")}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "today"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Hôm nay ({todayApts.length})
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Tất cả ({appointments.length})
                </button>
              </div>
              <button onClick={loadAppointments} className="text-xs text-blue-600 font-bold hover:underline">
                Làm mới
              </button>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex flex-col items-center py-20 gap-3 text-blue-600">
                <Loader2 className="animate-spin" size={40} />
                <span className="font-black text-xs uppercase tracking-widest">Đang tải...</span>
              </div>
            ) : displayApts.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-4 text-gray-400">
                <AlertCircle size={48} />
                <p className="font-bold">
                  {activeTab === "today" ? "Không có lịch hẹn nào hôm nay" : "Chưa có lịch hẹn nào"}
                </p>
              </div>
            ) : (
              <div className="divide-y dark:divide-gray-800">
                {displayApts.map((apt) => {
                  const st = STATUS_CONFIG[apt.status] || STATUS_CONFIG.pending;
                  const nextActions = NEXT_STATUS[apt.status] || [];
                  const patientName = apt.patient_id?.user_id?.username || "Bệnh nhân";
                  const dateStr = new Date(apt.appointment_date).toLocaleDateString("vi-VN");
                  return (
                    <div key={apt._id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center shrink-0">
                          <User size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-black dark:text-white">{patientName}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                              <Calendar size={12} /> {dateStr}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                              <Clock size={12} /> {apt.time_slot}
                            </span>
                            {apt.reason && (
                              <span className="text-xs text-gray-400 italic">"{apt.reason}"</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-lg text-xs font-black ${st.color} ${st.bg} ${st.darkBg}`}>
                          {st.label}
                        </span>

                        {/* Action Buttons */}
                        {nextActions.map((action) => (
                          <button
                            key={action.value}
                            onClick={() => handleUpdateStatus(apt._id, action.value)}
                            disabled={updating === apt._id}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-black transition-all disabled:opacity-50 ${action.color}`}
                          >
                            {updating === apt._id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <action.icon size={14} />
                            )}
                            {action.label}
                          </button>
                        ))}

                        {nextActions.length === 0 && (
                          <ChevronRight size={16} className="text-gray-300" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
