import { useState } from 'react';
import { BusinessLogo } from '../BusinessLogo';
import { useLanguage } from '../../context/LanguageContext';

type Status = 'Active' | 'Pending' | 'Suspended';

interface Business {
  id: number;
  name: string;
  category: string;
  community: string;
  type: 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail' | 'office' | 'hotel' | 'fitness' | 'healthcare' | 'travel';
  status: Status;
}

const initialBusinesses: Business[] = [
  { id: 1, name: 'Master Coffee', category: 'Cafe', community: 'AIFC', type: 'cafe', status: 'Active' },
  { id: 2, name: 'Wyndham Garden Astana', category: 'Hotel', community: 'AIFC', type: 'hotel', status: 'Active' },
  { id: 3, name: 'Hilton Astana', category: 'Hotel', community: 'AIFC', type: 'hotel', status: 'Active' },
  { id: 4, name: 'Rafe Beauty Lounge', category: 'Beauty', community: 'AIFC', type: 'spa', status: 'Active' },
  { id: 5, name: 'AIFC Academy', category: 'Education', community: 'AIFC', type: 'education', status: 'Active' },
  { id: 6, name: 'Air Astana', category: 'Travel', community: 'AIFC', type: 'travel', status: 'Active' },
  { id: 7, name: 'Bronx Fitness', category: 'Fitness', community: 'AIFC', type: 'fitness', status: 'Pending' },
  { id: 8, name: 'International SOS', category: 'Healthcare', community: 'AIFC', type: 'healthcare', status: 'Pending' },
  { id: 9, name: 'Chez Georges', category: 'Restaurant', community: 'AIFC', type: 'restaurant', status: 'Active' },
  { id: 10, name: 'Ana Flowers', category: 'Retail', community: 'AIFC', type: 'retail', status: 'Suspended' },
];

const statusStyles: Record<Status, string> = {
  Active: 'bg-[#10b981]/10 text-[#10b981]',
  Pending: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  Suspended: 'bg-red-500/10 text-red-500',
};

export function AdminBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [activeFilter, setActiveFilter] = useState<'All' | Status>('All');
  const { t } = useLanguage();

  const filters: Array<{ key: 'All' | Status; label: string }> = [
    { key: 'All', label: t('filterAll') },
    { key: 'Pending', label: t('filterPending') },
    { key: 'Active', label: t('filterActive') },
    { key: 'Suspended', label: t('filterSuspended') },
  ];

  const filtered =
    activeFilter === 'All'
      ? businesses
      : businesses.filter((b) => b.status === activeFilter);

  const handleApprove = (id: number) => {
    setBusinesses(businesses.map((b) => (b.id === id ? { ...b, status: 'Active' } : b)));
  };

  const handleReject = (id: number) => {
    setBusinesses(businesses.map((b) => (b.id === id ? { ...b, status: 'Suspended' } : b)));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">{t('businesses')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mb-4">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm transition-colors ${
                activeFilter === f.key
                  ? 'bg-[#10b981] text-white'
                  : 'bg-input-background text-muted-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((biz) => (
            <div key={biz.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <BusinessLogo name={biz.name} type={biz.type} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-medium text-sm">{biz.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[biz.status]}`}>
                      {biz.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {biz.category} · {biz.community}
                  </p>
                </div>
              </div>

              {biz.status === 'Pending' && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-border">
                  <button
                    onClick={() => handleApprove(biz.id)}
                    className="flex-1 py-2 bg-[#10b981] text-white rounded-xl text-sm font-medium hover:bg-[#059669] transition-colors"
                  >
                    {t('approve')}
                  </button>
                  <button
                    onClick={() => handleReject(biz.id)}
                    className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    {t('reject')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
