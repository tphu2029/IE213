import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";

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
      // Gửi dữ liệu lên API qua hàm register trong AuthContext
      await register({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      toast.success("Đăng ký thành công! Đang chuyển hướng đăng nhập...");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Tạo tài khoản
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Họ và tên"
              required
              className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 size-5" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-gray-400 size-5" />
            <input
              type="tel"
              placeholder="Số điện thoại"
              required
              className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 size-5" />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 size-5" />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            {loading ? "Đang xử lý..." : "Đăng Ký Ngay"}{" "}
            <ArrowRight size={20} />
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
