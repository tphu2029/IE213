import { Link } from "react-router";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-950 text-white transition-colors border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Desc */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-blue-500 italic">
              ModernHospital
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("footer_desc")}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 bg-gray-900 rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-blue-500">
              {t("footer_links")}
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t("nav_home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  {t("nav_about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  {t("nav_services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/lookup"
                  className="hover:text-white transition-colors"
                >
                  {t("nav_lookup")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Preview */}
          <div>
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-blue-500">
              {t("nav_services")}
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">
                {t("dept_general")}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                {t("dept_cardiology")}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                {t("dept_pedia")}
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                {t("dept_surgery")}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-blue-500">
              {t("footer_contact")}
            </h3>
            <div className="space-y-6 text-sm text-gray-400 font-medium">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-blue-500 shrink-0" />
                <span>123 Healthcare Ave, Medical City</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <span>info@modernhospital.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-900 mt-16 pt-8 text-center">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
