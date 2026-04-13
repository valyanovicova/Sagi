import { Outlet } from 'react-router';
import { AdminBottomNavigation } from './AdminBottomNavigation';

export function AdminRoot() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <AdminBottomNavigation />
    </div>
  );
}
