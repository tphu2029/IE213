import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Heart,
  Users,
  Award,
  Clock,
  Activity,
  Stethoscope,
  Brain,
  Baby,
  ArrowRight,
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

  const services = [
    {
      icon: Activity,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response team",
      image:
        "https://images.unsplash.com/photo-1721114989769-0423619f03d2?q=80&w=1080",
    },
    {
      icon: Heart,
      title: "Cardiology",
      description: "Advanced heart care with latest technology",
      image:
        "https://images.unsplash.com/photo-1656337426914-5e5ba162d606?q=80&w=1080",
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Expert care for brain and nervous system disorders",
      image:
        "https://images.unsplash.com/photo-1725693485717-dbf8eac577c6?q=80&w=1080",
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Specialized care for infants, children, and adolescents",
      image:
        "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?q=80&w=1080",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors">
      <section className="relative h-[600px] flex items-center pt-16">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?q=80&w=1080"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/70 dark:from-black dark:to-blue-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("hero_h1")}
            </h1>
            <p className="text-xl opacity-90 mb-8">{t("hero_p")}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/book-appointment"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition"
              >
                {t("btn_book")} <ArrowRight size={20} />
              </Link>
              <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
                {t("btn_emergency")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold dark:text-white">
                {stat.value}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-white">
            {t("services_h2")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            {t("services_p")}
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border dark:border-gray-700"
            >
              <div className="h-48">
                <img
                  src={service.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">{t("cta_h2")}</h2>
        <p className="text-xl opacity-90 mb-8">{t("cta_p")}</p>
        <Link
          to="/contact"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold inline-block"
        >
          {t("btn_book")}
        </Link>
      </section>
    </div>
  );
}
