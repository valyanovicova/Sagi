import { Outlet } from 'react-router';
import { UserBottomNavigation } from './UserBottomNavigation';

export function UserRoot() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <UserBottomNavigation />
    </div>
  );
}
