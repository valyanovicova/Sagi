import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export function NotificationSettings() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    globalPush: true,
    partnerOffers: true,
    communityUpdates: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">{t('notifications')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {([
            { key: 'globalPush', label: t('globalPushNotifications'), desc: t('globalPushDesc') },
            { key: 'partnerOffers', label: t('partnerOffers'), desc: t('partnerOffersDesc') },
            { key: 'communityUpdates', label: t('communityUpdates'), desc: t('communityUpdatesDesc') },
          ] as const).map((item, idx) => (
            <div key={item.key}>
              {idx > 0 && <div className="border-t border-border" />}
              <div className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(item.key)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    settings[item.key] ? 'bg-[#10b981]' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      settings[item.key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#10b981]/10 border border-[#10b981]/20 rounded-2xl">
          <p className="text-sm text-foreground/80">{t('notificationNote')}</p>
        </div>
      </div>
    </div>
  );
}
