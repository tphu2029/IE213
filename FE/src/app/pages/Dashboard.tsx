import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { Ticket, X, CalendarOff, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewTicket, setViewTicket] = useState<any>(null);

  useEffect(() => {
    hospitalService
      .getMyAppointments()
      .then((res: any) => {
        setAppointments(res.data?.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // HÀM TÍNH GIỜ CHO LỊCH SỬ: 10 STT = 1h (Mốc 8h hoặc 13h)
  const calculateHistoryTime = (stt: number, shift: string) => {
    const baseH = shift === "Morning" ? 8 : 13;
    const offset = Math.floor((stt - 1) / 10);
    const startH = baseH + offset;
    const endH = startH + 1;
    return `${startH}:00 - ${endH}:00`;
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 transition-colors min-h-screen pt-24 pb-32">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black dark:text-white italic">
          Lịch sử đặt lịch
        </h1>
        {appointments.length > 0 && (
          <Link
            to="/book"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all"
          >
            + Đặt lịch mới
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-blue-600 gap-4">
          <Loader2 className="animate-spin" size={48} />
          <span className="font-black text-xs uppercase tracking-widest">
            Đang tải dữ liệu...
          </span>
        </div>
      ) : appointments.length === 0 ? (
        /* GIAO DIỆN KHI TRỐNG DỮ LIỆU */
        <div className="bg-white dark:bg-gray-900 p-12 md:p-20 rounded-[50px] border-2 border-dashed border-gray-100 dark:border-gray-800 text-center shadow-sm animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-[35px] flex items-center justify-center mx-auto mb-8 text-blue-600">
            <CalendarOff size={48} />
          </div>
          <h2 className="text-3xl font-black dark:text-white mb-4 italic">
            Bạn chưa có lịch hẹn nào
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm mx-auto leading-relaxed font-medium">
            Hệ thống không tìm thấy dữ liệu đặt lịch của bạn. Hãy đăng ký khám
            ngay để chúng tôi chăm sóc sức khỏe cho bạn.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-xl shadow-xl shadow-blue-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
          >
            ĐẶT LỊCH KHÁM NGAY <ArrowRight size={24} />
          </Link>
        </div>
      ) : (
        /* GIAO DIỆN DANH SÁCH LỊCH HẸN */
        <div className="grid gap-6">
          {appointments.map((apt: any) => (
            <div
              key={apt._id}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-black text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {apt.stt}
                </div>
                <div>
                  <h3 className="text-xl font-black dark:text-white mb-1">
                    BS. {apt.doctor_id?.user_id?.username}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400">
                      {new Date(apt.appointment_date).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                    <span className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg text-xs font-bold text-blue-600">
                      {calculateHistoryTime(apt.stt, apt.shift)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex-1 text-right mr-4 hidden md:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Trạng thái
                  </p>
                  <p className="text-sm font-black text-green-600">
                    ĐÃ XÁC NHẬN
                  </p>
                </div>
                <button
                  onClick={() => setViewTicket(apt)}
                  className="flex-1 md:flex-none py-4 px-6 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 font-bold"
                >
                  <Ticket size={20} /> Xem phiếu STT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL XEM LẠI PHIẾU STT (GIỮ NGUYÊN NHƯ CŨ) */}
      {viewTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setViewTicket(null)}
              className="absolute -top-12 right-0 text-white font-black flex items-center gap-2 bg-red-600/80 hover:bg-red-600 px-4 py-1 rounded-lg transition-colors"
            >
              <X size={18} /> ĐÓNG
            </button>
            <div className="max-w-md bg-white rounded-[40px] overflow-hidden shadow-2xl border-4 border-blue-600 text-center text-gray-900">
              <div className="bg-blue-600 p-5 text-white italic font-black uppercase tracking-tighter">
                Modern Hospital
              </div>
              <div className="p-10">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Số thứ tự khám
                </p>
                <h1 className="text-9xl font-black text-blue-600 mb-4">
                  {viewTicket.stt}
                </h1>
                <p className="font-bold text-blue-600 bg-blue-50 py-2 rounded-xl mb-6">
                  Dự kiến:{" "}
                  {calculateHistoryTime(viewTicket.stt, viewTicket.shift)}
                </p>
                <div className="space-y-3 text-left border-t pt-6 mt-6 text-sm">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className="text-gray-400">BÁC SĨ:</span>
                    <span className="uppercase">
                      {viewTicket.doctor_id?.user_id?.username}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className="text-gray-400">NGÀY KHÁM:</span>
                    <span>
                      {new Date(viewTicket.appointment_date).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className="text-gray-400">BUỔI:</span>
                    <span>
                      {viewTicket.shift === "Morning" ? "SÁNG" : "CHIỀU"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
