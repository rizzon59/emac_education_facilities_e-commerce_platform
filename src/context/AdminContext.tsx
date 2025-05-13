
import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// This is a simple admin password for demo purposes
// In a real application, this should be handled through proper authentication
const ADMIN_PASSWORD = "admin123";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAdminMode = () => {
    if (isAuthenticated) {
      setIsAdminMode(prev => !prev);
    }
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsAdminMode(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
  };

  return (
    <AdminContext.Provider value={{ 
      isAdminMode, 
      toggleAdminMode, 
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
