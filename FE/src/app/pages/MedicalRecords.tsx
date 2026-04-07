import { useState, useEffect } from "react";
import { medicalService } from "../services";
import { useTranslation } from "react-i18next";
import {
  ClipboardList,
  Pill,
  Calendar,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";

export function MedicalRecords() {
  const { t } = useTranslation();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    medicalService
      .getMyRecords()
      .then((res) => setRecords(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 transition-colors min-h-screen">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3 dark:text-white italic">
        <ClipboardList className="text-blue-600" size={32} />{" "}
        {t("medical_records")}
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : records.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-900 p-16 rounded-[40px] text-center border-2 border-dashed dark:border-gray-800">
          <AlertCircle className="mx-auto mb-4 text-gray-300" size={64} />
          <p className="text-gray-500 dark:text-gray-400 font-bold">
            {t("no_data")}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {records.map((r: any) => (
            <div
              key={r._id}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[32px] border dark:border-gray-800 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-bold bg-gray-50 dark:bg-gray-800 px-4 py-1.5 rounded-full">
                  <Calendar size={14} className="text-blue-500" />
                  {new Date(r.visit_date).toLocaleDateString("vi-VN")}
                </div>
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                  {t("completed")}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Chẩn đoán
                    </p>
                    <h2 className="text-xl font-black dark:text-white leading-tight">
                      {r.diagnosis}
                    </h2>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Triệu chứng
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                      "{r.symptoms}"
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-center gap-2 mb-3 text-blue-600">
                    <Pill size={18} />
                    <span className="font-black text-sm uppercase tracking-tighter">
                      Đơn thuốc kê khai
                    </span>
                  </div>
                  <p className="text-sm text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
                    {r.prescription || "Không có thông tin thuốc."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
