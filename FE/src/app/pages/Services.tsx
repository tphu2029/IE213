import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { Link } from "react-router";
import {
  ArrowRight,
  Info,
  Loader2,
  Heart,
  Wind,
  Utensils,
  Brain,
  Bone,
  Eye,
  Ear,
  ClipboardCheck,
  Baby,
  Venus,
  Syringe,
  FlaskConical,
  Stethoscope,
} from "lucide-react";
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    hospitalService
      .getDepartments()
      .then((res) => {
        setDepartments(res.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20 transition-colors">
      <section className="bg-blue-600 py-32 text-center text-white relative">
        <h1 className="text-6xl font-black mb-6 italic tracking-tighter">
          {t("services_h2")}
        </h1>
        <p className="text-2xl text-blue-100 opacity-90 max-w-3xl mx-auto">
          {t("services_p")}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-24">
        {loading ? (
          <div className="flex flex-col items-center py-20 text-blue-600">
            <Loader2 className="animate-spin mb-4" size={48} />
            <span>{t("loading")}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {departments.map((dept) => {
              const DeptIcon = getIcon(dept.name);
              return (
                <div
                  key={dept._id}
                  className="group bg-white dark:bg-gray-900 rounded-[50px] p-10 border dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all flex flex-col"
                >
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 mb-8 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6">
                    <DeptIcon size={40} />
                  </div>
                  <h3 className="text-3xl font-black dark:text-white mb-3">
                    {dept.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 italic">
                    {dept.description}
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-3xl mb-10 border-l-8 border-blue-500">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-black text-[10px] uppercase tracking-widest">
                      <Info size={14} />
                      <span>{t("support_info")}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
                      {t("support_desc")}
                    </p>
                  </div>

                  <Link
                    to={`/book?dept=${dept._id}`}
                    className="flex items-center justify-center gap-3 w-full py-5 bg-gray-900 dark:bg-blue-600 text-white rounded-[25px] font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                  >
                    {t("book_now")} <ArrowRight size={20} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
