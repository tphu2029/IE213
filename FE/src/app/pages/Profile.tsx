import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { authService } from "../services";
import {
  ClipboardList,
  ShieldAlert,
  Activity,
  Save,
  Edit3,
  X,
  User as UserIcon,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();

  // Trạng thái chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dữ liệu form
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    blood_group: "",
    height: "",
    weight: "",
    allergies: "",
    medical_history: "",
  });

  // Lấy dữ liệu thực tế từ API khi vào trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await authService.getProfile("me");
        const p = data.data;
        setFormData({
          username: p.username || "",
          phone: p.phone || "",
          blood_group: p.blood_group || "",
          height: p.height || "",
          weight: p.weight || "",
          allergies: p.allergies || "",
          medical_history: p.medical_history || "",
        });
      } catch (error) {
        console.error("Lỗi tải hồ sơ");
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await authService.updateProfile(formData);
      updateUser(data.data); // Cập nhật lại context toàn cục
      toast.success(t("update_success"));
      setIsEditing(false); // Tắt chế độ chỉnh sửa
    } catch (err) {
      toast.error("Không thể cập nhật hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-4 pb-12 transition-colors text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: THÔNG TIN CƠ BẢN (AVATAR) */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm h-fit space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-4xl border-4 border-white dark:border-gray-800 shadow-md">
              {formData.username?.[0]?.toUpperCase() || "U"}
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black">{formData.username}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Mail size={14} /> {user?.email}
            </div>
            {formData.phone && (
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Phone size={14} /> {formData.phone}
              </div>
            )}
          </div>

          <div className="pt-4">
            <div className="bg-blue-600/10 text-blue-600 p-3 rounded-2xl text-xs font-black text-center uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
              {user?.role || "PATIENT"}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT SỨC KHỎE */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
          {/* Header & Nút Toggle */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-black flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <ClipboardList size={20} />
              </div>
              {t("profile_title")}
            </h1>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all"
              >
                <Edit3 size={16} /> Chỉnh sửa
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all"
              >
                <X size={16} /> Hủy bỏ
              </button>
            )}
          </div>

          {/* GRID THÔNG SỐ: Máu, Cao, Nặng */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-tighter">
                {t("blood_group")}
              </label>
              {isEditing ? (
                <select
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.blood_group}
                  onChange={(e) =>
                    setFormData({ ...formData, blood_group: e.target.value })
                  }
                >
                  <option value="">--</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <p className="text-lg font-bold p-1">
                  {formData.blood_group || "Chưa cập nhật"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-tighter">
                {t("height")}
              </label>
              {isEditing ? (
                <input
                  type="number"
                  placeholder="cm"
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                />
              ) : (
                <p className="text-lg font-bold p-1">
                  {formData.height ? `${formData.height} cm` : "Chưa cập nhật"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-tighter">
                {t("weight")}
              </label>
              {isEditing ? (
                <input
                  type="number"
                  placeholder="kg"
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              ) : (
                <p className="text-lg font-bold p-1">
                  {formData.weight ? `${formData.weight} kg` : "Chưa cập nhật"}
                </p>
              )}
            </div>
          </div>

          {/* VÙNG VĂN BẢN: Dị ứng & Tiền sử */}
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-black text-orange-500 uppercase">
                <ShieldAlert size={18} /> {t("allergies")}
              </label>
              {isEditing ? (
                <textarea
                  className="w-full p-5 rounded-[24px] border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-32 outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  value={formData.allergies}
                  onChange={(e) =>
                    setFormData({ ...formData, allergies: e.target.value })
                  }
                  placeholder="Nhập các loại thực phẩm, thuốc gây dị ứng..."
                />
              ) : (
                <div className="bg-orange-50/50 dark:bg-orange-900/10 p-5 rounded-3xl text-gray-700 dark:text-gray-300 italic min-h-[80px]">
                  {formData.allergies || "Không có thông tin dị ứng"}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-black text-blue-600 uppercase">
                <Activity size={18} /> {t("medical_history")}
              </label>
              {isEditing ? (
                <textarea
                  className="w-full p-5 rounded-[24px] border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-32 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.medical_history}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medical_history: e.target.value,
                    })
                  }
                  placeholder="Nhập tiền sử bệnh lý gia đình hoặc cá nhân..."
                />
              ) : (
                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-3xl text-gray-700 dark:text-gray-300 italic min-h-[80px]">
                  {formData.medical_history ||
                    "Chưa có dữ liệu tiền sử bệnh lý"}
                </div>
              )}
            </div>
          </div>

          {/* NÚT LƯU - Chỉ hiện khi đang sửa */}
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full mt-10 bg-blue-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={20} /> {loading ? "Đang lưu..." : t("save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
