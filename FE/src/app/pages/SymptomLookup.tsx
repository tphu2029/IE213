import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import {
  Search,
  Bot,
  ArrowRight,
  Sparkles,
  Lightbulb,
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
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

// Helper để map Icon dựa trên ID hoặc Tên khoa từ Backend
const getIcon = (deptName: string) => {
  const name = deptName.toLowerCase();
  if (name.includes("tim mạch")) return Heart;
  if (name.includes("hô hấp")) return Wind;
  if (name.includes("tiêu hóa")) return Utensils;
  if (name.includes("thần kinh")) return Brain;
  if (name.includes("xương khớp")) return Bone;
  if (name.includes("mắt")) return Eye;
  if (name.includes("tai mũi họng")) return Ear;
  if (name.includes("da liễu")) return ClipboardCheck;
  if (name.includes("nhi")) return Baby;
  if (name.includes("sản") || name.includes("phụ khoa")) return Venus;
  if (name.includes("ngoại")) return Syringe;
  if (name.includes("xét nghiệm")) return FlaskConical;
  return Stethoscope; // Mặc định
};

export function SymptomLookup() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [query, setQuery] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Lấy danh sách khoa từ Backend
  useEffect(() => {
    hospitalService
      .getDepartments()
      .then((res) => {
        const data = res.data.data || [];
        setDepartments(data);
        setFilteredResults(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // 2. Logic tìm kiếm (Client-side search)
  useEffect(() => {
    const search = query.toLowerCase();
    const filtered = departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search) ||
        dept.description?.toLowerCase().includes(search),
    );
    setFilteredResults(filtered);
  }, [query, departments]);

  const QUICK_TIPS = [
    {
      case: "Không biết bệnh",
      target: t("dept_general"),
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      case: "Trẻ em",
      target: t("dept_pedia"),
      color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    },
    {
      case: "Tai nạn/Chấn thương",
      target: t("dept_surgery"),
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24 min-h-screen transition-colors">
      {/* Header & Mode Switcher */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black dark:text-white mb-6 italic">
          Bạn đang cảm thấy thế nào?
        </h1>
        <div className="inline-flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <button
            onClick={() => setMode("manual")}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              mode === "manual"
                ? "bg-white dark:bg-gray-700 shadow-md dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {t("manual_search")}
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              mode === "ai"
                ? "bg-white dark:bg-gray-700 shadow-md dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {t("ai_assistant")}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : mode === "manual" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cột tìm kiếm chính */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative group">
              <Search
                className="absolute left-5 top-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={24}
              />
              <input
                className="w-full p-5 pl-14 rounded-3xl border-2 border-transparent bg-white dark:bg-gray-900 dark:text-white shadow-xl focus:border-blue-500 outline-none transition-all text-lg"
                placeholder={t("search_placeholder")}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredResults.map((dept) => {
                const DeptIcon = getIcon(dept.name);
                return (
                  <Link
                    key={dept._id}
                    to={`/book?dept=${dept._id}`}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] hover:border-blue-500 hover:shadow-lg transition-all flex items-center gap-6 group"
                  >
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <DeptIcon size={30} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-600 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 italic">
                        {dept.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-gray-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Cột mẹo nhanh */}
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[32px] border border-amber-100 dark:border-amber-900/30">
              <h3 className="font-black flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-6 uppercase tracking-tighter">
                <Lightbulb size={20} /> Mẹo chọn khoa
              </h3>
              <div className="space-y-4">
                {QUICK_TIPS.map((tip, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl text-sm font-bold ${tip.color} flex justify-between items-center`}
                  >
                    <span>{tip.case}</span>
                    <div className="flex items-center gap-1 opacity-80">
                      <ArrowRight size={12} />
                      {tip.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Giao diện AI Mode */
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-[50px] text-white shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <Bot size={80} className="mx-auto mb-6 bg-white/20 p-4 rounded-3xl" />
          <h2 className="text-3xl font-black mb-4">Trợ lý AI đang sẵn sàng</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Mô tả tình trạng sức khỏe của bạn, AI sẽ gợi ý chuyên khoa và bác sĩ
            phù hợp nhất ngay lập tức.
          </p>
          <textarea
            className="w-full max-w-2xl p-6 rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none mb-6 h-40 focus:bg-white/20 transition-all"
            placeholder="Ví dụ: Tôi bị đau đầu từ sáng nay kèm theo chóng mặt..."
          />
          <button className="bg-white text-blue-700 px-12 py-4 rounded-2xl font-black flex items-center gap-2 mx-auto hover:scale-105 transition-all shadow-xl active:scale-95">
            <Sparkles size={20} /> Phân tích triệu chứng
          </button>
        </div>
      )}
    </div>
  );
}
