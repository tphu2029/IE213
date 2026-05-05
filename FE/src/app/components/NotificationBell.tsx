import { useState, useEffect, useRef } from "react";
import { Bell, X, CheckCheck, Loader2 } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/lib/axios";
import type { Notification } from "../../../types";

// Dùng axios thuần (KHÔNG qua interceptor của api.ts)
// Tránh vòng lặp 401 → refresh → logout → crash toàn bộ app
const notifAxios = axios.create({ baseURL: API_URL, withCredentials: true });

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("adminToken");
      if (!token) return; // Chưa login → bỏ qua
      const res = await notifAxios.get("/notifications/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data?.data || []);
    } catch {
      // Lỗi 401/403/404 → giữ nguyên danh sách cũ, không làm gì thêm
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll mỗi 60 giây
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("adminToken");
      if (!token) return;
      await notifAxios.patch(`/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch {
      // Bỏ qua lỗi
    }
  };

  const handleMarkAllRead = async () => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("adminToken");
    if (!token) return;
    const unread = notifications.filter((n) => !n.isRead);
    await Promise.allSettled(
      unread.map((n) =>
        notifAxios.patch(`/notifications/${n._id}/read`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ),
    );
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Vừa xong";
    if (mins < 60) return `${mins} phút trước`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} giờ trước`;
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
        aria-label="Thông báo"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b dark:border-gray-800 flex items-center justify-between">
            <div>
              <p className="font-black dark:text-white text-sm">Thông báo</p>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} chưa đọc</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <CheckCheck size={12} /> Đọc tất cả
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Notifications list */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={24} className="animate-spin text-blue-600" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500 font-medium">
                  Chưa có thông báo nào
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif._id}
                  onClick={() => handleMarkAsRead(notif._id)}
                  className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b dark:border-gray-800 last:border-0 ${
                    !notif.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  {/* Dot indicator */}
                  <div className="mt-1.5 shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        notif.isRead ? "bg-gray-200 dark:bg-gray-700" : "bg-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold truncate dark:text-white ${
                        !notif.isRead ? "text-gray-900" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold">
                      {formatTime(notif.createdAt)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
