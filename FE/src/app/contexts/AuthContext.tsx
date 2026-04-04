import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (data: any) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const { data } = await authService.getProfile();
          setUser(data.data);
        } catch {
          localStorage.removeItem("accessToken");
        }
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await authService.login({ email, password });
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
  };

  const register = async (formData: any) => {
    await authService.register(formData);
  };

  const logout = async () => {
    try {
      // Gọi API logout để xóa session ở BE
      await authService.logout();
    } catch (err) {
      console.warn("Server logout error, performing local cleanup");
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/login"; // Đưa về trang login
    }
  };

  const updateUser = (data: any) => setUser(data);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
