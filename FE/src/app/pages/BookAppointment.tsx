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
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "../../lib/axios";
import { toPng } from "html-to-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";

export function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isWaitingPayment, setIsWaitingPayment] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [bookedData, setBookedData] = useState<any>(null);

  // State quản lý hiển thị Modal nhắc xác thực BHYT
  const [showBHYTModal, setShowBHYTModal] = useState(false);

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

  const startPolling = (id: string) => {
    const interval = setInterval(async () => {
      try {
        const res: any = await hospitalService.checkAppointmentStatus(id);
        if (res.data.data.status === "confirmed") {
          clearInterval(interval);
          setIsWaitingPayment(false);
          setStep(4);
          toast.success("Thanh toán thành công!");
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000);
    setTimeout(() => clearInterval(interval), 600000);
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
        startPolling(data._id);
      } else {
        setStep(4);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message;

      // TRƯỜNG HỢP: Backend báo chưa xác thực BHYT
      if (errorMsg === "BHYT_REQUIRED") {
        setShowBHYTModal(true); // Mở Dialog chuyên nghiệp
      } else {
        toast.error(errorMsg || "Lỗi đặt lịch");
      }
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
    toPng(ticketRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        {/* Stepper */}
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${
                step >= i
                  ? "bg-blue-600 text-white shadow-lg rotate-0"
                  : "bg-white dark:bg-gray-800 text-gray-400 border rotate-12"
              }`}
            >
              {i}
            </div>
          ))}
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 p-10 rounded-[50px] shadow-xl border dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black mb-8 dark:text-white italic">
              1. Thời gian & Chuyên khoa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  Chuyên khoa
                </label>
                <select
                  className="w-full p-5 rounded-3xl border-2 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 transition-all font-bold"
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
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  Ngày khám
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-5 rounded-3xl border-2 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 font-bold"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  Buổi khám
                </label>
                <div className="flex gap-4">
                  {["Morning", "Afternoon"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm({ ...form, shift: s })}
                      className={`flex-1 py-5 rounded-3xl font-black border-2 transition-all ${
                        form.shift === s
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-white dark:bg-gray-800 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      {s === "Morning"
                        ? "Sáng (08:00 - 12:00)"
                        : "Chiều (13:00 - 17:00)"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleFindDoctors}
              className="w-full bg-gray-950 dark:bg-blue-600 text-white py-6 rounded-[30px] font-black text-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Tìm bác sĩ trực ca <ArrowRight size={24} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-8">
            <h2 className="text-3xl font-black dark:text-white italic">
              2. Chọn bác sĩ tư vấn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {doctors.map((doc: any) => (
                <div
                  key={doc._id}
                  onClick={() => setForm({ ...form, doctor_id: doc._id })}
                  className={`p-6 rounded-[40px] border-4 cursor-pointer flex items-center gap-5 transition-all ${
                    form.doctor_id === doc._id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "bg-white dark:bg-gray-900 border-transparent shadow-sm hover:shadow-md"
                  }`}
                >
                  <img
                    src={
                      doc.user_id?.avatar?.startsWith("http")
                        ? doc.user_id.avatar
                        : `${BASE_URL}/${doc.user_id?.avatar}`
                    }
                    className="w-20 h-24 rounded-2xl object-cover bg-gray-100"
                  />
                  <div>
                    <p className="font-black text-lg dark:text-white leading-tight mb-1">
                      BS. {doc.user_id?.username}
                    </p>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-3">
                      {doc.specialization}
                    </p>
                    <div className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded-lg w-fit">
                      <CheckCircle size={12} /> Đang trống lịch
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-5 rounded-3xl font-black text-gray-500 bg-white border-2 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} /> Quay lại
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.doctor_id}
                className="flex-[2] bg-blue-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 p-10 rounded-[50px] shadow-xl text-center animate-in zoom-in-95">
            {!isWaitingPayment ? (
              <>
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <ShieldCheck size={56} />
                </div>
                <h2 className="text-3xl font-black mb-4 dark:text-white">
                  Sử dụng Bảo Hiểm Y Tế?
                </h2>
                <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                  Nếu có BHYT, bạn sẽ được miễn phí hoàn toàn tiền công khám.
                </p>
                <div className="flex gap-4 max-w-md mx-auto mb-10">
                  {/* Cần xác thực ở Profile mới dùng được nút CÓ */}
                  <button
                    onClick={() => setForm({ ...form, hasInsurance: true })}
                    className={`flex-1 py-5 rounded-3xl font-black border-4 transition-all ${form.hasInsurance ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "dark:text-gray-400 border-gray-100 dark:border-gray-800"}`}
                  >
                    CÓ BHYT
                  </button>
                  <button
                    onClick={() => setForm({ ...form, hasInsurance: false })}
                    className={`flex-1 py-5 rounded-3xl font-black border-4 transition-all ${!form.hasInsurance ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "dark:text-gray-400 border-gray-100 dark:border-gray-800"}`}
                  >
                    KHÔNG CÓ
                  </button>
                </div>
                <button
                  onClick={handleFinalProcess}
                  disabled={loading}
                  className="w-full bg-gray-950 dark:bg-blue-600 text-white py-6 rounded-[30px] font-black text-2xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <CheckCircle />
                  )}
                  {form.hasInsurance
                    ? "Xác nhận & Hoàn tất"
                    : "Tiến hành thanh toán"}
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="mt-8 text-sm font-black text-gray-400 hover:text-blue-600 transition flex items-center justify-center gap-2 mx-auto uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Chọn lại bác sĩ
                </button>
              </>
            ) : (
              <div className="py-6">
                <h2 className="text-3xl font-black mb-8 dark:text-white italic">
                  Quét VietQR Thanh Toán
                </h2>
                <div className="bg-white p-6 inline-block rounded-[40px] border-8 border-blue-600 mb-10 shadow-2xl">
                  <img
                    src={`https://img.vietqr.io/image/${bookedData.qrInfo.bankId}-${bookedData.qrInfo.accountNo}-compact2.png?amount=${bookedData.qrInfo.amount}&addInfo=${bookedData.qrInfo.addInfo}&accountName=${bookedData.qrInfo.accountName}`}
                    alt="VietQR"
                    className="w-72 h-72"
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[40px] border-4 border-dashed border-blue-200 mb-10">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-[0.3em]">
                    Nội dung bắt buộc
                  </p>
                  <p className="text-4xl font-black text-red-600 tracking-tighter">
                    {bookedData.qrInfo.addInfo}
                  </p>
                  <p className="mt-4 font-black text-2xl dark:text-white">
                    150.000 VNĐ
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-blue-600 font-black italic animate-pulse bg-blue-50 w-fit mx-auto px-6 py-3 rounded-full">
                  <Loader2 className="animate-spin" size={24} />
                  <span>Đang chờ ngân hàng xác nhận tiền...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && bookedData && (
          <div className="animate-in zoom-in-95 duration-700 flex flex-col items-center">
            <div
              ref={ticketRef}
              className="w-[450px] bg-white rounded-[50px] overflow-hidden shadow-2xl border-[6px] border-blue-600 text-gray-900"
            >
              <div className="bg-blue-600 p-8 text-center text-white italic font-black text-2xl uppercase tracking-tight">
                Modern Hospital
              </div>
              <div className="p-12 text-center bg-white relative">
                {/* Decoration Circles */}
                <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-50 rounded-full border-r-4 border-blue-600"></div>
                <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-50 rounded-full border-l-4 border-blue-600"></div>

                <p className="text-xs font-black text-gray-300 uppercase mb-4 tracking-[0.4em]">
                  Số thứ tự khám
                </p>
                <h1 className="text-[10rem] font-black text-blue-600 leading-none mb-6">
                  {bookedData.stt}
                </h1>
                <div className="bg-blue-50 p-4 rounded-2xl mb-10 border border-blue-100">
                  <p className="text-lg font-black text-blue-700 italic">
                    Dự kiến:{" "}
                    {getEstTimeRange(bookedData.stt, bookedData.baseStartTime)}
                  </p>
                </div>
                <div className="space-y-4 text-left border-t-4 border-dashed pt-10 border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-black text-[10px] uppercase">
                      Bác sĩ
                    </span>
                    <span className="font-black text-lg uppercase">
                      {
                        doctors.find((d: any) => d._id === form.doctor_id)
                          ?.user_id?.username
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-black text-[10px] uppercase">
                      Ngày khám
                    </span>
                    <span className="font-black text-lg">
                      {new Date(bookedData.appointment_date).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-black text-green-600">
                    <span className="text-[10px] uppercase">Trạng thái</span>
                    <span className="flex items-center gap-1 text-lg">
                      <CheckCircle size={20} /> ĐÃ XÁC NHẬN
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-950 p-6 text-center text-[10px] text-white font-black italic uppercase tracking-[0.5em]">
                Healthcare Excellence 2026
              </div>
            </div>
            <div className="flex justify-center mt-12 gap-5 w-full">
              <button
                onClick={downloadTicket}
                className="bg-white border-2 px-10 py-5 rounded-3xl font-black flex items-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
              >
                <Download size={24} /> TẢI ẢNH PHIẾU
              </button>
              <button
                onClick={() => navigate("/my-appointments")}
                className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl shadow-blue-200"
              >
                HOÀN TẤT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL THÔNG BÁO XÁC THỰC BHYT */}
      <Dialog open={showBHYTModal} onOpenChange={setShowBHYTModal}>
        <DialogContent className="rounded-[50px] p-12 max-w-xl border-none shadow-2xl">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[35px] flex items-center justify-center mb-8 shadow-inner">
              <AlertTriangle size={50} />
            </div>
            <DialogTitle className="text-4xl font-black italic leading-tight dark:text-white">
              Hồ sơ BHYT chưa xác thực
            </DialogTitle>
            <p className="text-gray-500 mt-6 text-lg font-medium leading-relaxed">
              Quyền lợi{" "}
              <span className="text-blue-600 font-black">
                miễn phí công khám
              </span>{" "}
              chỉ dành cho bệnh nhân đã cung cấp và được{" "}
              <span className="font-black text-gray-800 dark:text-gray-200">
                Admin phê duyệt
              </span>{" "}
              thẻ BHYT.
            </p>
          </DialogHeader>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl mt-6 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold italic">
              * Nếu bạn chưa xác thực, vui lòng chọn "Không có BHYT" để tiếp tục
              đặt lịch đóng phí hoặc cập nhật hồ sơ ngay.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:justify-center mt-10">
            <button
              onClick={() => setShowBHYTModal(false)}
              className="px-8 py-4 font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest text-xs transition-colors"
            >
              Để sau
            </button>
            <button
              onClick={() => navigate("/users")}
              className="px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-xl shadow-blue-200 hover:scale-105 transition-all"
            >
              Đến trang Profile ngay
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
