import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { authService, patientService } from "../services";
import {
  ClipboardList,
  Save,
  Edit3,
  X,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const { user, updateUser } = useAuth() as any;
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    gender: "Other",
    birth_date: "",
    address: "",
    cccd: "",
  });

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const { data } = await authService.getProfile("me");
        console.log("Profile fetched:", data);
        if (data && data.data && isMounted) {
          setFormData({
            username: data.data.username || "",
            phone: data.data.phone || "",
            gender: data.data.gender || "Other",
            birth_date: data.data.birth_date
              ? String(data.data.birth_date).split("T")[0]
              : "",
            address: data.data.address || "",
            cccd: data.data.cccd || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile via endpoint /users/me:", err);
      }
    };
    if (user) {
      init();
    }
    return () => { isMounted = false; };
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // 1. Cập nhật bảng Users
      await authService.updateProfile({
        username: formData.username,
        phone: formData.phone,
      });

      // 2. Cập nhật/Tạo bảng Patients (Đồng bộ với BE)
      await patientService.createPatientProfile({
        user_id: user.id,
        gender: formData.gender,
        birth_date: formData.birth_date,
        address: formData.address,
        cccd: formData.cccd,
      });

      toast.success(t("update_success"));
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("avatar", file);

    try {
      setLoading(true);
      const { data } = await authService.updateProfile(form);
      if (data && data.success) {
        toast.success("Cập nhật Ảnh đại diện thành công!");
        
        if (data.data && data.data.avatar) {
           if (typeof updateUser === "function") {
               updateUser({ ...user, avatar: data.data.avatar });
           }
           window.location.reload(); 
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi cập nhật ảnh");
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = (path: string): string | undefined => {
    if (!path) return undefined;
    const env = (import.meta as any).env;
    const baseUrl = env?.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';
    return `${baseUrl}/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-4 pb-12 transition-colors">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border dark:border-gray-800 shadow-sm h-fit relative">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-4xl mb-6 relative group cursor-pointer overflow-hidden border-4 border-blue-50 dark:border-gray-800"
          >
            {user?.avatar ? (
               <img src={getAvatarUrl(user.avatar)} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
               formData.username?.[0] || "U"
            )}
            
            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
               <Camera className="text-white w-8 h-8" />
            </div>
          </div>
          <input 
             type="file" 
             ref={fileInputRef} 
             accept="image/*" 
             className="hidden" 
             onChange={handleAvatarChange} 
          />
          <h2 className="text-2xl font-black text-center dark:text-white">
            {formData.username}
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">
            {user?.email}
          </p>
          <div className="bg-blue-600/10 text-blue-600 p-2 rounded-xl text-xs font-black text-center uppercase tracking-widest">
            {user?.role}
          </div>
        </div>

        {/* Info Form */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-[40px] border dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black dark:text-white flex items-center gap-2">
              <ClipboardList className="text-blue-600" /> {t("profile_title")}
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-bold text-blue-600"
            >
              {isEditing ? <X /> : <Edit3 />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                CCCD / CMND
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={(!isEditing && formData.cccd) ? formData.cccd.slice(0, 3) + "*********" : formData.cccd}
                onChange={(e) =>
                  setFormData({ ...formData, cccd: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                {t("contact_form_name")} (Name)
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Phone
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Birth Date
              </label>
              <input
                type="date"
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={formData.birth_date}
                onChange={(e) =>
                  setFormData({ ...formData, birth_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Address
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Save size={18} /> {loading ? t("loading") : t("save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
