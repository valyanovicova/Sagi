import { useState } from 'react';
import { ChevronLeft, Search, UtensilsCrossed, GraduationCap, Sparkles, ShoppingBag, Building2, Dumbbell, HeartPulse, Plane, Calendar, CheckSquare, Briefcase, Newspaper } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { BusinessLogo } from './BusinessLogo';

type BizType = 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail' | 'hotel' | 'fitness' | 'healthcare' | 'travel';
type Tab = 'offers' | 'events' | 'tasks' | 'vacancies' | 'news';

interface Offer {
  id: number;
  business: string;
  offer: string;
  category: string;
  type: BizType;
  exclusive: boolean;
}

export function CategoryOffers() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('offers');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvped, setRsvped] = useState<Set<number>>(new Set());
  const [taskDone, setTaskDone] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'food', name: t('food'), icon: UtensilsCrossed },
    { id: 'hotel', name: t('hotel'), icon: Building2 },
    { id: 'beauty', name: t('beauty'), icon: Sparkles },
    { id: 'fitness', name: t('fitness'), icon: Dumbbell },
    { id: 'healthcare', name: t('healthcare'), icon: HeartPulse },
    { id: 'education', name: t('education'), icon: GraduationCap },
    { id: 'travel', name: t('travel'), icon: Plane },
    { id: 'retail', name: t('retail'), icon: ShoppingBag },
  ];

  const offers: Offer[] = [
    { id: 1, business: 'Master Coffee', offer: t('offer10OffBevFull'), category: 'food', type: 'cafe', exclusive: false },
    { id: 2, business: 'Chez Georges', offer: t('offer10OffFood'), category: 'food', type: 'restaurant', exclusive: true },
    { id: 3, business: 'One Cup', offer: t('offer20OffBar'), category: 'food', type: 'cafe', exclusive: false },
    { id: 4, business: 'Luckee Yu', offer: t('offerGiftVouchers'), category: 'food', type: 'restaurant', exclusive: true },
    { id: 5, business: 'Aula', offer: t('offer10OffFoodBar'), category: 'food', type: 'restaurant', exclusive: false },
    { id: 6, business: 'Laliko', offer: t('offer10OffFoodBar'), category: 'food', type: 'restaurant', exclusive: false },
    { id: 7, business: 'Kultura Diktuet', offer: t('offer10OffFoodDrinks'), category: 'food', type: 'restaurant', exclusive: false },
    { id: 8, business: 'Peak Buro', offer: t('offer10OffFoodDrinks'), category: 'food', type: 'cafe', exclusive: false },
    { id: 9, business: 'Lia Bistro', offer: t('offer10OffFoodDrinks'), category: 'food', type: 'restaurant', exclusive: false },
    { id: 10, business: 'Bella Ciao', offer: t('offer10OffFoodDrinks'), category: 'food', type: 'restaurant', exclusive: false },
    { id: 11, business: 'Wyndham Garden Astana', offer: t('offer15OffBestRate'), category: 'hotel', type: 'hotel', exclusive: true },
    { id: 12, business: 'Wyndham Garden Burabay', offer: t('offer10OffBestRate'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 13, business: 'Ramada by Wyndham Astana', offer: t('offer15OffBestRate'), category: 'hotel', type: 'hotel', exclusive: true },
    { id: 14, business: 'Sheraton Astana', offer: t('offerCorporateRate'), category: 'hotel', type: 'hotel', exclusive: true },
    { id: 15, business: 'Rixos Borovoe', offer: t('offerCorporateDiscount'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 16, business: 'Rixos Almaty', offer: t('offerCorporateDiscount'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 17, business: 'Beijing Palace', offer: t('offerCorporateDiscount'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 18, business: "Tör're Astana", offer: t('offer15OffStay'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 19, business: 'Hilton Astana', offer: t('offer10OffSpaRate'), category: 'hotel', type: 'hotel', exclusive: true },
    { id: 20, business: 'Lotte Hotels Moscow', offer: t('offerCorporateDiscount'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 21, business: 'Green Wellness Burabay', offer: t('offer10OffStay'), category: 'hotel', type: 'hotel', exclusive: false },
    { id: 22, business: 'Rafe Beauty Lounge', offer: t('offer10OffServices'), category: 'beauty', type: 'spa', exclusive: false },
    { id: 23, business: 'Anga Dental Clinic', offer: t('offer10to15OffDental'), category: 'beauty', type: 'healthcare', exclusive: false },
    { id: 24, business: 'Tulip Medicine', offer: t('offerCorporateDiscount'), category: 'beauty', type: 'healthcare', exclusive: false },
    { id: 25, business: 'Bronx Fitness', offer: t('offerCorporateDiscount'), category: 'fitness', type: 'fitness', exclusive: false },
    { id: 26, business: 'Nomad Golf Studio', offer: t('offer20to30Off'), category: 'fitness', type: 'fitness', exclusive: false },
    { id: 27, business: 'Invictus Go', offer: t('offerCorporateDiscount'), category: 'fitness', type: 'fitness', exclusive: false },
    { id: 28, business: 'Interteach', offer: t('offerInsurancePackages'), category: 'healthcare', type: 'healthcare', exclusive: false },
    { id: 29, business: 'International SOS', offer: t('offerCorporateDiscount'), category: 'healthcare', type: 'healthcare', exclusive: false },
    { id: 30, business: 'AIFC Academy', offer: t('offer10OffTraining'), category: 'education', type: 'education', exclusive: true },
    { id: 31, business: 'Coventry University Kazakhstan', offer: t('offerCorporateDiscount'), category: 'education', type: 'education', exclusive: false },
    { id: 32, business: 'Ardingly Astana', offer: t('offerCorporateDiscount'), category: 'education', type: 'education', exclusive: false },
    { id: 33, business: 'Nazarbayev University GSB', offer: t('offerCorporateDiscount'), category: 'education', type: 'education', exclusive: false },
    { id: 34, business: 'Canadian International School', offer: t('offer10OffTuition'), category: 'education', type: 'education', exclusive: false },
    { id: 35, business: 'Abadan Kindergarten', offer: t('offerDiscountEntrance'), category: 'education', type: 'education', exclusive: false },
    { id: 36, business: 'Air Astana', offer: t('offerCorporateDiscount'), category: 'travel', type: 'travel', exclusive: true },
    { id: 37, business: 'iTraveler.kz', offer: t('offerCorporateDiscount'), category: 'travel', type: 'travel', exclusive: false },
    { id: 38, business: 'Empire Travel', offer: t('offerCorporateDiscount'), category: 'travel', type: 'travel', exclusive: false },
    { id: 39, business: 'Intermark Relocation', offer: t('offer10OffRelocation'), category: 'travel', type: 'travel', exclusive: false },
    { id: 40, business: 'Ana Flowers', offer: t('offer10Off'), category: 'retail', type: 'retail', exclusive: false },
    { id: 41, business: 'Active Mobile Operator', offer: t('offerSpecialMobilePackage'), category: 'retail', type: 'retail', exclusive: false },
    { id: 42, business: 'Antal Kazakhstan', offer: t('offerCorporateDiscount'), category: 'retail', type: 'retail', exclusive: false },
  ];

  const events = [
    { id: 1, title: 'AIFC Morning Coffee', date: 'Thu, Apr 17 · 09:00', location: 'Master Coffee, AIFC Tower', type: 'cafe' as BizType },
    { id: 2, title: 'FinTech Seminar 2026', date: 'Fri, Apr 18 · 14:00', location: 'AIFC Academy, Room 3', type: 'education' as BizType },
    { id: 3, title: 'Networking Business Lunch', date: 'Sat, Apr 19 · 12:30', location: 'Chez Georges', type: 'restaurant' as BizType },
    { id: 4, title: 'Wellness Morning', date: 'Sun, Apr 20 · 08:00', location: 'Rafe Beauty Lounge', type: 'spa' as BizType },
  ];

  const tasks = [
    { id: 1, title: 'Attend 2 AIFC Events', reward: '+50 pts', done: false },
    { id: 2, title: 'Visit 3 Exclusive Partners', reward: '+30 pts', done: false },
    { id: 3, title: 'Complete your profile', reward: '+20 pts', done: true },
    { id: 4, title: 'Use an offer at Hilton Astana', reward: '+40 pts', done: false },
  ];

  const vacancies = [
    { id: 1, title: 'Financial Analyst', company: 'AIFC Authority', type: 'Full-time' },
    { id: 2, title: 'Legal Counsel', company: 'AIFC Court', type: 'Full-time' },
    { id: 3, title: 'Marketing Manager', company: 'Astana Hub', type: 'Contract' },
    { id: 4, title: 'UX Designer', company: 'Fintech startup', type: 'Part-time' },
  ];

  const newsPosts = [
    { id: 1, author: 'AIFC HR', time: '2h ago', text: 'New parking passes are available at reception. Please collect before Friday.' },
    { id: 2, author: 'AIFC Events', time: '5h ago', text: 'The Q2 Networking Breakfast is confirmed for April 17th. RSVP via the Events tab.' },
    { id: 3, author: 'AIFC Security', time: '1d ago', text: 'Reminder: tail-gating is prohibited. All guests must be registered at Gate A.' },
  ];

  const filteredOffers = offers.filter((o) => {
    const matchCat = selectedCategory === 'all' || o.category === selectedCategory;
    const matchSearch = o.business.toLowerCase().includes(searchQuery.toLowerCase()) || o.offer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const tabs: { key: Tab; label: string; icon: typeof Calendar }[] = [
    { key: 'offers', label: t('offers'), icon: ShoppingBag },
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'tasks', label: 'Tasks', icon: CheckSquare },
    { key: 'vacancies', label: 'Vacancies', icon: Briefcase },
    { key: 'news', label: 'News', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* Header */}
      <div className="bg-gradient-to-b from-[#071c12] to-[#0d3d26] px-4 pt-4 pb-5">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <Link to="/user" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white mb-4">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          {/* Centered icon + name */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-2 shadow-lg p-2">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                {/* Outer teal C-arc */}
                <path
                  d="M32 6 A26 26 0 1 0 32 58 A26 26 0 0 0 56 38"
                  fill="none"
                  stroke="#008080"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {/* Inner teal C-arc */}
                <path
                  d="M32 16 A16 16 0 1 0 32 48 A16 16 0 0 0 46 40"
                  fill="none"
                  stroke="#008080"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Center dot */}
                <circle cx="32" cy="32" r="4.5" fill="#111" />
              </svg>
            </div>
            <h1 className="text-white font-bold text-lg leading-tight">AIFC</h1>
            <p className="text-white/60 text-xs mt-0.5">570 {t('members')} · 42 {t('businesses')}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-md mx-auto px-4 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed">{t('aifcDescription')}</p>
      </div>

      {/* Tab switcher — sticky */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                onClick={() => { setTab(tb.key); setSearchQuery(''); setSelectedCategory('all'); }}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                  tab === tb.key ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tb.icon className="w-3.5 h-3.5" />
                {tb.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">

        {/* OFFERS TAB */}
        {tab === 'offers' && (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchOffers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input-background rounded-xl border border-border focus:border-[#10b981] focus:outline-none transition-colors text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mb-3">
              <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-colors flex-shrink-0 ${selectedCategory === 'all' ? 'bg-[#10b981] text-white' : 'bg-input-background text-foreground'}`}>{t('all')}</button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-colors flex-shrink-0 ${selectedCategory === cat.id ? 'bg-[#10b981] text-white' : 'bg-input-background text-foreground'}`}>
                    <Icon className="w-3.5 h-3.5" />{cat.name}
                  </button>
                );
              })}
            </div>
            <div className="space-y-3">
              {filteredOffers.map((offer) => (
                <Link key={offer.id} to={`/user/offer/${offer.id}`} className="block bg-card border border-border rounded-2xl p-4 hover:border-[#10b981] transition-colors">
                  <div className="flex gap-3">
                    <BusinessLogo name={offer.business} type={offer.type} size="lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="truncate text-sm font-semibold">{offer.business}</h3>
                        {offer.exclusive && (
                          <span className="text-xs px-2 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full whitespace-nowrap flex-shrink-0">{t('exclusive')}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{offer.offer}</p>
                      <span className="inline-flex items-center text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full">{t('active')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* EVENTS TAB */}
        {tab === 'events' && (
          <div className="space-y-3">
            {events.map((ev) => {
              const gone = rsvped.has(ev.id);
              return (
                <div key={ev.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-0.5">{ev.title}</p>
                      <p className="text-xs text-muted-foreground mb-0.5">{ev.date}</p>
                      <p className="text-xs text-muted-foreground">{ev.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setRsvped(prev => { const s = new Set(prev); gone ? s.delete(ev.id) : s.add(ev.id); return s; })}
                    className={`mt-3 w-full py-2 rounded-xl text-sm font-medium transition-colors ${gone ? 'bg-[#10b981] text-white' : 'bg-[#10b981]/10 text-[#10b981]'}`}
                  >
                    {gone ? t('rsvped') : t('rsvp')}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TASKS TAB */}
        {tab === 'tasks' && (
          <div className="space-y-3">
            {tasks.map((task) => {
              const done = taskDone.has(task.id) || task.done;
              return (
                <div key={task.id} className={`bg-card border rounded-2xl p-4 flex items-center gap-3 ${done ? 'border-[#10b981]/30 opacity-70' : 'border-border'}`}>
                  <button
                    onClick={() => !task.done && setTaskDone(prev => { const s = new Set(prev); done ? s.delete(task.id) : s.add(task.id); return s; })}
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${done ? 'bg-[#10b981] border-[#10b981]' : 'border-muted-foreground'}`}
                  >
                    {done && <span className="text-white text-xs">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${done ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full whitespace-nowrap">{task.reward}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* VACANCIES TAB */}
        {tab === 'vacancies' && (
          <div className="space-y-3">
            {vacancies.map((v) => (
              <div key={v.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{v.title}</p>
                  <p className="text-xs text-muted-foreground">{v.company}</p>
                </div>
                <span className="text-xs px-2 py-0.5 bg-input-background text-muted-foreground rounded-full whitespace-nowrap">{v.type}</span>
              </div>
            ))}
          </div>
        )}

        {/* NEWS TAB */}
        {tab === 'news' && (
          <div className="space-y-3">
            {newsPosts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#10b981]">{post.author.slice(0, 2)}</span>
                    </div>
                    <p className="text-xs font-semibold">{post.author}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{post.time}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.text}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
