import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { Link } from "react-router";
import {
  ArrowRight,
  AlertCircle,
  Info,
  Stethoscope,
  Heart,
  Wind,
  Utensils,
  Brain,
  Bone,
  Eye,
  Ear,
  ClipboardCheck,
  Activity,
  Baby,
  Venus,
  Syringe,
  FlaskConical,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Helper map tên khoa sang Icon
const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("tim mạch")) return Heart;
  if (n.includes("hô hấp")) return Wind;
  if (n.includes("tiêu hóa")) return Utensils;
  if (n.includes("thần kinh")) return Brain;
  if (n.includes("xương khớp")) return Bone;
  if (n.includes("mắt")) return Eye;
  if (n.includes("tai mũi họng")) return Ear;
  if (n.includes("da liễu")) return ClipboardCheck;
  if (n.includes("nhi")) return Baby;
  if (n.includes("sản") || n.includes("phụ khoa")) return Venus;
  if (n.includes("ngoại")) return Syringe;
  if (n.includes("xét nghiệm")) return FlaskConical;
  return Stethoscope;
};

export function Services() {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu thực từ Backend (MongoDB)
  useEffect(() => {
    hospitalService
      .getDepartments()
      .then((res) => {
        setDepartments(res.data.data || []);
      })
      .catch((err) => console.error("Lỗi lấy danh sách khoa:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20 transition-colors duration-300">
      {/* Hero Banner */}
      <section className="bg-blue-600 dark:bg-blue-700 py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-black mb-6 italic tracking-tighter animate-in slide-in-from-bottom duration-1000">
            {t("services_h2")}
          </h1>
          <p className="text-2xl text-blue-100 opacity-90 leading-relaxed font-medium max-w-3xl mx-auto">
            {t("services_p")}
          </p>
        </div>
      </section>

      {/* Grid Chuyên Khoa */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-blue-600 gap-4">
            <Loader2 className="animate-spin" size={48} />
            <p className="font-black uppercase tracking-widest text-[10px]">
              {t("loading")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {departments.map((dept) => {
              const DeptIcon = getIcon(dept.name);
              return (
                <div
                  key={dept._id}
                  className="group bg-white dark:bg-gray-900 rounded-[50px] p-10 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col"
                >
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    <DeptIcon size={40} />
                  </div>

                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                    {dept.name}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 italic">
                    {dept.description ||
                      "Chuyên khoa cung cấp dịch vụ khám và điều trị chuyên sâu với công nghệ hiện đại."}
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-3xl mb-10 border-l-8 border-blue-500">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-black text-[10px] uppercase tracking-widest">
                      <AlertCircle size={14} />
                      <span>Thông tin hỗ trợ</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
                      Đặt lịch ngay để được tư vấn về triệu chứng liên quan đến{" "}
                      {dept.name.toLowerCase()}.
                    </p>
                  </div>

                  <Link
                    to={`/book?dept=${dept._id}`}
                    className="flex items-center justify-center gap-3 w-full py-5 bg-gray-900 dark:bg-blue-600 text-white rounded-[25px] font-black text-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95"
                  >
                    {t("book_now")} <ArrowRight size={20} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Mẹo chọn khoa Section */}
      <section className="bg-white dark:bg-gray-900 py-24 border-t dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-amber-100 dark:border-amber-800">
            <Info size={16} /> Mẹo chọn khoa nhanh
          </div>
          <h2 className="text-4xl font-black dark:text-white mb-16 italic tracking-tight">
            Bạn vẫn chưa biết nên bắt đầu từ đâu?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-gray-50 dark:bg-gray-950 rounded-[40px] flex items-center gap-6 border dark:border-gray-800 hover:border-blue-500 transition-colors">
              <span className="text-5xl">❓</span>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  Trường hợp 01
                </p>
                <p className="dark:text-gray-200 font-bold text-lg leading-snug">
                  Không rõ triệu chứng cụ thể →{" "}
                  <span className="text-blue-600">Nội tổng quát</span>
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-950 rounded-[40px] flex items-center gap-6 border dark:border-gray-800 hover:border-blue-500 transition-colors">
              <span className="text-5xl">👶</span>
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  Trường hợp 02
                </p>
                <p className="dark:text-gray-200 font-bold text-lg leading-snug">
                  Trẻ em dưới 16 tuổi →{" "}
                  <span className="text-blue-600">Nhi khoa</span>
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/lookup"
            className="mt-16 inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-xl hover:underline group"
          >
            Sử dụng công cụ tra cứu thông minh
            <ArrowRight
              size={24}
              className="group-hover:translate-x-3 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-800 p-16 rounded-[60px] text-white shadow-2xl text-center relative overflow-hidden">
          <h2 className="text-5xl font-black mb-6 italic tracking-tighter">
            {t("cta_h2")}
          </h2>
          <p className="text-xl text-blue-100 mb-10 font-medium max-w-2xl mx-auto">
            Đội ngũ tư vấn y tế luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc của
            bạn.
          </p>
          <a
            href="tel:5551234567"
            className="text-4xl font-black hover:scale-110 transition-transform inline-block underline decoration-blue-300 underline-offset-12"
          >
            (555) 123-4567
          </a>
        </div>
      </section>
    </div>
  );
}
