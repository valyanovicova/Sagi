import { useState } from 'react';
import { ChevronLeft, Search, Star, ShoppingBag, Repeat2, Gift, Zap, X } from 'lucide-react';
import { Link } from 'react-router';

const HANI_GRADIENT = 'linear-gradient(135deg, #F5C400 0%, #E6A800 50%, #CC8F00 100%)';
const HANI_DARK_BG  = 'linear-gradient(to bottom, #3A2E00, #1A1500)';

type Tab = 'bonuses' | 'offers' | 'cross';

const USER = { bonuses: 1240, cashback: 5.0 };

const CATEGORIES = [
  { id: 'cake',     name: 'Торты' },
  { id: 'coffee',   name: 'Кофе' },
  { id: 'dessert',  name: 'Десерты' },
  { id: 'drinks',   name: 'Напитки' },
  { id: 'catering', name: 'Кейтеринг' },
];

const OFFERS = [
  { id: 1, title: '-20% на всё меню', business: 'Hani Kitchen', category: 'cake' },
  { id: 2, title: 'Кофе в подарок',   business: 'Hani Café',    category: 'coffee' },
];

const BUSINESSES = [
  { name: 'Hani Kitchen',   category: 'cake',     label: 'Торты' },
  { name: 'Hani Café',      category: 'coffee',   label: 'Кофе' },
  { name: 'Hani Desserts',  category: 'dessert',  label: 'Десерты' },
  { name: 'Hani Express',   category: 'drinks',   label: 'Напитки' },
  { name: 'Hani Central',   category: 'cake',     label: 'Торты' },
  { name: 'Hani Bakery',    category: 'dessert',  label: 'Десерты' },
  { name: 'Hani Brew',      category: 'coffee',   label: 'Кофе' },
  { name: 'Hani Sweet',     category: 'cake',     label: 'Торты' },
  { name: 'Hani Lounge',    category: 'drinks',   label: 'Напитки' },
  { name: 'Hani Events',    category: 'catering', label: 'Кейтеринг' },
];

const CROSS_BONUSES = [
  { id: 1, name: 'Chez Georges',  category: 'Ресторан',    bonus: '3%', color: '#CC8F00', bg: '#FFF9E0', icon: '🍽' },
  { id: 2, name: 'Rafe Beauty',   category: 'Спа',         bonus: '5%', color: '#E040FB', bg: '#FCE4EC', icon: '💆' },
  { id: 3, name: 'Ana Flowers',   category: 'Ретейл',      bonus: '2%', color: '#FF6D00', bg: '#FFF3E0', icon: '💐' },
  { id: 4, name: 'Master Coffee', category: 'Кофейня',     bonus: '4%', color: '#00BCD4', bg: '#E0F7FA', icon: '☕' },
  { id: 5, name: 'Bronx Fitness', category: 'Фитнес',      bonus: '3%', color: '#43A047', bg: '#E8F5E9', icon: '💪' },
  { id: 6, name: 'AIFC Academy',  category: 'Образование', bonus: '2%', color: '#F4511E', bg: '#FBE9E7', icon: '🎓' },
];

const TABS: { key: Tab; label: string; icon: typeof ShoppingBag }[] = [
  { key: 'bonuses', label: 'Мои бонусы',   icon: Star },
  { key: 'offers',  label: 'Офферы',        icon: ShoppingBag },
  { key: 'cross',   label: 'Кросс бонусы', icon: Repeat2 },
];

export function HaniCommunity() {
  const [tab, setTab]                    = useState<Tab>('bonuses');
  const [searchQuery, setSearchQuery]    = useState('');
  const [selectedCategory, setCategory] = useState('all');
  const [showBusinesses, setShowBusinesses] = useState(false);
  const [bizSearch, setBizSearch]           = useState('');
  const [bizCategory, setBizCategory]       = useState('all');

  const filteredOffers = OFFERS.filter(o => {
    const matchCat    = selectedCategory === 'all' || o.category === selectedCategory;
    const matchSearch = o.business.toLowerCase().includes(searchQuery.toLowerCase()) || o.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredBiz = BUSINESSES.filter(b =>
    (bizCategory === 'all' || b.category === bizCategory) &&
    b.name.toLowerCase().includes(bizSearch.toLowerCase())
  );

  const tabStyle = (key: Tab) => tab === key ? { background: HANI_GRADIENT } : {};
  const tabClass = (key: Tab, extra = '') =>
    `flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${extra} ${
      tab === key ? 'text-[#1A1500]' : 'bg-input-background text-muted-foreground hover:text-foreground'
    }`;
  const chipStyle = (active: boolean) => active ? { background: HANI_GRADIENT } : {};
  const chipClass = (active: boolean) =>
    `px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
      active ? 'text-[#1A1500]' : 'bg-input-background text-foreground'
    }`;

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* ─── HEADER ─── */}
      <div className="px-4 pt-4 pb-5" style={{ background: HANI_DARK_BG }}>
        <div className="max-w-md mx-auto">
          <Link to="/user" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white mb-4">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden mb-2 shadow-lg flex items-center justify-center p-1.5">
              <img src="/hani.jpeg" alt="hani" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h1 className="text-white font-bold text-lg leading-tight">hani</h1>
            <p className="text-white/70 text-xs mt-0.5 font-medium">Сеть кондитерских-кофеен в Астане</p>
            <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
              <Link
                to="/user/network?community=hani"
                className="hover:text-white transition-colors"
              >
                1 840 участников
              </Link>
              <span>·</span>
              <button
                onClick={() => setShowBusinesses(true)}
                className="hover:text-white transition-colors"
              >
                10 партнёров
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* ─── DESCRIPTION ─── */}
      <div className="max-w-md mx-auto px-4 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Hani - сладкий путь к успеху. Сеть кондитерских в Астане, покорившая всех своими фирменными тортами и десертами.
        </p>
      </div>

      {/* ─── TABS ─── */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 pt-3 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {TABS.map((tb, idx) => {
              const isLastOdd = TABS.length % 2 !== 0 && idx === TABS.length - 1;
              return (
                <button
                  key={tb.key}
                  onClick={() => { setTab(tb.key); setSearchQuery(''); setCategory('all'); }}
                  className={tabClass(tb.key, isLastOdd ? 'col-span-2' : '')}
                  style={tabStyle(tb.key)}
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

        {/* ══ МОИ БОНУСЫ ══ */}
        {tab === 'bonuses' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-card border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={15} className="text-yellow-500" fill="currentColor" />
                  <span className="text-sm font-bold">Уровень: Silver</span>
                </div>
                <span className="text-xs text-muted-foreground">760 / 2000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full" style={{ width: '38%', background: HANI_GRADIENT }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Ещё 1 240 бонусов до уровня Gold - кэшбэк вырастет до 7%
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden p-5" style={{ background: HANI_GRADIENT, color: '#1A1500' }}>
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-black/5" />
              <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-black/5" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <img src="/hani.jpeg" alt="hani" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-black">hani</span>
                </div>
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-5xl font-black tracking-tight">{USER.bonuses.toLocaleString()}</span>
                  <span className="text-lg font-semibold opacity-60 mb-1">бонусов</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="bg-black/10 rounded-lg px-2.5 py-1 text-xs font-bold">{USER.cashback}% кэшбэк</div>
                  <div className="bg-black/10 rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1">
                    <Zap size={10} />Активен
                  </div>
                </div>
              </div>
              <div className="absolute right-5 bottom-4 text-5xl opacity-80 select-none">🐙</div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Заработано', value: '3 200' },
                { label: 'Потрачено',  value: '1 960' },
                { label: 'Истекает',   value: '15 мая' },
              ].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-3 text-center">
                  <div className="text-base font-black text-foreground">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ОФФЕРЫ ══ */}
        {tab === 'offers' && (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск офферов..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input-background rounded-xl border border-border focus:border-[#CC8F00] focus:outline-none transition-colors text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mb-3">
              <button onClick={() => setCategory('all')} className={chipClass(selectedCategory === 'all')} style={chipStyle(selectedCategory === 'all')}>Все</button>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setCategory(cat.id)} className={chipClass(selectedCategory === cat.id)} style={chipStyle(selectedCategory === cat.id)}>
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {filteredOffers.map(offer => (
                <Link key={offer.id} to="/user/offer/1" className="flex flex-col bg-card border border-border rounded-2xl p-3 hover:border-[#CC8F00] transition-colors">
                  <div className="w-10 h-10 rounded-xl overflow-hidden mb-2 flex-shrink-0">
                    <img src="/hani.jpeg" alt="hani" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xs font-semibold leading-tight mb-1 line-clamp-1">{offer.business}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-1">{offer.title}</p>
                  <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full self-start" style={{ background: '#CC8F0020', color: '#CC8F00' }}>
                    Активен
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ══ КРОСС БОНУСЫ ══ */}
        {tab === 'cross' && (
          <>
            <div className="rounded-2xl bg-card border border-border p-4 flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <Gift size={16} className="text-yellow-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground mb-0.5">Как это работает?</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Оплачивай у партнёров hani и получай кросс-бонусы на свой счёт. Бонусы суммируются и не сгорают.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {CROSS_BONUSES.map(b => (
                <div
                  key={b.id}
                  className="rounded-2xl p-3 flex flex-col items-center gap-2 cursor-pointer border border-transparent hover:border-yellow-300 transition-all"
                  style={{ background: b.bg }}
                >
                  <div className="text-3xl leading-none">{b.icon}</div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-foreground leading-tight">{b.name}</div>
                    <div className="text-sm font-black mt-0.5" style={{ color: b.color }}>+{b.bonus}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* ─── BUSINESSES MODAL ─── */}
      {showBusinesses && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end items-center"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setShowBusinesses(false); setBizSearch(''); setBizCategory('all'); }}
        >
          <div
            className="w-full max-w-md bg-card rounded-t-3xl flex flex-col"
            style={{ maxHeight: '85vh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
              <div>
                <h2 className="text-base font-semibold">Партнёры hani</h2>
                <p className="text-xs text-muted-foreground">{BUSINESSES.length} заведений</p>
              </div>
              <button
                onClick={() => { setShowBusinesses(false); setBizSearch(''); setBizCategory('all'); }}
                className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 pt-3 pb-2 shrink-0">
              <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5 bg-input-background mb-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Поиск партнёров..."
                  value={bizSearch}
                  onChange={e => setBizSearch(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
                />
                {bizSearch && (
                  <button onClick={() => setBizSearch('')} className="text-muted-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                <button
                  onClick={() => setBizCategory('all')}
                  className={chipClass(bizCategory === 'all')}
                  style={chipStyle(bizCategory === 'all')}
                >
                  Все
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setBizCategory(cat.id)}
                    className={chipClass(bizCategory === cat.id)}
                    style={chipStyle(bizCategory === cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-y-auto flex-1 px-4 pb-8 pt-2 space-y-2">
              {filteredBiz.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-10">Ничего не найдено</p>
              )}
              {filteredBiz.map(b => (
                <div key={b.name} className="flex items-center gap-3 bg-input-background rounded-2xl px-3 py-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="/hani.jpeg" alt="hani" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
