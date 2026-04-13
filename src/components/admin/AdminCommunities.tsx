import { useState } from 'react';
import { Plus, Search, MoreVertical, X, Settings2 } from 'lucide-react';
import { Link } from 'react-router';
import { BusinessLogo } from '../BusinessLogo';
import { useLanguage } from '../../context/LanguageContext';

interface Community {
  id: number;
  name: string;
  type: 'office' | 'school' | 'district' | 'tech';
  members: number;
  businesses: number;
}

type BusinessStatus = 'Active' | 'Pending' | 'Suspended';
type UserStatus = 'Active' | 'Suspended' | 'Invited';

interface Business {
  id: number;
  name: string;
  category: string;
  community: string;
  type: 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail' | 'office' | 'hotel' | 'fitness' | 'healthcare' | 'travel';
  status: BusinessStatus;
}

interface UserItem {
  id: number;
  name: string;
  maskedEmail: string;
  communities: string[];
  redemptions: number;
  joinDate: string;
  status: UserStatus;
  initials: string;
  color: string;
}

const initialCommunities: Community[] = [
  { id: 1, name: 'AIFC', type: 'office', members: 570, businesses: 42 },
];

const initialBusinesses: Business[] = [
  { id: 1, name: 'Master Coffee', category: 'Cafe', community: 'AIFC', type: 'cafe', status: 'Active' },
  { id: 2, name: 'Wyndham Garden Astana', category: 'Hotel', community: 'AIFC', type: 'hotel', status: 'Active' },
  { id: 3, name: 'Hilton Astana', category: 'Hotel', community: 'AIFC', type: 'hotel', status: 'Active' },
  { id: 4, name: 'Rafe Beauty Lounge', category: 'Beauty', community: 'AIFC', type: 'spa', status: 'Active' },
  { id: 5, name: 'AIFC Academy', category: 'Education', community: 'AIFC', type: 'education', status: 'Active' },
  { id: 6, name: 'Air Astana', category: 'Travel', community: 'AIFC', type: 'travel', status: 'Active' },
  { id: 7, name: 'Bronx Fitness', category: 'Fitness', community: 'AIFC', type: 'fitness', status: 'Pending' },
  { id: 8, name: 'International SOS', category: 'Healthcare', community: 'AIFC', type: 'healthcare', status: 'Pending' },
  { id: 9, name: 'Chez Georges', category: 'Restaurant', community: 'AIFC', type: 'restaurant', status: 'Active' },
  { id: 10, name: 'Ana Flowers', category: 'Retail', community: 'AIFC', type: 'retail', status: 'Suspended' },
];

const avatarColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];
const initialUsers: UserItem[] = [
  { id: 1, name: 'Alima Alieva', maskedEmail: 'al***@example.com', communities: ['AIFC'], redemptions: 14, joinDate: 'Jan 2024', status: 'Active', initials: 'AA', color: avatarColors[0] },
  { id: 2, name: 'Bakyt Nurlanov', maskedEmail: 'ba***@example.com', communities: ['AIFC'], redemptions: 7, joinDate: 'Feb 2024', status: 'Active', initials: 'BN', color: avatarColors[1] },
  { id: 3, name: 'Chulpan Seitova', maskedEmail: 'ch***@example.com', communities: ['AIFC'], redemptions: 21, joinDate: 'Mar 2024', status: 'Active', initials: 'CS', color: avatarColors[2] },
  { id: 4, name: 'Daulet Mamytov', maskedEmail: 'da***@example.com', communities: ['AIFC'], redemptions: 3, joinDate: 'Mar 2024', status: 'Suspended', initials: 'DM', color: avatarColors[3] },
  { id: 5, name: 'Elmira Kasymova', maskedEmail: 'el***@example.com', communities: ['AIFC'], redemptions: 18, joinDate: 'Apr 2024', status: 'Active', initials: 'EK', color: avatarColors[0] },
  { id: 6, name: 'Farida Jaksybekova', maskedEmail: 'fa***@example.com', communities: ['AIFC'], redemptions: 5, joinDate: 'May 2024', status: 'Active', initials: 'FJ', color: avatarColors[1] },
  { id: 7, name: 'Galym Akhmetov', maskedEmail: 'ga***@example.com', communities: ['AIFC'], redemptions: 9, joinDate: 'Jun 2024', status: 'Active', initials: 'GA', color: avatarColors[2] },
  { id: 8, name: 'Hana Bekova', maskedEmail: 'ha***@example.com', communities: ['AIFC'], redemptions: 12, joinDate: 'Jul 2024', status: 'Active', initials: 'HB', color: avatarColors[3] },
];

type OfferStatus = 'Active' | 'Paused';

interface OfferItem {
  id: number;
  title: string;
  business: string;
  type: 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail' | 'hotel' | 'fitness' | 'healthcare' | 'travel';
  usage: number;
  status: OfferStatus;
}

const initialOffers: OfferItem[] = [
  { id: 1, title: '10% off beverages & food', business: 'Master Coffee', type: 'cafe', usage: 189, status: 'Active' },
  { id: 2, title: '15% off best available rate', business: 'Wyndham Garden Astana', type: 'hotel', usage: 134, status: 'Active' },
  { id: 3, title: '10% off spa + 15% off rate', business: 'Hilton Astana', type: 'hotel', usage: 98, status: 'Active' },
  { id: 4, title: '10% off services', business: 'Rafe Beauty Lounge', type: 'spa', usage: 76, status: 'Active' },
  { id: 5, title: '10% off training programmes', business: 'AIFC Academy', type: 'education', usage: 54, status: 'Active' },
  { id: 6, title: 'Corporate discount', business: 'Air Astana', type: 'travel', usage: 41, status: 'Paused' },
  { id: 7, title: 'Corporate discount', business: 'Bronx Fitness', type: 'fitness', usage: 23, status: 'Active' },
  { id: 8, title: '10% off food menu', business: 'Chez Georges', type: 'restaurant', usage: 67, status: 'Active' },
];

const statusStyles: Record<BusinessStatus, string> = {
  Active: 'bg-[#10b981]/10 text-[#10b981]',
  Pending: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  Suspended: 'bg-red-500/10 text-red-500',
};

const offerStatusStyles: Record<OfferStatus, string> = {
  Active: 'bg-[#10b981]/10 text-[#10b981]',
  Paused: 'bg-[#f59e0b]/10 text-[#f59e0b]',
};

export function AdminCommunities() {
  const [tab, setTab] = useState<'communities' | 'businesses' | 'offers' | 'users'>('communities');
  const [communities] = useState<Community[]>(initialCommunities);
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [offers, setOffers] = useState<OfferItem[]>(initialOffers);
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [inviteMethod, setInviteMethod] = useState<'email' | 'phone'>('email');
  const [inviteValue, setInviteValue] = useState('');
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [bizFilter, setBizFilter] = useState<'All' | BusinessStatus>('All');
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

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredBusinesses = (bizFilter === 'All' ? businesses : businesses.filter((b) => b.status === bizFilter))
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
  const filteredOffers = offers.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase()) || o.business.toLowerCase().includes(search.toLowerCase())
  );
  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.maskedEmail.includes(search)
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
    setNewName('');
  };

  const handleApprove = (id: number) => {
    setBusinesses(businesses.map((b) => (b.id === id ? { ...b, status: 'Active' } : b)));
  };
  const handleReject = (id: number) => {
    setBusinesses(businesses.map((b) => (b.id === id ? { ...b, status: 'Suspended' } : b)));
  };
  const handleToggleStatus = (id: number) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    setSelectedUser((prev) => prev && prev.id === id ? { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' } : prev);
  };

  const bizFilters: Array<{ key: 'All' | BusinessStatus; label: string }> = [
    { key: 'All', label: t('filterAll') },
    { key: 'Pending', label: t('filterPending') },
    { key: 'Active', label: t('filterActive') },
    { key: 'Suspended', label: t('filterSuspended') },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex gap-1 bg-input-background rounded-xl p-1">
            <button
              onClick={() => { setTab('communities'); setSearch(''); setShowAddForm(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'communities' ? 'bg-[#10b981] text-white' : 'text-muted-foreground'}`}
            >
              {t('communities')}
            </button>
            <button
              onClick={() => { setTab('businesses'); setSearch(''); setShowAddForm(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'businesses' ? 'bg-[#10b981] text-white' : 'text-muted-foreground'}`}
            >
              {t('businesses')}
            </button>
            <button
              onClick={() => { setTab('offers'); setSearch(''); setShowAddForm(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'offers' ? 'bg-[#10b981] text-white' : 'text-muted-foreground'}`}
            >
              {t('offers')}
            </button>
            <button
              onClick={() => { setTab('users'); setSearch(''); setShowAddForm(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'users' ? 'bg-[#10b981] text-white' : 'text-muted-foreground'}`}
            >
              {t('users')}
            </button>
          </div>
          {tab !== 'offers' && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-9 h-9 rounded-xl bg-[#10b981] flex items-center justify-center"
            >
              {showAddForm ? <X className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
            </button>
          )}
        </div>

        {showAddForm && tab !== 'offers' && (
          <div className="max-w-md mx-auto px-4 pb-4">
            {tab === 'users' ? (
              <div className="bg-input-background rounded-2xl p-3 space-y-3">
                {/* Method selector */}
                <div className="flex gap-1 bg-card rounded-xl p-1">
                  {(['email', 'phone'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setInviteMethod(m); setInviteValue(''); }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${inviteMethod === m ? 'bg-[#10b981] text-white' : 'text-muted-foreground'}`}
                    >
                      {m === 'email' ? t('email') : t('phone')}
                    </button>
                  ))}
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!inviteValue.trim()) return;
                  const masked = inviteMethod === 'email'
                    ? inviteValue.replace(/^(.{2}).*(@.*)$/, '$1***$2')
                    : inviteValue.replace(/^(\+?\d{1,3}\s?\d{1,3}).*$/, '$1*** ** **');
                  setUsers(prev => [...prev, {
                    id: Date.now(),
                    name: inviteMethod === 'email' ? inviteValue.split('@')[0] : inviteValue,
                    maskedEmail: masked,
                    communities: ['AIFC'],
                    redemptions: 0,
                    joinDate: 'Jan 2025',
                    status: 'Invited',
                    initials: (inviteMethod === 'email' ? inviteValue[0] : '#').toUpperCase() + '?',
                    color: '#f59e0b',
                  }]);
                  setShowAddForm(false);
                  setInviteValue('');
                }} className="flex gap-2">
                  <input
                    type={inviteMethod === 'email' ? 'email' : 'tel'}
                    value={inviteValue}
                    onChange={(e) => setInviteValue(e.target.value)}
                    placeholder={inviteMethod === 'email' ? t('emailPlaceholder') : '+7 ___ ___ __ __'}
                    className="flex-1 px-4 py-2 bg-card border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm"
                    autoFocus
                  />
                  <button type="submit" className="px-4 py-2 bg-[#10b981] text-white rounded-xl text-sm font-medium">
                    {t('invite')}
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={tab === 'communities' ? t('communityName') + '...' : t('businesses') + '...'}
                  className="flex-1 px-4 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm"
                  autoFocus
                />
                <button type="submit" className="px-4 py-2 bg-[#10b981] text-white rounded-xl text-sm font-medium">
                  {t('addNew')}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={tab === 'users' ? t('searchUsers') : t('searchCommunities')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
          />
        </div>

        {tab === 'communities' && (
          <div className="space-y-3">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="bg-card border border-border rounded-2xl p-4 relative hover:border-[#10b981]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Link to={`/admin/community/${community.id}`} className="flex-shrink-0">
                    <BusinessLogo name={community.name} type={community.type} size="md" />
                  </Link>
                  <Link to={`/admin/community/${community.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{community.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full">{t('filterActive')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {community.members} {t('members')} · {community.businesses} {t('businesses')}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t('aifcDescription')}</p>
                  </Link>
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/admin/community/${community.id}`}
                      className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-input-background transition-colors"
                      title="Manage community"
                    >
                      <Settings2 className="w-4 h-4 text-[#10b981]" />
                    </Link>
                    <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === community.id ? null : community.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-input-background transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {menuOpen === community.id && (
                      <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
                        {['Edit name', 'Suspend', 'Delete'].map((action) => (
                          <button key={action} onClick={() => { alert('Coming soon'); setMenuOpen(null); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-input-background transition-colors">
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'businesses' && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mb-4">
              {bizFilters.map((f) => (
                <button key={f.key} onClick={() => setBizFilter(f.key)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm transition-colors ${bizFilter === f.key ? 'bg-[#10b981] text-white' : 'bg-input-background text-muted-foreground'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filteredBusinesses.map((biz) => (
                <div key={biz.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BusinessLogo name={biz.name} type={biz.type} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-medium text-sm">{biz.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[biz.status]}`}>{biz.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{biz.category} · {biz.community}</p>
                    </div>
                  </div>
                  {biz.status === 'Pending' && (
                    <div className="flex gap-2 mt-2 pt-2 border-t border-border">
                      <button onClick={() => handleApprove(biz.id)}
                        className="flex-1 py-2 bg-[#10b981] text-white rounded-xl text-sm font-medium hover:bg-[#059669] transition-colors">
                        {t('approve')}
                      </button>
                      <button onClick={() => handleReject(biz.id)}
                        className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors">
                        {t('reject')}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'offers' && (
          <div className="space-y-3">
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <BusinessLogo name={offer.business} type={offer.type} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-medium text-sm truncate">{offer.title}</h3>
                      <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${offerStatusStyles[offer.status]}`}>
                        {offer.status === 'Active' ? t('filterActive') : t('offersPaused')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{offer.business}</p>
                    <p className="text-xs text-[#10b981]">{offer.usage} {t('totalRedemptions').toLowerCase()}</p>
                  </div>
                  <button
                    onClick={() => setOffers(offers.map((o) => o.id === offer.id ? { ...o, status: o.status === 'Active' ? 'Paused' : 'Active' } : o))}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors flex-shrink-0 ${
                      offer.status === 'Active'
                        ? 'bg-[#f59e0b]/10 text-[#f59e0b] hover:bg-[#f59e0b]/20'
                        : 'bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20'
                    }`}
                  >
                    {offer.status === 'Active' ? t('offersPaused') : t('filterActive')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'users' && (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <button key={user.id} onClick={() => setSelectedUser(user)}
                className="w-full bg-card border border-border rounded-2xl p-4 hover:border-[#10b981]/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: user.color }}>
                    {user.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${
                        user.status === 'Active' ? 'bg-[#10b981]/10 text-[#10b981]' :
                        user.status === 'Invited' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {user.status === 'Active' ? t('filterActive') : user.status === 'Invited' ? t('invited') : t('filterSuspended')}
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
        )}
      </div>

      {menuOpen !== null && (
        <div className="fixed inset-0 z-[5]" onClick={() => setMenuOpen(null)} />
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={() => setSelectedUser(null)}>
          <div className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: selectedUser.color }}>
                  {selectedUser.initials}
                </div>
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedUser.maskedEmail}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-background rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-2">{t('communities')}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.communities.map((c) => (
                    <span key={c} className="text-xs px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full">{c}</span>
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
            <button onClick={() => handleToggleStatus(selectedUser.id)}
              className={`w-full py-3 rounded-2xl font-medium transition-colors ${selectedUser.status === 'Active' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20'}`}>
              {selectedUser.status === 'Active' ? t('suspendUser') : t('restoreUser')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
