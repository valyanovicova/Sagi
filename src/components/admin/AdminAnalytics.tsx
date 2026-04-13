import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { BusinessLogo } from '../BusinessLogo';
import { useLanguage } from '../../context/LanguageContext';

// Mock: communities this admin manages
const adminCommunities = [
  { id: 'aifc', name: 'AIFC', members: 570 },
];

// Per-community mock data
const communityData: Record<string, {
  totalRedemptions: number;
  activeMembers: number;
  conversionRate: number;
  topCategory: string;
  businesses: Array<{ id: string; name: string; type: 'restaurant' | 'cafe' | 'spa' | 'education' | 'retail'; redemptions: number; offers: number }>;
  offers: Array<{ id: string; title: string; business: string; redemptions: number; uniqueMembers: number }>;
  barData: number[];
  memberActivity: Array<{ label: string; value: number; total: number }>;
}> = {
  aifc: {
    totalRedemptions: 523,
    activeMembers: 98,
    conversionRate: 65,
    topCategory: 'Food',
    businesses: [
      { id: '1', name: 'Local Bistro', type: 'restaurant', redemptions: 234, offers: 2 },
      { id: '2', name: 'Morning Cafe', type: 'cafe', redemptions: 189, offers: 1 },
      { id: '3', name: 'Glow Spa', type: 'spa', redemptions: 100, offers: 1 },
    ],
    offers: [
      { id: '1', title: '20% off all meals', business: 'Local Bistro', redemptions: 234, uniqueMembers: 87 },
      { id: '2', title: 'Free coffee with pastry', business: 'Morning Cafe', redemptions: 189, uniqueMembers: 72 },
      { id: '3', title: '15% Beauty Services', business: 'Glow Spa', redemptions: 100, uniqueMembers: 41 },
    ],
    barData: [34, 52, 71, 95, 78, 110, 83],
    memberActivity: [
      { label: 'Viewed offer', value: 312, total: 523 },
      { label: 'Used offer', value: 198, total: 523 },
      { label: 'Repeat redeemers', value: 67, total: 150 },
    ],
  },
};

type Period = 'week' | 'month' | 'all';

export function AdminAnalytics() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCommunity, setSelectedCommunity] = useState(adminCommunities[0].id);
  const [period, setPeriod] = useState<Period>('month');

  const data = communityData[selectedCommunity];
  const maxBar = Math.max(...data.barData);
  const maxBizRedemptions = Math.max(...data.businesses.map(b => b.redemptions));
  const maxOfferRedemptions = Math.max(...data.offers.map(o => o.redemptions));
  const days = [t('dayMon'), t('dayTue'), t('dayWed'), t('dayThu'), t('dayFri'), t('daySat'), t('daySun')];

  const memberActivityLabels = [t('viewedOffer'), t('redeemedOffer'), t('repeatRedeemersLabel')];

  const periods: Array<{ key: Period; label: string }> = [
    { key: 'week', label: t('thisWeek') },
    { key: 'month', label: t('thisMonth') },
    { key: 'all', label: t('allTime') },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/admin/profile" className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl">{t('analytics')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-5">

        {/* Community selector */}
        <div className="flex gap-2">
          {adminCommunities.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCommunity(c.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                selectedCommunity === c.id
                  ? 'bg-[#10b981] text-white'
                  : 'bg-input-background text-muted-foreground'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Period tabs */}
        <div className="flex gap-2">
          {periods.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`flex-1 py-2 rounded-xl text-sm transition-colors ${
                period === p.key
                  ? 'bg-foreground text-background'
                  : 'bg-input-background text-muted-foreground'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t('totalRedemptions'), value: data.totalRedemptions, color: 'text-[#10b981]' },
            { label: t('activeMembers'), value: data.activeMembers, color: 'text-[#3b82f6]' },
            { label: t('conversionRate'), value: `${data.conversionRate}%`, color: 'text-[#8b5cf6]' },
            { label: t('topCategory'), value: data.topCategory, color: 'text-[#f59e0b]' },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Member activity — how members react */}
        <div>
          <h2 className="text-base font-semibold mb-3">{t('memberEngagement')}</h2>
          <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
            {data.memberActivity.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{memberActivityLabels[idx]}</span>
                  <span className="font-semibold text-[#10b981]">{item.value} <span className="text-muted-foreground font-normal">/ {item.total}</span></span>
                </div>
                <div className="h-2 rounded-full bg-[#10b981]/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#10b981]"
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redemptions by day chart */}

        <div>
          <h2 className="text-base font-semibold mb-3">{t('redemptionsByDay')}</h2>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-end gap-1 h-28">
              {data.barData.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground">{val}</span>
                  <div
                    className="w-full rounded-t-md bg-[#10b981]"
                    style={{ height: `${(val / maxBar) * 72}px` }}
                  />
                  <span className="text-[9px] text-muted-foreground">{days[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How members react to businesses */}
        <div>
          <h2 className="text-base font-semibold mb-3">{t('topBusinesses')}</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {data.businesses.map((biz, idx) => (
              <div key={biz.id}>
                {idx > 0 && <div className="border-t border-border" />}
                <button
                  onClick={() => navigate(`/admin/analytics/business/${biz.id}`)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-input-background transition-colors text-left"
                >
                  <span className="text-sm font-bold text-[#10b981] w-4">{idx + 1}</span>
                  <BusinessLogo name={biz.name} type={biz.type} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{biz.name}</p>
                    <div className="h-2 rounded-full bg-[#10b981]/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#10b981]"
                        style={{ width: `${(biz.redemptions / maxBizRedemptions) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{biz.offers} {t('activeOffers').toLowerCase()}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#10b981] w-8 text-right">{biz.redemptions}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/communities')}
            className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-[#10b981] border border-[#10b981]/30 hover:bg-[#10b981]/5 transition-colors"
          >
            {t('showAllBusinesses')}
          </button>
        </div>

        {/* How members react to offers */}
        <div>
          <h2 className="text-base font-semibold mb-3">{t('topOffers')}</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {data.offers.map((offer, idx) => (
              <div key={offer.id}>
                {idx > 0 && <div className="border-t border-border" />}
                <button
                  onClick={() => navigate(`/admin/analytics/offer/${offer.id}`)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-input-background transition-colors text-left"
                >
                  <span className="text-sm font-bold text-[#10b981] w-4">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{offer.title}</p>
                    <p className="text-xs text-muted-foreground mb-1">{offer.business}</p>
                    <div className="h-1.5 rounded-full bg-[#10b981]/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#10b981]"
                        style={{ width: `${(offer.redemptions / maxOfferRedemptions) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{offer.uniqueMembers} {t('uniqueMembersLabel')}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#10b981] w-8 text-right">{offer.redemptions}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
