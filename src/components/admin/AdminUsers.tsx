import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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
}

const avatarColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

const mockUsers: UserItem[] = [
  { id: 1, name: 'Alima Alieva', email: 'alima@example.com', maskedEmail: 'al***@example.com', communities: ['AIFC'], redemptions: 14, joinDate: 'Jan 2024', status: 'Active', initials: 'AA', color: avatarColors[0] },
  { id: 2, name: 'Bakyt Nurlanov', email: 'bakyt@example.com', maskedEmail: 'ba***@example.com', communities: ['AIFC'], redemptions: 7, joinDate: 'Feb 2024', status: 'Active', initials: 'BN', color: avatarColors[1] },
  { id: 3, name: 'Chulpan Seitova', email: 'chulpan@example.com', maskedEmail: 'ch***@example.com', communities: ['AIFC'], redemptions: 21, joinDate: 'Mar 2024', status: 'Active', initials: 'CS', color: avatarColors[2] },
  { id: 4, name: 'Daulet Mamytov', email: 'daulet@example.com', maskedEmail: 'da***@example.com', communities: ['AIFC'], redemptions: 3, joinDate: 'Mar 2024', status: 'Suspended', initials: 'DM', color: avatarColors[3] },
  { id: 5, name: 'Elmira Kasymova', email: 'elmira@example.com', maskedEmail: 'el***@example.com', communities: ['AIFC'], redemptions: 18, joinDate: 'Apr 2024', status: 'Active', initials: 'EK', color: avatarColors[0] },
  { id: 6, name: 'Farida Jaksybekova', email: 'farida@example.com', maskedEmail: 'fa***@example.com', communities: ['AIFC'], redemptions: 5, joinDate: 'May 2024', status: 'Active', initials: 'FJ', color: avatarColors[1] },
  { id: 7, name: 'Galym Akhmetov', email: 'galym@example.com', maskedEmail: 'ga***@example.com', communities: ['AIFC'], redemptions: 9, joinDate: 'Jun 2024', status: 'Active', initials: 'GA', color: avatarColors[2] },
  { id: 8, name: 'Hana Bekova', email: 'hana@example.com', maskedEmail: 'ha***@example.com', communities: ['AIFC'], redemptions: 12, joinDate: 'Jul 2024', status: 'Active', initials: 'HB', color: avatarColors[3] },
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

      {/* Detail panel */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: selectedUser.color }}
                >
                  {selectedUser.initials}
                </div>
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedUser.maskedEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-background rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-2">{t('communities')}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.communities.map((c) => (
                    <span key={c} className="text-xs px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{t('recentRedemptionsCount')}</p>
                <p className="text-lg font-bold">{selectedUser.redemptions}</p>
              </div>

              <div className="bg-background rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{t('memberSince')}</p>
                <p className="font-medium">{localizeDate(selectedUser.joinDate)}</p>
              </div>
            </div>

            <button
              onClick={() => handleToggleStatus(selectedUser.id)}
              className={`w-full py-3 rounded-2xl font-medium transition-colors ${
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
