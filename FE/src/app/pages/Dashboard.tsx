import { useState, useEffect } from "react";
import { hospitalService } from "../services";
import { Ticket, X } from "lucide-react";
export function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [viewTicket, setViewTicket] = useState<any>(null);

  useEffect(() => {
    hospitalService
      .getMyAppointments()
      .then((res: any) => setAppointments(res.data?.data || []));
  }, []);

  // HÀM TÍNH GIỜ CHO LỊCH SỬ: 10 STT = 1h
  const calculateHistoryTime = (stt: number, shift: string) => {
    const baseH = shift === "Morning" ? 8 : 13;
    const offset = Math.floor((stt - 1) / 10);
    const startH = baseH + offset;
    const endH = startH + 1;
    return `${startH}:00 - ${endH}:00`;
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24 min-h-screen">
      <h1 className="text-3xl font-black dark:text-white mb-10 italic">
        Lịch sử đặt lịch
      </h1>
      <div className="grid gap-4">
        {appointments.map((apt: any) => (
          <div
            key={apt._id}
            className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border dark:border-gray-800 flex justify-between items-center shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-black">
                {apt.stt}
              </div>
              <div>
                <h3 className="text-lg font-black dark:text-white">
                  BS. {apt.doctor_id?.user_id?.username}
                </h3>
                <p className="text-xs text-gray-500 font-bold uppercase">
                  {new Date(apt.appointment_date).toLocaleDateString("vi-VN")} |{" "}
                  {apt.shift} | {calculateHistoryTime(apt.stt, apt.shift)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setViewTicket(apt)}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <Ticket />
            </button>
          </div>
        ))}
      </div>

      {viewTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative animate-in zoom-in-95">
            <button
              onClick={() => setViewTicket(null)}
              className="absolute -top-12 right-0 text-white font-black flex items-center gap-2 bg-red-600 px-4 py-1 rounded-lg shadow-xl hover:scale-105 transition-transform"
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
                <div className="space-y-3 text-left border-t pt-6 text-sm">
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
