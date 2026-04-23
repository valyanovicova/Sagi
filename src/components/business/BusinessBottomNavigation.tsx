import { LayoutDashboard, Tag, ScanLine, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

export function BusinessBottomNavigation() {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/business') {
      return location.pathname === '/business';
    }
    return location.pathname.startsWith(path);
  };

  const tabs = [
    { path: '/business', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/business/offers', icon: Tag, label: 'My Deals' },
    { path: '/business/scan', icon: ScanLine, label: t('scanQR') },
    { path: '/business/profile', icon: User, label: t('myProfile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
                isActive(tab.path) ? 'text-[#10b981]' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
