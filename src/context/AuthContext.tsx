import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AuthUser {
  name: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  register: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sagi-auth') === 'true';
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('sagi-user');
    if (saved) {
      try {
        return JSON.parse(saved) as AuthUser;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = useCallback((authUser: AuthUser) => {
    setIsAuthenticated(true);
    setUser(authUser);
    localStorage.setItem('sagi-auth', 'true');
    localStorage.setItem('sagi-user', JSON.stringify(authUser));
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('sagi-auth');
    localStorage.removeItem('sagi-user');
    localStorage.removeItem('sagi-role');
    window.location.href = '/auth';
  }, []);

  const register = useCallback((authUser: AuthUser) => {
    setIsAuthenticated(true);
    setUser(authUser);
    localStorage.setItem('sagi-auth', 'true');
    localStorage.setItem('sagi-user', JSON.stringify(authUser));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
