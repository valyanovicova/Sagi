import { ChevronLeft, Sun, Moon, Check } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export function AppearanceSettings() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/user/profile" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl">{t('appearance')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-3">
          <button
            onClick={() => setTheme('light')}
            className={`w-full p-4 rounded-2xl border-2 transition-all ${
              theme === 'light' ? 'border-[#10b981] bg-[#10b981]/5' : 'border-border bg-card hover:border-[#10b981]/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-border flex items-center justify-center">
                <Sun className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="mb-0.5">{t('lightTheme')}</h3>
                <p className="text-xs text-muted-foreground">{t('lightThemeDesc')}</p>
              </div>
              {theme === 'light' && (
                <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`w-full p-4 rounded-2xl border-2 transition-all ${
              theme === 'dark' ? 'border-[#10b981] bg-[#10b981]/5' : 'border-border bg-card hover:border-[#10b981]/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#121212] border-2 border-[#2a2a2a] flex items-center justify-center">
                <Moon className="w-6 h-6 text-[#10b981]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="mb-0.5">{t('darkTheme')}</h3>
                <p className="text-xs text-muted-foreground">{t('darkThemeDesc')}</p>
              </div>
              {theme === 'dark' && (
                <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
