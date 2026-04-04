import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Chào mừng bạn trở lại!");

      // Kiểm tra xem có phải vừa từ trang đăng ký qua không
      if (location.state?.fromRegister) {
        navigate("/users"); // Vào trang điền hồ sơ
      } else {
        navigate("/my-appointments"); // Vào Dashboard
      }
    } catch (err: any) {
      toast.error("Email hoặc mật khẩu không chính xác");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 pt-24">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600 italic">Đăng nhập</h2>
          <p className="text-gray-500 mt-2">
            Vui lòng truy cập tài khoản của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 size-5" />
              <input
                type="email"
                required
                className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 size-5" />
              <input
                type="password"
                required
                className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
