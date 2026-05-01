import { useState, useEffect } from "react";
import { patientService } from "../../services";
import {
  ShieldCheck,
  XCircle,
  CheckCircle,
  User,
  Loader2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "@/lib/axios";

export function AdminBHYTVerify() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Sử dụng object để lưu ghi chú riêng cho từng bệnh nhân theo ID
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await patientService.adminGetAllPatients();
      // Chỉ lấy những người đang ở trạng thái chờ duyệt (pending)
      const pendingList = res.data.data.filter(
        (p: any) => p.bhyt_status === "pending",
      );
      setPatients(pendingList);
    } catch (err) {
      toast.error("Không thể tải danh sách chờ duyệt");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (id: string, status: "verified" | "rejected") => {
    const note = rejectNotes[id] || "";

    if (status === "rejected" && !note.trim()) {
      return toast.error("Vui lòng nhập lý do từ chối để bệnh nhân được biết");
    }

    try {
      await patientService.adminVerifyBHYT(id, { status, bhyt_note: note });
      toast.success(
        status === "verified" ? "Đã phê duyệt thẻ BHYT" : "Đã từ chối yêu cầu",
      );

      // Xóa note của user này sau khi xử lý xong
      const newNotes = { ...rejectNotes };
      delete newNotes[id];
      setRejectNotes(newNotes);

      loadData(); // Load lại danh sách
    } catch (err) {
      toast.error("Thao tác thất bại, vui lòng thử lại");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-blue-600 gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-black uppercase tracking-widest text-xs text-gray-500">
          Đang tải yêu cầu...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 dark:text-white italic">
            <ShieldCheck className="text-blue-600" size={32} /> Phê duyệt Bảo
            hiểm y tế
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Kiểm tra đối chiếu ảnh screenshot tra cứu và thông tin bệnh nhân
            nhập.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-2xl border border-blue-100 dark:border-blue-800">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest text-center">
            Đang chờ
          </p>
          <p className="text-2xl font-black text-center dark:text-white">
            {patients.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {patients.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-24 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
            <CheckCircle className="mx-auto mb-4 text-gray-300" size={64} />
            <p className="text-gray-400 font-bold text-lg italic">
              Tuyệt vời! Không có yêu cầu nào đang tồn đọng.
            </p>
          </div>
        ) : (
          patients.map((p) => (
            <div
              key={p._id}
              className="bg-white dark:bg-gray-900 rounded-[40px] border dark:border-gray-800 p-8 flex flex-col lg:flex-row gap-10 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* CỘT TRÁI: ẢNH MINH CHỨNG */}
              <div className="w-full lg:w-2/5">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-[0.2em] flex items-center gap-2">
                  <Eye size={14} /> Ảnh bằng chứng tra cứu
                </p>
                <div
                  className="rounded-3xl overflow-hidden border-4 border-gray-50 dark:border-gray-800 bg-black aspect-video flex items-center justify-center cursor-zoom-in group relative"
                  onClick={() =>
                    window.open(`${BASE_URL}/${p.bhyt_proof_image}`)
                  }
                >
                  <img
                    src={`${BASE_URL}/${p.bhyt_proof_image}`}
                    className="w-full h-full object-contain group-hover:opacity-80 transition-opacity"
                    alt="Proof"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold border border-white/30">
                      Click để phóng to
                    </span>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: THÔNG TIN & ACTION */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                      <User size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black dark:text-white uppercase">
                        {p.user_id?.username}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">
                        {p.user_id?.email} • CCCD: {p.cccd}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[28px] border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Mã số thẻ
                      </p>
                      <p className="font-black text-blue-600 text-lg tracking-tight">
                        {p.bhyt_code}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Ngày hết hạn
                      </p>
                      <p className="font-black text-red-500 text-lg">
                        {p.bhyt_expiration_date
                          ? new Date(p.bhyt_expiration_date).toLocaleDateString(
                              "vi-VN",
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div className="col-span-2 pt-2 border-t dark:border-gray-700 mt-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                        Nơi khám chữa bệnh ban đầu
                      </p>
                      <p className="font-bold text-sm dark:text-gray-200">
                        {p.bhyt_initial_clinic || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                      <AlertCircle size={14} /> Phản hồi cho bệnh nhân (nếu từ
                      chối)
                    </p>
                    <textarea
                      className="w-full p-4 rounded-2xl border-2 border-transparent bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-500 text-sm transition-all resize-none"
                      placeholder="Nhập lý do: Ảnh mờ, sai mã thẻ, thẻ hết hạn..."
                      rows={2}
                      value={rejectNotes[p._id] || ""}
                      onChange={(e) =>
                        setRejectNotes({
                          ...rejectNotes,
                          [p._id]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => handleAction(p._id, "verified")}
                    className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95"
                  >
                    <CheckCircle size={18} /> XÁC NHẬN HỢP LỆ
                  </button>
                  <button
                    onClick={() => handleAction(p._id, "rejected")}
                    className="flex-1 bg-red-50 text-red-600 border border-red-100 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95"
                  >
                    <XCircle size={18} /> TỪ CHỐI
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
