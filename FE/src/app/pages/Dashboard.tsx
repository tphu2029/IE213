import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await hospitalService.getMyAppointments();
        const data = res.data?.data || [];
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 transition-colors min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black dark:text-white mb-2">
            {t("dash_title")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t("dash_subtitle")}
          </p>
        </div>
        <Link
          to="/book"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition shadow-lg"
        >
          <Plus size={20} /> {t("dash_register_now")}
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-blue-600">
          <Loader2 className="animate-spin mb-4" size={48} />
          <span className="font-bold tracking-widest uppercase text-xs">
            {t("loading")}
          </span>
        </div>
      ) : (
        <div className="grid gap-6">
          {(appointments?.length || 0) === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-900 p-16 rounded-[40px] text-center border-2 border-dashed dark:border-gray-800">
              <AlertCircle className="mx-auto mb-4 text-gray-300" size={64} />
              <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                {t("dash_empty")}
              </p>
              <Link
                to="/book"
                className="text-blue-600 font-bold mt-4 inline-block underline"
              >
                {t("dash_start_now")}
              </Link>
            </div>
          ) : (
            appointments.map((apt: any) => (
              <div
                key={apt._id}
                className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-2xl transition-all group"
              >
                <div className="flex gap-6 items-center w-full md:w-auto">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">
                      {t("apt_doctor")}:{" "}
                      {apt.doctor_id?.user_id?.username || "---"}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2 font-medium">
                      <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                        <Calendar size={14} className="text-blue-500" />
                        {new Date(apt.appointment_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                        <Clock size={14} className="text-blue-500" />
                        {apt.time_slot}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span
                    className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                      apt.status === "confirmed"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : apt.status === "pending"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                          : "bg-gray-50 text-gray-600 border-gray-100"
                    }`}
                  >
                    {t(apt.status)}
                  </span>
                  <Link
                    to="/medical-records"
                    className="p-4 bg-gray-50 dark:bg-gray-800 hover:bg-blue-600 hover:text-white rounded-2xl transition-all"
                  >
                    <ChevronRight size={24} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
