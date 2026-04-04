import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { authService, patientService } from "../services";
import {
  ClipboardList,
  Save,
  Edit3,
  X,
  User,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Loader2,
  Mail,
  Activity,
  Heart,
  Scale,
  Ruler,
} from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "Nam",
    birth_date: "",
    address: "",
    blood_group: "A",
    height: 0,
    weight: 0,
    allergies: "",
    chronic_diseases: "",
  });

  const loadProfileData = async () => {
    setFetching(true);
    try {
      const { data } = await authService.getProfile();
      const p = data.data;
      setFormData({
        username: p.username || "",
        email: p.email || "",
        phone: p.phone || "",
        gender: p.gender || "Nam",
        birth_date: p.birth_date ? p.birth_date.split("T")[0] : "",
        address: p.address || "",
        blood_group: p.blood_group || "A",
        height: p.height || 0,
        weight: p.weight || 0,
        allergies: p.allergies || "",
        chronic_diseases: p.chronic_diseases || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const calculateBMI = () => {
    if (!formData.height || !formData.weight)
      return { score: 0, text: t("bmi_no_data"), color: "text-gray-400" };
    const h = formData.height / 100;
    const bmi = parseFloat((formData.weight / (h * h)).toFixed(1));
    if (bmi < 18.5)
      return { score: bmi, text: t("bmi_low"), color: "text-blue-500" };
    if (bmi < 25)
      return { score: bmi, text: t("bmi_normal"), color: "text-green-500" };
    return { score: bmi, text: t("bmi_over"), color: "text-red-500" };
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await authService.updateProfile({
        username: formData.username,
        phone: formData.phone,
      });
      await patientService.createPatientProfile(formData as any);
      updateUser({ ...user, username: formData.username });
      toast.success(t("update_success"));
      setIsEditing(false);
      loadProfileData();
    } catch (err) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  const bmi = calculateBMI();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-4 pb-12 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border dark:border-gray-800 shadow-sm text-center">
            <div className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-5xl mb-6 shadow-xl">
              {formData.username?.[0]?.toUpperCase()}
            </div>
            <h2 className="text-2xl font-black dark:text-white mb-1">
              {formData.username}
            </h2>
            <p className="text-gray-400 text-sm mb-6 flex items-center justify-center gap-2">
              <Mail size={14} /> {formData.email}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">
              {t("profile_role_patient")}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border dark:border-gray-800 shadow-sm">
            <h3 className="font-black dark:text-white mb-6 flex items-center gap-2 uppercase text-[10px] tracking-widest text-gray-400">
              <Activity size={16} className="text-blue-600" /> {t("bmi_title")}
            </h3>
            <div className="text-center">
              <div className={`text-5xl font-black mb-2 ${bmi.color}`}>
                {bmi.score || "--"}
              </div>
              <div className={`font-bold text-sm ${bmi.color}`}>{bmi.text}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[40px] border dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-black dark:text-white flex items-center gap-3 italic">
              <Heart className="text-red-500" size={28} />{" "}
              {t("profile_health_section")}
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-3 rounded-xl transition-all ${isEditing ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-600"}`}
            >
              {isEditing ? <X size={20} /> : <Edit3 size={20} />}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                <User size={12} /> {t("label_fullname")}
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                <Phone size={12} /> {t("label_phone")}
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                {t("label_gender")}
              </label>
              <select
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="Nam">{t("male")}</option>
                <option value="Nữ">{t("female")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                <CalendarIcon size={12} /> {t("label_dob")}
              </label>
              <input
                type="date"
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.birth_date}
                onChange={(e) =>
                  setFormData({ ...formData, birth_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                <Ruler size={10} /> {t("label_height")}
              </label>
              <input
                type="number"
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.height === 0 ? "" : formData.height}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                <Scale size={10} /> {t("label_weight")}
              </label>
              <input
                type="number"
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
                value={formData.weight === 0 ? "" : formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                {t("label_address")}
              </label>
              <input
                disabled={!isEditing}
                className="w-full p-4 rounded-2xl border-2 dark:bg-gray-950 dark:text-white dark:border-gray-800 focus:border-blue-500 transition-all disabled:opacity-50"
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
              disabled={loading}
              className="w-full mt-10 bg-blue-600 text-white py-5 rounded-[24px] font-black text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={24} />
              )}{" "}
              {t("save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
