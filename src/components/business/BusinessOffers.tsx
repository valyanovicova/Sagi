import { useState } from 'react';
import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { BusinessLogo } from '../BusinessLogo';
import { useLanguage } from '../../context/LanguageContext';

interface Offer {
  id: number;
  title: string;
  category: string;
  type: 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail';
  active: boolean;
  expiry: string;
  redemptions: number;
}

export function BusinessOffers() {
  const { t } = useLanguage();

  const initialOffers: Offer[] = [
    { id: 1, title: t('discountAllMeals'), category: t('food'), type: 'restaurant', active: true, expiry: 'Apr 30, 2026', redemptions: 48 },
    { id: 2, title: t('freeCoffeeWithPastry'), category: t('food'), type: 'cafe', active: true, expiry: 'May 15, 2026', redemptions: 23 },
    { id: 3, title: t('buy2Get1'), category: t('retail'), type: 'retail', active: false, expiry: 'Mar 31, 2026', redemptions: 11 },
    { id: 4, title: t('spaDaySpecial'), category: t('beauty'), type: 'spa', active: true, expiry: 'Jun 1, 2026', redemptions: 7 },
  ];

  const [offers, setOffers] = useState<Offer[]>(initialOffers);

  const toggleActive = (id: number) => {
    setOffers(offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t('myOffers')}</h1>
          <Link
            to="/business/offers/new"
            className="w-9 h-9 rounded-xl bg-[#10b981] flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-3">
        {offers.map((offer) => (
          <Link
            key={offer.id}
            to="/business/offers/new"
            className="block bg-card border border-border rounded-2xl p-4 hover:border-[#10b981]/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <BusinessLogo name={offer.title} type={offer.type} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm leading-tight">{offer.title}</h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleActive(offer.id);
                    }}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      offer.active
                        ? 'bg-[#10b981]/10 text-[#10b981]'
                        : 'bg-input-background text-muted-foreground'
                    }`}
                  >
                    {offer.active ? t('offersActive') : t('offersPaused')}
                  </button>
                </div>
                <span className="inline-block text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full mb-2">
                  {offer.category}
                </span>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t('validUntil')} {offer.expiry}</span>
                  <span>{offer.redemptions} {t('redemptionsCount')}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
