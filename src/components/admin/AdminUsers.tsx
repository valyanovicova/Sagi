import { useState } from 'react';
import { Search, X, Users, Briefcase, Sparkles, Send, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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

interface UserItem {
  id: number;
  name: string;
  email: string;
  maskedEmail: string;
  communities: string[];
  redemptions: number;
  joinDate: string;
  status: 'Active' | 'Suspended';
  initials: string;
  color: string;
  role: string;
  tags: string[];
  bio: string;
  connections: number;
  projects: number;
  years: number;
  mutualCount: number;
  mutualNames: string[];
  socials: { linkedin?: string; instagram?: string; telegram?: string; website?: string };
}

const avatarColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

const mockUsers: UserItem[] = [
  { id: 1, name: 'Alima Alieva', email: 'alima@example.com', maskedEmail: 'al***@example.com', communities: ['AIFC'], redemptions: 14, joinDate: 'Jan 2024', status: 'Active', initials: 'AA', color: avatarColors[0], role: 'Investor Analyst', tags: ['VC', 'FinTech', 'Kazakhstan'], bio: 'Analyzes investment deals in PropTech and EdTech. Looking for pre-seed startups.', connections: 31, projects: 3, years: 8, mutualCount: 4, mutualNames: ['Kamila', 'Arman', 'Daniyar'], socials: { linkedin: '#', telegram: '#' } },
  { id: 2, name: 'Bakyt Nurlanov', email: 'bakyt@example.com', maskedEmail: 'ba***@example.com', communities: ['AIFC'], redemptions: 7, joinDate: 'Feb 2024', status: 'Active', initials: 'BN', color: avatarColors[1], role: 'Backend Engineer', tags: ['Python', 'FastAPI', 'GIS'], bio: 'Building geospatial services. Openlayers, PostGIS, cluster analysis.', connections: 11, projects: 19, years: 6, mutualCount: 3, mutualNames: ['Yana', 'Madina'], socials: { linkedin: '#', telegram: '#', website: '#' } },
  { id: 3, name: 'Chulpan Seitova', email: 'chulpan@example.com', maskedEmail: 'ch***@example.com', communities: ['AIFC'], redemptions: 21, joinDate: 'Mar 2024', status: 'Active', initials: 'CS', color: avatarColors[2], role: 'UX Designer', tags: ['Design', 'Figma', 'Research'], bio: 'Designs interfaces for fintech and proptech. Passionate about data-driven design.', connections: 9, projects: 12, years: 5, mutualCount: 2, mutualNames: ['Aizat', 'Areli'], socials: { linkedin: '#', instagram: '#' } },
  { id: 4, name: 'Daulet Mamytov', email: 'daulet@example.com', maskedEmail: 'da***@example.com', communities: ['AIFC'], redemptions: 3, joinDate: 'Mar 2024', status: 'Suspended', initials: 'DM', color: avatarColors[3], role: 'Startup Founder', tags: ['CleanTech', 'B2B SaaS', 'Seed'], bio: 'Building smart waste management systems for residential complexes.', connections: 16, projects: 2, years: 3, mutualCount: 2, mutualNames: ['Timur', 'Bekkali'], socials: { linkedin: '#', telegram: '#' } },
  { id: 5, name: 'Elmira Kasymova', email: 'elmira@example.com', maskedEmail: 'el***@example.com', communities: ['AIFC'], redemptions: 18, joinDate: 'Apr 2024', status: 'Active', initials: 'EK', color: avatarColors[0], role: 'PropTech Journalist', tags: ['Media', 'PropTech', 'PR'], bio: 'Covers PropTech and real estate for Forbes Kazakhstan. 15k readers.', connections: 33, projects: 11, years: 6, mutualCount: 5, mutualNames: ['Daniyar', 'Kamila', 'Madina'], socials: { linkedin: '#', instagram: '#', telegram: '#', website: '#' } },
  { id: 6, name: 'Farida Jaksybekova', email: 'farida@example.com', maskedEmail: 'fa***@example.com', communities: ['AIFC'], redemptions: 5, joinDate: 'May 2024', status: 'Active', initials: 'FJ', color: avatarColors[1], role: 'Financial Analyst', tags: ['FinTech', 'Modeling', 'KZ Market'], bio: 'Models cash flows for real estate funds. CFA Level III candidate.', connections: 17, projects: 7, years: 6, mutualCount: 3, mutualNames: ['Kamila', 'Ruslan'], socials: { linkedin: '#', website: '#' } },
  { id: 7, name: 'Galym Akhmetov', email: 'galym@example.com', maskedEmail: 'ga***@example.com', communities: ['AIFC'], redemptions: 9, joinDate: 'Jun 2024', status: 'Active', initials: 'GA', color: avatarColors[2], role: 'City Planner', tags: ['Urban', 'Policy', 'Astana'], bio: 'Works on Astana masterplan policy. Former ADB urban advisor.', connections: 21, projects: 8, years: 14, mutualCount: 4, mutualNames: ['Saniya', 'Ruslan', 'Aslan'], socials: { linkedin: '#', telegram: '#' } },
  { id: 8, name: 'Hana Bekova', email: 'hana@example.com', maskedEmail: 'ha***@example.com', communities: ['AIFC'], redemptions: 12, joinDate: 'Jul 2024', status: 'Active', initials: 'HB', color: avatarColors[3], role: 'Community Manager', tags: ['Events', 'Network', 'RC'], bio: 'Builds resident communities within residential complexes. Launched 3 clubs.', connections: 40, projects: 6, years: 3, mutualCount: 7, mutualNames: ['Aizat', 'Areli', 'Saniya'], socials: { linkedin: '#', instagram: '#', telegram: '#' } },
];

export function AdminUsers() {
  const [users, setUsers] = useState<UserItem[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const { t } = useLanguage();

  const monthMap: Record<string, string> = {
    Jan: t('monthJan'), Feb: t('monthFeb'), Mar: t('monthMar'), Apr: t('monthApr'),
    May: t('monthMay'), Jun: t('monthJun'), Jul: t('monthJul'), Aug: t('monthAug'),
    Sep: t('monthSep'), Oct: t('monthOct'), Nov: t('monthNov'), Dec: t('monthDec'),
  };
  const localizeDate = (date: string) => {
    const [mon, year] = date.split(' ');
    return `${monthMap[mon] ?? mon} ${year}`;
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.maskedEmail.includes(search)
  );

  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u
      )
    );
    setSelectedUser((prev) =>
      prev && prev.id === id
        ? { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' }
        : prev
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">{t('users')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('searchUsers')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="w-full bg-card border border-border rounded-2xl p-4 hover:border-[#10b981]/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                  style={{ backgroundColor: user.color }}
                >
                  {user.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <span
                      className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${
                        user.status === 'Active'
                          ? 'bg-[#10b981]/10 text-[#10b981]'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {user.status === 'Active' ? t('filterActive') : t('filterSuspended')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.maskedEmail}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.communities.length} {t('communities')} · {t('joinedDate')} {localizeDate(user.joinDate)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel — Network-style bottom sheet */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end items-center" onClick={() => setSelectedUser(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-card rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                style={{ background: selectedUser.color + '20', border: `2px solid ${selectedUser.color}`, color: selectedUser.color }}
              >
                {selectedUser.initials}
              </div>
              <div>
                <div className="font-bold text-base">{selectedUser.name}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{selectedUser.role}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">{selectedUser.mutualCount}</span> mutual connections
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div className="mb-4">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                selectedUser.status === 'Active'
                  ? 'bg-[#10b981]/10 text-[#10b981]'
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {selectedUser.status === 'Active' ? t('filterActive') : t('filterSuspended')}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedUser.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio */}
            {selectedUser.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{selectedUser.bio}</p>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { icon: Users, value: selectedUser.connections, label: 'Connections' },
                { icon: Briefcase, value: selectedUser.projects, label: 'Projects' },
                { icon: Users, value: selectedUser.years, label: 'Yrs exp' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-muted/40 rounded-2xl p-3 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-base font-bold">{value}</div>
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>

            {/* Admin stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-muted/40 rounded-2xl p-3 text-center">
                <Sparkles className="w-4 h-4 mx-auto mb-1 text-[#10b981]" />
                <div className="text-base font-bold">{selectedUser.redemptions}</div>
                <div className="text-[10px] text-muted-foreground">Redemptions</div>
              </div>
              <div className="bg-muted/40 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-muted-foreground mb-1">Member since</div>
                <div className="text-sm font-bold">{localizeDate(selectedUser.joinDate)}</div>
                <div className="flex flex-wrap gap-1 justify-center mt-1">
                  {selectedUser.communities.map(c => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reach via */}
            <p className="text-xs text-muted-foreground mb-5">
              Mutual contacts:{' '}
              <span className="text-foreground font-medium">{selectedUser.mutualNames.join(', ')}</span>
            </p>

            {/* Social links */}
            {Object.values(selectedUser.socials).some(Boolean) && (
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                {selectedUser.socials.linkedin && (
                  <a href={selectedUser.socials.linkedin} className="flex items-center gap-1.5 flex-1 min-w-[80px] justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
                    <LinkedInIcon /> LinkedIn
                  </a>
                )}
                {selectedUser.socials.instagram && (
                  <a href={selectedUser.socials.instagram} className="flex items-center gap-1.5 flex-1 min-w-[80px] justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
                    <InstagramIcon /> Instagram
                  </a>
                )}
                {selectedUser.socials.telegram && (
                  <a href={selectedUser.socials.telegram} className="flex items-center gap-1.5 flex-1 min-w-[80px] justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
                    <Send className="w-4 h-4" /> Telegram
                  </a>
                )}
                {selectedUser.socials.website && (
                  <a href={selectedUser.socials.website} className="flex items-center gap-1.5 flex-1 min-w-[80px] justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
                    <Globe className="w-4 h-4" /> Web
                  </a>
                )}
              </div>
            )}

            {/* Admin action */}
            <button
              onClick={() => handleToggleStatus(selectedUser.id)}
              className={`w-full py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                selectedUser.status === 'Active'
                  ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                  : 'bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20'
              }`}
            >
              {selectedUser.status === 'Active' ? t('suspendUser') : t('restoreUser')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
