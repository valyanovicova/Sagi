import { useState } from 'react';
import { ChevronLeft, Users, RefreshCw, TrendingUp, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { BusinessLogo } from '../BusinessLogo';
import { useLanguage } from '../../context/LanguageContext';

type BizType = 'restaurant' | 'cafe' | 'spa' | 'education' | 'retail';

interface OfferStats {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  // how community members use this offer
  totalRedemptions: number;
  uniqueMembers: number;
  repeatRedeemers: number;
  avgPerMember: number;
  redemptionRate: number; // % of community members who redeemed
  recentActivity: Array<{ member: string; timeAgo: string }>;
  barData: number[]; // per day
}

interface BizData {
  name: string;
  type: BizType;
  category: string;
  // per-community member stats
  communityMembers: number;        // total members in admin's community
  activeUsers: number;             // members who interacted at least once
  repeatUsers: number;             // members who redeemed more than once
  totalRedemptions: number;
  barData: number[];
  offers: OfferStats[];
}

// Mock data keyed by businessId — scoped to the admin's community (AIFC or Garden School)
const bizMap: Record<string, BizData> = {
  '1': {
    name: 'Local Bistro',
    type: 'restaurant',
    category: 'Restaurant',
    communityMembers: 150,
    activeUsers: 87,
    repeatUsers: 34,
    totalRedemptions: 234,
    barData: [28, 35, 42, 55, 40, 62, 72],
    offers: [
      {
        id: 'o1',
        name: '20% off all meals',
        status: 'Active',
        totalRedemptions: 145,
        uniqueMembers: 62,
        repeatRedeemers: 24,
        avgPerMember: 2.3,
        redemptionRate: 41,
        barData: [18, 22, 28, 35, 26, 40, 46],
        recentActivity: [
          { member: 'Member #0423', timeAgo: '2 min ago' },
          { member: 'Member #0891', timeAgo: '18 min ago' },
          { member: 'Member #0217', timeAgo: '1 hr ago' },
          { member: 'Member #0654', timeAgo: '3 hr ago' },
          { member: 'Member #0038', timeAgo: '5 hr ago' },
        ],
      },
      {
        id: 'o2',
        name: 'Lunch Special 15% off',
        status: 'Paused',
        totalRedemptions: 89,
        uniqueMembers: 47,
        repeatRedeemers: 12,
        avgPerMember: 1.9,
        redemptionRate: 31,
        barData: [10, 13, 14, 20, 14, 22, 26],
        recentActivity: [
          { member: 'Member #0712', timeAgo: '2 days ago' },
          { member: 'Member #0345', timeAgo: '3 days ago' },
        ],
      },
    ],
  },
  '2': {
    name: 'Morning Cafe',
    type: 'cafe',
    category: 'Cafe',
    communityMembers: 150,
    activeUsers: 72,
    repeatUsers: 29,
    totalRedemptions: 189,
    barData: [20, 28, 35, 45, 38, 52, 60],
    offers: [
      {
        id: 'o3',
        name: 'Free coffee with pastry',
        status: 'Active',
        totalRedemptions: 189,
        uniqueMembers: 72,
        repeatRedeemers: 29,
        avgPerMember: 2.6,
        redemptionRate: 48,
        barData: [20, 28, 35, 45, 38, 52, 60],
        recentActivity: [
          { member: 'Member #0534', timeAgo: '5 min ago' },
          { member: 'Member #0192', timeAgo: '32 min ago' },
          { member: 'Member #0876', timeAgo: '2 hr ago' },
          { member: 'Member #0421', timeAgo: '4 hr ago' },
        ],
      },
    ],
  },
  '3': {
    name: 'Glow Spa',
    type: 'spa',
    category: 'Beauty',
    communityMembers: 150,
    activeUsers: 41,
    repeatUsers: 11,
    totalRedemptions: 100,
    barData: [12, 15, 18, 25, 20, 32, 38],
    offers: [
      {
        id: 'o4',
        name: '15% Beauty Services',
        status: 'Active',
        totalRedemptions: 68,
        uniqueMembers: 34,
        repeatRedeemers: 9,
        avgPerMember: 2.0,
        redemptionRate: 23,
        barData: [8, 10, 12, 17, 14, 22, 26],
        recentActivity: [
          { member: 'Member #0277', timeAgo: '1 hr ago' },
          { member: 'Member #0590', timeAgo: '6 hr ago' },
          { member: 'Member #0134', timeAgo: '1 day ago' },
        ],
      },
      {
        id: 'o5',
        name: 'Spa Day Package',
        status: 'Paused',
        totalRedemptions: 32,
        uniqueMembers: 28,
        repeatRedeemers: 3,
        avgPerMember: 1.1,
        redemptionRate: 19,
        barData: [4, 5, 6, 8, 6, 10, 12],
        recentActivity: [
          { member: 'Member #0489', timeAgo: '3 days ago' },
        ],
      },
    ],
  },
  '4': {
    name: 'Garden Academy',
    type: 'education',
    category: 'Education',
    communityMembers: 420,
    activeUsers: 98,
    repeatUsers: 38,
    totalRedemptions: 134,
    barData: [12, 18, 25, 35, 28, 42, 50],
    offers: [
      {
        id: 'o6',
        name: '10% off courses',
        status: 'Active',
        totalRedemptions: 89,
        uniqueMembers: 71,
        repeatRedeemers: 22,
        avgPerMember: 1.3,
        redemptionRate: 17,
        barData: [8, 12, 17, 24, 19, 28, 34],
        recentActivity: [
          { member: 'Member #1023', timeAgo: '15 min ago' },
          { member: 'Member #0788', timeAgo: '1 hr ago' },
          { member: 'Member #0412', timeAgo: '3 hr ago' },
          { member: 'Member #1145', timeAgo: '5 hr ago' },
        ],
      },
      {
        id: 'o7',
        name: 'Free trial class',
        status: 'Active',
        totalRedemptions: 45,
        uniqueMembers: 45,
        repeatRedeemers: 0,
        avgPerMember: 1.0,
        redemptionRate: 11,
        barData: [4, 6, 8, 11, 9, 14, 16],
        recentActivity: [
          { member: 'Member #0934', timeAgo: '2 hr ago' },
          { member: 'Member #1067', timeAgo: '8 hr ago' },
        ],
      },
    ],
  },
  '5': {
    name: 'Style Boutique',
    type: 'retail',
    category: 'Retail',
    communityMembers: 420,
    activeUsers: 81,
    repeatUsers: 18,
    totalRedemptions: 134,
    barData: [10, 16, 22, 32, 26, 40, 48],
    offers: [
      {
        id: 'o8',
        name: 'Buy 2 Get 1 Free',
        status: 'Active',
        totalRedemptions: 134,
        uniqueMembers: 81,
        repeatRedeemers: 18,
        avgPerMember: 1.7,
        redemptionRate: 19,
        barData: [10, 16, 22, 32, 26, 40, 48],
        recentActivity: [
          { member: 'Member #0867', timeAgo: '20 min ago' },
          { member: 'Member #0334', timeAgo: '2 hr ago' },
          { member: 'Member #1201', timeAgo: '4 hr ago' },
          { member: 'Member #0556', timeAgo: '6 hr ago' },
        ],
      },
    ],
  },
};


type Period = 'week' | 'month' | 'all';

export function AdminBusinessAnalyticsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>('month');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

  const biz = bizMap[id ?? '1'] ?? bizMap['1'];
  const maxBar = Math.max(...biz.barData);
  const days = [t('dayMon'), t('dayTue'), t('dayWed'), t('dayThu'), t('dayFri'), t('daySat'), t('daySun')];

  const periods: Array<{ key: Period; label: string }> = [
    { key: 'week', label: t('thisWeek') },
    { key: 'month', label: t('thisMonth') },
    { key: 'all', label: t('allTime') },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/admin/analytics')} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <BusinessLogo name={biz.name} type={biz.type} size="sm" />
            <div>
              <h1 className="text-base font-semibold leading-tight">{biz.name}</h1>
              <span className="text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full">{biz.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-5">

        {/* How community members engage */}
        <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-4 text-white">
          <p className="text-xs opacity-75 mb-3">{t('communityEngagement')}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 opacity-75" />
              </div>
              <p className="text-xl font-bold">{biz.activeUsers}</p>
              <p className="text-[10px] opacity-75 leading-tight">{t('membersUsedLabel')}</p>
              <p className="text-[10px] opacity-60">{t('ofTotal')} {biz.communityMembers}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <RefreshCw className="w-3.5 h-3.5 opacity-75" />
              </div>
              <p className="text-xl font-bold">{biz.repeatUsers}</p>
              <p className="text-[10px] opacity-75 leading-tight">{t('cameBackLabel')}</p>
              <p className="text-[10px] opacity-60">{t('repeatVisitsLabel')}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3.5 h-3.5 opacity-75" />
              </div>
              <p className="text-xl font-bold">{biz.totalRedemptions}</p>
              <p className="text-[10px] opacity-75 leading-tight">{t('totalUsesLabel')}</p>
              <p className="text-[10px] opacity-60">{t('activeOffers').toLowerCase()}</p>
            </div>
          </div>
          {/* Member participation bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs opacity-75 mb-1">
              <span>{t('communityParticipation')}</span>
              <span>{Math.round((biz.activeUsers / biz.communityMembers) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${(biz.activeUsers / biz.communityMembers) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Period tabs */}
        <div className="flex gap-2">
          {periods.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`flex-1 py-2 rounded-xl text-sm transition-colors ${
                period === p.key ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Daily usage chart */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-semibold mb-3">{t('memberUsageByDay')}</p>
          <div className="flex items-end gap-1 h-24">
            {biz.barData.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">{val}</span>
                <div
                  className="w-full rounded-t-md bg-[#10b981]"
                  style={{ height: `${(val / maxBar) * 64}px` }}
                />
                <span className="text-[9px] text-muted-foreground">{days[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Per-offer breakdown — this is the main view */}
        <div>
          <p className="text-sm font-semibold mb-3">{t('howMembersUseOffers')}</p>
          <div className="space-y-3">
            {biz.offers.map(offer => {
              const isExpanded = expandedOffer === offer.id;
              const offerMaxBar = Math.max(...offer.barData);
              return (
                <div key={offer.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  {/* Offer header — tap to expand */}
                  <button
                    className="w-full p-4 text-left hover:bg-input-background transition-colors"
                    onClick={() => setExpandedOffer(isExpanded ? null : offer.id)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{offer.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                          offer.status === 'Active'
                            ? 'bg-[#10b981]/10 text-[#10b981]'
                            : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                        }`}>
                          {offer.status === 'Active' ? t('offersActive') : t('offersPaused')}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-[#10b981]">{offer.totalRedemptions}</p>
                        <p className="text-[10px] text-muted-foreground">{t('redemptionsLabel')}</p>
                      </div>
                    </div>

                    {/* Quick stats row */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-background rounded-xl p-2 text-center">
                        <p className="text-sm font-bold">{offer.uniqueMembers}</p>
                        <p className="text-[9px] text-muted-foreground">{t('uniqueMembersLabel')}</p>
                      </div>
                      <div className="bg-background rounded-xl p-2 text-center">
                        <p className="text-sm font-bold">{offer.repeatRedeemers}</p>
                        <p className="text-[9px] text-muted-foreground">{t('cameBackLabel')}</p>
                      </div>
                      <div className="bg-background rounded-xl p-2 text-center">
                        <p className="text-sm font-bold">{offer.redemptionRate}%</p>
                        <p className="text-[9px] text-muted-foreground">{t('ofCommunityPct')}</p>
                      </div>
                    </div>

                    {/* Participation bar */}
                    <div className="mt-3">
                      <div className="h-1.5 rounded-full bg-[#10b981]/15 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#10b981]"
                          style={{ width: `${offer.redemptionRate}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#10b981] mt-2 text-center">
                      {isExpanded ? t('hideDetailsLabel') : t('showMemberActivityLabel')}
                    </p>
                  </button>

                  {/* Expanded: daily chart + recent member activity */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      {/* Daily chart for this offer */}
                      <div className="p-4 border-b border-border">
                        <p className="text-xs text-muted-foreground mb-3">{t('dailyRedemptionsByMembers')}</p>
                        <div className="flex items-end gap-1 h-20">
                          {offer.barData.map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                              <span className="text-[8px] text-muted-foreground">{val}</span>
                              <div
                                className="w-full rounded-t-sm bg-[#10b981]/70"
                                style={{ height: `${(val / offerMaxBar) * 52}px` }}
                              />
                              <span className="text-[8px] text-muted-foreground">{days[idx]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Avg per member */}
                      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <RefreshCw className="w-4 h-4" />
                          <span>{t('avgUsesPerMember')}</span>
                        </div>
                        <span className="font-bold text-[#10b981]">{offer.avgPerMember}×</span>
                      </div>

                      {/* Recent member activity */}
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {t('recentRedemptions')}
                        </p>
                        <div className="space-y-2">
                          {offer.recentActivity.map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#10b981]/15 flex items-center justify-center">
                                  <Users className="w-3 h-3 text-[#10b981]" />
                                </div>
                                <span className="text-sm font-medium">{item.member}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
