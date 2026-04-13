import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Mail, Phone, Hash, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { OtpInput } from './OtpInput';

type TabType = 'email' | 'phone' | 'code';

const countryCodes = [
  { code: '+7', flag: '🇰🇿', label: 'KZ' },
  { code: '+7', flag: '🇷🇺', label: 'RU' },
  { code: '+44', flag: '🇬🇧', label: 'GB' },
  { code: '+1', flag: '🇺🇸', label: 'US' },
];

export function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('email');

  // Email tab state
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone tab state
  const [countryIndex, setCountryIndex] = useState(0);
  const [formPhone, setFormPhone] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');

  // Code tab state
  const [accessCode, setAccessCode] = useState('');

  const currentCountry = countryCodes[countryIndex];

  const cycleCountry = () => {
    setCountryIndex((prev) => (prev + 1) % countryCodes.length);
  };

  const handleEmailSubmit = () => {
    login({ name: 'Alima Alieva', email: formEmail || undefined });
    navigate('/');
  };

  const handlePhoneSubmit = () => {
    login({ name: 'Alima Alieva', phone: formPhone || undefined });
    navigate('/');
  };

  const handleCodeSubmit = () => {
    login({ name: 'Alima Alieva' });
    navigate('/');
  };

  const tabs: { key: TabType; label: string; icon: typeof Mail }[] = [
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'phone', label: 'Phone', icon: Phone },
    { key: 'code', label: 'Code', icon: Hash },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/auth')}
            className="w-9 h-9 rounded-xl bg-input-background flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">{t('signIn')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Tab switcher */}
        <div className="flex gap-1 bg-input-background rounded-2xl p-1 mb-6">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-[#10b981] text-white'
                  : 'bg-transparent text-muted-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Email tab */}
        {activeTab === 'email' && (
          <div className="space-y-4">
            <div>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3.5 bg-input-background border border-border rounded-xl text-sm focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className="w-full px-4 py-3.5 pr-12 bg-input-background border border-border rounded-xl text-sm focus:border-[#10b981] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button className="text-sm text-[#10b981] text-right w-full">
              {t('forgotPassword')}
            </button>
            <button
              onClick={handleEmailSubmit}
              className="w-full py-4 bg-[#10b981] text-white font-semibold rounded-2xl hover:bg-[#0d9668] transition-colors"
            >
              {t('signIn')}
            </button>
          </div>
        )}

        {/* Phone tab */}
        {activeTab === 'phone' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={cycleCountry}
                className="flex items-center gap-1.5 px-3 py-3.5 bg-input-background border border-border rounded-xl text-sm font-medium whitespace-nowrap"
              >
                <span>{currentCountry.flag}</span>
                <span>{currentCountry.code}</span>
              </button>
              <input
                type="tel"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder={t('phoneNumber')}
                className="flex-1 px-4 py-3.5 bg-input-background border border-border rounded-xl text-sm focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>
            {!smsSent && (
              <button
                onClick={() => setSmsSent(true)}
                className="w-full py-4 bg-[#10b981] text-white font-semibold rounded-2xl hover:bg-[#0d9668] transition-colors"
              >
                {t('sendSmsCode')}
              </button>
            )}
            {smsSent && (
              <>
                <OtpInput value={phoneOtp} onChange={setPhoneOtp} length={6} />
                {phoneOtp.length === 6 && (
                  <button
                    onClick={handlePhoneSubmit}
                    className="w-full py-4 bg-[#10b981] text-white font-semibold rounded-2xl hover:bg-[#0d9668] transition-colors"
                  >
                    {t('verify')}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Code tab */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">{t('enterAccessCodeLogin')}</p>
            <OtpInput value={accessCode} onChange={setAccessCode} length={6} />
            <button
              onClick={handleCodeSubmit}
              disabled={accessCode.length < 6}
              className="w-full py-4 bg-[#10b981] text-white font-semibold rounded-2xl hover:bg-[#0d9668] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('signInWithCode')}
            </button>
          </div>
        )}

        {/* Bottom link */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t('dontHaveAccount')}{' '}
          <button
            onClick={() => navigate('/auth/register')}
            className="text-[#10b981] font-medium"
          >
            {t('createAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
