import { Link, useNavigate } from "react-router";
import { Home, ArrowLeft, Search, Calendar, Stethoscope } from "lucide-react";

const QUICK_LINKS = [
  { label: "Trang chủ", href: "/", icon: Home, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600" },
  { label: "Đặt lịch khám", href: "/book", icon: Calendar, color: "bg-green-50 dark:bg-green-900/20 text-green-600" },
  { label: "Danh sách bác sĩ", href: "/doctors", icon: Stethoscope, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600" },
  { label: "Tra cứu triệu chứng", href: "/lookup", icon: Search, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600" },
];

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-lg text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-[160px] md:text-[200px] font-black leading-none select-none">
            <span className="text-blue-100 dark:text-blue-900">4</span>
            <span className="text-blue-600 animate-pulse">0</span>
            <span className="text-blue-100 dark:text-blue-900">4</span>
          </div>
          {/* Floating hospital cross */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-gray-900 rounded-[24px] shadow-xl flex items-center justify-center border border-gray-100 dark:border-gray-800 animate-bounce">
            <div className="relative w-10 h-10">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-blue-600 rounded-full" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl md:text-3xl font-black dark:text-white mb-3">
          Trang không tìm thấy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 max-w-sm mx-auto leading-relaxed">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <ArrowLeft size={18} /> Quay lại
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
          >
            <Home size={18} /> Về trang chủ
          </Link>
        </div>

        {/* Quick links */}
        <div className="bg-white dark:bg-gray-900 rounded-[28px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            Có thể bạn đang tìm
          </p>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${link.color}`}>
                  <link.icon size={16} />
                </div>
                <span className="text-sm font-bold dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-left">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
