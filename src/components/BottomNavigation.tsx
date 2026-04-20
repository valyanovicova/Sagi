import { Home, Network, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function BottomNavigation() {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
            isActive('/') ? 'text-[#10b981]' : 'text-muted-foreground'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">{t('communities')}</span>
        </Link>

        <Link
          to="/network"
          className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
            isActive('/network') ? 'text-[#10b981]' : 'text-muted-foreground'
          }`}
        >
          <Network className="w-6 h-6" />
          <span className="text-xs">Network</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
            isActive('/profile') ? 'text-[#10b981]' : 'text-muted-foreground'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">{t('myCard')}</span>
        </Link>
      </div>
    </div>
  );
}
