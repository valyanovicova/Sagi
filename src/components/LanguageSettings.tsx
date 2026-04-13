import { ChevronLeft, Check } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSettings() {
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺', region: 'Российская Федерация' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿', region: 'Қазақстан Республикасы' },
    { code: 'en', name: 'English', flag: '🇬🇧', region: 'United Kingdom' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/user/profile" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl">{t('language')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as 'en' | 'ru' | 'kk')}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                language === lang.code
                  ? 'border-[#10b981] bg-[#10b981]/5'
                  : 'border-border bg-card hover:border-[#10b981]/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{lang.flag}</div>
                <div className="flex-1 text-left">
                  <h3 className="mb-0.5">{lang.name}</h3>
                  <p className="text-xs text-muted-foreground">{lang.region}</p>
                </div>
                {language === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#10b981]/10 border border-[#10b981]/20 rounded-2xl">
          <p className="text-sm text-foreground/80">{t('languageChangeNote')}</p>
        </div>
      </div>
    </div>
  );
}
