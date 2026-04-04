import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck } from "lucide-react";

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black dark:text-white mb-6 italic tracking-tighter">
            {t("contact_title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-24">
          {/* Form - Cố định độ rộng và Padding */}
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 p-8 md:p-12 rounded-[50px] border dark:border-gray-800 shadow-sm relative overflow-hidden">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  {t("contact_form_name")}
                </label>
                <input className="w-full p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 transition-all shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  {t("email")}
                </label>
                <input className="w-full p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 transition-all shadow-sm" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  {t("visit_reason")}
                </label>
                <input className="w-full p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 transition-all shadow-sm" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  {t("contact_form_msg")}
                </label>
                <textarea
                  rows={5}
                  className="w-full p-4 rounded-3xl border-2 border-transparent bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
                />
              </div>
              <button className="md:col-span-2 bg-blue-600 text-white py-5 rounded-[25px] font-black text-xl hover:bg-blue-700 transition shadow-xl flex items-center justify-center gap-4 active:scale-95">
                {t("contact_send")} <Send size={20} />
              </button>
            </form>
          </div>

          {/* Right Info Column */}
          <div className="space-y-8 h-full flex flex-col justify-center">
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-400 uppercase tracking-widest text-[9px] mb-1">
                  {t("label_address")}
                </h4>
                <p className="dark:text-white font-bold text-lg leading-tight">
                  Medical City, MC 12345
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-400 uppercase tracking-widest text-[9px] mb-1">
                  {t("label_phone")}
                </h4>
                <p className="dark:text-white font-bold text-lg leading-tight">
                  (555) 123-4567
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-400 uppercase tracking-widest text-[9px] mb-1">
                  SERVICE HOURS
                </h4>
                <p className="dark:text-white font-bold text-lg leading-tight">
                  Emergency: 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Section */}
        <div className="bg-red-600 rounded-[50px] p-12 text-center text-white shadow-2xl">
          <div className="flex justify-center mb-6">
            <ShieldCheck size={50} />
          </div>
          <h2 className="text-3xl font-black mb-4 italic">
            {t("btn_emergency")}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            {t("cta_p")}
          </p>
          <a
            href="tel:5551234567"
            className="bg-white text-red-600 px-10 py-4 rounded-2xl font-black text-2xl hover:scale-105 transition inline-block"
          >
            (555) 123-4567
          </a>
        </div>
      </div>
    </div>
  );
}
