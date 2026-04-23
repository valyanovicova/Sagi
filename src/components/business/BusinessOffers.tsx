import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, MapPin, Tag, Check, Users, X, Search } from 'lucide-react';
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

interface Community {
  id: number;
  name: string;
  city: string;
  sphere: string;
  tags: string[];
  members: number;
  description: string;
  joined: boolean;
}

const COMMUNITIES: Community[] = [
  { id: 1,  name: 'AIFC',                   city: 'Astana',  sphere: 'Finance',       tags: ['FinTech', 'PropTech', 'Investment'], members: 570, description: 'The Astana International Financial Centre — a financial hub and special economic zone.', joined: true },
  { id: 2,  name: 'Tech Hub KZ',             city: 'Astana',  sphere: 'Tech',          tags: ['Tech', 'AI', 'Startup'],             members: 320, description: 'A community for tech professionals and innovators in Kazakhstan.', joined: false },
  { id: 3,  name: 'Startup Connect',         city: 'Almaty', sphere: 'Startup',       tags: ['Startup', 'Networking', 'VC'],       members: 145, description: 'Connecting startup founders, investors and early adopters.', joined: false },
  { id: 4,  name: 'PropTech Almaty',         city: 'Almaty', sphere: 'Real Estate',   tags: ['PropTech', 'Real Estate', 'B2B'],    members: 210, description: 'Real estate and property technology professionals in Almaty.', joined: false },
  { id: 5,  name: 'Green Build KZ',          city: 'Astana',  sphere: 'Construction',  tags: ['ESG', 'Construction', 'PropTech'],   members: 88,  description: 'Sustainable architecture and green building community.', joined: false },
  { id: 6,  name: 'Almaty VC Circle',        city: 'Almaty', sphere: 'Finance',       tags: ['Investment', 'VC', 'FinTech'],       members: 64,  description: 'Investors and analysts exploring early-stage deals in Kazakhstan.', joined: false },
  { id: 7,  name: 'Smart City Astana',       city: 'Astana',  sphere: 'Tech',          tags: ['Tech', 'Urban', 'AI'],               members: 175, description: 'Urban technology and smart infrastructure community.', joined: false },
  { id: 8,  name: 'Design & UX Kazakhstan',  city: 'Almaty', sphere: 'Design',        tags: ['Design', 'Tech', 'Startup'],         members: 230, description: 'Designers and UX practitioners building better products in KZ.', joined: false },
  { id: 9,  name: 'RE Developers Network',   city: 'Astana',  sphere: 'Real Estate',   tags: ['Real Estate', 'Construction', 'B2B'], members: 312, description: 'Residential and commercial real estate developers in Astana.', joined: false },
  { id: 10, name: 'Fintech Founders KZ',     city: 'Almaty', sphere: 'Finance',       tags: ['FinTech', 'Startup', 'AI'],          members: 98,  description: 'Founders and product leads building financial technology.', joined: false },
  { id: 11, name: 'Horeca KZ',               city: 'Almaty', sphere: 'F&B',           tags: ['Food', 'Hospitality', 'B2B'],        members: 260, description: 'Hotel, restaurant and café owners sharing best practices.', joined: false },
  { id: 12, name: 'Wellness Hub Astana',     city: 'Astana',  sphere: 'Health',        tags: ['Health', 'Fitness', 'Lifestyle'],    members: 140, description: 'Fitness, spa and wellness businesses and their communities.', joined: false },
];

const CITIES = ['Astana', 'Almaty'];
const SPHERES = ['Finance', 'Tech', 'Startup', 'Real Estate', 'Construction', 'Design', 'F&B', 'Health'];

export function BusinessOffers() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'offers' | 'communities'>('offers');

  // Offers state
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

  // Communities state
  const [communities, setCommunities] = useState<Community[]>(COMMUNITIES);
  const [filterCity, setFilterCity] = useState<string | null>(null);
  const [filterSphere, setFilterSphere] = useState<string | null>(null);
  const [communitySearch, setCommunitySearch] = useState('');

  const toggleJoin = (id: number) => {
    setCommunities(prev => prev.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };

  const visibleCommunities = communities.filter(c => {
    if (filterCity && c.city !== filterCity) return false;
    if (filterSphere && c.sphere !== filterSphere) return false;
    if (communitySearch.trim()) {
      const q = communitySearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.sphere.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold">{tab === 'offers' ? t('myOffers') : 'Communities'}</h1>
            {tab === 'offers' && (
              <Link to="/business/offers/new" className="w-9 h-9 rounded-xl bg-[#10b981] flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </Link>
            )}
          </div>
          {/* Tab switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => setTab('offers')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${tab === 'offers' ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}
            >
              {t('myOffers')}
            </button>
            <button
              onClick={() => setTab('communities')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${tab === 'communities' ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}
            >
              Communities
            </button>
          </div>
        </div>
      </div>

      {/* ── Offers tab ── */}
      {tab === 'offers' && (
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
                      onClick={(e) => { e.preventDefault(); toggleActive(offer.id); }}
                      className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${offer.active ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-input-background text-muted-foreground'}`}
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
      )}

      {/* ── Communities tab ── */}
      {tab === 'communities' && (
        <div className="max-w-md mx-auto px-4 py-4">

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search communities..."
              value={communitySearch}
              onChange={e => setCommunitySearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors text-sm"
            />
            {communitySearch && (
              <button onClick={() => setCommunitySearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City filter */}
          <div className="mb-3">
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

          {/* Sphere filter */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Sphere</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              <button
                onClick={() => setFilterSphere(null)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterSphere === null ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-muted-foreground border-border hover:border-[#10b981]/50'}`}
              >
                All
              </button>
              {SPHERES.map(sphere => (
                <button
                  key={sphere}
                  onClick={() => setFilterSphere(filterSphere === sphere ? null : sphere)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterSphere === sphere ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-muted-foreground border-border hover:border-[#10b981]/50'}`}
                >
                  {sphere}
                </button>
              ))}
            </div>
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">{visibleCommunities.length} communities</span>
            {(filterCity || filterSphere) && (
              <button onClick={() => { setFilterCity(null); setFilterSphere(null); }} className="text-xs text-[#10b981] flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Community list */}
          <div className="space-y-3">
            {visibleCommunities.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No communities match your filters</p>
            )}
            {visibleCommunities.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-2xl p-4 hover:border-[#10b981]/50 transition-colors">
                <div className="flex items-start gap-3">
                  {c.id === 1 ? (
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm border border-border">
                      <svg viewBox="0 0 64 64" className="w-full h-full">
                        <path d="M32 6 A26 26 0 1 0 32 58 A26 26 0 0 0 56 38" fill="none" stroke="#008080" strokeWidth="7" strokeLinecap="round" />
                        <path d="M32 16 A16 16 0 1 0 32 48 A16 16 0 0 0 46 40" fill="none" stroke="#008080" strokeWidth="5" strokeLinecap="round" />
                        <circle cx="32" cy="32" r="4.5" fill="#111" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center flex-shrink-0 text-[#10b981] font-bold text-sm">
                      {c.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold leading-tight">{c.name}</h3>
                      <button
                        onClick={() => toggleJoin(c.id)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${c.joined ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#10b981] text-white hover:bg-[#059669]'}`}
                      >
                        {c.joined ? <span className="flex items-center gap-1"><Check className="w-3 h-3" />Joined</span> : 'Join'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{c.city}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{c.members}</span>
                      <span>·</span>
                      <span>{c.sphere}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{c.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map(tag => (
                        <span
                          key={tag}
                          onClick={() => setFilterSphere(filterSphere === c.sphere ? null : c.sphere)}
                          className={`text-[10px] px-2 py-0.5 rounded-full border cursor-pointer transition-colors ${filterSphere === c.sphere ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40' : 'bg-muted/40 text-muted-foreground border-transparent'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
