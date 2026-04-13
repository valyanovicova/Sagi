import { LayoutDashboard, Building2, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

export function AdminBottomNavigation() {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const tabs = [
    { path: '/admin', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/admin/communities', icon: Building2, label: t('communities') },
    { path: '/admin/profile', icon: User, label: t('myProfile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors ${
                isActive(tab.path) ? 'text-[#10b981]' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
