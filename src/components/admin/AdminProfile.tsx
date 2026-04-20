import { useState } from 'react';
import { BarChart2, ArrowLeftRight, LogOut, ChevronRight, Shield, Moon, Sun, Languages, Bell, HelpCircle, ExternalLink } from 'lucide-react';
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

  const managedCommunities = [
    {
      id: 1,
      name: 'AIFC',
      members: 570,
      businesses: 42,
      bio: 'The Astana International Financial Centre — a financial hub and special economic zone in Kazakhstan, open to foreign residents, investors, experts and expat families.',
      url: 'https://aifc.kz',
    },
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

          {/* Main info */}
          <div className="relative z-10 flex flex-col gap-2">
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-white/35 mb-0.5">{t('roleAdmin')}</p>
              <p className="text-sm font-semibold tracking-wide">{user?.name || 'Admin'}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-white/35 mb-0.5">{t('communities')}</p>
                <p className="text-sm font-bold text-[#c4b5fd]">1</p>
              </div>
              <div>
                <p className="text-[9px] tracking-widest uppercase text-white/35 mb-0.5">{t('members')}</p>
                <p className="text-sm font-bold text-[#c4b5fd]">570</p>
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
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.members} {t('members')} · {c.businesses} {t('businesses')}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full shrink-0">{t('filterActive')}</span>
                  </div>
                  {c.bio && (
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2 pl-12">{c.bio}</p>
                  )}
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#10b981] hover:text-[#059669] transition-colors pl-12"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {c.url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
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
