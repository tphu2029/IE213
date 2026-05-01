import { useState, useEffect } from "react";
import { authService, patientService } from "../services";
import {
  Edit3,
  ShieldCheck,
  Upload,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import { BASE_URL } from "@/lib/axios";

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    cccd: "",
    birth_date: "",
    gender: "",
    bhyt_code: "",
    bhyt_initial_clinic: "",
    bhyt_expiration_date: "",
    bhyt_status: "none",
    bhyt_proof_image: "",
    bhyt_note: "",
  });

  const loadProfile = async () => {
    try {
      const res = await authService.getProfile("me");
      const d = res.data.data;
      // Map toàn bộ dữ liệu từ Database vào state
      setFormData({
        ...d,
        username: d.username || "",
        email: d.email || "",
        phone: d.phone || "",
        address: d.address || "",
        cccd: d.cccd || "",
        gender: d.gender || "",
        bhyt_code: d.bhyt_code || "",
        bhyt_initial_clinic: d.bhyt_initial_clinic || "",
        bhyt_status: d.bhyt_status || "none",
        bhyt_proof_image: d.bhyt_proof_image || "",
        bhyt_note: d.bhyt_note || "",
        birth_date: d.birth_date ? d.birth_date.split("T")[0] : "",
        bhyt_expiration_date: d.bhyt_expiration_date
          ? d.bhyt_expiration_date.split("T")[0]
          : "",
      });
    } catch (err) {
      toast.error("Lỗi tải hồ sơ");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateGeneral = async () => {
    try {
      setLoading(true);
      await patientService.updateProfile(formData);
      toast.success("Đã cập nhật hồ sơ!");
      setIsEditing(false);
      loadProfile();
    } catch (err) {
      toast.error("Lỗi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBHYT = async () => {
    // Cho phép gửi nếu có file mới CHƯA upload HOẶC đã có ảnh cũ trong DB (trường hợp bị rejected muốn gửi lại)
    if (
      !formData.bhyt_code ||
      !formData.bhyt_expiration_date ||
      (!selectedFile && !formData.bhyt_proof_image)
    ) {
      return toast.error("Vui lòng điền đủ thông tin và tải ảnh minh chứng");
    }
    const data = new FormData();
    data.append("bhyt_code", formData.bhyt_code);
    data.append("bhyt_initial_clinic", formData.bhyt_initial_clinic);
    data.append("bhyt_expiration_date", formData.bhyt_expiration_date);
    if (selectedFile) data.append("bhyt_image", selectedFile);

    try {
      setLoading(true);
      await patientService.updateBHYT(data);
      toast.success("Đã gửi yêu cầu xác thực BHYT!");
      setPreviewUrl(null);
      setSelectedFile(null);
      loadProfile(); // Quan trọng: Cập nhật state để giao diện nhảy sang 'pending'
    } catch (err) {
      toast.error("Lỗi gửi dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 px-4 pb-20 transition-colors">
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-16 rounded-2xl bg-white dark:bg-gray-900 border p-2 shadow-sm">
            <TabsTrigger
              value="general"
              className="rounded-xl font-bold flex gap-2"
            >
              <User size={18} /> Thông tin y tế
            </TabsTrigger>
            <TabsTrigger
              value="bhyt"
              className="rounded-xl font-bold flex gap-2"
            >
              <ShieldCheck size={18} /> Xác thực BHYT
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] border shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black flex items-center gap-2 dark:text-white">
                  Hồ sơ bệnh nhân
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-blue-600"
                >
                  {isEditing ? <X /> : <Edit3 />}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">
                    Họ và tên
                  </label>
                  <input
                    className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white"
                    value={formData.username}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">
                    Địa chỉ
                  </label>
                  <input
                    className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white"
                    value={formData.address}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                {/* HIỂN THỊ MÃ BHYT NẾU ĐÃ XÁC THỰC THÀNH CÔNG */}
                {formData.bhyt_status === "verified" && (
                  <div className="md:col-span-2 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-dashed border-green-200 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase mb-1">
                        Mã thẻ BHYT đã liên kết
                      </p>
                      <p className="text-2xl font-black text-green-700">
                        {formData.bhyt_code}
                      </p>
                    </div>
                    <ShieldCheck
                      size={40}
                      className="text-green-500 opacity-50"
                    />
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={handleUpdateGeneral}
                  disabled={loading}
                  className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg"
                >
                  Lưu hồ sơ
                </button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bhyt">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] border shadow-sm border-blue-100">
              <h3 className="text-2xl font-black italic flex items-center gap-2 dark:text-white mb-6">
                Xác thực với cổng BHXH
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                    Mã thẻ BHYT
                  </label>
                  <input
                    className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white"
                    value={formData.bhyt_code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bhyt_code: e.target.value.toUpperCase(),
                      })
                    }
                    disabled={
                      formData.bhyt_status === "verified" ||
                      formData.bhyt_status === "pending"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                    Ngày hết hạn
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-2xl border dark:bg-gray-800 dark:text-white"
                    value={formData.bhyt_expiration_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bhyt_expiration_date: e.target.value,
                      })
                    }
                    disabled={
                      formData.bhyt_status === "verified" ||
                      formData.bhyt_status === "pending"
                    }
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                    Ảnh minh chứng
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chỉ cho chọn ảnh nếu chưa duyệt hoặc bị từ chối */}
                    {formData.bhyt_status !== "verified" &&
                      formData.bhyt_status !== "pending" && (
                        <div className="group border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center hover:border-blue-500 transition-all cursor-pointer relative">
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <Upload
                            className="mx-auto text-gray-400 mb-2 group-hover:text-blue-500"
                            size={32}
                          />
                          <p className="text-xs font-bold text-gray-500">
                            Nhấn để thay đổi ảnh
                          </p>
                        </div>
                      )}
                    {(previewUrl || formData.bhyt_proof_image) && (
                      <div className="rounded-3xl border-4 border-white dark:border-gray-800 overflow-hidden bg-black h-52 flex items-center justify-center shadow-lg">
                        <img
                          src={
                            previewUrl ||
                            `${BASE_URL}/${formData.bhyt_proof_image}`
                          }
                          className="h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 border">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-4 rounded-2xl ${
                      formData.bhyt_status === "pending"
                        ? "bg-amber-100 text-amber-600"
                        : formData.bhyt_status === "verified"
                          ? "bg-green-100 text-green-600"
                          : formData.bhyt_status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {formData.bhyt_status === "pending" ? (
                      <Clock className="animate-pulse" />
                    ) : formData.bhyt_status === "verified" ? (
                      <CheckCircle2 />
                    ) : formData.bhyt_status === "rejected" ? (
                      <XCircle />
                    ) : (
                      <AlertCircle />
                    )}
                  </div>
                  <div>
                    <p className="font-black dark:text-white uppercase tracking-tighter text-lg">
                      Trạng thái:{" "}
                      {formData.bhyt_status === "none"
                        ? "Chưa gửi thông tin"
                        : formData.bhyt_status === "pending"
                          ? "Đang chờ Admin duyệt"
                          : formData.bhyt_status === "verified"
                            ? "Xác thực thành công"
                            : "Bị từ chối"}
                    </p>
                    {formData.bhyt_status === "pending" && (
                      <p className="text-xs text-amber-600 font-bold italic mt-1">
                        Yêu cầu của bạn đang được kiểm tra (tối đa 24h).
                      </p>
                    )}
                    {formData.bhyt_status === "rejected" && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-xs text-red-600 font-black uppercase tracking-widest mb-1">
                          Lý do từ chối từ Admin:
                        </p>
                        <p className="text-sm text-red-800 font-bold italic">
                          {formData.bhyt_note || "Thông tin không hợp lệ."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {formData.bhyt_status !== "verified" &&
                  formData.bhyt_status !== "pending" && (
                    <button
                      onClick={handleUpdateBHYT}
                      disabled={loading}
                      className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-all"
                    >
                      Gửi yêu cầu xác thực
                    </button>
                  )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
