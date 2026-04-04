import { useState, useEffect } from "react";
import { medicalService } from "../services";
import { useTranslation } from "react-i18next";
import { Pill, Search, ShoppingBag, Loader2, Info } from "lucide-react";
import { toast } from "sonner";

export function Medicines() {
  const { t } = useTranslation();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await medicalService.getMedicines();
        setMedicines(res.data.data || []);
      } catch (err) {
        console.error("Lỗi tải danh mục thuốc:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const filtered = medicines.filter((m: any) =>
    m.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleBuy = (name: string) => {
    toast.success(`Đã thêm ${name} vào đơn đặt hàng tư vấn`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24 min-h-screen transition-colors">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black flex items-center gap-3 dark:text-white italic">
            <Pill className="text-blue-600" size={40} /> {t("medicine_list")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Cung cấp dược phẩm chính hãng, đạt chuẩn GPP.
          </p>
        </div>

        <div className="relative w-full lg:w-[450px] group">
          <Search
            className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={22}
          />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-[24px] dark:bg-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-blue-600">
          <Loader2 className="animate-spin mb-4" size={48} />
          <span className="font-bold tracking-widest uppercase text-xs">
            {t("loading")}
          </span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((m: any) => (
              <div
                key={m._id}
                className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Pill size={32} />
                </div>

                <h3 className="font-black text-xl dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {m.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-1 italic">
                  {m.description ||
                    "Chưa có mô tả chi tiết cho loại thuốc này."}
                </p>

                <div className="pt-6 border-t dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {t("price")}
                    </p>
                    <p className="text-xl font-black text-blue-600">
                      {m.price?.toLocaleString()}{" "}
                      <span className="text-xs font-bold">đ</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleBuy(m.name)}
                    className="p-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="bg-gray-50 dark:bg-gray-900 inline-block p-10 rounded-[40px] border-2 border-dashed dark:border-gray-800">
                <Info className="mx-auto mb-4 text-gray-300" size={48} />
                <p className="text-gray-500 dark:text-gray-400 font-bold">
                  Không tìm thấy thuốc khớp với từ khóa "{search}"
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer Info */}
      <div className="mt-20 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[32px] border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-blue-600">
          <Info size={32} />
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-black text-blue-900 dark:text-blue-300 uppercase tracking-tighter">
            Lưu ý quan trọng
          </h4>
          <p className="text-sm text-blue-700/70 dark:text-blue-400/70 max-w-2xl">
            Tất cả các loại thuốc trên đều cần sự tư vấn của bác sĩ chuyên khoa
            trước khi sử dụng. Vui lòng đặt lịch khám để được kê đơn chính xác
            nhất cho tình trạng sức khỏe của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
