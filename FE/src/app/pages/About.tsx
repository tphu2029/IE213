import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Eye, Award, Users, Heart, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: t("value_compassion_title"),
      description: t("value_compassion_desc"),
    },
    {
      icon: Award,
      title: t("value_excellence_title"),
      description: t("value_excellence_desc"),
    },
    {
      icon: Users,
      title: t("value_collaboration_title"),
      description: t("value_collaboration_desc"),
    },
    {
      icon: Lightbulb,
      title: t("value_innovation_title"),
      description: t("value_innovation_desc"),
    },
  ];

  const milestones = [
    { year: "1996", event: "Hospital founded with 100 beds" },
    { year: "2005", event: "Expanded to 300 beds and added ICU wing" },
    { year: "2015", event: "Introduced robotic surgery center" },
    { year: "2020", event: "Opened state-of-the-art cardiac center" },
    { year: "2026", event: "Serving 50,000+ patients annually" },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?q=80&w=1080"
            alt="About Modern Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80 dark:bg-black/80 transition-colors"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-4 font-bold">
            {t("about_hero_title")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
            {t("about_hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 dark:bg-gray-900 p-8 rounded-[32px] border border-transparent dark:border-gray-800 transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl text-gray-900 dark:text-white mb-4 font-bold">
                {t("about_mission_title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
                {t("about_mission_text")}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-900 p-8 rounded-[32px] border border-transparent dark:border-gray-800 transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl text-gray-900 dark:text-white mb-4 font-bold">
                {t("about_vision_title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
                {t("about_vision_text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-gray-900 dark:text-white mb-6 font-black">
                {t("about_story_title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-4 leading-relaxed italic">
                {t("about_story_p1")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-4 leading-relaxed">
                {t("about_story_p2")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
                {t("about_story_p3")}
              </p>
            </div>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 transition-all">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1080"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="text-4xl text-gray-900 dark:text-white mb-4 font-black">
              {t("about_values_title")}
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              {t("about_values_subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-50 dark:bg-gray-900 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                    <value.icon className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2 font-bold">
                  {value.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="text-4xl text-white mb-4 font-black">
              {t("about_journey_title")}
            </h2>
            <p className="text-xl text-white/80 font-medium">
              {t("about_journey_subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition-all"
              >
                <div className="text-3xl text-white mb-3 font-black">
                  {milestone.year}
                </div>
                <p className="text-white/90 text-sm font-medium">
                  {milestone.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-gray-900 dark:text-white mb-6 font-black">
            {t("about_accreditation_title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            {t("about_accreditation_desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-blue-50 dark:bg-gray-900 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-transparent dark:border-gray-800 group-hover:scale-110 transition-transform">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm uppercase tracking-wide">
                {t("label_joint_commission")}
              </p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-blue-50 dark:bg-gray-900 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-transparent dark:border-gray-800 group-hover:scale-110 transition-transform">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm uppercase tracking-wide">
                {t("label_top_hospital")}
              </p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-blue-50 dark:bg-gray-900 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-transparent dark:border-gray-800 group-hover:scale-110 transition-transform">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm uppercase tracking-wide">
                {t("label_patient_safety")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
