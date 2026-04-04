import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Heart,
  Users,
  Award,
  Stethoscope,
  ArrowRight,
  Activity,
  Brain,
  Baby,
} from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, value: "50K+", label: t("stats_patients") },
    { icon: Stethoscope, value: "200+", label: t("stats_doctors") },
    { icon: Award, value: "30+", label: t("stats_years") },
    { icon: Heart, value: "99%", label: t("stats_rate") },
  ];

  const servicesPreview = [
    {
      icon: Activity,
      title: t("dept_general"),
      desc: "24/7 rapid response.",
      img: "https://images.unsplash.com/photo-1721114989769-0423619f03d2?q=80&w=1080",
    },
    {
      icon: Heart,
      title: t("dept_cardiology"),
      desc: "Heart health experts.",
      img: "https://images.unsplash.com/photo-1656337426914-5e5ba162d606?q=80&w=1080",
    },
    {
      icon: Brain,
      title: t("dept_neurology"),
      desc: "Brain & Nerve care.",
      img: "https://images.unsplash.com/photo-1725693485717-dbf8eac577c6?q=80&w=1080",
    },
    {
      icon: Baby,
      title: t("dept_pedia"),
      desc: "Child healthcare specialists.",
      img: "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?q=80&w=1080",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors pb-24">
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?q=80&w=1080"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent dark:from-black"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-6xl font-black mb-6 italic leading-tight">
            {t("hero_h1")}
          </h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl font-medium">
            {t("hero_p")}
          </p>
          <div className="flex gap-6">
            <Link
              to="/book"
              className="bg-blue-600 px-12 py-5 rounded-[24px] font-black text-lg hover:bg-blue-700 transition shadow-2xl"
            >
              {t("btn_book")}
            </Link>
            <button className="border-2 border-white/50 px-12 py-5 rounded-[24px] font-black text-lg hover:bg-white hover:text-blue-900 transition">
              {t("btn_emergency")}
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center group">
            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">
              <stat.icon className="w-12 h-12 text-blue-600" />
            </div>
            <div className="text-5xl font-black dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black dark:text-white mb-4 italic">
            {t("services_h2")}
          </h2>
          <p className="text-xl text-gray-500 mb-20 max-w-2xl mx-auto font-medium">
            {t("services_p")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {servicesPreview.map((s, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-[40px] overflow-hidden border dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={s.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 text-left">
                  <h3 className="text-2xl font-black dark:text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm italic mb-6 leading-relaxed">
                    {s.desc}
                  </p>
                  <Link
                    to="/services"
                    className="text-blue-600 font-black text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                  >
                    {t("read_more")} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-[60px] p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <h2 className="text-5xl font-black mb-6 italic">{t("cta_h2")}</h2>
          <p className="text-2xl opacity-80 mb-12 max-w-3xl mx-auto font-medium">
            {t("cta_p")}
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-16 py-6 rounded-[30px] font-black text-2xl inline-block hover:scale-110 transition shadow-xl"
          >
            {t("nav_contact")}
          </Link>
        </div>
      </section>
    </div>
  );
}
