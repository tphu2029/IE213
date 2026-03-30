import { useState, useEffect } from "react";
import { DEPARTMENTS_DATA, QUICK_TIPS } from "../data/departmentsData";
import { Search, Bot, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
import { Link } from "react-router";

export function SymptomLookup() {
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(DEPARTMENTS_DATA);

  useEffect(() => {
    const search = query.toLowerCase();
    const filtered = DEPARTMENTS_DATA.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search) ||
        dept.symptoms.toLowerCase().includes(search) ||
        dept.keywords.some((k) => k.includes(search)),
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 pt-24">
      {/* Header & Mode Switcher */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black dark:text-white mb-6">
          Bạn đang cảm thấy thế nào?
        </h1>
        <div className="inline-flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <button
            onClick={() => setMode("manual")}
            className={`px-8 py-3 rounded-xl transition ${mode === "manual" ? "bg-white dark:bg-gray-700 shadow-md dark:text-white font-bold" : "text-gray-500"}`}
          >
            Tra cứu thủ công
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-8 py-3 rounded-xl transition ${mode === "ai" ? "bg-white dark:bg-gray-700 shadow-md dark:text-white font-bold" : "text-gray-500"}`}
          >
            Trợ lý AI (Beta)
          </button>
        </div>
      </div>

      {mode === "manual" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Search Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <Search
                className="absolute left-5 top-5 text-gray-400"
                size={24}
              />
              <input
                className="w-full p-5 pl-14 rounded-3xl border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white shadow-xl focus:border-blue-500 outline-none transition-all text-lg"
                placeholder="Nhập triệu chứng (vd: đau dạ dày, tê bì tay chân...)"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {results.map((dept) => (
                <Link
                  key={dept.id}
                  to={`/book-appointment?dept=${dept.id}`}
                  className="p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-3xl hover:border-blue-500 transition shadow-sm flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition">
                    <dept.icon size={30} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold dark:text-white">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {dept.symptoms}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-300 group-hover:text-blue-500"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Tips Sidebar */}
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-800">
              <h3 className="font-bold flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                <Lightbulb size={20} /> Mẹo chọn khoa nhanh
              </h3>
              <div className="space-y-3">
                {QUICK_TIPS.map((tip, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-sm font-medium ${tip.color}`}
                  >
                    <span className="opacity-70 font-normal">Nếu </span>
                    {tip.case}
                    <ArrowRight size={12} className="inline mx-1" />
                    <strong>{tip.target}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-[50px] text-white shadow-2xl relative overflow-hidden text-center">
          <Bot size={80} className="mx-auto mb-6 bg-white/20 p-4 rounded-3xl" />
          <h2 className="text-3xl font-black mb-4">
            Bạn đang gặp triệu chứng gì?
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Trí tuệ nhân tạo sẽ phân tích mô tả của bạn để gợi ý bác sĩ và
            chuyên khoa phù hợp nhất.
          </p>
          <textarea
            className="w-full max-w-2xl p-6 rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none mb-6 h-40"
            placeholder="Mô tả triệu chứng chi tiết ở đây..."
          />
          <button className="bg-white text-blue-700 px-12 py-4 rounded-2xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transition shadow-xl">
            <Sparkles size={20} /> Bắt đầu phân tích AI
          </button>
        </div>
      )}
    </div>
  );
}
