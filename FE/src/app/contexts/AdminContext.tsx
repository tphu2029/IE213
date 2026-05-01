import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AdminContextType {
  admin: Admin | null;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra nếu đã có admin session
    const storedAdmin = localStorage.getItem('admin');
    const adminToken = localStorage.getItem('adminToken');
    if (storedAdmin && adminToken) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const adminLogin = async (email: string, password: string) => {
    // Gọi API login thật với backend
    const { data } = await axios.post('http://localhost:3000/api/v1/auth/login', {
      email,
      password,
    });

    const user = data.user || data.data;
    if (!user || user.role !== 'admin') {
      throw new Error('Tài khoản này không có quyền admin');
    }

    const adminUser: Admin = {
      id: user._id || user.id,
      email: user.email,
      name: user.username || user.name || 'Admin',
      role: 'admin',
    };

    // Lưu token và thông tin admin vào localStorage
    localStorage.setItem('adminToken', data.accessToken);
    localStorage.setItem('admin', JSON.stringify(adminUser));
    setAdmin(adminUser);
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
