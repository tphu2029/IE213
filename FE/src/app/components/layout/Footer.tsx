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
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">ModernHospital</h3>
            <p className="text-gray-400 text-sm">{t("footer_desc")}</p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">{t("footer_links")}</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  {t("nav_home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  {t("nav_about")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400">
                  {t("nav_services")}
                </Link>
              </li>
              <li>
                <Link to="/lookup" className="hover:text-blue-400">
                  {t("nav_lookup")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">{t("nav_services")}</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>{t("dept_general")}</li>
              <li>{t("dept_cardiology")}</li>
              <li>{t("dept_pedia")}</li>
              <li>{t("dept_surgery")}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">{t("footer_contact")}</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400" />
                <span>123 Healthcare Ave, Medical City</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span>info@modernhospital.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
