import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import {
  Search,
  Bot,
  ArrowRight,
  Lightbulb,
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
  Stethoscope,
  Loader2,
} from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function SymptomLookup() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [query, setQuery] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const search = query.toLowerCase();
    setFilteredResults(
      departments.filter(
        (d) =>
          d.name.toLowerCase().includes(search) ||
          d.description?.toLowerCase().includes(search),
      ),
    );
  }, [query, departments]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24 min-h-screen transition-colors">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black dark:text-white mb-6 italic">
          {t("lookup_q")}
        </h1>
        <div className="inline-flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <button
            onClick={() => setMode("manual")}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${mode === "manual" ? "bg-white dark:bg-gray-700 shadow-md dark:text-white" : "text-gray-500"}`}
          >
            {t("manual_search")}
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${mode === "ai" ? "bg-white dark:bg-gray-700 shadow-md dark:text-white" : "text-gray-500"}`}
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
          <div className="lg:col-span-2 space-y-6">
            <div className="relative group">
              <Search
                className="absolute left-5 top-5 text-gray-400 group-focus-within:text-blue-500"
                size={24}
              />
              <input
                className="w-full p-5 pl-14 rounded-3xl border-2 border-transparent bg-white dark:bg-gray-900 dark:text-white shadow-xl focus:border-blue-500 outline-none transition-all text-lg"
                placeholder={t("search_placeholder")}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredResults.map((dept) => (
                <Link
                  key={dept._id}
                  to={`/book?dept=${dept._id}`}
                  className="p-6 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-[32px] hover:border-blue-500 transition-all flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Stethoscope size={30} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold dark:text-white">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 italic">
                      {dept.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[32px] border border-amber-100">
              <h3 className="font-black flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-6 uppercase tracking-tighter">
                <Lightbulb size={20} /> {t("quick_tips")}
              </h3>
              <div className="space-y-4 font-bold text-sm">
                <div className="p-4 rounded-2xl bg-blue-100 text-blue-700 flex justify-between">
                  <span>{t("tip_unknown")}</span>
                  <ArrowRight size={14} />
                </div>
                <div className="p-4 rounded-2xl bg-pink-100 text-pink-700 flex justify-between">
                  <span>{t("tip_kids")}</span>
                  <ArrowRight size={14} />
                </div>
                <div className="p-4 rounded-2xl bg-red-100 text-red-700 flex justify-between">
                  <span>{t("tip_accident")}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-[50px] text-white shadow-2xl text-center relative overflow-hidden">
          <Bot size={80} className="mx-auto mb-6 bg-white/20 p-4 rounded-3xl" />
          <h2 className="text-3xl font-black mb-4">{t("ai_assistant")}</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">{t("ai_desc")}</p>
          <textarea
            className="w-full max-w-2xl p-6 rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none mb-6 h-40"
            placeholder={t("search_placeholder")}
          />
        </div>
      )}
    </div>
  );
}
