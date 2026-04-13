import { useState } from 'react';
import { ChevronLeft, MapPin, Clock, X } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { BusinessLogo } from './BusinessLogo';

export function OfferDetail() {
  const { t } = useLanguage();
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <div className="h-56 bg-gradient-to-br from-[#34d399] to-[#059669]">
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="max-w-md mx-auto px-4 py-4">
              <Link
                to="/user/community/1"
                className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <BusinessLogo name={t('localBistro')} type="restaurant" size="lg" />
              <div className="flex-1">
                <h1 className="mb-1 py-3">{t('localBistro')}</h1>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{t('mainStreet')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{t('openHours')}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('bistroDescription')}
            </p>
          </div>

          <div className="mt-4 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm opacity-90">{t('activeReward')}</span>
              <span className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {t('active')}
              </span>
            </div>
            <h2 className="mb-2">{t('discountAllMeals')}</h2>
            <p className="text-sm opacity-90 mb-4">{t('validAllMenu')}</p>
            <div className="text-xs opacity-75">
              {t('validUntil')}: 30 апреля 2026
            </div>
          </div>

          <div className="mt-4 p-4 bg-card border border-border rounded-2xl">
            <h3 className="mb-3">{t('howToRedeem')}</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-[#10b981]">1.</span>
                <span>{t('redeemStep1')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#10b981]">2.</span>
                <span>{t('redeemStep2')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#10b981]">3.</span>
                <span>{t('redeemStep3')}</span>
              </li>
            </ol>
          </div>

          <button
            onClick={() => setShowQR(true)}
            className="w-full mt-4 py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl hover:shadow-lg transition-shadow"
          >
            {t('redeemNow')}
          </button>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-xs text-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('showQRTitle')}</h3>
              <button onClick={() => setShowQR(false)} className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">{t('showQRDesc')}</p>
            <div className="relative inline-block mb-4 p-[3px]">
              {/* Glowing animated border — follows QR boundary */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible" viewBox="0 0 192 192" style={{ filter: 'drop-shadow(0 0 8px #10b981) drop-shadow(0 0 16px #10b981)' }}>
                <rect x="3" y="3" width="186" height="186" rx="13" ry="13"
                  fill="none" stroke="#10b981" strokeWidth="5"
                  strokeDasharray="60 600"
                  strokeLinecap="round"
                  pathLength="600">
                  <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2s" repeatCount="indefinite" />
                </rect>
              </svg>
              <div className="bg-white rounded-2xl p-4">
              <svg viewBox="0 0 80 80" className="w-44 h-44">
                <rect width="80" height="80" fill="white"/>
                <rect x="4" y="4" width="20" height="20" fill="#0a1a12"/>
                <rect x="7" y="7" width="14" height="14" fill="white"/>
                <rect x="10" y="10" width="8" height="8" fill="#0a1a12"/>
                <rect x="56" y="4" width="20" height="20" fill="#0a1a12"/>
                <rect x="59" y="7" width="14" height="14" fill="white"/>
                <rect x="62" y="10" width="8" height="8" fill="#0a1a12"/>
                <rect x="4" y="56" width="20" height="20" fill="#0a1a12"/>
                <rect x="7" y="59" width="14" height="14" fill="white"/>
                <rect x="10" y="62" width="8" height="8" fill="#0a1a12"/>
                <rect x="28" y="4" width="4" height="4" fill="#0a1a12"/><rect x="36" y="4" width="4" height="4" fill="#0a1a12"/><rect x="44" y="4" width="4" height="4" fill="#0a1a12"/>
                <rect x="28" y="12" width="4" height="4" fill="#0a1a12"/><rect x="44" y="12" width="4" height="4" fill="#0a1a12"/>
                <rect x="36" y="20" width="4" height="4" fill="#0a1a12"/>
                <rect x="4" y="28" width="4" height="4" fill="#0a1a12"/><rect x="12" y="28" width="4" height="4" fill="#0a1a12"/><rect x="20" y="28" width="4" height="4" fill="#0a1a12"/>
                <rect x="28" y="28" width="4" height="4" fill="#0a1a12"/><rect x="36" y="28" width="4" height="4" fill="#0a1a12"/>
                <rect x="52" y="28" width="4" height="4" fill="#0a1a12"/><rect x="60" y="28" width="4" height="4" fill="#0a1a12"/><rect x="68" y="28" width="4" height="4" fill="#0a1a12"/>
                <rect x="4" y="36" width="4" height="4" fill="#0a1a12"/><rect x="20" y="36" width="4" height="4" fill="#0a1a12"/>
                <rect x="28" y="36" width="4" height="4" fill="#0a1a12"/><rect x="44" y="36" width="4" height="4" fill="#0a1a12"/><rect x="52" y="36" width="4" height="4" fill="#0a1a12"/><rect x="68" y="36" width="4" height="4" fill="#0a1a12"/>
                <rect x="4" y="44" width="4" height="4" fill="#0a1a12"/><rect x="12" y="44" width="4" height="4" fill="#0a1a12"/>
                <rect x="36" y="44" width="4" height="4" fill="#0a1a12"/><rect x="52" y="44" width="4" height="4" fill="#0a1a12"/><rect x="60" y="44" width="4" height="4" fill="#0a1a12"/>
                <rect x="28" y="52" width="4" height="4" fill="#0a1a12"/><rect x="36" y="52" width="4" height="4" fill="#0a1a12"/><rect x="44" y="52" width="4" height="4" fill="#0a1a12"/><rect x="68" y="52" width="4" height="4" fill="#0a1a12"/>
                <rect x="28" y="60" width="4" height="4" fill="#0a1a12"/><rect x="52" y="60" width="4" height="4" fill="#0a1a12"/><rect x="60" y="60" width="4" height="4" fill="#0a1a12"/>
                <rect x="28" y="68" width="4" height="4" fill="#0a1a12"/><rect x="36" y="68" width="4" height="4" fill="#0a1a12"/><rect x="44" y="68" width="4" height="4" fill="#0a1a12"/><rect x="52" y="68" width="4" height="4" fill="#0a1a12"/><rect x="68" y="68" width="4" height="4" fill="#0a1a12"/>
              </svg>
              </div>
            </div>
            <p className="text-xs font-mono text-muted-foreground">SAGI · 2024 · 0042</p>
            <p className="text-xs text-muted-foreground mt-1">{t('showQRHint')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
