import { useState } from 'react';
import { Users, X, ScanLine, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router';
import { RoleSwitcherModal } from '../RoleSwitcherModal';
import { useLanguage } from '../../context/LanguageContext';

export function BusinessDashboard() {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showAccessCheck, setShowAccessCheck] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessResult, setAccessResult] = useState<'granted' | 'denied' | null>(null);
  const { t } = useLanguage();

  const handleCheckAccess = (e: { preventDefault(): void }) => {
    e.preventDefault();
    setAccessResult(accessCode.trim() ? 'granted' : 'denied');
  };

  const redemptions = [
    { initials: 'AK', color: '#10b981', name: 'Member #1042', offer: t('discountDining'), time: '5' },
    { initials: 'BN', color: '#3b82f6', name: 'Member #2318', offer: t('freeCoffee'), time: '12' },
    { initials: 'CL', color: '#8b5cf6', name: 'Member #0987', offer: t('discountDining'), time: '34' },
    { initials: 'DM', color: '#f59e0b', name: 'Member #1654', offer: t('buy2Get1'), time: '1', unit: 'hr' },
    { initials: 'EA', color: '#10b981', name: 'Member #3201', offer: t('freeCoffee'), time: '2', unit: 'hr' },
  ];

  const stats = [
    { label: t('activeOffers'), value: '3' },
    { label: t('redemptionsToday'), value: '12' },
    { label: t('membersReached'), value: '580' },
    { label: t('offersThisMonth'), value: '8' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t('myBusiness')}</h1>
          <button
            onClick={() => setShowRoleSwitcher(true)}
            className="w-9 h-9 rounded-xl bg-input-background flex items-center justify-center"
          >
            <Users className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <p className="text-2xl font-bold text-[#10b981] mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Redemptions */}
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-3">{t('recentRedemptions')}</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {redemptions.map((item, idx) => (
              <div key={idx}>
                {idx > 0 && <div className="border-t border-border" />}
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.offer}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.time} {item.unit === 'hr' ? t('hrAgo') : t('minAgo')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base font-semibold mb-3">{t('quickActions')}</h2>
          <Link
            to="/business/offers/new"
            className="block w-full py-3 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl text-center font-medium mb-3 hover:shadow-lg transition-shadow"
          >
            {t('createNewOffer')}
          </Link>
          <Link
            to="/business/analytics"
            className="block w-full py-3 bg-card border border-border rounded-2xl text-sm text-muted-foreground hover:text-foreground transition-colors text-center mb-3"
          >
            {t('viewAnalytics')}
          </Link>
          <Link
            to="/business/community/1"
            className="block w-full py-3 bg-card border border-border rounded-2xl text-sm text-muted-foreground hover:text-foreground transition-colors text-center mb-3"
          >
            Manage Community
          </Link>
          <button
            onClick={() => { setShowAccessCheck(true); setAccessCode(''); setAccessResult(null); }}
            className="w-full py-3 bg-card border border-[#10b981]/40 rounded-2xl text-sm font-medium text-[#10b981] hover:border-[#10b981] transition-colors flex items-center justify-center gap-2"
          >
            <ScanLine className="w-4 h-4" />
            {t('checkMemberAccess')}
          </button>
        </div>
      </div>

      {showRoleSwitcher && <RoleSwitcherModal onClose={() => setShowRoleSwitcher(false)} />}

      {showAccessCheck && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={() => setShowAccessCheck(false)}>
          <div className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('checkMemberAccess')}</h3>
              <button onClick={() => setShowAccessCheck(false)} className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t('checkAccessDesc')}</p>
            <form onSubmit={handleCheckAccess} className="flex gap-2 mb-4">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => { setAccessCode(e.target.value); setAccessResult(null); }}
                placeholder={t('memberCodePlaceholder')}
                className="flex-1 px-4 py-2.5 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm"
                autoFocus
              />
              <button type="submit" className="px-4 py-2.5 bg-[#10b981] text-white rounded-xl text-sm font-medium">
                {t('verify')}
              </button>
            </form>
            {accessResult === 'granted' && (
              <div className="flex items-center gap-3 p-4 bg-[#10b981]/10 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#10b981]">{t('accessGranted')}</p>
                  <p className="text-xs text-muted-foreground">{t('accessGrantedDesc')}</p>
                </div>
              </div>
            )}
            {accessResult === 'denied' && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-2xl">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-500">{t('accessDenied')}</p>
                  <p className="text-xs text-muted-foreground">{t('accessDeniedDesc')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
