import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'user' | 'business' | 'admin';

interface RoleContextType {
  role: Role | null;
  setRole: (r: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(
    () => localStorage.getItem('sagi-role') as Role | null
  );

  const setRole = (r: Role) => {
    localStorage.setItem('sagi-role', r);
    setRoleState(r);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
