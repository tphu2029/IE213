import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    // Check if admin is logged in on mount
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const adminLogin = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Default admin credentials
    if (email === 'admin@modernhospital.com' && password === 'admin123') {
      const adminUser: Admin = {
        id: 'admin-1',
        email: 'admin@modernhospital.com',
        name: 'Hospital Administrator',
        role: 'admin',
      };
      setAdmin(adminUser);
      localStorage.setItem('admin', JSON.stringify(adminUser));
    } else {
      throw new Error('Invalid admin credentials');
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
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
