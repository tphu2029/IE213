import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { hospitalService } from "../services";
import {
  ShieldCheck,
  Download,
  Loader2,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "../../lib/axios";
import { toPng } from "html-to-image";

export function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isWaitingPayment, setIsWaitingPayment] = useState(false); // New state
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [bookedData, setBookedData] = useState<any>(null);

  const [form, setForm] = useState({
    department_id: searchParams.get("dept") || "",
    date: "",
    shift: "Morning",
    doctor_id: "",
    hasInsurance: true,
  });

  useEffect(() => {
    hospitalService
      .getDepartments()
      .then((res: any) => setDepartments(res.data.data));
  }, []);

  const handleFindDoctors = async () => {
    if (!form.department_id || !form.date)
      return toast.error("Vui lòng chọn đầy đủ thông tin");
    setLoading(true);
    try {
      const res: any = await hospitalService.getAvailableDoctors(
        form.date,
        form.shift,
        form.department_id,
      );
      if (res.data.data.length === 0) {
        toast.error("Ca này bác sĩ đã hết lịch hoặc không trực.");
      } else {
        setDoctors(res.data.data);
        setStep(2);
      }
    } catch (err) {
      toast.error("Lỗi tìm kiếm bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  // LOGIC POLLING: Kiểm tra trạng thái mỗi 3 giây
  const startPolling = (id: string) => {
    const interval = setInterval(async () => {
      try {
        const res: any = await hospitalService.checkAppointmentStatus(id);
        if (res.data.data.status === "confirmed") {
          clearInterval(interval);
          setIsWaitingPayment(false);
          setStep(4); // Nhảy sang trang Ticket thành công
          toast.success("Thanh toán thành công!");
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000);
    setTimeout(() => clearInterval(interval), 600000); // Ngắt sau 10p
  };

  const handleFinalProcess = async () => {
    setLoading(true);
    try {
      const res: any = await hospitalService.bookAppointment({
        doctor_id: form.doctor_id,
        appointment_date: form.date,
        shift: form.shift,
        hasInsurance: form.hasInsurance,
      });

      const data = res.data.data;
      setBookedData(data);

      if (data.status === "pending") {
        setStep(3);
        setIsWaitingPayment(true);
        startPolling(data._id); // Bắt đầu đợi tiền về
      } else {
        setStep(4);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi đặt lịch");
    } finally {
      setLoading(false);
    }
  };

  const getEstTimeRange = (stt: number, baseStart: string) => {
    if (!baseStart) return "08:00 - 09:00";
    const [h, m] = baseStart.split(":").map(Number);
    const hourOffset = Math.floor((stt - 1) / 10);
    const startH = h + hourOffset;
    const endH = startH + 1;
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    return `${pad(startH)}:${pad(m)} - ${pad(endH)}:${pad(m)}`;
  };

  const downloadTicket = () => {
    if (!ticketRef.current) return;
    const width = 450;
    const height = 750;
    toPng(ticketRef.current, {
      cacheBust: true,
      canvasWidth: width,
      canvasHeight: height,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
        width: `${width}px`,
        height: `${height}px`,
      },
    })
      .then((url) => {
        const link = document.createElement("a");
        link.download = `ModernHospital-STT-${bookedData.stt}.png`;
        link.href = url;
        link.click();
        toast.success("Đã tải ảnh thành công!");
      })
      .catch(() => toast.error("Lỗi xuất ảnh"));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        {/* Stepper Header */}
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= i ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {i}
            </div>
          ))}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-xl border dark:border-gray-800 animate-in fade-in">
            <h2 className="text-2xl font-black mb-8 dark:text-white italic">
              1. Thời gian & Chuyên khoa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 tracking-widest">
                  Chuyên khoa
                </label>
                <select
                  className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={form.department_id}
                  onChange={(e) =>
                    setForm({ ...form, department_id: e.target.value })
                  }
                >
                  <option value="">Chọn khoa khám...</option>
                  {departments.map((d: any) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 tracking-widest">
                  Ngày khám
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 tracking-widest">
                  Buổi khám
                </label>
                <div className="flex gap-4">
                  {["Morning", "Afternoon"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm({ ...form, shift: s })}
                      className={`flex-1 py-4 rounded-2xl font-bold border transition-all ${form.shift === s ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-gray-800 dark:text-gray-400"}`}
                    >
                      {s === "Morning" ? "Sáng (08h-12h)" : "Chiều (13h-17h)"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleFindDoctors}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Tiếp theo <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <h2 className="text-2xl font-black dark:text-white italic">
              2. Chọn bác sĩ trực ca
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doc: any) => (
                <div
                  key={doc._id}
                  onClick={() => setForm({ ...form, doctor_id: doc._id })}
                  className={`p-6 rounded-[32px] border-2 cursor-pointer flex items-center gap-4 transition-all ${form.doctor_id === doc._id ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30" : "bg-white dark:bg-gray-900 border-transparent shadow-sm"}`}
                >
                  <img
                    src={
                      doc.user_id?.avatar?.startsWith("http")
                        ? doc.user_id.avatar
                        : `${BASE_URL}/${doc.user_id?.avatar}`
                    }
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-black dark:text-white">
                      BS. {doc.user_id?.username}
                    </p>
                    <p className="text-xs text-blue-600 font-bold uppercase">
                      {doc.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Quay lại
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.doctor_id}
                className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg disabled:opacity-50"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 3: GIAO DIỆN QUÉT MÃ QR THẬT (SEPAY) */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-xl text-center animate-in zoom-in-95">
            {!isWaitingPayment ? (
              <>
                <ShieldCheck size={64} className="mx-auto text-blue-600 mb-6" />
                <h2 className="text-2xl font-black mb-8 dark:text-white">
                  Bạn có Bảo Hiểm Y Tế không?
                </h2>
                <div className="flex gap-4 max-w-sm mx-auto mb-8">
                  <button
                    onClick={() => setForm({ ...form, hasInsurance: true })}
                    className={`flex-1 py-4 rounded-2xl font-black border-2 transition-all ${form.hasInsurance ? "bg-blue-600 text-white border-blue-600" : "dark:text-gray-400"}`}
                  >
                    CÓ
                  </button>
                  <button
                    onClick={() => setForm({ ...form, hasInsurance: false })}
                    className={`flex-1 py-4 rounded-2xl font-black border-2 transition-all ${!form.hasInsurance ? "bg-blue-600 text-white border-blue-600" : "dark:text-gray-400"}`}
                  >
                    KHÔNG
                  </button>
                </div>
                <button
                  onClick={handleFinalProcess}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl shadow-lg"
                >
                  {form.hasInsurance
                    ? "Xác nhận miễn phí khám"
                    : "Tiến hành thanh toán phí"}
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="mt-8 text-sm font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center gap-2 mx-auto"
                >
                  <ArrowLeft size={16} /> Chọn lại bác sĩ
                </button>
              </>
            ) : (
              // HIỂN THỊ MÃ QR THẬT
              <div className="py-4">
                <h2 className="text-2xl font-black mb-6 dark:text-white">
                  Quét mã VietQR để thanh toán
                </h2>
                <div className="bg-white p-4 inline-block rounded-3xl border-4 border-blue-600 mb-6">
                  <img
                    src={`https://img.vietqr.io/image/${bookedData.qrInfo.bankId}-${bookedData.qrInfo.accountNo}-compact2.png?amount=${bookedData.qrInfo.amount}&addInfo=${bookedData.qrInfo.addInfo}&accountName=${bookedData.qrInfo.accountName}`}
                    alt="VietQR"
                    className="w-64 h-64"
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[32px] border-2 border-dashed border-blue-200 mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                    Nội dung chuyển khoản bắt buộc
                  </p>
                  <p className="text-3xl font-black text-red-600 tracking-widest">
                    {bookedData.qrInfo.addInfo}
                  </p>
                  <p className="mt-4 font-bold text-lg dark:text-white">
                    Số tiền: 150.000 VNĐ
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-blue-600 font-bold italic animate-pulse">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Đang đợi ngân hàng xác nhận tiền về...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && bookedData && (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="flex flex-col items-center">
              <div
                ref={ticketRef}
                className="w-[400px] bg-white rounded-[40px] overflow-hidden shadow-2xl border-4 border-blue-600 text-gray-900"
              >
                <div className="bg-blue-600 p-6 text-center text-white italic font-black uppercase">
                  Modern Hospital
                </div>
                <div className="p-10 text-center bg-white">
                  <p className="text-xs font-black text-gray-400 uppercase mb-2">
                    Số thứ tự khám
                  </p>
                  <h1 className="text-9xl font-black text-blue-600 mb-6">
                    {bookedData.stt}
                  </h1>
                  <div className="bg-blue-50 p-3 rounded-2xl mb-8 border border-blue-100">
                    <p className="text-sm font-bold text-blue-700 italic">
                      Dự kiến:{" "}
                      {getEstTimeRange(
                        bookedData.stt,
                        bookedData.baseStartTime,
                      )}
                    </p>
                  </div>
                  <div className="space-y-4 text-left border-t pt-8 border-gray-100 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">BÁC SĨ:</span>
                      <span className="font-black uppercase">
                        {
                          doctors.find((d: any) => d._id === form.doctor_id)
                            ?.user_id?.username
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">
                        NGÀY KHÁM:
                      </span>
                      <span className="font-black">
                        {new Date(
                          bookedData.appointment_date,
                        ).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="flex justify-between font-black text-green-600">
                      <span>TRẠNG THÁI:</span>
                      <span className="flex items-center gap-1">
                        <CheckCircle size={14} /> ĐÃ XÁC NHẬN
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 text-center text-[10px] text-white font-bold italic uppercase tracking-widest">
                  Healthcare Excellence
                </div>
              </div>
              <div className="flex justify-center mt-10 gap-4 w-full">
                <button
                  onClick={downloadTicket}
                  className="bg-gray-100 dark:bg-gray-800 dark:text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-200 transition"
                >
                  <Download size={20} /> Tải ảnh PNG
                </button>
                <button
                  onClick={() => navigate("/my-appointments")}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg"
                >
                  Xong
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
