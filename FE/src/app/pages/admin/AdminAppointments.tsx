import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Search, CheckCircle, XCircle, Trash2, CreditCard, User, Stethoscope, Filter } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: "Chờ xác nhận", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  confirmed:   { label: "Đã xác nhận",  color: "text-blue-600",   bg: "bg-blue-100 dark:bg-blue-900/30"   },
  in_progress: { label: "Đang khám",    color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  completed:   { label: "Hoàn tất",     color: "text-green-600",  bg: "bg-green-100 dark:bg-green-900/30"  },
  cancelled:   { label: "Đã hủy",       color: "text-red-600",    bg: "bg-red-100 dark:bg-red-900/30"    },
};

export function AdminAppointments() {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useOutletContext<AdminContextType>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = appointments.filter(apt => {
    const patientName = (apt.patient_id?.user_id?.username || apt.patient_id?.username || '').toLowerCase();
    const doctorName = (apt.doctor_id?.user_id?.username || apt.doctor_id?.username || '').toLowerCase();
    const reason = (apt.reason || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchSearch = patientName.includes(search) || doctorName.includes(search) || reason.includes(search);
    const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Quản lý lịch hẹn</h2>
          <p className="text-gray-500 text-sm">
            {filteredAppointments.length}/{appointments.length} lịch hẹn
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm theo tên bệnh nhân, bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full sm:w-64 focus:outline-none focus:border-blue-400 transition-all text-sm dark:text-white"
            />
          </div>
          {/* Status filter */}
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold dark:text-white focus:outline-none focus:border-blue-400 transition appearance-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-[32px] border-2 border-dashed border-gray-100 dark:border-gray-800">
            <p className="text-gray-400 italic">Không tìm thấy lịch hẹn nào</p>
          </div>
        ) : filteredAppointments.map(appointment => {
          const st = STATUS_CONFIG[appointment.status] || STATUS_CONFIG.pending;
          const patientName = appointment.patient_id?.user_id?.username || appointment.patient_id?.username || '—';
          const doctorName = appointment.doctor_id?.user_id?.username || appointment.doctor_id?.username || '—';
          const dateStr = appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString('vi-VN', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          }) : '—';

          return (
            <div key={appointment._id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] p-5 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-lg hover:shadow-blue-500/5">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Thông tin chính */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cột bệnh nhân */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                      <User size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Bệnh nhân</p>
                      <h3 className="font-black dark:text-white">{patientName}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{appointment.reason || 'Khám tổng quát'}</p>
                    </div>
                  </div>

                  {/* Cột bác sĩ */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <Stethoscope size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Bác sĩ</p>
                      <h3 className="font-black dark:text-white">{doctorName}</h3>
                      <p className="text-xs text-gray-500 mt-1">{appointment.doctor_id?.specialization || 'Chuyên khoa'}</p>
                    </div>
                  </div>

                  {/* Cột thời gian */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Thời gian</p>
                      <h3 className="font-black dark:text-white">{appointment.time_slot}</h3>
                      <p className="text-xs text-gray-500 mt-1">{dateStr}</p>
                    </div>
                  </div>
                </div>

                {/* Trạng thái & Action */}
                <div className="shrink-0 flex flex-col md:flex-row lg:flex-col justify-between items-end gap-4 min-w-[160px]">
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black ${st.color} ${st.bg}`}>
                      {st.label}
                    </span>
                    {appointment.payment_status && (
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold border ${
                        appointment.payment_status === 'paid' ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20' : 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20'
                      }`}>
                        <CreditCard size={12} />
                        {appointment.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                        className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                        title="Xác nhận"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                        className="p-2.5 border border-red-100 text-red-500 rounded-xl hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 transition-colors"
                        title="Hủy lịch"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if(window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này vĩnh viễn?')) {
                          deleteAppointment(appointment._id);
                        }
                      }}
                      className="p-2.5 border border-gray-100 text-gray-400 rounded-xl hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
