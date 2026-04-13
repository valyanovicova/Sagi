import { useNavigate } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import sagiLogo from '../../assets/sagi-logo.png';

export function AuthLanding() {
  const navigate = useNavigate();
  const { t, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Top half — logo & branding */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <img
          src={sagiLogo}
          alt="Sagi Logo"
          className="w-24 h-24 rounded-3xl mb-6 shadow-xl"
        />
        <h1 className="text-4xl font-bold mb-3 tracking-tight">Sagi</h1>
      </div>

      {/* Bottom half — actions */}
      <div className="px-4 pb-6 space-y-3">
        <button
          onClick={() => navigate('/auth/login')}
          className="w-full py-4 bg-[#10b981] text-white text-base font-semibold rounded-2xl hover:bg-[#0d9668] transition-colors"
        >
          {t('signIn')}
        </button>

        <button
          onClick={() => navigate('/auth/register')}
          className="w-full py-4 bg-transparent border-2 border-[#10b981] text-[#10b981] text-base font-semibold rounded-2xl hover:bg-[#10b981]/5 transition-colors"
        >
          {t('createAccount')}
        </button>

        {/* Language switcher */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setLanguage('ru')}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="Russian"
          >
            🇷🇺
          </button>
          <button
            onClick={() => setLanguage('kk')}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="Kazakh"
          >
            🇰🇿
          </button>
          <button
            onClick={() => setLanguage('en')}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="English"
          >
            🇬🇧
          </button>
        </div>
      </div>
    </div>
  );
}
