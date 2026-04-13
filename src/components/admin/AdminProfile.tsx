import { useState } from 'react';
import { BarChart2, ArrowLeftRight, LogOut, ChevronRight, Shield, Moon, Sun, Languages, Bell, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { RoleSwitcherModal } from '../RoleSwitcherModal';

export function AdminProfile() {
  const { language, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'en': return 'English';
      case 'ru': return 'Русский';
      case 'kk': return 'Қазақша';
      default: return lang;
    }
  };

  // Mock: communities this admin manages
  const managedCommunities = [
    { id: 1, name: 'AIFC', members: 570, businesses: 42 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl">{t('myProfile')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* Admin info card */}
        <div className="rounded-3xl p-4 text-white overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #6d28d9 45%, #4c1d95 100%)' }}>
          {/* Decorative orbs */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)' }} />

          {/* Top row */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-[0.18em] text-[#c4b5fd]">SAGI</span>
            </div>
            <span className="text-[9px] font-medium tracking-widest uppercase border border-white/20 text-white/50 px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>

          {/* Main: left info + right QR/code stack */}
          <div className="flex gap-4 relative z-10">
            {/* Left */}
            <div className="flex-1 flex flex-col justify-between gap-2">
              <div>
                <p className="text-[9px] tracking-[0.15em] uppercase text-white/35 mb-0.5">{t('roleAdmin')}</p>
                <p className="text-sm font-semibold tracking-wide">{user?.name || 'Admin'}</p>
              </div>
              <div className="flex gap-4">
                {managedCommunities.map(c => (
                  <div key={c.id}>
                    <p className="text-[9px] tracking-widest uppercase text-white/35 mb-0.5">{t('communities')}</p>
                    <p className="text-sm font-bold text-[#c4b5fd]">1</p>
                  </div>
                ))}
                <div>
                  <p className="text-[9px] tracking-widest uppercase text-white/35 mb-0.5">{t('members')}</p>
                  <p className="text-sm font-bold text-[#c4b5fd]">570</p>
                </div>
              </div>
            </div>

            {/* Right: QR + barcode */}
            <div className="flex flex-col items-center gap-2">
              {/* QR code */}
              <div className="bg-white rounded-xl p-1.5 shadow-lg">
                <svg viewBox="0 0 80 80" className="w-14 h-14">
                  <rect width="80" height="80" fill="white"/>
                  <rect x="4" y="4" width="20" height="20" fill="#2d1b69"/>
                  <rect x="7" y="7" width="14" height="14" fill="white"/>
                  <rect x="10" y="10" width="8" height="8" fill="#2d1b69"/>
                  <rect x="56" y="4" width="20" height="20" fill="#2d1b69"/>
                  <rect x="59" y="7" width="14" height="14" fill="white"/>
                  <rect x="62" y="10" width="8" height="8" fill="#2d1b69"/>
                  <rect x="4" y="56" width="20" height="20" fill="#2d1b69"/>
                  <rect x="7" y="59" width="14" height="14" fill="white"/>
                  <rect x="10" y="62" width="8" height="8" fill="#2d1b69"/>
                  <rect x="28" y="4" width="4" height="4" fill="#2d1b69"/><rect x="36" y="4" width="4" height="4" fill="#2d1b69"/><rect x="44" y="4" width="4" height="4" fill="#2d1b69"/>
                  <rect x="28" y="12" width="4" height="4" fill="#2d1b69"/><rect x="44" y="12" width="4" height="4" fill="#2d1b69"/>
                  <rect x="36" y="20" width="4" height="4" fill="#2d1b69"/>
                  <rect x="4" y="28" width="4" height="4" fill="#2d1b69"/><rect x="12" y="28" width="4" height="4" fill="#2d1b69"/><rect x="20" y="28" width="4" height="4" fill="#2d1b69"/>
                  <rect x="28" y="28" width="4" height="4" fill="#2d1b69"/><rect x="36" y="28" width="4" height="4" fill="#2d1b69"/>
                  <rect x="52" y="28" width="4" height="4" fill="#2d1b69"/><rect x="60" y="28" width="4" height="4" fill="#2d1b69"/><rect x="68" y="28" width="4" height="4" fill="#2d1b69"/>
                  <rect x="4" y="36" width="4" height="4" fill="#2d1b69"/><rect x="20" y="36" width="4" height="4" fill="#2d1b69"/>
                  <rect x="28" y="36" width="4" height="4" fill="#2d1b69"/><rect x="44" y="36" width="4" height="4" fill="#2d1b69"/><rect x="52" y="36" width="4" height="4" fill="#2d1b69"/><rect x="68" y="36" width="4" height="4" fill="#2d1b69"/>
                  <rect x="4" y="44" width="4" height="4" fill="#2d1b69"/><rect x="12" y="44" width="4" height="4" fill="#2d1b69"/>
                  <rect x="36" y="44" width="4" height="4" fill="#2d1b69"/><rect x="52" y="44" width="4" height="4" fill="#2d1b69"/><rect x="60" y="44" width="4" height="4" fill="#2d1b69"/>
                  <rect x="28" y="52" width="4" height="4" fill="#2d1b69"/><rect x="36" y="52" width="4" height="4" fill="#2d1b69"/><rect x="44" y="52" width="4" height="4" fill="#2d1b69"/><rect x="68" y="52" width="4" height="4" fill="#2d1b69"/>
                  <rect x="28" y="60" width="4" height="4" fill="#2d1b69"/><rect x="52" y="60" width="4" height="4" fill="#2d1b69"/><rect x="60" y="60" width="4" height="4" fill="#2d1b69"/>
                  <rect x="28" y="68" width="4" height="4" fill="#2d1b69"/><rect x="36" y="68" width="4" height="4" fill="#2d1b69"/><rect x="44" y="68" width="4" height="4" fill="#2d1b69"/><rect x="52" y="68" width="4" height="4" fill="#2d1b69"/><rect x="68" y="68" width="4" height="4" fill="#2d1b69"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics — primary action */}
        <Link
          to="/admin/analytics"
          className="flex items-center gap-4 bg-card border-2 border-[#10b981]/40 rounded-2xl p-4 hover:border-[#10b981] transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-[#10b981]" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{t('analytics')}</p>
            <p className="text-xs text-muted-foreground">{t('manageCommunitiesDesc')}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Link>

        {/* My communities */}
        <div>
          <p className="text-sm text-muted-foreground mb-2 px-1">{t('communities')}</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {managedCommunities.map((c, i) => (
              <div key={c.id}>
                {i > 0 && <div className="border-t border-border" />}
                <div className="flex items-center gap-3 p-4">
                  <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.members} {t('members')} · {c.businesses} {t('businesses')}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full">{t('filterActive')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-[#10b981]" /> : <Sun className="w-5 h-5 text-[#10b981]" />}
            </div>
            <span className="flex-1 text-left">{t('appearance')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <Link
            to="/admin/language"
            className="flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <Languages className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1">{t('language')}</span>
            <span className="text-sm text-muted-foreground mr-2">{getLanguageName(language)}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            to="/admin/notifications"
            className="flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1">{t('notifications')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            to="/admin/support"
            className="flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1">{t('support')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <button
            onClick={() => setShowRoleSwitcher(true)}
            className="w-full flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1 text-left">{t('switchRole')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-4 hover:bg-input-background transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="flex-1 text-left text-red-500">{t('signOut')}</span>
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground">{t('version')}</p>
      </div>

      {showRoleSwitcher && <RoleSwitcherModal onClose={() => setShowRoleSwitcher(false)} />}
    </div>
  );
}
