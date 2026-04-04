import { useState, useEffect } from "react";
import { medicalService } from "../services";
import { useTranslation } from "react-i18next";
import { ShieldAlert, Activity, Save, Loader2, Info } from "lucide-react";
import { toast } from "sonner";

export function MedicalHistory() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    allergies: "",
    chronic_diseases: "",
    notes: "",
  });

  useEffect(() => {
    medicalService.getMyHistory().then((res) => {
      if (res.data.data) {
        const d = res.data.data;
        setForm({
          allergies: d.allergies || "",
          chronic_diseases: d.chronic_diseases || "",
          notes: d.notes || "",
        });
      }
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await medicalService.updateHistory(form);
      toast.success(t("update_success"));
    } catch (err) {
      toast.error("Cập nhật tiền sử thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 transition-colors min-h-screen">
      <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[40px] border dark:border-gray-800 shadow-2xl">
        <h1 className="text-3xl font-black mb-10 flex items-center gap-3 dark:text-white italic">
          <ShieldAlert className="text-red-500" size={36} />{" "}
          {t("medical_history")}
        </h1>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
              <Info size={16} /> Dị ứng (Thuốc, Thực phẩm)
            </label>
            <textarea
              className="w-full p-5 border-2 border-gray-100 dark:border-gray-800 rounded-3xl dark:bg-gray-950 dark:text-white outline-none focus:border-blue-500 transition-all h-32"
              value={form.allergies}
              onChange={(e) => setForm({ ...form, allergies: e.target.value })}
              placeholder="VD: Dị ứng Penicillin, Tôm, Đậu phộng..."
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
              <Activity size={16} /> Bệnh lý mãn tính & Lưu ý khác
            </label>
            <textarea
              className="w-full p-5 border-2 border-gray-100 dark:border-gray-800 rounded-3xl dark:bg-gray-950 dark:text-white outline-none focus:border-blue-500 transition-all h-32"
              value={form.chronic_diseases}
              onChange={(e) =>
                setForm({ ...form, chronic_diseases: e.target.value })
              }
              placeholder="VD: Cao huyết áp, Tiểu đường, Hen suyễn..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={24} />
            )}
            {loading ? t("loading") : t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
