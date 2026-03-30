import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { hospitalService } from "../services";
import { Appointment } from "../services/types";
import { Calendar, Plus, Clock, User, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (user) {
      hospitalService
        .getMyAppointments()
        .then((res) => setAppointments(res.data.data))
        .catch(() => {});
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng, {user?.username}!
        </h1>
        <p className="text-gray-500">
          Đây là tóm tắt hoạt động khám chữa bệnh của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
          <Calendar className="mb-4" size={32} />
          <h3 className="text-lg opacity-80">Lịch hẹn sắp tới</h3>
          <p className="text-3xl font-bold">
            {appointments.filter((a) => a.status === "confirmed").length}
          </p>
        </div>
        <Link
          to="/book-appointment"
          className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
        >
          <Plus size={40} className="mb-2" />
          <span className="font-bold">Đặt lịch khám mới</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Lịch sử khám bệnh gần đây</h2>
          <Link
            to="/medical-records"
            className="text-blue-600 text-sm font-bold flex items-center gap-1"
          >
            Xem tất cả <ChevronRight size={16} />
          </Link>
        </div>
        <div className="divide-y">
          {appointments.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              Chưa có dữ liệu lịch hẹn.
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt._id}
                className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Bác sĩ: {apt.doctor_id?.user_id?.username || "Chuyên gia"}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />{" "}
                        {new Date(apt.appointment_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {apt.time_slot}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                      apt.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : apt.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
