import { Link, useLocation } from "react-router";
import {
  Sun,
  Moon,
  Globe,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export function Header() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigation = [
    { name: t("nav_home"), href: "/" },
    { name: t("nav_services"), href: "/services" },
    { name: t("nav_doctors"), href: "/doctors" },
    { name: t("nav_lookup"), href: "/lookup" },
  ];

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">
            ModernHospital
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-bold transition-colors ${location.pathname === item.href ? "text-blue-600" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/book"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
          >
            <Calendar size={16} /> {t("nav_booking")}
          </Link>

          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
            }
            className="p-2 text-gray-600 dark:text-gray-300 font-bold text-xs flex items-center gap-1"
          >
            <Globe size={18} /> {i18n.language.toUpperCase()}
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-600 dark:text-gray-300 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="relative ml-1">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden bg-gray-100 flex items-center justify-center transition hover:scale-105"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="text-blue-600" size={20} />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b dark:border-gray-800 mb-2">
                    <p className="text-[10px] text-gray-400 font-black uppercase">
                      USER
                    </p>
                    <p className="text-sm font-bold dark:text-white truncate">
                      {user.username}
                    </p>
                  </div>
                  <Link
                    to="/users"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {t("nav_profile")}
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {t("nav_dashboard")}
                  </Link>
                  <Link
                    to="/invoices"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {t("nav_invoice")}
                  </Link>
                  <hr className="my-2 dark:border-gray-800" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                  >
                    <LogOut size={16} /> {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold transition"
            >
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
