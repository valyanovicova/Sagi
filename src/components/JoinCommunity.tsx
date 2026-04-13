import { ChevronLeft, HelpCircle, QrCode, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { BusinessLogo } from './BusinessLogo';
import { useState } from 'react';

export function JoinCommunity() {
  const { t } = useLanguage();
  const [accessCode, setAccessCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);

  const suggestedCommunities = [
    { id: 1, name: t('aifcName'), type: 'office' as const, members: 570, description: t('aifcDescription') },
  ];

  const handleVerifyCode = () => {
    if (!accessCode.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert(t('successJoined'));
      setAccessCode('');
    }, 1500);
  };

  const handleJoinCommunity = (communityId: number) => {
    setJoinedCommunities([...joinedCommunities, communityId]);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/user/profile" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl">{t('joinNewCommunity')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-8 p-6 bg-card border-2 border-[#10b981]/30 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-4">
              <label className="block text-sm text-muted-foreground mb-2">{t('enterAccessCode')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-4 py-3 pr-12 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors uppercase tracking-wider"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#10b981] transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              className="w-full mb-4 py-2 text-sm text-[#10b981] flex items-center justify-center gap-2 hover:text-[#059669] transition-colors"
            >
              <QrCode className="w-4 h-4" />
              {t('scanQrInstead')}
            </button>

            <button
              onClick={handleVerifyCode}
              disabled={isVerifying || !accessCode.trim()}
              className="w-full py-3 bg-[#10b981] text-white rounded-xl hover:bg-[#059669] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('verifying')}
                </>
              ) : (
                t('verifyAndJoin')
              )}
            </button>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-muted-foreground">{t('suggestedCommunities')}</h2>
          <div className="space-y-3">
            {suggestedCommunities.map((community) => {
              const isJoined = joinedCommunities.includes(community.id);
              return (
                <div
                  key={community.id}
                  className="bg-card border border-border rounded-2xl p-4 hover:border-[#10b981]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {community.id === 1 ? (
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm border border-border">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                          <path d="M32 6 A26 26 0 1 0 32 58 A26 26 0 0 0 56 38" fill="none" stroke="#008080" strokeWidth="7" strokeLinecap="round" />
                          <path d="M32 16 A16 16 0 1 0 32 48 A16 16 0 0 0 46 40" fill="none" stroke="#008080" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="32" cy="32" r="4.5" fill="#111" />
                        </svg>
                      </div>
                    ) : (
                      <BusinessLogo name={community.name} type={community.type} size="md" />
                    )}
                    <div className="flex-1">
                      <h3 className="mb-0.5">{community.name}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{community.members} {t('members')}</p>
                      <p className="text-xs text-muted-foreground">{community.description}</p>
                    </div>
                    <button
                      onClick={() => handleJoinCommunity(community.id)}
                      disabled={isJoined}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        isJoined
                          ? 'bg-[#10b981]/10 text-[#10b981] cursor-default'
                          : 'bg-[#10b981] text-white hover:bg-[#059669]'
                      }`}
                    >
                      {isJoined ? (
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">{t('applicationSubmitted')}</span>
                        </div>
                      ) : (
                        <span className="text-sm">{t('submitApplication')}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
