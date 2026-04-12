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
import { BASE_URL } from "@/lib/axios";

export function Header() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile dropdown

  const navigation = [
    { name: t("nav_home"), href: "/" },
    { name: t("nav_services"), href: "/services" },
    { name: t("nav_doctors"), href: "/doctors" },
    { name: t("nav_lookup"), href: "/lookup" },
  ];

  // Xử lý Darkmode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const isActive = (path: string) => location.pathname === path;

  const getAvatarUrl = (path: string | undefined): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith("http")) return path;
    return `${BASE_URL}/${path}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">
            ModernHospital
          </span>
        </Link>

        {/* TRUNG TÂM: DANH SÁCH MENU (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-bold transition-colors ${
                isActive(item.href)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* BÊN PHẢI: ACTIONS & PROFILE */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Nút Đặt lịch (Desktop) */}
          <Link
            to="/book"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-200 dark:shadow-none"
          >
            <Calendar size={16} /> {t("nav_booking")}
          </Link>

          {/* Nút Ngôn ngữ */}
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
            }
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-bold text-xs flex items-center gap-1"
          >
            <Globe size={18} /> <span>{i18n.language.toUpperCase()}</span>
          </button>

          {/* Nút Chế độ tối */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            {isDark ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* User Profile & Avatar */}
          {user ? (
            <div className="relative ml-1">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition hover:scale-105"
              >
                {user.avatar ? (
                  <img
                    src={getAvatarUrl(user.avatar)}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon
                    className="text-blue-600 dark:text-blue-400"
                    size={20}
                  />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b dark:border-gray-800 mb-2">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                      Tài khoản
                    </p>
                    <p className="text-sm font-bold dark:text-white truncate">
                      {user.username}
                    </p>
                  </div>
                  <Link
                    to="/users"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {t("profile_health")}
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {t("profile_dashboard")}
                  </Link>
                  <Link
                    to="/invoices"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {t("nav_invoice")}
                  </Link>
                  <hr className="my-2 dark:border-gray-800" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 font-bold"
                  >
                    <LogOut size={16} /> {t("profile_logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {t("login")}
            </Link>
          )}

          {/* Hamburger Menu (Mobile) */}
          <button
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t dark:border-gray-800 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block p-3 rounded-xl text-base font-bold text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/book"
            className="block p-3 rounded-xl text-base font-bold bg-blue-600 text-white text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("nav_booking")}
          </Link>
        </div>
      )}
    </header>
  );
}
