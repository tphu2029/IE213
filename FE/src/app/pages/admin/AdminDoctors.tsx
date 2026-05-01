import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { AdminContextType } from './AdminLayout';
import { Plus, Edit, Trash2, User, Mail, Award, Building } from 'lucide-react';

export function AdminDoctors() {
  const { doctors, deleteDoctor } = useOutletContext<AdminContextType>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doc => {
    const name = (doc.user_id?.username || doc.username || '').toLowerCase();
    const dept = (doc.department_id?.name || '').toLowerCase();
    const spec = (doc.specialization || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || dept.includes(search) || spec.includes(search);
  });

  const getAvatarUrl = (path: string | undefined): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `http://localhost:5000/uploads/${path}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Danh sách bác sĩ</h2>
          <p className="text-gray-500 text-sm">Quản lý đội ngũ y bác sĩ trong hệ thống ({doctors.length})</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm theo tên, chuyên khoa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl w-full md:w-64 focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white"
          />
          <button
            onClick={() => alert('Chức năng thêm bác sĩ mới đang được phát triển với luồng tạo User đồng bộ.')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-bold text-sm shrink-0"
          >
            <Plus size={18} />
            Thêm bác sĩ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-800/50 rounded-[32px] border-2 border-dashed border-gray-100 dark:border-gray-800">
            <p className="text-gray-400">Không tìm thấy bác sĩ nào</p>
          </div>
        ) : filteredDoctors.map(doctor => {
          const name = doctor.user_id?.username || doctor.username || '—';
          const avatar = getAvatarUrl(doctor.user_id?.avatar);
          
          return (
            <div key={doctor._id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-bl-[64px] transition-transform group-hover:scale-110" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 shadow-inner">
                    {avatar 
                      ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
                      : <User size={32} className="text-blue-500" />
                    }
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black dark:text-white text-lg truncate leading-tight">{name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-1 uppercase tracking-wider">{doctor.specialization || 'Chuyên gia'}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Building size={14} className="shrink-0" />
                    <span className="text-xs truncate">{doctor.department_id?.name || 'Phòng khám tổng quát'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Award size={14} className="shrink-0" />
                    <span className="text-xs">{doctor.experience || 0} năm kinh nghiệm</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Mail size={14} className="shrink-0" />
                    <span className="text-xs truncate">{doctor.user_id?.email || '—'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
                  <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                    <span className="text-yellow-600 font-black text-sm">5.0</span>
                    <span className="text-[10px] text-yellow-500 font-bold">RATING</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert('Chức năng chỉnh sửa bác sĩ đang được phát triển.')}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if(window.confirm(`Bạn có chắc muốn xóa bác sĩ ${name}?`)) {
                          deleteDoctor && deleteDoctor(doctor._id);
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors"
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
