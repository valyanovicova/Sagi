import { useState } from 'react';
import { Users, Building2, Store, Tag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { RoleSwitcherModal } from '../RoleSwitcherModal';
import { useLanguage } from '../../context/LanguageContext';

export function AdminDashboard() {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const { t } = useLanguage();

  const activities = [
    { dot: '#10b981', text: t('actNewBusiness'), time: `2 ${t('timeMinAgo')}` },
    { dot: '#3b82f6', text: t('actOfferCreated'), time: `15 ${t('timeMinAgo')}` },
    { dot: '#8b5cf6', text: t('actUserJoined'), time: `1 ${t('timeHrAgo')}` },
    { dot: '#f59e0b', text: t('actPendingApproval'), time: `2 ${t('timeHrAgo')}` },
    { dot: '#3b82f6', text: t('actOfferRedeemed'), time: `4 ${t('timeHrAgo')}` },
    { dot: '#8b5cf6', text: t('actNewUsers'), time: `5 ${t('timeHrAgo')}` },
  ];

  const stats = [
    { label: t('totalCommunities'), value: '1', icon: Building2, iconBg: 'bg-[#10b981]/10', iconColor: 'text-[#10b981]' },
    { label: t('activeBusinesses'), value: '42', icon: Store, iconBg: 'bg-[#3b82f6]/10', iconColor: 'text-[#3b82f6]' },
    { label: t('totalMembers'), value: '570', icon: Users, iconBg: 'bg-[#8b5cf6]/10', iconColor: 'text-[#8b5cf6]' },
    { label: t('activeOffers'), value: '42', icon: Tag, iconBg: 'bg-[#f59e0b]/10', iconColor: 'text-[#f59e0b]' },
  ];

  const quickLinks = [
    { label: t('communities'), path: '/admin/communities', icon: Building2 },
    { label: t('businesses'), path: '/admin/businesses', icon: Store },
    { label: t('users'), path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t('analytics')}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRoleSwitcher(true)}
              className="w-9 h-9 rounded-xl bg-input-background flex items-center justify-center"
            >
              <Users className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-3">{t('recentActivity')}</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {activities.map((item, idx) => (
              <div key={idx}>
                {idx > 0 && <div className="border-t border-border" />}
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.dot }}
                  />
                  <p className="text-sm flex-1">{item.text}</p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base font-semibold mb-3">{t('quickLinks')}</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:border-[#10b981]/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#10b981]" />
                  </div>
                  <span className="flex-1 font-medium">{link.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {showRoleSwitcher && <RoleSwitcherModal onClose={() => setShowRoleSwitcher(false)} />}
    </div>
  );
}
