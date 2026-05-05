import { useOutletContext } from 'react-router';
import type { AdminContextType } from './AdminLayout';
import {
  Calendar, Stethoscope, Users, TrendingUp, Clock,
  CheckCircle, XCircle, Activity, ArrowUpRight, User
} from 'lucide-react';
import { BASE_URL } from '@/lib/axios';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: "Chờ xác nhận", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  confirmed:   { label: "Đã xác nhận",  color: "text-blue-600",   bg: "bg-blue-100 dark:bg-blue-900/30"   },
  in_progress: { label: "Đang khám",    color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  completed:   { label: "Hoàn tất",     color: "text-green-600",  bg: "bg-green-100 dark:bg-green-900/30"  },
  cancelled:   { label: "Đã hủy",       color: "text-red-600",    bg: "bg-red-100 dark:bg-red-900/30"    },
};

const MONTH_NAMES = ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"];

function getAvatarUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/uploads/${path}`;
}

export function AdminOverview() {
  const { appointments, doctors, users, stats } = useOutletContext<AdminContextType>();

  const totalApts   = appointments.length;
  const pending     = appointments.filter(a => a.status === 'pending').length;
  const confirmed   = appointments.filter(a => a.status === 'confirmed').length;
  const completed   = appointments.filter(a => a.status === 'completed').length;
  const inProgress  = appointments.filter(a => a.status === 'in_progress').length;
  const cancelled   = appointments.filter(a => a.status === 'cancelled').length;

  // Biểu đồ doanh thu
  const revenueData = stats?.revenueByMonth || Array.from({length:12}, (_,i)=>({ month: i+1, total: 0 }));
  const maxRevenue  = Math.max(...revenueData.map((r: any) => r.total), 1);

  // Phân bổ trạng thái
  const statusItems = [
    { label: "Chờ xác nhận", value: pending,    icon: Clock,       color: "bg-yellow-500", pct: totalApts ? Math.round(pending/totalApts*100) : 0 },
    { label: "Đã xác nhận",  value: confirmed,  icon: CheckCircle, color: "bg-blue-500",   pct: totalApts ? Math.round(confirmed/totalApts*100) : 0 },
    { label: "Đang khám",    value: inProgress, icon: Activity,    color: "bg-purple-500", pct: totalApts ? Math.round(inProgress/totalApts*100) : 0 },
    { label: "Hoàn tất",     value: completed,  icon: TrendingUp,  color: "bg-green-500",  pct: totalApts ? Math.round(completed/totalApts*100) : 0 },
    { label: "Đã hủy",       value: cancelled,  icon: XCircle,     color: "bg-red-500",    pct: totalApts ? Math.round(cancelled/totalApts*100) : 0 },
  ];

  // Tính top bác sĩ theo số lịch hẹn
  const doctorAptCount: Record<string, number> = {};
  appointments.forEach(a => {
    const id = a.doctor_id?._id || a.doctor_id;
    if (id) doctorAptCount[id] = (doctorAptCount[id] || 0) + 1;
  });

  const topDoctors = doctors
    .map(doc => ({
      ...doc,
      aptCount: doctorAptCount[doc._id] || 0,
    }))
    .sort((a, b) => b.aptCount - a.aptCount)
    .slice(0, 5);

  // Bệnh nhân gần đây (user đặt lịch gần nhất)
  const recentPatients = appointments
    .filter(a => a.patient_id?.user_id)
    .slice(0, 5)
    .map(a => ({
      name: a.patient_id.user_id?.username || '—',
      avatar: a.patient_id.user_id?.avatar,
      date: a.appointment_date,
      status: a.status,
      doctor: a.doctor_id?.user_id?.username || '—',
    }));

  const recentApts = appointments.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* === STAT CARDS === */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Tổng lịch hẹn", value: totalApts,     icon: Calendar,    bg: "bg-blue-50 dark:bg-blue-900/20",    ic: "text-blue-600",   tag: "tất cả" },
          { label: "Bác sĩ",         value: doctors.length,icon: Stethoscope, bg: "bg-green-50 dark:bg-green-900/20",  ic: "text-green-600",  tag: "đang hoạt động" },
          { label: "Người dùng",     value: users.length,  icon: Users,       bg: "bg-purple-50 dark:bg-purple-900/20",ic: "text-purple-600", tag: "đã đăng ký" },
          { label: "Chờ xác nhận",   value: pending,       icon: Clock,       bg: "bg-yellow-50 dark:bg-yellow-900/20",ic: "text-yellow-600", tag: "cần xử lý" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-[24px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <s.icon size={24} className={s.ic} />
            </div>
            <p className="text-3xl font-black dark:text-white">{s.value}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-bold mt-0.5">{s.label}</p>
            <p className="text-gray-400 text-xs mt-1">{s.tag}</p>
          </div>
        ))}
      </div>

      {/* === ROW 2: CHART + STATUS === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Biểu đồ doanh thu */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[24px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black dark:text-white text-lg">Doanh thu theo tháng</h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {revenueData.filter((r: any) => r.total > 0).length > 0 ? 'Có doanh thu' : 'Chưa có hóa đơn'}
            </span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {revenueData.map((r: any, i: number) => {
              const pct = maxRevenue > 0 ? Math.max((r.total / maxRevenue) * 100, r.total > 0 ? 5 : 0) : 0;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-t-lg bg-blue-200 dark:bg-blue-800 group cursor-default hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors relative"
                    style={{ height: `${Math.max(pct, 3)}%` }}
                  >
                    {r.total > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {(r.total/1000).toFixed(0)}k
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{MONTH_NAMES[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phân bổ trạng thái */}
        <div className="bg-white dark:bg-gray-900 rounded-[24px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="font-black dark:text-white text-lg mb-6">Phân bổ trạng thái</h2>
          <div className="space-y-3">
            {statusItems.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{s.label}</span>
                  <span className="text-xs font-black dark:text-white">{s.value} <span className="text-gray-400 font-normal">({s.pct}%)</span></span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === ROW 3: TOP DOCTORS + RECENT PATIENTS === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Top Bác Sĩ */}
        <div className="bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b dark:border-gray-800">
            <h2 className="font-black dark:text-white text-base flex items-center gap-2">
              <Stethoscope size={18} className="text-blue-600" /> Top bác sĩ
            </h2>
            <a href="/admin/dashboard/doctors" className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
              Xem tất cả <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y dark:divide-gray-800">
            {topDoctors.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-sm italic">Chưa có dữ liệu</p>
            ) : topDoctors.map((doc, i) => {
              const avatar = getAvatarUrl(doc.user_id?.avatar);
              const name   = doc.user_id?.username || '—';
              const dept   = doc.department_id?.name || '—';
              const spec   = doc.specialization || '—';
              const exp    = doc.experience;
              return (
                <div key={doc._id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    i === 0 ? 'bg-yellow-400 text-yellow-900' :
                    i === 1 ? 'bg-gray-300 text-gray-700' :
                    i === 2 ? 'bg-orange-300 text-orange-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}>{i+1}</span>
                  <div className="w-10 h-10 rounded-2xl overflow-hidden bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    {avatar
                      ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
                      : <User size={20} className="text-blue-400" />
                    }
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold dark:text-white text-sm truncate">{name}</p>
                    <p className="text-xs text-gray-400 truncate">{dept} · {exp ? `${exp} năm KN` : spec}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-blue-600 text-sm">{doc.aptCount}</p>
                    <p className="text-[10px] text-gray-400">lịch hẹn</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bệnh Nhân Gần Đây */}
        <div className="bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b dark:border-gray-800">
            <h2 className="font-black dark:text-white text-base flex items-center gap-2">
              <Users size={18} className="text-purple-600" /> Bệnh nhân gần đây
            </h2>
            <a href="/admin/dashboard/users" className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
              Xem tất cả <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y dark:divide-gray-800">
            {recentPatients.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-sm italic">Chưa có bệnh nhân nào đặt lịch</p>
            ) : recentPatients.map((p, i) => {
              const avatar = getAvatarUrl(p.avatar);
              const st = STATUS_CONFIG[p.status] || STATUS_CONFIG.pending;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="w-10 h-10 rounded-2xl overflow-hidden bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                    {avatar
                      ? <img src={avatar} alt={p.name} className="w-full h-full object-cover" />
                      : <User size={20} className="text-purple-400" />
                    }
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold dark:text-white text-sm truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">BS. {p.doctor} · {p.date ? new Date(p.date).toLocaleDateString('vi-VN') : '—'}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${st.color} ${st.bg}`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* === ROW 4: BẢNG LỊCH HẸN GẦN ĐÂY === */}
      <div className="bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-800">
          <h2 className="font-black dark:text-white text-base flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" /> Lịch hẹn gần đây
          </h2>
          <a href="/admin/dashboard/appointments" className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
            Xem tất cả <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {["Bệnh nhân","Bác sĩ","Khoa","Ngày khám","Giờ","Trạng thái"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {recentApts.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400 italic text-sm">Chưa có lịch hẹn nào</td></tr>
              ) : recentApts.map(apt => {
                const st = STATUS_CONFIG[apt.status] || STATUS_CONFIG.pending;
                const patient = apt.patient_id?.user_id?.username || '—';
                const doctor  = apt.doctor_id?.user_id?.username || '—';
                const dept    = apt.doctor_id?.department_id?.name || '—';
                const date    = apt.appointment_date ? new Date(apt.appointment_date).toLocaleDateString('vi-VN') : '—';
                const patientAvatar = getAvatarUrl(apt.patient_id?.user_id?.avatar);
                return (
                  <tr key={apt._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl overflow-hidden bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                          {patientAvatar ? <img src={patientAvatar} alt={patient} className="w-full h-full object-cover" /> : <User size={16} className="text-purple-400" />}
                        </div>
                        <span className="font-bold dark:text-white">{patient}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300 font-medium">{doctor}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{dept}</td>
                    <td className="px-5 py-3.5 text-gray-500">{date}</td>
                    <td className="px-5 py-3.5 text-gray-500">{apt.time_slot || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${st.color} ${st.bg}`}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
