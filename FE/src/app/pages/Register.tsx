import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, ArrowRight, CreditCard, Calendar, MapPin, Users } from "lucide-react";

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
    cccd: "",
    gender: "Other",
    birth_date: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Mật khẩu xác nhận không khớp!");
    }

    if (formData.cccd && formData.cccd.length !== 12) {
      return toast.error("CCCD phải bao gồm đúng 12 chữ số!");
    }
    
    if (formData.cccd && !/^\d+$/.test(formData.cccd)) {
      return toast.error("CCCD chỉ được chứa các chữ số!");
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(payload);
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
      <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Tạo tài khoản
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột 1 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-500 uppercase text-sm mb-4">Thông tin tài khoản</h3>
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
          </div>

          {/* Cột 2 */}
          <div className="space-y-4">
             <h3 className="font-bold text-gray-500 uppercase text-sm mb-4">Hồ sơ khám bệnh</h3>
             <div className="relative">
              <CreditCard className="absolute left-3 top-3.5 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="CCCD / CMND (12 chữ số)"
                required
                className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, cccd: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 text-gray-400 size-5" />
              <select
                className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 bg-white"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400 size-5" />
              <input
                type="date"
                required
                className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="Địa chỉ"
                required
                className="w-full pl-10 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            
            <div className="pt-2">
               <button
                 disabled={loading}
                 className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
               >
                 {loading ? "Đang xử lý..." : "Đăng Ký Ngay"} <ArrowRight size={20} />
               </button>
            </div>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600 border-t pt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
