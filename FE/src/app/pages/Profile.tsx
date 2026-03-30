import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { ClipboardList, ShieldAlert, Activity, Save } from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [data, setData] = useState({
    blood: "",
    h: "",
    w: "",
    allergies: "",
    history: "",
  });

  const handleSave = () => {
    toast.success(t("update_success"));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-4 pb-12 transition-colors text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border dark:border-gray-800 shadow-sm h-fit">
          <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600 font-bold text-3xl">
            {user?.username?.[0].toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-center">{user?.username}</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            {user?.email}
          </p>
          <div className="bg-blue-600/10 text-blue-600 p-2 rounded-lg text-xs font-bold text-center uppercase tracking-widest">
            {user?.role}
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-3xl border dark:border-gray-800 shadow-sm">
          <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <ClipboardList className="text-blue-600" />
            {t("profile_title")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-xs font-bold text-gray-400 mb-1 block">
                {t("blood_group")}
              </label>
              <select
                className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 bg-transparent"
                onChange={(e) => setData({ ...data, blood: e.target.value })}
              >
                <option value="">--</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 mb-1 block">
                {t("height")}
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 bg-transparent"
                onChange={(e) => setData({ ...data, h: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 mb-1 block">
                {t("weight")}
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 bg-transparent"
                onChange={(e) => setData({ ...data, w: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-orange-500 mb-2">
                <ShieldAlert size={16} />
                {t("allergies")}
              </label>
              <textarea
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:border-gray-700 bg-transparent h-24"
                onChange={(e) =>
                  setData({ ...data, allergies: e.target.value })
                }
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-2">
                <Activity size={16} />
                {t("medical_history")}
              </label>
              <textarea
                className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:border-gray-700 bg-transparent h-24"
                onChange={(e) => setData({ ...data, history: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Save size={18} /> {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
