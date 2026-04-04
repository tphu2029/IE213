import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  Award,
  GraduationCap,
  Star,
  User,
  Loader2,
  Filter,
} from "lucide-react";

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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDoctors =
    selectedDept === "all"
      ? doctors
      : doctors.filter(
          (d) => (d.department_id?._id || d.department_id) === selectedDept,
        );

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-24 transition-colors">
      <section className="bg-blue-600 py-32 text-center text-white relative overflow-hidden">
        <h1 className="text-6xl font-black italic mb-6 tracking-tighter">
          {t("nav_doctors")}
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium leading-relaxed">
          Hội tụ những chuyên gia y tế đầu ngành, cam kết mang lại sự tận tâm và
          chuyên môn cao nhất.
        </p>
      </section>

      <div className="sticky top-16 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest mr-2">
            <Filter size={16} /> {t("filter_dept")}
          </div>
          <button
            onClick={() => setSelectedDept("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedDept === "all" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 dark:bg-gray-800 text-gray-600"}`}
          >
            {t("all_doctors")}
          </button>
          {departments.map((dept) => (
            <button
              key={dept._id}
              onClick={() => setSelectedDept(dept._id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedDept === dept._id ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-800 text-gray-600"}`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="group bg-white dark:bg-gray-900 rounded-[45px] border dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="h-64 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-100 group-hover:text-blue-500 transition-colors">
                  <User size={120} />
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-black dark:text-white group-hover:text-blue-600 transition-colors">
                      {doc.user_id?.username}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                      <Star size={14} fill="currentColor" /> 5.0
                    </div>
                  </div>
                  <p className="text-blue-600 font-black text-xs uppercase tracking-widest mb-6">
                    {doc.specialization}
                  </p>
                  <Link
                    to={`/book?dept=${doc.department_id?._id || doc.department_id}`}
                    className="w-full bg-gray-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    {t("book_now")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-20 border-t dark:border-gray-800">
        <h2 className="text-4xl font-black dark:text-white mb-16 italic text-center">
          {t("why_h2")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: GraduationCap, t: "elite_team", d: "elite_desc" },
            { icon: Award, t: "int_standard", d: "int_desc" },
            { icon: Star, t: "dedicated_care", d: "dedicated_desc" },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <item.icon size={36} />
              </div>
              <h4 className="text-xl font-black dark:text-white">
                {t(item.t)}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {t(item.d)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
