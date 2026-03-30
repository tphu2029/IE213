import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { DEPARTMENTS_DATA } from "../data/departmentsData";
import { DOCTORS_DATA } from "../data/doctorsData";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  ArrowRight,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export function BookAppointment() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // Trạng thái Form
  const [formData, setFormData] = useState({
    department_id: "",
    doctor_id: "",
    appointment_date: "",
    time_slot: "",
    reason: "",
  });

  // Lấy ID khoa từ URL (nếu có)
  useEffect(() => {
    const deptFromUrl = searchParams.get("dept");
    if (deptFromUrl) {
      setFormData((prev) => ({ ...prev, department_id: deptFromUrl }));
    }
  }, [searchParams]);

  // Lọc danh sách bác sĩ dựa trên khoa đang chọn
  const filteredDoctors = DOCTORS_DATA.filter(
    (doc) => doc.deptId === formData.department_id,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.doctor_id || !formData.appointment_date) {
      toast.error("Vui lòng chọn bác sĩ và ngày khám");
      return;
    }
    toast.success("Đặt lịch thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4 transition-colors">
      <div className="max-w-3xl mx-auto">
        {/* Khung đặt lịch - Sửa lỗi màu sắc Darkmode */}
        <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-blue-600 dark:text-blue-500 mb-2">
              {t("book_title")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Vui lòng hoàn tất thông tin phía dưới.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. CHỌN CHUYÊN KHOA */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300">
                <Stethoscope size={18} className="text-blue-500" />{" "}
                {t("select_dept")}
              </label>
              <select
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                value={formData.department_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department_id: e.target.value,
                    doctor_id: "",
                  })
                }
                required
              >
                <option value="">-- {t("select_dept")} --</option>
                {DEPARTMENTS_DATA.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. CHỌN BÁC SĨ (Lọc theo khoa) */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300">
                <User size={18} className="text-blue-500" /> {t("select_doc")}
              </label>
              <select
                disabled={!formData.department_id}
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                value={formData.doctor_id}
                onChange={(e) =>
                  setFormData({ ...formData, doctor_id: e.target.value })
                }
                required
              >
                <option value="">
                  --{" "}
                  {formData.department_id
                    ? `Chọn trong ${filteredDoctors.length} bác sĩ`
                    : "Vui lòng chọn khoa trước"}{" "}
                  --
                </option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.level})
                  </option>
                ))}
              </select>
              {formData.doctor_id && (
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                  <Info size={14} /> Kinh nghiệm:{" "}
                  {DOCTORS_DATA.find((d) => d.id === formData.doctor_id)?.exp}
                </p>
              )}
            </div>

            {/* 3. NGÀY & GIỜ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Ngày khám
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointment_date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Khung giờ
                </label>
                <select
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  onChange={(e) =>
                    setFormData({ ...formData, time_slot: e.target.value })
                  }
                  required
                >
                  <option value="">Chọn giờ</option>
                  {[
                    "08:00 AM",
                    "09:00 AM",
                    "10:00 AM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. LÝ DO KHÁM */}
            <div className="space-y-3">
              <label className="font-bold text-gray-700 dark:text-gray-300">
                {t("visit_reason")}
              </label>
              <textarea
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white h-32 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: Tôi bị đau tức ngực..."
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>

            {/* NÚT SUBMIT */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 group"
            >
              {t("confirm_book")}{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
