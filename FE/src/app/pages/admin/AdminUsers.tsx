import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { User, Mail, Phone, Calendar, Search, Filter } from 'lucide-react';
import { BASE_URL } from '@/lib/axios';

export function AdminUsers() {
  const { users, appointments } = useOutletContext<AdminContextType>();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const getAvatarUrl = (path: string | undefined): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${BASE_URL}/uploads/${path}`;
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-1 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-black uppercase">Admin</span>;
      case 'doctor':
        return <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-black uppercase">Bác sĩ</span>;
      default:
        return <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 text-[10px] font-black uppercase">Bệnh nhân</span>;
    }
  };

  // Lọc user theo search và role
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      !search ||
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || user.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black dark:text-white">Người dùng hệ thống</h2>
        <p className="text-gray-500 text-sm font-medium">
          Quản lý tất cả tài khoản đã đăng ký ({users.length} tổng •{' '}
          {filteredUsers.length} hiển thị)
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium dark:text-white focus:outline-none focus:border-blue-400 transition"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold dark:text-white focus:outline-none focus:border-blue-400 transition appearance-none cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="patient">Bệnh nhân</option>
            <option value="doctor">Bác sĩ</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left py-4 px-5 text-[11px] font-black text-gray-400 uppercase tracking-wider rounded-l-2xl">Thành viên</th>
              <th className="text-left py-4 px-5 text-[11px] font-black text-gray-400 uppercase tracking-wider">Liên hệ</th>
              <th className="text-left py-4 px-5 text-[11px] font-black text-gray-400 uppercase tracking-wider">Vai trò</th>
              <th className="text-left py-4 px-5 text-[11px] font-black text-gray-400 uppercase tracking-wider">Lịch hẹn</th>
              <th className="text-left py-4 px-5 text-[11px] font-black text-gray-400 uppercase tracking-wider rounded-r-2xl">Ngày tham gia</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-400 italic">
                  {search || roleFilter !== 'all'
                    ? 'Không tìm thấy người dùng phù hợp'
                    : 'Chưa có người dùng nào'}
                </td>
              </tr>
            ) : filteredUsers.map(user => {
              const userAppointments = appointments.filter(a =>
                a.patient_id?.user_id?._id === user._id || a.patient_id === user._id
              );
              const avatar = getAvatarUrl(user.avatar);
              const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '—';

              return (
                <tr key={user._id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-transparent group-hover:border-blue-200 transition-colors">
                        {avatar
                          ? <img src={avatar} alt={user.username} className="w-full h-full object-cover" />
                          : <User size={20} className="text-gray-400" />
                        }
                      </div>
                      <div>
                        <p className="font-black dark:text-white">{user.username || 'N/A'}</p>
                        <p className="text-[10px] text-gray-400 font-bold">#{user._id?.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Mail size={12} className="text-gray-400" />
                        <span className="text-xs truncate max-w-[150px]">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Phone size={12} className="text-gray-400" />
                        <span className="text-xs">{user.phone || '—'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                        <Calendar size={14} className="text-blue-600" />
                      </div>
                      <span className="font-black dark:text-white">{userAppointments.length}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-gray-500 font-medium">
                    {joinDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

