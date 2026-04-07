import { useTranslation } from "react-i18next";
import {
  Target,
  Eye,
  Award,
  Users,
  Heart,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const { t } = useTranslation();

  const values = [
    { icon: Heart, t: "value_compassion_title", d: "value_compassion_desc" },
    { icon: Award, t: "value_excellence_title", d: "value_excellence_desc" },
    {
      icon: Users,
      t: "value_collaboration_title",
      d: "value_collaboration_desc",
    },
    {
      icon: Lightbulb,
      t: "value_innovation_title",
      d: "value_innovation_desc",
    },
  ];

  const milestones = [
    { year: "1996", event: "Thành lập bệnh viện với 100 giường bệnh." },
    {
      year: "2005",
      event: "Mở rộng lên 300 giường và thêm khu hồi sức tích cực ICU.",
    },
    { year: "2015", event: "Ra mắt trung tâm phẫu thuật robot hiện đại." },
    { year: "2020", event: "Khai trương trung tâm tim mạch kỹ thuật cao." },
    { year: "2025", event: "Phục vụ hơn 50.000 bệnh nhân hàng năm." },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-gray-50 dark:bg-gray-900 py-32 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-black dark:text-white mb-6 italic tracking-tighter">
            {t("about_hero_title")}
          </h1>
          <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            {t("about_hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-12 rounded-[50px] border border-blue-100 dark:border-blue-900/30 shadow-sm">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl">
            <Target size={40} />
          </div>
          <h2 className="text-3xl font-black dark:text-white mb-6">
            {t("about_mission_title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic">
            {t("about_mission_text")}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 p-12 rounded-[50px] border border-green-100 dark:border-green-900/30 shadow-sm">
          <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl">
            <Eye size={40} />
          </div>
          <h2 className="text-3xl font-black dark:text-white mb-6">
            {t("about_vision_title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic">
            {t("about_vision_text")}
          </p>
        </div>
      </div>

      {/* Long Story Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-black dark:text-white italic">
            {t("about_story_title")}
          </h2>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-loose">
            <p>{t("about_story_p1")}</p>
            <p>{t("about_story_p2")}</p>
            <p>{t("about_story_p3")}</p>
          </div>
        </div>
        <div className="rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white dark:border-gray-800">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1080"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-black dark:text-white mb-20 uppercase tracking-[0.3em]">
          {t("about_values_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((v, i) => (
            <div
              key={i}
              className="group p-10 bg-white dark:bg-gray-900 rounded-[40px] border dark:border-gray-800 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <v.icon
                  size={36}
                  className="text-blue-600 group-hover:text-white"
                />
              </div>
              <h4 className="font-black dark:text-white text-2xl mb-4">
                {t(v.t)}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {t(v.d)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-32 bg-blue-600 dark:bg-blue-900/50 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-black mb-20 italic text-center">
            {t("about_journey_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 relative"
              >
                <div className="text-4xl font-black mb-4">{m.year}</div>
                <p className="font-medium opacity-90 leading-relaxed">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
