import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-6xl font-black dark:text-white mb-6 italic tracking-tighter">
            {t("contact_title")}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
          {/* Form */}
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 p-12 rounded-[60px] border dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">
                  {t("contact_form_name")}
                </label>
                <input className="w-full p-5 rounded-[24px] border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 shadow-sm transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">
                  {t("contact_form_email")}
                </label>
                <input className="w-full p-5 rounded-[24px] border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 shadow-sm transition-all" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">
                  {t("contact_form_subject")}
                </label>
                <input className="w-full p-5 rounded-[24px] border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 shadow-sm transition-all" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">
                  {t("contact_form_msg")}
                </label>
                <textarea
                  rows={6}
                  className="w-full p-5 rounded-[32px] border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 shadow-sm transition-all resize-none"
                />
              </div>
              <button className="md:col-span-2 bg-blue-600 text-white py-6 rounded-[30px] font-black text-2xl hover:bg-blue-700 transition shadow-2xl flex items-center justify-center gap-4 active:scale-95">
                {t("contact_send")} <Send size={24} />
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="space-y-12">
            {[
              {
                icon: MapPin,
                label: "contact_info_addr",
                val: "123 Healthcare Ave, Medical City, MC 12345",
              },
              {
                icon: Phone,
                label: "contact_info_phone",
                val: "(555) 123-4567 / (555) 123-9999",
              },
              { icon: Mail, label: "Email", val: "support@modernhospital.com" },
              {
                icon: Clock,
                label: "Giờ làm việc",
                val: "Cấp cứu: 24/7 | Khám bệnh: 07:00 - 20:00",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="p-5 bg-blue-600 text-white rounded-[2rem] shadow-xl group-hover:scale-110 transition-transform shrink-0">
                  <item.icon size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-400 uppercase tracking-widest text-[10px] mb-2">
                    {t(item.label)}
                  </h4>
                  <p className="dark:text-white font-black text-xl leading-snug">
                    {item.val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Section */}
        <div className="bg-red-600 rounded-[50px] p-16 text-center text-white mb-32 shadow-2xl">
          <div className="flex justify-center mb-6">
            <ShieldCheck size={64} />
          </div>
          <h2 className="text-4xl font-black mb-4 italic">
            {t("contact_emergency_h2")}
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            {t("contact_emergency_p")}
          </p>
          <a
            href="tel:5551234567"
            className="bg-white text-red-600 px-12 py-5 rounded-[24px] font-black text-3xl hover:scale-105 transition inline-block"
          >
            (555) 123-4567
          </a>
        </div>
      </div>
    </div>
  );
}
