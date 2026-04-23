import { ChevronLeft, Camera, Plus, X, Globe, MapPin } from 'lucide-react';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useState, useRef, useEffect } from 'react';

const CITY_OPTIONS = [
  { city: 'Almaty', country: 'Kazakhstan' },
  { city: 'Astana', country: 'Kazakhstan' },
  { city: 'Shymkent', country: 'Kazakhstan' },
  { city: 'Karaganda', country: 'Kazakhstan' },
  { city: 'Aktobe', country: 'Kazakhstan' },
  { city: 'Taraz', country: 'Kazakhstan' },
  { city: 'Pavlodar', country: 'Kazakhstan' },
  { city: 'Oskemen', country: 'Kazakhstan' },
  { city: 'Semey', country: 'Kazakhstan' },
  { city: 'Atyrau', country: 'Kazakhstan' },
  { city: 'Moscow', country: 'Russia' },
  { city: 'Saint Petersburg', country: 'Russia' },
  { city: 'Novosibirsk', country: 'Russia' },
  { city: 'Yekaterinburg', country: 'Russia' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Abu Dhabi', country: 'UAE' },
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Ankara', country: 'Turkey' },
  { city: 'Tashkent', country: 'Uzbekistan' },
  { city: 'Samarkand', country: 'Uzbekistan' },
  { city: 'Bishkek', country: 'Kyrgyzstan' },
  { city: 'Baku', country: 'Azerbaijan' },
  { city: 'Tbilisi', country: 'Georgia' },
  { city: 'London', country: 'UK' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Paris', country: 'France' },
  { city: 'Amsterdam', country: 'Netherlands' },
  { city: 'New York', country: 'USA' },
  { city: 'San Francisco', country: 'USA' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Seoul', country: 'South Korea' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'Beijing', country: 'China' },
  { city: 'Shanghai', country: 'China' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Delhi', country: 'India' },
];

function LocationDropdown({ value, onChange, language }: { value: string; onChange: (v: string) => void; language: string }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = query.trim()
    ? CITY_OPTIONS.filter(
        ({ city, country }) =>
          city.toLowerCase().includes(query.toLowerCase()) ||
          country.toLowerCase().includes(query.toLowerCase())
      )
    : CITY_OPTIONS;

  const grouped = filtered.reduce<Record<string, string[]>>((acc, { city, country }) => {
    if (!acc[country]) acc[country] = [];
    acc[country].push(city);
    return acc;
  }, {});

  const label = language === 'kk' ? 'Қала' : language === 'ru' ? 'Город' : 'City';
  const placeholder = language === 'kk' ? 'Іздеу...' : language === 'ru' ? 'Поиск...' : 'Search...';

  return (
    <div ref={ref} className="relative">
      <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
        <MapPin className="w-3.5 h-3.5" />
        {label}
      </label>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-56 overflow-y-auto">
          {Object.entries(grouped).map(([country, cities]) => (
            <div key={country}>
              <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/40 sticky top-0">
                {country}
              </div>
              {cities.map((city) => {
                const full = `${city}, ${country}`;
                return (
                  <button
                    key={city}
                    type="button"
                    onMouseDown={() => { onChange(full); setQuery(full); setOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#10b981]/10 hover:text-[#10b981] transition-colors"
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EditProfile() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: language === 'en' ? 'Alima' : 'Алима',
    lastName: language === 'en' ? 'Alieva' : 'Алиева',
    email: 'alima.alieva@example.com',
    phone: '+7 777 123 4567',
    location: 'Almaty, Kazakhstan',
    bio: '',
  });
  const [tags, setTags] = useState<string[]>(['Investor', 'Fintech']);
  const [tagInput, setTagInput] = useState('');
  const [socials, setSocials] = useState({
    linkedin: '',
    instagram: '',
    twitter: '',
    telegram: '',
    website: '',
  });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 8) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/user/profile" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl">{t('editProfile')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#10b981]"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-lg hover:bg-[#059669] transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <button type="button" className="mt-3 text-[#10b981] text-sm">
              {t('changePhoto')}
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('firstName')}</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('lastName')}</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('birthday')}</label>
              <input
                type="text"
                value="15 / 03 / 1995"
                disabled
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl opacity-60 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('email')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('phoneNumber')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <LocationDropdown
              value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: v })}
              language={language}
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2">{t('bio')}</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder={t('bioPlaceholder')}
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors resize-none text-sm"
            />
            <p className="text-xs text-muted-foreground text-right mt-1">{formData.bio.length}/200</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2">{t('tags')}</label>
            <div className="flex gap-2 flex-wrap mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-sm"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-[#059669] transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {tags.length < 8 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder={t('tagsPlaceholder')}
                  className="flex-1 px-4 py-2.5 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                  className="px-4 py-2.5 bg-[#10b981] text-white rounded-xl hover:bg-[#059669] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {t('addTag')}
                </button>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-3">{t('socialLinks')}</label>
            <div className="space-y-3">
              {([
                { key: 'linkedin', label: t('linkedin'), icon: <LinkedInIcon />, placeholder: 'linkedin.com/in/username' },
                { key: 'instagram', label: t('instagram'), icon: <InstagramIcon />, placeholder: 'instagram.com/username' },
                { key: 'twitter', label: t('twitter'), icon: <XIcon />, placeholder: 'x.com/username' },
                { key: 'telegram', label: t('telegram'), icon: <TelegramIcon />, placeholder: 't.me/username' },
                { key: 'website', label: t('website'), icon: <Globe className="w-4 h-4" />, placeholder: 'yourwebsite.com' },
              ] as const).map(({ key, label, icon, placeholder }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] shrink-0">
                    {icon}
                  </div>
                  <input
                    type="text"
                    value={socials[key]}
                    onChange={(e) => setSocials({ ...socials, [key]: e.target.value })}
                    placeholder={placeholder}
                    aria-label={label}
                    className="flex-1 px-4 py-2.5 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl hover:shadow-lg transition-shadow"
          >
            {t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}
