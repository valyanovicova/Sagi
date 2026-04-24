import { CheckCircle, Shield, Star, Download } from 'lucide-react';
import sagiLogo from '../assets/sagi-logo.png';

const GREEN = '#2ABB6F';
const GREEN_DARK = '#1E9E5A';

export function AppStoreLanding() {
  return (
    <div
      className="min-h-screen bg-white text-[#111827]"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .btn-green { background: ${GREEN}; color: #fff; transition: background 0.18s; }
        .btn-green:hover { background: ${GREEN_DARK}; }
        .green-text { color: ${GREEN}; }
        .badge { background: #EDFAF3; color: ${GREEN_DARK}; border: 1px solid #B6EDD2; }
        .divider { background: linear-gradient(90deg, transparent, #E8E8E8, transparent); height: 1px; }
        .card { border: 1.5px solid #F0F0F0; border-radius: 20px; transition: border-color 0.2s, transform 0.2s; }
        .card:hover { border-color: #B6EDD2; transform: translateY(-2px); }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#F0F0F0]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <img src={sagiLogo} alt="Sagi" className="h-7 w-auto" />
          <div className="flex items-center gap-4">
            <a href="#privacy" className="text-xs text-[#9CA3AF] hover:text-[#111827] transition font-medium">Конфиденциальность</a>
            <a href="mailto:support@sagi.kz" className="text-xs text-[#9CA3AF] hover:text-[#111827] transition font-medium">Поддержка</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-20 pb-16 px-6 text-center" style={{ background: 'linear-gradient(160deg, #F2FDF7 0%, #ffffff 60%)' }}>
        <div className="max-w-2xl mx-auto">

          {/* App icon */}
          <div className="w-24 h-24 rounded-[22px] mx-auto mb-6 flex items-center justify-center shadow-xl"
            style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}>
            <img src={sagiLogo} alt="Sagi" className="w-14 h-14 object-contain brightness-0 invert" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-[#111827]">
            Sagi Community
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed mb-3 max-w-lg mx-auto">
            Платформа управления сообществом: офферы, карты лояльности и нетворкинг в одном приложении.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={GREEN} style={{ color: GREEN }} />
            ))}
            <span className="text-sm text-[#9CA3AF] ml-2">Sagi · МФЦА</span>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#"
              className="btn-green inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base shadow-md"
            >
              <Download size={18} />
              Скачать в App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base border-2 border-[#E5E7EB] text-[#374151] hover:border-[#B6EDD2] transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1.01-1.3 1.7-.78l14 8.5c.6.36.6 1.2 0 1.56l-14 8.5c-.69.52-1.7.05-1.7-.78z"/></svg>
              Google Play
            </a>
          </div>

          <p className="text-xs text-[#D1D5DB] mt-4">Требуется iOS 15+ / Android 8+</p>
        </div>
      </section>

      <div className="divider" />

      {/* ─── 3 ROLES ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-3">Одно приложение - три роли</h2>
            <p className="text-[#6B7280] text-lg">Для каждого участника экосистемы свой интерфейс</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                src: '/screen1.png',
                role: 'Для сообщества',
                roleColor: 'bg-[#EDFAF3] text-[#1E9E5A]',
                title: 'Управление и аналитика',
                desc: 'Полный контроль над участниками, партнёрами и активностью сообщества.',
                features: ['Верификация участников', 'Аналитика в реальном времени', 'Контроль членства'],
              },
              {
                src: '/screen2.png',
                role: 'Для участника',
                roleColor: 'bg-[#EEF2FF] text-[#4338CA]',
                title: 'Привилегии и нетворкинг',
                desc: 'Карта лояльности в смартфоне, каталог скидок и безопасный обмен контактами.',
                features: ['Apple Wallet карта', 'Каталог офферов', 'Verified Networking'],
              },
              {
                src: '/screen3.png',
                role: 'Для бизнеса',
                roleColor: 'bg-[#FFF7ED] text-[#C2410C]',
                title: 'Кабинет партнёра',
                desc: 'Управление офферами, сканирование карт и статистика клиентов из сообщества.',
                features: ['Сканирование QR-карт', 'Управление офферами', 'Статистика визитов'],
              },
            ].map(({ src, role, roleColor, title, desc, features }) => (
              <div key={src} className="flex flex-col items-center gap-5">
                <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider ${roleColor}`}>
                  {role}
                </div>

                {/* iPhone */}
                <div className="relative" style={{ width: 200 }}>
                  <div className="relative rounded-[2.8rem] overflow-hidden"
                    style={{ background: '#1A1A1A', padding: '9px', boxShadow: '0 0 0 1px #3a3a3a, 0 28px 56px rgba(0,0,0,0.25)' }}>
                    <div className="relative rounded-[2.2rem] overflow-hidden bg-black" style={{ aspectRatio: '9/19.5' }}>
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-[64px] h-[20px] bg-black rounded-full" />
                      <img src={src} alt={title} className="w-full h-full object-cover object-top" draggable={false} />
                    </div>
                  </div>
                  <div className="absolute left-[-3px] top-[80px] w-[3px] h-[30px] rounded-l-sm bg-[#2a2a2a]" />
                  <div className="absolute left-[-3px] top-[120px] w-[3px] h-[30px] rounded-l-sm bg-[#2a2a2a]" />
                  <div className="absolute right-[-3px] top-[108px] w-[3px] h-[50px] rounded-r-sm bg-[#2a2a2a]" />
                </div>

                <div className="text-center">
                  <div className="text-base font-black text-[#111827] mb-1.5">{title}</div>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4 max-w-[200px] mx-auto">{desc}</p>
                  <div className="space-y-1.5">
                    {features.map(f => (
                      <div key={f} className="flex items-center justify-center gap-2 text-sm text-[#374151]">
                        <CheckCircle size={13} style={{ color: GREEN, flexShrink: 0 }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-6" style={{ background: '#FAFAFA' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-3">Всё включено</h2>
            <p className="text-[#6B7280] text-lg">12 инструментов в одной подписке</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Apple Wallet карта', desc: 'Цифровое членство прямо в смартфоне' },
              { title: 'Каталог скидок и офферов', desc: 'Динамический список партнёрских привилегий' },
              { title: 'Карта лояльности (QR ID)', desc: 'Верификация у партнёров за секунды' },
              { title: 'Verified Networking', desc: 'Обмен контактами только при взаимном согласии' },
              { title: 'Аналитика офферов', desc: 'Статистика использования для администраторов' },
              { title: 'Контроль сроков', desc: 'Автоблокировка карт по истечении членства' },
              { title: 'Лента событий', desc: 'Анонсы и новости внутри сообщества' },
              { title: 'Кабинет бизнеса', desc: 'Инструменты для партнёров сообщества' },
              { title: 'Техподдержка 24/7', desc: 'Персональный менеджер и онбординг' },
            ].map(f => (
              <div key={f.title} className="card bg-white p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#EDFAF3' }}>
                  <CheckCircle size={15} style={{ color: GREEN }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#111827]">{f.title}</div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5 leading-snug">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ─── DOWNLOAD CTA ─── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-[16px] mx-auto mb-6 flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})` }}>
            <img src={sagiLogo} alt="Sagi" className="w-10 h-10 object-contain brightness-0 invert" />
          </div>
          <h2 className="text-3xl font-black text-[#111827] mb-3">Скачайте Sagi Community</h2>
          <p className="text-[#6B7280] mb-8">Доступно для iOS и Android</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#" className="btn-green inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base shadow-md">
              <Download size={18} />
              App Store
            </a>
            <a href="#" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base border-2 border-[#E5E7EB] text-[#374151] hover:border-[#B6EDD2] transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1.01-1.3 1.7-.78l14 8.5c.6.36.6 1.2 0 1.56l-14 8.5c-.69.52-1.7.05-1.7-.78z"/></svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ─── PRIVACY POLICY ─── */}
      <section id="privacy" className="py-16 px-6" style={{ background: '#FAFAFA' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#EDFAF3' }}>
              <Shield size={18} style={{ color: GREEN }} />
            </div>
            <h2 className="text-2xl font-black text-[#111827]">Политика конфиденциальности</h2>
          </div>

          <div className="space-y-6 text-sm text-[#6B7280] leading-relaxed">
            <div>
              <h3 className="font-bold text-[#111827] mb-2">Какие данные мы собираем</h3>
              <p>Sagi Community собирает только данные, необходимые для работы приложения: имя, адрес электронной почты, фото профиля и информацию об участии в сообществе. Платёжные данные не хранятся на наших серверах.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] mb-2">Как мы используем данные</h3>
              <p>Данные используются исключительно для предоставления функций платформы: идентификации участника, отображения карты лояльности и персонализации каталога офферов. Мы не передаём и не продаём данные третьим лицам.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] mb-2">Передача контактов</h3>
              <p>Функция Verified Networking передаёт контактные данные только при взаимном явном согласии обеих сторон. Без подтверждения данные остаются закрытыми.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] mb-2">Хранение данных</h3>
              <p>Данные хранятся на защищённых серверах. Вы можете запросить удаление своих данных в любой момент, обратившись в службу поддержки.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] mb-2">Push-уведомления</h3>
              <p>Приложение использует push-уведомления для информирования об истечении членства, новых офферах и событиях сообщества. Уведомления можно отключить в настройках устройства.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#111827] mb-2">Контакт</h3>
              <p>По вопросам конфиденциальности: <a href="mailto:privacy@sagi.kz" className="font-semibold" style={{ color: GREEN }}>privacy@sagi.kz</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 px-6 border-t border-[#F0F0F0]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={sagiLogo} alt="Sagi" className="h-6 w-auto opacity-50" />
            <span className="text-sm text-[#9CA3AF]">© 2025 Sagi Community</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
            <a href="#privacy" className="hover:text-[#374151] transition">Конфиденциальность</a>
            <a href="mailto:support@sagi.kz" className="hover:text-[#374151] transition">Поддержка</a>
            <a href="mailto:info@sagi.kz" className="hover:text-[#374151] transition">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
