import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, ArrowRight, Loader2 } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Mật khẩu xác nhận không khớp!");
    }

    setLoading(true);
    try {
      await register({
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: "patient",
      });
      toast.success("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
      navigate("/login", { state: { fromRegister: true } });
    } catch (err: any) {
      // Xử lý các mã lỗi từ BE
      const status = err.response?.status;
      if (status === 409) {
        toast.error("Email này đã được sử dụng. Vui lòng dùng email khác.");
      } else {
        toast.error(
          "Lỗi đăng ký: " +
            (err.response?.data?.message || "Vui lòng kiểm tra lại thông tin"),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 pt-24 transition-colors">
      <div className="max-w-md w-full bg-white p-8 rounded-[32px] shadow-2xl border dark:bg-gray-900 dark:border-gray-800">
        <h2 className="text-3xl font-black text-center text-blue-600 mb-8 italic">
          Tạo tài khoản mới
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-3 top-3.5 text-gray-400 size-5 group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Họ và tên"
              required
              className="w-full pl-10 p-3.5 border-2 border-gray-50 rounded-2xl outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-gray-400 size-5 group-focus-within:text-blue-500" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 p-3.5 border-2 border-gray-50 rounded-2xl outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="relative group">
            <Phone className="absolute left-3 top-3.5 text-gray-400 size-5 group-focus-within:text-blue-500" />
            <input
              type="tel"
              placeholder="Số điện thoại"
              required
              className="w-full pl-10 p-3.5 border-2 border-gray-50 rounded-2xl outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 text-gray-400 size-5 group-focus-within:text-blue-500" />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              className="w-full pl-10 p-3.5 border-2 border-gray-50 rounded-2xl outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 text-gray-400 size-5 group-focus-within:text-blue-500" />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              className="w-full pl-10 p-3.5 border-2 border-gray-50 rounded-2xl outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Đăng Ký Ngay"}{" "}
            <ArrowRight size={20} />
          </button>
        </form>
        <p className="mt-8 text-center text-gray-500 font-medium">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
