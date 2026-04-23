import {
  Shield,
  CreditCard,
  Store,
  Calendar,
  Clock,
  RefreshCw,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Users,
  TrendingUp,
  Headphones,
  GraduationCap,
  Briefcase,
  Bell,
  ChevronRight,
  Zap,
} from 'lucide-react';

const GREEN = '#2ABB6F';
const GREEN_DARK = '#1E9E5A';

const FEATURES = [
  { icon: <Smartphone size={17} />, label: 'Доступ к платформе' },
  { icon: <CreditCard size={17} />, label: 'Apple Wallet карта' },
  { icon: <Store size={17} />, label: 'Каталог скидок и офферов' },
  { icon: <Shield size={17} />, label: 'Карта лояльности (QR ID)' },
  { icon: <Bell size={17} />, label: 'Лента событий и новостей' },
  { icon: <BarChart3 size={17} />, label: 'Аналитика использования офферов' },
  { icon: <RefreshCw size={17} />, label: 'Управление контентом' },
  { icon: <Briefcase size={17} />, label: 'Личный кабинет бизнеса' },
  { icon: <Headphones size={17} />, label: 'Техническая поддержка' },
  { icon: <Clock size={17} />, label: 'Контроль сроков действия' },
  { icon: <GraduationCap size={17} />, label: 'Онбординг и обучение' },
  { icon: <Users size={17} />, label: 'Менеджер по работе с бизнесами' },
];

const FEATURE_GROUPS = [
  {
    label: 'Для резидента',
    color: 'bg-[#EDFAF3] text-[#1E9E5A]',
    items: [
      { icon: <CreditCard size={15} />, label: 'Apple Wallet карта' },
      { icon: <Shield size={15} />, label: 'Карта лояльности (QR ID)' },
      { icon: <Store size={15} />, label: 'Каталог скидок и офферов' },
      { icon: <Bell size={15} />, label: 'Лента событий и новостей' },
    ],
  },
  {
    label: 'Для администратора',
    color: 'bg-[#EEF2FF] text-[#4338CA]',
    items: [
      { icon: <BarChart3 size={15} />, label: 'Аналитика использования офферов' },
      { icon: <RefreshCw size={15} />, label: 'Управление контентом' },
      { icon: <Clock size={15} />, label: 'Контроль сроков действия' },
      { icon: <Briefcase size={15} />, label: 'Личный кабинет бизнеса' },
    ],
  },
  {
    label: 'Сервис и поддержка',
    color: 'bg-[#FFF7ED] text-[#C2410C]',
    items: [
      { icon: <Headphones size={15} />, label: 'Техническая поддержка' },
      { icon: <GraduationCap size={15} />, label: 'Онбординг и обучение' },
      { icon: <Users size={15} />, label: 'Менеджер по работе с бизнесами' },
      { icon: <Smartphone size={15} />, label: 'Доступ к платформе' },
    ],
  },
];


function FeatureGroupList() {
  return (
    <div className="space-y-8">
      {FEATURE_GROUPS.map(g => (
        <div key={g.label}>
          <div className="flex justify-center mb-5">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider ${g.color}`}>
              {g.label}
            </div>
          </div>
          <div className="grid grid-cols-2 max-w-2xl mx-auto gap-y-3">
            {g.items.map(f => (
              <div key={f.label} className="flex items-center gap-3 px-4">
                <CheckCircle size={16} style={{ color: GREEN, flexShrink: 0 }} />
                <span className="text-[15px] font-semibold text-[#1F2937]">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SagiLanding() {
  return (
    <div className="min-h-screen bg-white text-[#111827]" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .btn-green {
          background: ${GREEN};
          color: #fff;
          transition: background 0.18s;
        }
        .btn-green:hover { background: ${GREEN_DARK}; }

        .badge-green {
          background: #EDFAF3;
          color: ${GREEN_DARK};
          border: 1px solid #B6EDD2;
        }
        .icon-green {
          background: #EDFAF3;
          color: ${GREEN_DARK};
        }
        .card-border { border: 1.5px solid #F0F0F0; }
        .card-border:hover { border-color: #B6EDD2; }
        .card-lift { transition: transform 0.2s, box-shadow 0.2s; }
        .card-lift:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(42,187,111,0.10); }

        .hero-bg { background: linear-gradient(160deg, #F2FDF7 0%, #FFFFFF 55%); }
        .section-alt { background: #FAFAFA; }

        .phone-shell {
          background: linear-gradient(160deg, #1a2e22 0%, #0f1f16 100%);
          box-shadow: 0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06);
        }

        .annual-pill {
          background: ${GREEN};
          color: #fff;
        }
        .price-card-featured {
          border: 2px solid ${GREEN} !important;
          box-shadow: 0 16px 48px rgba(42,187,111,0.12);
        }
        .divider { background: linear-gradient(90deg, transparent, #E8E8E8, transparent); }

        .cta-card {
          background: linear-gradient(140deg, #1D3828 0%, #0F2218 100%);
        }
        .green-text { color: ${GREEN}; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#F0F0F0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[22px] font-black tracking-tight text-[#111827]">sagi</span>
            <span className="text-xs font-semibold text-[#2ABB6F] border border-[#B6EDD2] bg-[#EDFAF3] rounded-full px-2.5 py-0.5 ml-1">Community · МФЦА</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[['Возможности','#Возможности'],['Для бизнеса','#Бизнес'],['Тарифы','#Тарифы']].map(([l,h]) => (
              <a key={l} href={h} className="text-sm text-[#6B7280] hover:text-[#111827] transition font-medium">{l}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section className="hero-bg pt-20 pb-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <span className="badge-green inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-7">
              <Zap size={11} />
              Цифровая платформа лояльности для МФЦА
            </span>

            <h1 className="text-5xl lg:text-[3.6rem] font-black leading-[1.08] tracking-tight mb-6 text-[#111827]">
              От PDF-каталога<br />
              к <span className="green-text">живой экосистеме</span><br />
              привилегий
            </h1>

            <p className="text-lg text-[#6B7280] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              Интеллектуальная платформа управления членством. Цифровые карты, каталог офферов, аналитика и сообщество в одном продукте.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-14">
              <a href="#Тарифы" className="btn-green inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base shadow-md">
                Посмотреть тарифы <ArrowRight size={17} />
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4">
              {[
                { v: '12', l: 'функций в одной подписке' },
                { v: '$20', l: 'в месяц за резидента' },
                { v: '30%', l: 'скидка при оплате за год' },
              ].map(s => (
                <div key={s.l} className="text-center lg:text-left">
                  <div className="text-2xl font-black green-text">{s.v}</div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-[240px] mx-auto">
              <div className="absolute -inset-8 rounded-full opacity-30" style={{ background: `radial-gradient(ellipse, ${GREEN}55, transparent 70%)` }} />

              <div className="relative rounded-[2.6rem] phone-shell overflow-hidden border border-white/10">
                {/* status bar */}
                <div className="px-6 pt-5 pb-2 flex justify-between items-center">
                  <span className="text-[11px] text-white/50 font-medium">9:41</span>
                  <div className="w-16 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-4" />
                  <div className="w-3 h-2 border border-white/40 rounded-sm"><div className="m-0.5 bg-white/40 rounded-sm h-full" /></div>
                </div>

                {/* Card */}
                <div className="mx-3 mt-2 mb-3 rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}>
                  <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10" />
                  <div className="absolute -bottom-6 -left-4 w-16 h-16 rounded-full bg-white/10" />
                  <div className="relative">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-white/80 text-[10px] font-semibold tracking-wide">AIFC MEMBER</span>
                    </div>
                    <div className="text-white font-black text-lg leading-none mb-3">Premium</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[8px] text-white/50 uppercase tracking-widest">Valid thru</div>
                        <div className="text-white text-xs font-mono font-bold">08/26</div>
                      </div>
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-px p-1">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`w-1 h-1 ${[0,1,2,5,10,12,14,20,22,23,24].includes(i) ? 'bg-slate-900' : 'bg-white'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partners */}
                <div className="px-3 pb-2">
                  <div className="text-[9px] text-white/30 uppercase tracking-widest mb-2 px-1">Партнёры</div>
                  {[
                    { e: '☕', n: 'Master Coffee', d: '−15%' },
                    { e: '🍽', n: 'Chez Georges', d: '−20%' },
                    { e: '💪', n: 'AIFC Gym', d: '−30%' },
                  ].map(p => (
                    <div key={p.n} className="flex items-center gap-2 mb-2 bg-white/5 rounded-xl px-3 py-2">
                      <span className="text-sm">{p.e}</span>
                      <span className="text-[10px] text-white/60 flex-1">{p.n}</span>
                      <span className="text-[10px] font-bold" style={{ color: GREEN }}>{p.d}</span>
                    </div>
                  ))}
                </div>

                {/* Event */}
                <div className="px-3 pb-6">
                  <div className="text-[9px] text-white/30 uppercase tracking-widest mb-2 px-1">События</div>
                  <div className="bg-white/5 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <Calendar size={12} className="text-white/40 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] font-semibold text-white/80">Networking Breakfast</div>
                      <div className="text-[9px] text-white/40 mt-0.5">Пт, 25 апр · AIFC Tower</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet badge */}
              <div className="absolute -right-10 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-[#F0F0F0]">
                <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.36.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#111827]">Apple Wallet</div>
                  <div className="text-[8px] text-[#9CA3AF]">Карта добавлена</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider h-px" />

      {/* ══════════════════════════
          APP PREVIEW
      ══════════════════════════ */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-green inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Smartphone size={11} />
              Интерфейс приложения
            </span>
            <h2 className="text-4xl font-black text-[#111827] mb-4">Как это выглядит<br />в реальном использовании</h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Три ключевых экрана: профиль резидента, лента сообщества и каталог офферов.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-end justify-center gap-8 lg:gap-12">

            {[
              { src: '/screen1.png', label: 'Профиль резидента', sub: 'Карта лояльности + QR-код', offset: 'md:mb-10' },
              { src: '/screen2.png', label: 'Лента сообщества', sub: 'Офферы и мои сообщества', offset: '' },
              { src: '/screen3.png', label: 'Каталог офферов', sub: 'Категории и партнёры AIFC', offset: 'md:mb-10' },
            ].map(({ src, label, sub, offset }) => (
              <div key={src} className={`flex flex-col items-center gap-5 ${offset}`}>
                {/* iPhone frame */}
                <div className="relative" style={{ width: 220 }}>
                  {/* outer shell */}
                  <div className="relative rounded-[3rem] overflow-hidden"
                    style={{
                      background: '#1A1A1A',
                      padding: '10px',
                      boxShadow: '0 0 0 1px #3a3a3a, 0 32px 64px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}>
                    {/* inner screen */}
                    <div className="relative rounded-[2.3rem] overflow-hidden bg-black" style={{ aspectRatio: '9/19.5' }}>
                      {/* dynamic island */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-[72px] h-[22px] bg-black rounded-full" />
                      {/* screenshot */}
                      <img
                        src={src}
                        alt={label}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    </div>
                  </div>
                  {/* side buttons */}
                  <div className="absolute left-[-3px] top-[88px] w-[3px] h-[34px] rounded-l-sm" style={{ background: '#2a2a2a' }} />
                  <div className="absolute left-[-3px] top-[132px] w-[3px] h-[34px] rounded-l-sm" style={{ background: '#2a2a2a' }} />
                  <div className="absolute left-[-3px] top-[176px] w-[3px] h-[34px] rounded-l-sm" style={{ background: '#2a2a2a' }} />
                  <div className="absolute right-[-3px] top-[120px] w-[3px] h-[56px] rounded-r-sm" style={{ background: '#2a2a2a' }} />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-[#111827]">{label}</div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">{sub}</div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <div className="divider h-px" />

      {/* ══════════════════════════
          12 ФУНКЦИЙ
      ══════════════════════════ */}
      <section id="Возможности" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-green inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              Всё включено
            </span>
            <h2 className="text-4xl font-black text-[#111827] mb-4">12 возможностей<br />в одной подписке</h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Каждый инструмент разработан под задачи клуба лояльности МФЦА.
            </p>
          </div>

          {/* 11 features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-5">
            {FEATURES.filter(f => f.label !== 'Менеджер по работе с бизнесами' && f.label !== 'Apple Wallet карта' && f.label !== 'Контроль сроков действия').map((f, i) => (
              <div key={i} className="card-border card-lift flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#FAFFFE] transition-colors group">
                <div className="icon-green w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm font-semibold text-[#374151]">{f.label}</span>
              </div>
            ))}

            {/* Apple Wallet - featured card */}
            <div
              className="card-lift flex items-center gap-4 p-4 rounded-2xl row-span-1"
              style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`, border: `1.5px solid ${GREEN}` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20">
                <CreditCard size={17} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Apple Wallet карта</div>
                <div className="text-[11px] text-white/70 mt-0.5">Членство прямо в смартфоне</div>
              </div>
            </div>

            {/* Контроль сроков - span 2 */}
            <div className="card-border card-lift flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#FAFFFE] transition-colors sm:col-span-2 lg:col-span-2">
              <div className="icon-green w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={17} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#374151]">Контроль сроков действия</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">Карта автоматически деактивируется по окончании членства - доступ к скидкам сохраняется только у активных участников</div>
              </div>
            </div>
          </div>

          {/* Manager highlight card */}
          <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5" style={{ background: 'linear-gradient(135deg, #EDFAF3 0%, #F7FDF9 100%)', border: '1.5px solid #B6EDD2' }}>
            <div className="icon-green w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={22} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: GREEN }}>Персональный менеджер</div>
              <div className="text-base font-black text-[#111827] mb-1.5">Менеджер по работе с бизнесами</div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Выделенный менеджер Sagi самостоятельно ведёт переговоры с партнёрами, договаривается об условиях и наполняет каталог скидок актуальными офферами - вам не нужно тратить на это время.
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              {['Переговоры с бизнесами', 'Наполнение каталога', 'Контроль условий'].map(t => (
                <div key={t} className="flex items-center gap-2 text-xs font-semibold" style={{ color: GREEN_DARK }}>
                  <CheckCircle size={13} style={{ color: GREEN }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider h-px" />

      {/* ══════════════════════════
          ADMIN + BUSINESS
      ══════════════════════════ */}
      <section id="Бизнес" className="py-24 px-6 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-green inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              Операционный контроль
            </span>
            <h2 className="text-4xl font-black text-[#111827] mb-4">Инструменты</h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Полный цикл управления в одном дашборде.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Admin column */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-green w-10 h-10 rounded-xl flex items-center justify-center">
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">Для администратора МФЦА</div>
                  <h3 className="text-xl font-black text-[#111827]">Панель управления</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Clock size={15} />, t: 'Контроль сроков действия', d: 'Автоблокировка карт при истечении периода. Push-уведомления о продлении.' },
                  { icon: <RefreshCw size={15} />, t: 'Управление контентом', d: 'Мгновенное обновление офферов, партнёров и условий без перепечатки.' },
                  { icon: <BarChart3 size={15} />, t: 'Аналитика офферов', d: 'Статистика использования: какие категории востребованы и у кого.' },
                  { icon: <Users size={15} />, t: 'База участников', d: 'Управление резидентами, история продлений, статусы карт в реальном времени.' },
                ].map(item => (
                  <div key={item.t} className="card-border card-lift flex gap-4 p-4 rounded-2xl bg-white">
                    <div className="icon-green w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-[#111827] mb-0.5">{item.t}</div>
                      <div className="text-sm text-[#6B7280] leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business column */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-green w-10 h-10 rounded-xl flex items-center justify-center">
                  <Store size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">Для партнёров</div>
                  <h3 className="text-xl font-black text-[#111827]">Кабинет бизнеса</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Smartphone size={15} />, t: 'Сканирование QR-карт', d: 'Мгновенная верификация участника при посещении без пластиковых карт.' },
                  { icon: <RefreshCw size={15} />, t: 'Управление офферами', d: 'Создание и редактирование скидок, акций и эксклюзивных условий.' },
                  { icon: <BarChart3 size={15} />, t: 'Статистика визитов', d: 'Измеримый поток клиентов из МФЦА, данные о проверках карт.' },
                  { icon: <Users size={15} />, t: 'Персональный менеджер', d: 'Выделенный менеджер Sagi сопровождает партнёра на всех этапах.' },
                ].map(item => (
                  <div key={item.t} className="card-border card-lift flex gap-4 p-4 rounded-2xl bg-white">
                    <div className="icon-green w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-[#111827] mb-0.5">{item.t}</div>
                      <div className="text-sm text-[#6B7280] leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider h-px" />

      {/* ══════════════════════════
          PRICING
      ══════════════════════════ */}
      <section id="Тарифы" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-green inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              Прозрачная тарификация
            </span>
            <h2 className="text-4xl font-black text-[#111827] mb-4">Простая цена,<br />полный функционал</h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Один тариф, все 12 функций. Выберите удобный период оплаты.
            </p>
          </div>

          {/* Price cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Monthly */}
            <div className="card-border card-lift rounded-2xl p-8 bg-white">
              <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">Ежемесячно</div>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-black text-[#111827]">$20</span>
                <span className="text-[#9CA3AF] text-sm pb-2">/мес · за резидента</span>
              </div>
              <div className="text-[#9CA3AF] text-sm mb-7">Оплата каждый месяц, без обязательств</div>
              <a href="mailto:info@sagi.kz" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 font-bold text-sm hover:bg-[#FAFFFE] transition" style={{ borderColor: GREEN, color: GREEN }}>
                Начать внедрение <ChevronRight size={15} />
              </a>
            </div>

            {/* Annual */}
            <div className="price-card-featured card-lift rounded-2xl p-8 bg-white relative">
              <div className="absolute top-5 right-5 annual-pill text-xs font-bold px-3 py-1.5 rounded-full">
                -30% · Выгоднее
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: GREEN }}>Ежегодно</div>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-black text-[#111827]">$170</span>
                <span className="text-[#9CA3AF] text-sm pb-2">/год · за резидента</span>
              </div>
              <div className="flex items-center gap-2 mb-7">
                <span className="text-[#D1D5DB] text-sm line-through">$240/год</span>
                <span className="text-sm font-bold text-emerald-600">Экономия $70 на резиденте</span>
              </div>
              <a href="mailto:info@sagi.kz" className="btn-green w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm shadow-md">
                Получить годовой тариф <ChevronRight size={15} />
              </a>
            </div>
          </div>

          {/* What's included — shared block */}
          <div className="card-border rounded-2xl p-8 bg-white">
            <FeatureGroupList />
          </div>

          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            Цена указана за одного активного резидента. Оплата единым счётом за всю базу.
          </p>
        </div>
      </section>

      <div className="divider h-px" />

      {/* ══════════════════════════
          ROI
      ══════════════════════════ */}
      <section id="ROI" className="py-24 px-6 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-green inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <TrendingUp size={11} />
              Почему это выгодно
            </span>
            <h2 className="text-4xl font-black text-[#111827] mb-4">Что вы получаете<br />помимо продукта</h2>
          </div>

          <div className="card-border rounded-2xl bg-white p-8">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: <Clock size={17} />, t: 'Предотвращение убытков', d: 'Жёсткий контроль сроков не допускает использования просроченного членства у партнёров.' },
                { icon: <Zap size={17} />, t: 'Снижение операционных затрат', d: 'Нет перепечатки каталогов, нет ручного управления базой. Всё обновляется за клики.' },
                { icon: <Users size={17} />, t: 'Рост удержания', d: 'Цифровой продукт повышает воспринимаемую ценность членства и снижает отток.' },
              ].map(v => (
                <div key={v.t} className="flex gap-4">
                  <div className="icon-green w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">{v.icon}</div>
                  <div>
                    <div className="text-base font-bold text-[#111827] mb-1.5">{v.t}</div>
                    <div className="text-base text-[#6B7280] leading-relaxed">{v.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider h-px" />

      {/* ══════════════════════════
          CTA FOOTER
      ══════════════════════════ */}
      <footer className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-card rounded-3xl p-12 sm:p-16 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-white text-3xl font-black tracking-tight">sagi</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2ABB6F]" />
                Платформа готова к внедрению
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">
                Sagi Community.<br />Технологическое лицо гостеприимства МФЦА
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Современная платформа для цифровизации клуба лояльности. Полный контроль. Живое сообщество. Измеримый результат.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
