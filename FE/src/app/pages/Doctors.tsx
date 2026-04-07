import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  Award,
  GraduationCap,
  Calendar,
  Star,
  User,
  Clock,
  Loader2,
  Filter,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export function Doctors() {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, deptsRes] = await Promise.all([
          hospitalService.getAllDoctors(),
          hospitalService.getDepartments(),
        ]);
        setDoctors(docsRes.data.data || []);
        setDepartments(deptsRes.data.data || []);
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
        toast.error("Không thể tải danh sách bác sĩ");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDoctors =
    selectedDept === "all"
      ? doctors
      : doctors.filter((d) => {
          const deptId = d.department_id?._id || d.department_id;
          return deptId === selectedDept;
        });

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-blue-600 py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-6xl font-black italic mb-6 tracking-tighter">
            {t("nav_doctors")}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium leading-relaxed">
            Hội tụ những chuyên gia y tế đầu ngành, cam kết mang lại sự tận tâm
            và chuyên môn cao nhất cho sức khỏe của bạn.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest mr-2">
            <Filter size={16} /> Lọc theo khoa:
          </div>
          <button
            onClick={() => setSelectedDept("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              selectedDept === "all"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Tất cả bác sĩ
          </button>
          {departments.map((dept) => (
            <button
              key={dept._id}
              onClick={() => setSelectedDept(dept._id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedDept === dept._id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-blue-600 gap-4">
            <Loader2 className="animate-spin" size={48} />
            <p className="font-black uppercase tracking-widest text-xs">
              {t("loading")}
            </p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-[50px] border-2 border-dashed dark:border-gray-800">
            <p className="text-gray-400 font-bold italic text-lg">
              {t("no_data")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc._id} doc={doc} t={t} />
            ))}
          </div>
        )}
      </section>

      {/* Why Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 border-t dark:border-gray-800">
        <h2 className="text-4xl font-black dark:text-white mb-16 italic text-center">
          {t("why_h2")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: GraduationCap,
              title: "Đội ngũ tinh hoa",
              desc: "100% bác sĩ có trình độ sau đại học và tu nghiệp nước ngoài.",
            },
            {
              icon: Award,
              title: "Tiêu chuẩn quốc tế",
              desc: "Quy trình khám chữa bệnh đạt chứng nhận chất lượng JCI.",
            },
            {
              icon: Star,
              title: "Tận tâm phục vụ",
              desc: "Lấy bệnh nhân làm trung tâm trong mọi quyết định điều trị.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <item.icon size={36} />
              </div>
              <h4 className="text-xl font-black dark:text-white">
                {item.title}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// DoctorCard component với logic toggle lịch trình và hiển thị avatar
function DoctorCard({ doc, t }: { doc: any; t: any }) {
  const [showSchedule, setShowSchedule] = useState(false);

  const getAvatarUrl = (path: string): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/uploads/${path}`;
  };

  const avatarUrl = doc.user_id?.avatar
    ? getAvatarUrl(doc.user_id.avatar)
    : undefined;

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-[45px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      {/* Profile Image */}
      <div className="h-48 shrink-0 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-100 group-hover:text-blue-500 transition-colors duration-500 overflow-hidden">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={doc.user_id?.username || "Bác sĩ"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <User size={100} strokeWidth={1} />
        )}
      </div>

      {/* Card Body */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black dark:text-white group-hover:text-blue-600 transition-colors">
            {doc.user_id?.username || "Bác sĩ chuyên khoa"}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-xl shrink-0">
            <Star size={14} fill="currentColor" /> 5.0
          </div>
        </div>

        <p className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
          {doc.specialization || "Chuyên gia y tế"}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <GraduationCap size={16} />
            </div>
            <span className="font-medium italic">
              Chuyên khoa: {doc.department_id?.name || "Đang cập nhật"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Award size={16} />
            </div>
            <span className="font-medium">
              {doc.experience || 5}+ năm kinh nghiệm lâm sàng
            </span>
          </div>
        </div>

        {/* Nút Toggle Lịch Trình */}
        <div className="mt-auto mb-6">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full py-2 flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-xl transition-colors font-bold text-sm"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{showSchedule ? "Ẩn lịch trình" : "Xem lịch làm việc"}</span>
            </div>
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${showSchedule ? "rotate-90" : ""}`}
            />
          </button>

          {/* Dropdown Lịch Trình */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showSchedule ? "max-h-64 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            {doc.schedules && doc.schedules.length > 0 ? (
              <div className="flex flex-col gap-2 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                {doc.schedules.map((s: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs font-medium"
                  >
                    <span className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded-md border dark:border-gray-700 w-24 text-center">
                      {s.day_of_week}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40">
                      {s.start_time} - {s.end_time}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-xs text-gray-400 py-2 italic bg-gray-50 dark:bg-gray-800 rounded-xl mt-3">
                Bác sĩ hiện chưa có lịch trực
              </p>
            )}
          </div>
        </div>

        <Link
          to={`/book?dept=${doc.department_id?._id || doc.department_id}`}
          className="w-full shrink-0 bg-gray-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
        >
          <Calendar size={18} />
          {t("book_now")}
        </Link>
      </div>
    </div>
  );
}
