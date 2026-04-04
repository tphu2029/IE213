import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { hospitalService } from "../services";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Danh sách khung giờ khám cố định (Định dạng HH:mm để khớp với logic so sánh chuỗi của BE)
const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export function BookAppointment() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const [formData, setFormData] = useState({
    department_id: searchParams.get("dept") || "",
    doctor_id: "",
    appointment_date: "",
    time_slot: "", // Sẽ lưu giá trị như "08:30"
    reason: "",
  });

  // Lấy danh sách chuyên khoa
  useEffect(() => {
    hospitalService
      .getDepartments()
      .then((res) => setDepartments(res.data.data || []));
  }, []);

  // Lấy danh sách bác sĩ khi đổi khoa
  useEffect(() => {
    if (formData.department_id) {
      setLoadingDocs(true);
      hospitalService
        .getDoctorsByDept(formData.department_id)
        .then((res) => setDoctors(res.data.data || []))
        .finally(() => setLoadingDocs(false));
    }
  }, [formData.department_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time_slot) return toast.error("Vui lòng chọn khung giờ khám");

    setLoading(true);
    try {
      await hospitalService.bookAppointment({
        doctor_id: formData.doctor_id,
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
        reason: formData.reason,
      });
      toast.success("Đặt lịch thành công!");
      navigate("/my-appointments");
    } catch (err: any) {
      const msg = err.response?.data?.message;
      // Hiển thị lỗi thân thiện dựa trên logic BE
      if (msg === "DOCTOR_NOT_AVAILABLE_DATE") {
        toast.error(
          "Bác sĩ không có lịch làm việc vào ngày này. Vui lòng chọn ngày khác.",
        );
      } else if (msg === "CONFLICT_SCHEDULE") {
        toast.error("Khung giờ này đã được đặt kín. Vui lòng chọn giờ khác.");
      } else if (msg === "INVALID_TIME_SLOT") {
        toast.error("Giờ bạn chọn nằm ngoài ca làm việc của bác sĩ.");
      } else {
        toast.error(msg || "Lỗi hệ thống khi đặt lịch");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-12 transition-colors">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[40px] border dark:border-gray-800 shadow-xl">
          <h1 className="text-3xl font-black text-blue-600 dark:text-blue-500 mb-8">
            {t("book_title")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chọn Khoa */}
              <div className="space-y-2">
                <label className="font-bold flex items-center gap-2 dark:text-white">
                  <Stethoscope size={16} /> {t("select_dept")}
                </label>
                <select
                  className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
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
                  {departments.map((d: any) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn Bác sĩ */}
              <div className="space-y-2">
                <label className="font-bold flex items-center gap-2 dark:text-white">
                  <User size={16} /> {t("select_doc")}
                </label>
                <select
                  disabled={!formData.department_id || loadingDocs}
                  className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  value={formData.doctor_id}
                  onChange={(e) =>
                    setFormData({ ...formData, doctor_id: e.target.value })
                  }
                  required
                >
                  <option value="">
                    {loadingDocs
                      ? "Đang tải bác sĩ..."
                      : `-- ${t("select_doc")} --`}
                  </option>
                  {doctors.map((doc: any) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.user_id?.username} - {doc.specialization}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chọn Ngày */}
              <div className="space-y-2">
                <label className="font-bold dark:text-white">Ngày khám</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointment_date: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* CHỌN GIỜ (THAY THẾ Ô NHẬP TAY) */}
              <div className="space-y-2">
                <label className="font-bold flex items-center gap-2 dark:text-white">
                  <Clock size={16} /> Giờ khám
                </label>
                <select
                  className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.time_slot}
                  onChange={(e) =>
                    setFormData({ ...formData, time_slot: e.target.value })
                  }
                  required
                >
                  <option value="">-- Chọn khung giờ --</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-500 ml-2">
                  Lưu ý: Giờ hiển thị theo định dạng 24h.
                </p>
              </div>
            </div>

            {/* Lý do khám */}
            <div className="space-y-2">
              <label className="font-bold dark:text-white">
                {t("visit_reason")}
              </label>
              <textarea
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 h-24 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả ngắn gọn tình trạng của bạn..."
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>

            {/* Nút đặt lịch */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                t("confirm_book")
              )}{" "}
              <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
