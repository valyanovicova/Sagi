import { ChevronLeft, HelpCircle, QrCode, Check, Loader2, Search, X, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { BusinessLogo } from './BusinessLogo';
import { useState, useMemo } from 'react';

export function JoinCommunity() {
  const { t } = useLanguage();
  const [accessCode, setAccessCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState<string | null>(null);
  const [filterInterest, setFilterInterest] = useState<string | null>(null);

  const allCommunities = [
    { id: 1,  name: t('aifcName'),           communityId: 'AIFC-001', type: 'office' as const, members: 570, city: 'Astana',  tags: ['FinTech', 'PropTech', 'Investment'], description: t('aifcDescription') },
    { id: 2,  name: 'Tech Hub KZ',            communityId: 'TECH-002', type: 'office' as const, members: 320, city: 'Astana',  tags: ['Tech', 'AI', 'Startup'],             description: 'A community for tech professionals in Kazakhstan.' },
    { id: 3,  name: 'Startup Connect',        communityId: 'STRT-003', type: 'office' as const, members: 145, city: 'Almaty', tags: ['Startup', 'Networking', 'Investment'], description: 'Connecting startup founders and entrepreneurs.' },
    { id: 4,  name: 'PropTech Almaty',        communityId: 'PRPT-004', type: 'office' as const, members: 210, city: 'Almaty', tags: ['PropTech', 'Real Estate', 'B2B'],    description: 'Real estate and property technology professionals in Almaty.' },
    { id: 5,  name: 'Green Build KZ',         communityId: 'GRBLD-05', type: 'office' as const, members: 88,  city: 'Astana', tags: ['ESG', 'Construction', 'PropTech'],   description: 'Sustainable architecture and green building community.' },
    { id: 6,  name: 'Almaty VC Circle',       communityId: 'ALVC-006', type: 'office' as const, members: 64,  city: 'Almaty', tags: ['Investment', 'VC', 'FinTech'],       description: 'Investors and analysts exploring early-stage deals in KZ.' },
    { id: 7,  name: 'Smart City Astana',      communityId: 'SMCT-007', type: 'office' as const, members: 175, city: 'Astana', tags: ['Tech', 'Urban', 'AI'],               description: 'Urban technology and smart infrastructure community.' },
    { id: 8,  name: 'Design & UX Kazakhstan', communityId: 'DSUX-008', type: 'office' as const, members: 230, city: 'Almaty', tags: ['Design', 'Tech', 'Startup'],         description: 'Designers and UX practitioners building better products in KZ.' },
    { id: 9,  name: 'RE Developers Network',  communityId: 'REDN-009', type: 'office' as const, members: 312, city: 'Astana', tags: ['Real Estate', 'Construction', 'B2B'], description: 'Residential and commercial real estate developers in Astana.' },
    { id: 10, name: 'Fintech Founders KZ',    communityId: 'FFTD-010', type: 'office' as const, members: 98,  city: 'Almaty', tags: ['FinTech', 'Startup', 'AI'],          description: 'Founders and product leads building financial technology.' },
  ];

  const CITIES = ['Astana', 'Almaty'];
  const INTERESTS = ['PropTech', 'FinTech', 'Startup', 'Tech', 'AI', 'Real Estate', 'Investment', 'ESG', 'Design', 'Construction', 'Urban', 'B2B', 'Networking', 'VC'];

  const visibleCommunities = useMemo(() => {
    return allCommunities.filter(c => {
      if (filterCity && c.city !== filterCity) return false;
      if (filterInterest && !c.tags.includes(filterInterest)) return false;
      const q = searchQuery.trim().toLowerCase();
      if (q) return c.name.toLowerCase().includes(q) || c.communityId.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
      return true;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterCity, filterInterest, t]);


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

        <div className="mb-5">
          <label className="block text-sm text-muted-foreground mb-2">{t('searchCommunity')}</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchCommunityPlaceholder')}
              className="w-full pl-10 pr-10 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Filters */}
        <div className="mb-5 space-y-3">
          {/* City filter */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>City</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              <button
                onClick={() => setFilterCity(null)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterCity === null ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-muted-foreground border-border hover:border-[#10b981]/50'}`}
              >
                All
              </button>
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setFilterCity(filterCity === city ? null : city)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterCity === city ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-muted-foreground border-border hover:border-[#10b981]/50'}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Interest filter */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Interests</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              <button
                onClick={() => setFilterInterest(null)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterInterest === null ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-muted-foreground border-border hover:border-[#10b981]/50'}`}
              >
                All
              </button>
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => setFilterInterest(filterInterest === interest ? null : interest)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterInterest === interest ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-muted-foreground border-border hover:border-[#10b981]/50'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Community list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-muted-foreground text-sm">{visibleCommunities.length} communities</h2>
            {(filterCity || filterInterest) && (
              <button onClick={() => { setFilterCity(null); setFilterInterest(null); }} className="text-xs text-[#10b981] flex items-center gap-1">
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
          <div className="space-y-3">
            {visibleCommunities.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No communities match your filters</p>
            )}
            {visibleCommunities.map((community) => {
              const isJoined = joinedCommunities.includes(community.id);
              return (
                <div key={community.id} className="bg-card border border-border rounded-2xl p-4 hover:border-[#10b981]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    {community.id === 1 ? (
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm border border-border">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                          <path d="M32 6 A26 26 0 1 0 32 58 A26 26 0 0 0 56 38" fill="none" stroke="#008080" strokeWidth="7" strokeLinecap="round" />
                          <path d="M32 16 A16 16 0 1 0 32 48 A16 16 0 0 0 46 40" fill="none" stroke="#008080" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="32" cy="32" r="4.5" fill="#111" />
                        </svg>
                      </div>
                    ) : (
                      <BusinessLogo name={community.name} type={community.type} size="sm" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold leading-tight">{community.name}</h3>
                        <button
                          onClick={() => handleJoinCommunity(community.id)}
                          disabled={isJoined}
                          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isJoined ? 'bg-[#10b981]/10 text-[#10b981] cursor-default' : 'bg-[#10b981] text-white hover:bg-[#059669]'}`}
                        >
                          {isJoined ? <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Joined</span> : t('submitApplication')}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{community.city}</span>
                        <span>·</span>
                        <span>{community.members} {t('members')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{community.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {community.tags.map(tag => (
                          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${filterInterest === tag ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40' : 'bg-muted/40 text-muted-foreground border-transparent'}`}
                            onClick={() => setFilterInterest(filterInterest === tag ? null : tag)}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
