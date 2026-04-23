import { useState } from 'react';
import { Building2, ChevronRight, Phone, Mail, Globe, Languages, Sun, HelpCircle, ArrowLeftRight, LogOut, MapPin, Pencil, Check, X } from 'lucide-react';
import { Link } from 'react-router';
import { RoleSwitcherModal } from '../RoleSwitcherModal';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export function BusinessProfile() {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const { t } = useLanguage();
  const { logout } = useAuth();
  const [location, setLocation] = useState('');
  const [editingLocation, setEditingLocation] = useState(false);
  const [locationDraft, setLocationDraft] = useState('');
  const [tags, setTags] = useState<string[]>(['Food', 'Hospitality', 'B2B']);
  const [tagInput, setTagInput] = useState('');
  const [editingTags, setEditingTags] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">{t('businessProfile')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#10b981]/10 border-2 border-[#10b981]/30 flex items-center justify-center mb-3">
            <Building2 className="w-10 h-10 text-[#10b981]" />
          </div>
          <h2 className="text-xl font-semibold mb-1">Local Bistro</h2>
          <span className="text-xs px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full mb-2">Restaurant</span>

          {/* Location */}
          {!editingLocation ? (
            <button
              onClick={() => { setLocationDraft(location); setEditingLocation(true); }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#10b981] transition-colors mt-1"
            >
              {location ? <><MapPin className="w-3.5 h-3.5" />{location}</> : <><Globe className="w-3.5 h-3.5" />Worldwide · tap to set location</>}
              <Pencil className="w-3 h-3 opacity-50" />
            </button>
          ) : (
            <div className="flex items-center gap-2 mt-1 w-full max-w-xs">
              <input
                autoFocus
                type="text"
                value={locationDraft}
                onChange={e => setLocationDraft(e.target.value)}
                placeholder="City, Country or leave empty"
                className="flex-1 text-xs px-3 py-1.5 rounded-xl bg-input-background border border-[#10b981]/40 outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={() => { setLocation(locationDraft.trim()); setEditingLocation(false); }} className="text-[#10b981]"><Check className="w-4 h-4" /></button>
              <button onClick={() => setEditingLocation(false)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                {tag}
                {editingTags && (
                  <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-0.5 hover:text-red-400 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            {editingTags ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                      e.preventDefault();
                      const t = tagInput.trim().replace(/,$/, '');
                      if (t && !tags.includes(t)) setTags([...tags, t]);
                      setTagInput('');
                    }
                  }}
                  placeholder="Add tag..."
                  className="text-xs px-2 py-1 rounded-xl bg-input-background border border-[#10b981]/40 outline-none w-24 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => {
                    const t = tagInput.trim();
                    if (t && !tags.includes(t)) setTags([...tags, t]);
                    setTagInput('');
                    setEditingTags(false);
                  }}
                  className="text-[#10b981]"
                ><Check className="w-3.5 h-3.5" /></button>
              </div>
            ) : (
              <button onClick={() => setEditingTags(true)} className="text-xs px-3 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:border-[#10b981]/50 hover:text-[#10b981] transition-colors">
                + tag
              </button>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: '4', label: t('offersCount') },
            { value: '3', label: t('communitiesCount') },
            { value: '580', label: t('membersReached') },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="text-lg font-bold text-[#10b981]">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A cozy local bistro serving fresh, seasonal dishes with a focus on quality ingredients
            and warm hospitality. Join us for lunch or dinner and enjoy exclusive member discounts.
          </p>
          <a href="https://sagidos.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-[#10b981] hover:underline">sagidos.com</a>
        </div>

        {/* Contact */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm">+7 727 123 4567</span>
          </div>
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm">bistro@example.com</span>
          </div>
          <div className="flex items-center gap-3 p-4">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm">www.localbistro.kz</span>
          </div>
        </div>

        {/* Settings links */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <Link
            to="/user/profile/language"
            className="flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <Languages className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1">{t('language')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            to="/user/profile/appearance"
            className="flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <Sun className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1">{t('appearance')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            to="/user/profile/support"
            className="flex items-center gap-3 p-4 hover:bg-input-background transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1">{t('support')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <button
            onClick={() => setShowRoleSwitcher(true)}
            className="w-full flex items-center gap-3 p-4 hover:bg-input-background transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="flex-1 text-left">{t('switchRole')}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mb-4">{t('version')}</p>

        <button
          onClick={logout}
          className="w-full py-3 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">{t('signOut')}</span>
        </button>
      </div>

      {showRoleSwitcher && <RoleSwitcherModal onClose={() => setShowRoleSwitcher(false)} />}
    </div>
  );
}
