import { DEPARTMENTS_DATA } from "../data/departmentsData";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Services() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20 transition-colors duration-300">
      {/* SECTION 1: HERO - TIÊU ĐỀ TRANG */}
      <section className="bg-blue-600 dark:bg-blue-700 py-20 text-center text-white relative overflow-hidden">
        {/* Họa tiết trang trí phía sau */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-6 animate-in slide-in-from-top duration-700">
            {t("services_h2")}
          </h1>
          <p className="text-xl text-blue-100 opacity-90 leading-relaxed animate-in fade-in duration-1000 delay-200">
            {t("services_p")}
          </p>
        </div>
      </section>

      {/* SECTION 2: GRID DANH SÁCH 14 CHUYÊN KHOA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS_DATA.map((dept) => (
            <div
              key={dept.id}
              className="group bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon khoa */}
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <dept.icon size={32} />
                </div>

                {/* Tên khoa */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-blue-500 dark:text-blue-400 font-bold mb-4 uppercase tracking-wider italic opacity-80">
                  {dept.enName}
                </p>

                {/* Mô tả ngắn */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  {dept.description}
                </p>

                {/* Thông tin triệu chứng (Dựa trên mô tả PDF) */}
                <div className="bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl mb-8 border-l-4 border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors">
                  <div className="flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-widest">
                    <AlertCircle size={14} />
                    <span>{t("symptoms")} điển hình</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{dept.symptoms}"
                  </p>
                </div>
              </div>

              {/* Nút hành động - Tích hợp chuyển khoa sang đặt lịch */}
              <Link
                to={`/book-appointment?dept=${dept.id}`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg group-hover:shadow-blue-200 dark:group-hover:shadow-none"
              >
                {t("book_now")}{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: MẸO CHỌN KHOA NHANH (Mục 14 PDF) */}
      <section className="bg-white dark:bg-gray-900 py-20 border-t dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Info size={16} /> Mẹo chọn khoa nhanh
          </div>
          <h2 className="text-3xl font-bold dark:text-white mb-10">
            Bạn vẫn chưa biết nên chọn khoa nào?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 border dark:border-gray-800 rounded-2xl flex items-center gap-4 dark:text-gray-300">
              <span className="text-2xl">❓</span>
              <p>
                Không biết bệnh →{" "}
                <strong className="text-blue-600">Nội tổng quát</strong>
              </p>
            </div>
            <div className="p-4 border dark:border-gray-800 rounded-2xl flex items-center gap-4 dark:text-gray-300">
              <span className="text-2xl">👶</span>
              <p>
                Trẻ em (dưới 16 tuổi) →{" "}
                <strong className="text-blue-600">Nhi khoa</strong>
              </p>
            </div>
            <div className="p-4 border dark:border-gray-800 rounded-2xl flex items-center gap-4 dark:text-gray-300">
              <span className="text-2xl">🤕</span>
              <p>
                Tai nạn / Chấn thương →{" "}
                <strong className="text-blue-600">Ngoại khoa / Cấp cứu</strong>
              </p>
            </div>
            <div className="p-4 border dark:border-gray-800 rounded-2xl flex items-center gap-4 dark:text-gray-300">
              <span className="text-2xl">🤢</span>
              <p>
                Đau bụng, tiêu chảy →{" "}
                <strong className="text-blue-600">Tiêu hóa</strong>
              </p>
            </div>
          </div>

          <Link
            to="/lookup"
            className="mt-12 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Sử dụng công cụ tra cứu thông minh <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* SECTION 4: CTA CUỐI TRANG */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 bg-blue-50 dark:bg-blue-900/20 p-10 rounded-[40px] border border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Bạn cần tư vấn trực tiếp?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Tổng đài hỗ trợ đặt lịch và giải đáp thắc mắc của chúng tôi hoạt
            động 24/7.
          </p>
          <a
            href="tel:5551234567"
            className="text-2xl font-black text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform inline-block"
          >
            (555) 123-4567
          </a>
        </div>
      </section>
    </div>
  );
}
