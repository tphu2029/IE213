import { useState, useEffect } from "react";
import { medicalService } from "../services";
import { ShieldAlert, Activity, Save } from "lucide-react";
import { toast } from "sonner";

export function MedicalHistory() {
  const [form, setForm] = useState({
    allergies: "",
    chronic_diseases: "",
    notes: "",
  });

  useEffect(() => {
    medicalService.getMyHistory().then((res) => {
      if (res.data.data) setForm(res.data.data);
    });
  }, []);

  const handleSave = async () => {
    try {
      await medicalService.updateHistory(form);
      toast.success("Đã cập nhật tiền sử bệnh lý");
    } catch (err) {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-3 dark:text-white">
          <ShieldAlert className="text-red-500" /> Tiền sử sức khỏe cá nhân
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">
              Dị ứng (Thuốc, thực phẩm, thời tiết...)
            </label>
            <textarea
              className="w-full p-4 border rounded-2xl dark:bg-gray-900 dark:text-white"
              value={form.allergies}
              onChange={(e) => setForm({ ...form, allergies: e.target.value })}
              placeholder="VD: Dị ứng Penicillin, Hải sản..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">
              Bệnh lý mãn tính
            </label>
            <textarea
              className="w-full p-4 border rounded-2xl dark:bg-gray-900 dark:text-white"
              value={form.chronic_diseases}
              onChange={(e) =>
                setForm({ ...form, chronic_diseases: e.target.value })
              }
              placeholder="VD: Tiểu đường type 2, Cao huyết áp..."
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Save size={20} /> Lưu hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}
