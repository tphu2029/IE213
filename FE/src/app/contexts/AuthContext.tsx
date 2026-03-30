import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services";

// 1. Thêm register vào Interface
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
          const { data } = await authService.getProfile("me");
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

  // 2. Định nghĩa hàm register
  const register = async (formData: any) => {
    await authService.register(formData);
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const updateUser = (data: any) => setUser(data);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register, // 3. Đưa register vào Provider
        logout,
        updateUser,
        isLoading,
      }}
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
