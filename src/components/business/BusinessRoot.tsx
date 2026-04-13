import { Outlet } from 'react-router';
import { BusinessBottomNavigation } from './BusinessBottomNavigation';

export function BusinessRoot() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <BusinessBottomNavigation />
    </div>
  );
}
