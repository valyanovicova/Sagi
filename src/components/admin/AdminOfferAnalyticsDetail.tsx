import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

interface OfferData {
  title: string;
  business: string;
  category: string;
  status: 'Active' | 'Paused';
  totalRedemptions: number;
  validUntil: string;
  barData: number[];
  communityBreakdown: Array<{ name: string; redemptions: number; pct: number }>;
  timeline: Array<{ member: string; community: string; time: string }>;
}

const offerMap: Record<string, OfferData> = {
  '1': {
    title: '20% off all meals',
    business: 'Local Bistro',
    category: 'Restaurant',
    status: 'Active',
    totalRedemptions: 234,
    validUntil: 'Apr 30, 2026',
    barData: [28, 35, 42, 55, 40, 62, 72],
    communityBreakdown: [
      { name: 'AIFC', redemptions: 234, pct: 100 },
    ],
    timeline: [
      { member: 'Member #0423', community: 'AIFC', time: '2 min ago' },
      { member: 'Member #0891', community: 'AIFC', time: '15 min ago' },
      { member: 'Member #1204', community: 'AIFC', time: '32 min ago' },
      { member: 'Member #0567', community: 'AIFC', time: '1 hr ago' },
      { member: 'Member #2341', community: 'AIFC', time: '2 hr ago' },
    ],
  },
  '2': {
    title: 'Free coffee with pastry',
    business: 'Morning Cafe',
    category: 'Cafe',
    status: 'Active',
    totalRedemptions: 189,
    validUntil: 'May 15, 2026',
    barData: [20, 28, 35, 45, 38, 52, 60],
    communityBreakdown: [
      { name: 'AIFC', redemptions: 189, pct: 100 },
    ],
    timeline: [
      { member: 'Member #0311', community: 'AIFC', time: '5 min ago' },
      { member: 'Member #0742', community: 'AIFC', time: '20 min ago' },
      { member: 'Member #1098', community: 'AIFC', time: '45 min ago' },
      { member: 'Member #0225', community: 'AIFC', time: '1 hr ago' },
      { member: 'Member #0887', community: 'AIFC', time: '2 hr ago' },
    ],
  },
  '3': {
    title: '15% Beauty Services',
    business: 'Glow Spa',
    category: 'Beauty',
    status: 'Active',
    totalRedemptions: 156,
    validUntil: 'Jun 1, 2026',
    barData: [15, 22, 30, 40, 32, 48, 54],
    communityBreakdown: [
      { name: 'AIFC', redemptions: 156, pct: 100 },
    ],
    timeline: [
      { member: 'Member #0612', community: 'AIFC', time: '8 min ago' },
      { member: 'Member #0934', community: 'AIFC', time: '25 min ago' },
      { member: 'Member #1150', community: 'AIFC', time: '50 min ago' },
      { member: 'Member #0482', community: 'AIFC', time: '1 hr ago' },
      { member: 'Member #0773', community: 'AIFC', time: '3 hr ago' },
    ],
  },
  '4': {
    title: '10% off courses',
    business: 'Garden Academy',
    category: 'Education',
    status: 'Active',
    totalRedemptions: 134,
    validUntil: 'Jun 30, 2026',
    barData: [12, 18, 25, 35, 28, 42, 50],
    communityBreakdown: [
      { name: 'AIFC', redemptions: 134, pct: 100 },
    ],
    timeline: [
      { member: 'Member #0521', community: 'AIFC', time: '10 min ago' },
      { member: 'Member #0836', community: 'AIFC', time: '30 min ago' },
      { member: 'Member #1042', community: 'AIFC', time: '55 min ago' },
      { member: 'Member #0295', community: 'AIFC', time: '2 hr ago' },
      { member: 'Member #0667', community: 'AIFC', time: '4 hr ago' },
    ],
  },
  '5': {
    title: 'Buy 2 Get 1 Free',
    business: 'Style Boutique',
    category: 'Retail',
    status: 'Active',
    totalRedemptions: 134,
    validUntil: 'May 31, 2026',
    barData: [10, 16, 22, 32, 26, 40, 48],
    communityBreakdown: [
      { name: 'AIFC', redemptions: 134, pct: 100 },
    ],
    timeline: [
      { member: 'Member #0418', community: 'AIFC', time: '12 min ago' },
      { member: 'Member #0752', community: 'AIFC', time: '35 min ago' },
      { member: 'Member #1123', community: 'AIFC', time: '1 hr ago' },
      { member: 'Member #0364', community: 'AIFC', time: '2 hr ago' },
      { member: 'Member #0891', community: 'AIFC', time: '3 hr ago' },
    ],
  },
};

type Period = 'week' | 'month' | 'all';

export function AdminOfferAnalyticsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>('month');

  const offer = offerMap[id ?? '1'] ?? offerMap['1'];
  const maxBar = Math.max(...offer.barData);
  const maxCommunityRedemptions = Math.max(...offer.communityBreakdown.map((c) => c.redemptions));
  const days = [t('dayMon'), t('dayTue'), t('dayWed'), t('dayThu'), t('dayFri'), t('daySat'), t('daySun')];

  const periods: Array<{ key: Period; label: string }> = [
    { key: 'week', label: t('thisWeek') },
    { key: 'month', label: t('thisMonth') },
    { key: 'all', label: t('allTime') },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/admin/analytics')} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold truncate">{offer.title}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-6">
        {/* Offer Card */}
        <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-5 text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold mb-1">{offer.title}</h2>
              <p className="text-white/80 text-sm">{offer.business}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                offer.status === 'Active'
                  ? 'bg-white/20 text-white'
                  : 'bg-black/20 text-white/80'
              }`}
            >
              {offer.status === 'Active' ? t('offersActive') : t('offersPaused')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{offer.category}</span>
            <span className="text-xs text-white/70">{t('validUntil')} {offer.validUntil}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/70 text-xs mb-1">{t('totalRedemptions')}</p>
            <p className="text-3xl font-bold">{offer.totalRedemptions}</p>
          </div>
        </div>

        {/* Period tabs */}
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                period === p.key
                  ? 'bg-[#10b981] text-white'
                  : 'bg-input-background text-muted-foreground'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Redemptions Chart */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-3">{t('redemptionsByDay')}</h3>
          <div className="flex items-end gap-1 h-28">
            {offer.barData.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">{val}</span>
                <div
                  className="w-full rounded-t-md bg-[#10b981]"
                  style={{ height: `${(val / maxBar) * 70}px` }}
                />
                <span className="text-[9px] text-muted-foreground">{days[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Redemptions by Community */}
        <div>
          <h3 className="text-sm font-semibold mb-3">{t('redemptionsByCommunity')}</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {offer.communityBreakdown.map((c, idx) => (
              <div key={c.name}>
                {idx > 0 && <div className="border-t border-border" />}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#10b981] w-5 text-center">{idx + 1}</span>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{c.redemptions}</span>
                      <span className="text-xs text-muted-foreground">({c.pct}%)</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-[#10b981]/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#10b981]"
                      style={{ width: `${(c.redemptions / maxCommunityRedemptions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redemption Timeline */}
        <div>
          <h3 className="text-sm font-semibold mb-3">{t('redemptionTimeline')}</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {offer.timeline.map((item, idx) => (
              <div key={idx}>
                {idx > 0 && <div className="border-t border-border" />}
                <div className="flex items-center gap-3 p-4">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] flex-shrink-0" />
                  <p className="text-sm flex-1">
                    {item.member} · {item.community}
                  </p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
