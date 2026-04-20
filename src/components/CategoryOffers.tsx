import { useState, useRef } from 'react';
import { ChevronLeft, Search, UtensilsCrossed, GraduationCap, Sparkles, ShoppingBag, Building2, Dumbbell, HeartPulse, Plane, Calendar, CheckSquare, Briefcase, Newspaper, Camera } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { BusinessLogo } from './BusinessLogo';

interface NewsPost {
  id: number;
  author: string;
  time: string;
  text: string;
  image: string;
  attendees: { name: string; initials: string; color: string }[];
}

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
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [tab, setTab] = useState<Tab>('offers');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [rsvped, setRsvped] = useState<Set<number>>(new Set());
  const [taskDone, setTaskDone] = useState<Set<number>>(new Set());
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

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
    {
      id: 1, title: 'AIFC Morning Coffee', date: 'Thu, Apr 17 · 09:00', location: 'Master Coffee, AIFC Tower', type: 'cafe' as BizType,
      friendsGoing: [
        { name: 'Kamila D.', initials: 'KD', color: '#f06ac8' },
        { name: 'Arman K.', initials: 'AK', color: '#6aaff0' },
        { name: 'Aizat B.', initials: 'AB', color: '#7c6af0' },
      ],
    },
    {
      id: 2, title: 'FinTech Seminar 2026', date: 'Fri, Apr 18 · 14:00', location: 'AIFC Academy, Room 3', type: 'education' as BizType,
      friendsGoing: [
        { name: 'Daniyar S.', initials: 'DS', color: '#f06a6a' },
        { name: 'Farida B.', initials: 'FB', color: '#f06a80' },
      ],
    },
    {
      id: 3, title: 'Networking Business Lunch', date: 'Sat, Apr 19 · 12:30', location: 'Chez Georges', type: 'restaurant' as BizType,
      friendsGoing: [
        { name: 'Madina I.', initials: 'MI', color: '#c86af0' },
        { name: 'Ruslan A.', initials: 'RA', color: '#6af0e0' },
        { name: 'Zarina S.', initials: 'ZS', color: '#f0c86a' },
        { name: 'Almas D.', initials: 'AD', color: '#f0a06a' },
      ],
    },
    {
      id: 4, title: 'Wellness Morning', date: 'Sun, Apr 20 · 08:00', location: 'Rafe Beauty Lounge', type: 'spa' as BizType,
      friendsGoing: [],
    },
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

  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([
    {
      id: 1, author: 'AIFC HR', time: '2h ago',
      text: 'New parking passes are available at reception. Please collect before Friday.',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
      attendees: [],
    },
    {
      id: 2, author: 'AIFC Events', time: '5h ago',
      text: 'The Q2 Networking Breakfast is confirmed for April 17th. RSVP via the Events tab.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
      attendees: [
        { name: 'Kamila D.', initials: 'KD', color: '#f06ac8' },
        { name: 'Arman K.', initials: 'AK', color: '#6aaff0' },
        { name: 'Aizat B.', initials: 'AB', color: '#7c6af0' },
        { name: 'Daniyar S.', initials: 'DS', color: '#f06a6a' },
      ],
    },
    {
      id: 3, author: 'AIFC Security', time: '1d ago',
      text: 'Reminder: tail-gating is prohibited. All guests must be registered at Gate A.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80',
      attendees: [],
    },
  ]);

  const handlePhotoChange = (postId: number, file: File) => {
    const url = URL.createObjectURL(file);
    setNewsPosts(prev => prev.map(p => p.id === postId ? { ...p, image: url } : p));
  };

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

      {/* Tab switcher — 2-column grid */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 pt-3 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tb, idx) => {
              const isLastOdd = tabs.length % 2 !== 0 && idx === tabs.length - 1;
              return (
                <button
                  key={tb.key}
                  onClick={() => { setTab(tb.key); setSearchQuery(''); setSelectedCategory('all'); setFilterValue('all'); }}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isLastOdd ? 'col-span-2' : ''} ${
                    tab === tb.key
                      ? 'bg-[#10b981] text-white'
                      : 'bg-input-background text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tb.icon className="w-3.5 h-3.5" />
                  {tb.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <div className="max-w-md mx-auto px-4 py-4">

        {/* EVENTS filter */}
        {tab === 'events' && (
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {['All','Café','Education','Restaurant','Wellness'].map((label) => {
              const id = label === 'All' ? 'all' : label === 'Café' ? 'cafe' : label === 'Education' ? 'education' : label === 'Restaurant' ? 'restaurant' : 'spa';
              return (
                <button key={id} onClick={() => setFilterValue(id)}
                  className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex-shrink-0 transition-colors ${filterValue === id ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}>
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* TASKS filter */}
        {tab === 'tasks' && (
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {[{id:'all',label:'All'},{id:'pending',label:'Pending'},{id:'completed',label:'Completed'}].map(chip => (
              <button key={chip.id} onClick={() => setFilterValue(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex-shrink-0 transition-colors ${filterValue === chip.id ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}>
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* VACANCIES filter */}
        {tab === 'vacancies' && (
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {[{id:'all',label:'All'},{id:'Full-time',label:'Full-time'},{id:'Contract',label:'Contract'},{id:'Part-time',label:'Part-time'}].map(chip => (
              <button key={chip.id} onClick={() => setFilterValue(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex-shrink-0 transition-colors ${filterValue === chip.id ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}>
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* NEWS filter */}
        {tab === 'news' && (
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {[{id:'all',label:'All'},{id:'HR',label:'HR'},{id:'Events',label:'Events'},{id:'Security',label:'Security'}].map(chip => (
              <button key={chip.id} onClick={() => setFilterValue(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex-shrink-0 transition-colors ${filterValue === chip.id ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}>
                {chip.label}
              </button>
            ))}
          </div>
        )}

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
            <div className="grid grid-cols-2 gap-3">
              {filteredOffers.map((offer) => (
                <Link key={offer.id} to={`/user/offer/${offer.id}`} className="flex flex-col bg-card border border-border rounded-2xl p-3 hover:border-[#10b981] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <BusinessLogo name={offer.business} type={offer.type} size="md" />
                    {offer.exclusive && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full whitespace-nowrap leading-tight">{t('exclusive')}</span>
                    )}
                  </div>
                  <h3 className="text-xs font-semibold leading-tight mb-1 line-clamp-1">{offer.business}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-1">{offer.offer}</p>
                  <span className="inline-flex items-center text-[10px] px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full self-start">{t('active')}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* EVENTS TAB */}
        {tab === 'events' && (
          <div className="space-y-3">
            {events.filter(ev => filterValue === 'all' || ev.type === filterValue).map((ev) => {
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

                  {/* Friends going */}
                  {ev.friendsGoing.length > 0 && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex -space-x-2">
                        {ev.friendsGoing.slice(0, 4).map((f) => (
                          <div
                            key={f.initials + f.name}
                            title={f.name}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-card"
                            style={{ background: f.color + '30', color: f.color, borderColor: 'var(--card)' }}
                          >
                            {f.initials}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-foreground font-medium">
                          {ev.friendsGoing.slice(0, 2).map(f => f.name.split(' ')[0]).join(', ')}
                        </span>
                        {ev.friendsGoing.length > 2 && ` +${ev.friendsGoing.length - 2} more`}
                        {' '}going
                      </p>
                    </div>
                  )}

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
            {tasks.filter(task => {
              const done = taskDone.has(task.id) || task.done;
              if (filterValue === 'pending') return !done;
              if (filterValue === 'completed') return done;
              return true;
            }).map((task) => {
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
            {vacancies.filter(v => filterValue === 'all' || v.type === filterValue).map((v) => (
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
            {newsPosts.filter(post => filterValue === 'all' || post.author.includes(filterValue)).map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Photo with admin edit overlay */}
                <div className="relative">
                  {post.image && (
                    <img src={post.image} alt="" className="w-full h-44 object-cover" />
                  )}
                  {isAdmin && (
                    <>
                      <input
                        ref={el => { fileInputRefs.current[post.id] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handlePhotoChange(post.id, file);
                          e.target.value = '';
                        }}
                      />
                      <button
                        onClick={() => fileInputRefs.current[post.id]?.click()}
                        className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        Change photo
                      </button>
                    </>
                  )}
                </div>

                <div className="p-4">
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

                  {/* Who's coming */}
                  {post.attendees.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <div className="flex -space-x-2">
                        {post.attendees.slice(0, 5).map((a) => (
                          <div
                            key={a.name}
                            title={a.name}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border-2"
                            style={{ background: a.color + '30', color: a.color, borderColor: 'var(--card)' }}
                          >
                            {a.initials}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-foreground font-medium">
                          {post.attendees.slice(0, 2).map(a => a.name.split(' ')[0]).join(', ')}
                        </span>
                        {post.attendees.length > 2 && ` +${post.attendees.length - 2} more`}
                        {' '}going
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
