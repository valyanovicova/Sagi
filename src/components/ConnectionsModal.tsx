import { X, Search, MapPin, UserPlus, Users, Sparkles, Send, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

interface Person {
  id: number;
  name: string;
  role: string;
  location: string;
  initials: string;
  color: string;
  tags: string[];
  connections: number;
  projects: number;
  years: number;
  mutualCount: number;
  mutualNames: string[];
  aiSummary: [string, string, string];
  socials: { linkedin?: string; instagram?: string; telegram?: string; whatsapp?: string; website?: string };
}

const CONNECTED: Person[] = [
  { id: 1,  name: 'Aizat Bekova',     role: 'Product Manager',   location: 'Almaty, Kazakhstan', initials: 'AB', color: '#7c6af0', tags: ['PropTech','Agile','B2B'],        connections: 14, projects: 8,  years: 7,  mutualCount: 3, mutualNames: ['Madina','Areli','Arman'],   aiSummary: ['Strong product sense across FMCG and PropTech domains.','Bridges business strategy and agile delivery in B2B contexts.','Well-connected across the community — 3 mutual contacts reachable.'], socials: { linkedin:'#', instagram:'#', telegram:'#' } },
  { id: 2,  name: 'Daniyar Seitkali', role: 'PropTech Founder',  location: 'Astana, Kazakhstan', initials: 'DS', color: '#f06a6a', tags: ['Investment','Real Estate','AI'], connections: 22, projects: 5,  years: 9,  mutualCount: 5, mutualNames: ['Kamila','Timur','Ruslan'],  aiSummary: ['Founder-level operator with 9 years in real estate tech.','Actively seeking B2C distribution partners.','High-value node — 5 mutual connections make intro easy.'], socials: { linkedin:'#', whatsapp:'#', website:'#' } },
  { id: 3,  name: 'Areli Yakubova',   role: 'UX Designer',       location: 'Almaty, Kazakhstan', initials: 'AY', color: '#6af0b8', tags: ['Design','Research','Figma'],     connections: 9,  projects: 12, years: 5,  mutualCount: 2, mutualNames: ['Aizat','Yana'],             aiSummary: ['Specialist in data-driven UX for fintech and proptech.','Portfolio spans 12 projects.','Good fit for product teams needing research-backed design.'], socials: { linkedin:'#', instagram:'#', website:'#' } },
  { id: 4,  name: 'Timur Zhaihanov',  role: 'Backend Engineer',  location: 'Astana, Kazakhstan', initials: 'TZ', color: '#f0c46a', tags: ['Python','FastAPI','GIS'],         connections: 11, projects: 19, years: 6,  mutualCount: 4, mutualNames: ['Yana','Bekkali','Daniyar'], aiSummary: ['Rare GIS + backend skill combination valuable for PropTech mapping.','19 completed projects signals high reliability.','Potential technical co-founder for geo-heavy products.'], socials: { linkedin:'#', telegram:'#', whatsapp:'#' } },
  { id: 5,  name: 'Kamila Duzhan',    role: 'Investor Analyst',  location: 'Almaty, Kazakhstan', initials: 'KD', color: '#f06ac8', tags: ['VC','Due Diligence','Kazakhstan'], connections: 31, projects: 3,  years: 8,  mutualCount: 6, mutualNames: ['Daniyar','Aslan','Ruslan'], aiSummary: ['Active deal-flow at pre-seed/seed stage.','Largest network — 31 connections, 6 mutuals.','Key gatekeeper: an intro through her can open investor doors.'], socials: { linkedin:'#', telegram:'#' } },
  { id: 6,  name: 'Arman Korov',      role: 'Marketing Lead',    location: 'Almaty, Kazakhstan', initials: 'AK', color: '#6aaff0', tags: ['Growth','SMM','Performance'],     connections: 18, projects: 7,  years: 4,  mutualCount: 3, mutualNames: ['Aizat','Areli','Madina'],   aiSummary: ['Proven growth marketer with 3 startup exits.','Community-led approach aligns with residential product models.','Can amplify launches via performance and organic channels.'], socials: { linkedin:'#', instagram:'#', telegram:'#' } },
  { id: 7,  name: 'Yana Smailova',    role: 'Data Scientist',    location: 'Astana, Kazakhstan', initials: 'YS', color: '#a8f06a', tags: ['ML','NLP','Real Estate'],         connections: 7,  projects: 11, years: 5,  mutualCount: 2, mutualNames: ['Areli','Bekkali'],          aiSummary: ['Top-tier ML practitioner with Kaggle gold.','Her valuation models applicable to PropTech pricing.','Small but tight network — early outreach recommended.'], socials: { linkedin:'#', telegram:'#', website:'#' } },
  { id: 8,  name: 'Aslan Kasenov',    role: 'PropTech Lawyer',   location: 'Almaty, Kazakhstan', initials: 'AK', color: '#f0906a', tags: ['Deals','Regulation','KZ'],        connections: 13, projects: 4,  years: 12, mutualCount: 2, mutualNames: ['Kamila','Ruslan'],          aiSummary: ['12 years of legal expertise in PropTech KZ.','Essential for regulatory compliance and deal structuring.','Reachable via Kamila or Ruslan.'], socials: { linkedin:'#', whatsapp:'#' } },
  { id: 9,  name: 'Madina Ilyasova',  role: 'Community Manager', location: 'Astana, Kazakhstan', initials: 'MI', color: '#c86af0', tags: ['Events','Network','RC'],          connections: 40, projects: 6,  years: 3,  mutualCount: 7, mutualNames: ['Aizat','Areli','Saniya'],   aiSummary: ['Most networked — 40 connections, 7 mutuals.','Launched 3 resident clubs.','Ideal partner for in-building events.'], socials: { linkedin:'#', instagram:'#', telegram:'#' } },
  { id: 10, name: 'Ruslan Akhmetov',  role: 'RE Developer',      location: 'Astana, Kazakhstan', initials: 'RA', color: '#6af0e0', tags: ['Construction','Elite','PPP'],     connections: 25, projects: 9,  years: 15, mutualCount: 4, mutualNames: ['Daniyar','Kamila','Saniya'], aiSummary: ['15 years in elite real estate development.','Seeking PPP and infrastructure co-investment partners.','Best approached with a concrete proposal.'], socials: { linkedin:'#', whatsapp:'#', website:'#' } },
];

const SENT: Person[] = [
  { id: 11, name: 'Saniya Bekturova',     role: 'Architect',         location: 'Astana, Kazakhstan', initials: 'SB', color: '#f0e06a', tags: ['BIM','Astana','Masterplan'],      connections: 8,  projects: 14, years: 10, mutualCount: 3, mutualNames: ['Madina','Ruslan','Timur'],  aiSummary: ['BIM-fluent architect focused on Astana urban development.','14 completed projects in high-complexity builds.','Urban Forum network gives city-level access.'], socials: { linkedin:'#', instagram:'#', website:'#' } },
  { id: 12, name: 'Bekkali Seitkali',    role: 'Startup Founder',   location: 'Almaty, Kazakhstan', initials: 'BS', color: '#70f06a', tags: ['CleanTech','B2B SaaS','Seed'],    connections: 16, projects: 2,  years: 3,  mutualCount: 3, mutualNames: ['Timur','Yana','Madina'],    aiSummary: ['Early-stage CleanTech founder for RC waste management.','Needs pilot sites — intro to RC managers is high-value.','Seed-stage: good fit for investors.'], socials: { linkedin:'#', telegram:'#', whatsapp:'#' } },
  { id: 13, name: 'Dias Omarov',         role: 'Blockchain Dev',    location: 'Almaty, Kazakhstan', initials: 'DO', color: '#6a8af0', tags: ['Web3','Smart Contracts','DeFi'],  connections: 10, projects: 4,  years: 5,  mutualCount: 2, mutualNames: ['Daniyar','Bekkali'],        aiSummary: ['Rare blockchain-real estate hybrid developer.','Tokenized property ownership is his core focus.','High strategic value for Web3-forward projects.'], socials: { linkedin:'#', telegram:'#', website:'#' } },
];

const PENDING_DATA: Person[] = [
  { id: 14, name: 'Aliya Nurmagambetova', role: 'HR Director',       location: 'Almaty, Kazakhstan', initials: 'AN', color: '#f09a6a', tags: ['Talent','PropTech','Culture'],   connections: 19, projects: 6,  years: 8,  mutualCount: 3, mutualNames: ['Aizat','Arman','Madina'],   aiSummary: ['Specializes in scaling tech teams from 10 to 100+.','Strong cross-industry network for PropTech hiring.','Reach through Aizat or Arman for a warm intro.'], socials: { linkedin:'#', instagram:'#', telegram:'#' } },
  { id: 15, name: 'Farida Bekmuratova',   role: 'Financial Analyst', location: 'Astana, Kazakhstan', initials: 'FB', color: '#f06a80', tags: ['FinTech','Modeling','KZ Market'], connections: 17, projects: 7,  years: 6,  mutualCount: 4, mutualNames: ['Kamila','Ruslan','Daniyar'], aiSummary: ['CFA-track analyst with KZ real estate fund modeling.','Ideal for structuring investment vehicles or REITs.','Best reached through Kamila.'], socials: { linkedin:'#', whatsapp:'#' } },
];

type TabKey = 'connected' | 'sent' | 'pending';

function FriendsOfFriend({ person, onClose }: { person: Person; onClose: () => void }) {
  const friends = CONNECTED.filter(p => p.id !== person.id).slice(0, person.connections);
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <>
      <div className="fixed inset-0 z-[80] flex flex-col justify-end items-center" onClick={onClose}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-card rounded-t-3xl flex flex-col w-full max-w-md" style={{ maxHeight: '75vh', paddingBottom: '80px' }} onClick={e => e.stopPropagation()}>
          <div className="flex justify-center pt-3 pb-1 shrink-0"><div className="w-10 h-1 rounded-full bg-border" /></div>
          <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
            <div>
              <h3 className="font-semibold">{person.name}'s Connections</h3>
              <p className="text-xs text-muted-foreground">{person.connections} connections</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center"><X className="w-4 h-4" /></button>
          </div>
          <div className="overflow-y-auto flex-1 px-4 py-3 space-y-2 pb-8">
            {friends.map(f => (
              <button
                key={f.id}
                onClick={() => setSelected(f)}
                className="w-full flex items-center gap-3 bg-input-background rounded-2xl px-3 py-3 hover:bg-border/40 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: f.color + '20', border: `2px solid ${f.color}`, color: f.color }}>{f.initials}</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{f.role}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">{f.location}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && <ProfileSheet person={selected} onClose={() => setSelected(null)} connected={false} zIndex={90} />}
    </>
  );
}

function ProfileSheet({ person, onClose, connected, zIndex = 70 }: { person: Person; onClose: () => void; connected: boolean; zIndex?: number }) {
  const [showFriends, setShowFriends] = useState(false);
  return (
    <div className="fixed inset-0 flex flex-col justify-end items-center" style={{ zIndex }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-t-3xl p-6 pb-24 max-h-[82vh] overflow-y-auto w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{ background: person.color + '20', border: `2px solid ${person.color}`, color: person.color }}>
            {person.initials}
          </div>
          <div>
            <div className="font-bold text-base">{person.name}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{person.role}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" /><span>{person.location}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="font-medium text-foreground">{person.mutualCount}</span> mutual connections
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {person.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">{tag}</span>
          ))}
        </div>

        <button
          onClick={() => connected && setShowFriends(true)}
          disabled={!connected}
          className="w-full flex items-center justify-between bg-muted/40 rounded-2xl p-4 mb-5 transition-colors"
          style={connected ? { cursor: 'pointer' } : { opacity: 0.5, cursor: 'default' }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Connections</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">{person.connections}</span>
            {connected && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            {!connected && <span className="text-[10px] text-muted-foreground">Available after connect</span>}
          </div>
        </button>

        <div className="bg-muted/40 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span className="text-xs font-semibold text-[#10b981]">AI Analysis</span>
          </div>
          <ul className="space-y-2">
            {person.aiSummary.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: person.color }} />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground mb-5">
          Reach via: <span className="text-foreground font-medium">{person.mutualNames.join(', ')}</span>
        </p>

        {connected ? (
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {person.socials.linkedin && <a href={person.socials.linkedin} className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground text-xs font-medium min-w-[70px]"><LinkedInIcon /> LinkedIn</a>}
            {person.socials.instagram && <a href={person.socials.instagram} className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground text-xs font-medium min-w-[70px]"><InstagramIcon /> Instagram</a>}
            {person.socials.whatsapp && <a href={person.socials.whatsapp} className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground text-xs font-medium min-w-[70px]"><MessageCircle className="w-4 h-4" /> WhatsApp</a>}
            {person.socials.telegram && <a href={person.socials.telegram} className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground text-xs font-medium min-w-[70px]"><Send className="w-4 h-4" /> Telegram</a>}
            {person.socials.website && <a href={person.socials.website} className="flex items-center gap-1.5 flex-1 justify-center py-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground text-xs font-medium min-w-[70px]"><Globe className="w-4 h-4" /> Website</a>}
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-5 p-3 rounded-2xl bg-muted/40 border border-border">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Social links are visible after the connection is accepted.</p>
          </div>
        )}

      </div>
      {showFriends && <FriendsOfFriend person={person} onClose={() => setShowFriends(false)} />}
    </div>
  );
}

export function ConnectionsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<TabKey>('connected');
  const [search, setSearch] = useState('');
  const [pendingList, setPendingList] = useState(PENDING_DATA);
  const [selected, setSelected] = useState<Person | null>(null);

  const currentData = activeTab === 'pending' ? pendingList : activeTab === 'sent' ? SENT : CONNECTED;

  const filtered = currentData.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase())
  );

  const counts = { connected: CONNECTED.length, sent: SENT.length, pending: pendingList.length };

  const TABS = [
    { key: 'connected' as TabKey, label: 'Connected' },
    { key: 'sent'      as TabKey, label: 'Sent'      },
    { key: 'pending'   as TabKey, label: 'Approve'   },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex flex-col justify-end items-center"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="w-full max-w-md bg-card rounded-t-3xl flex flex-col" style={{ maxHeight: '88vh' }}>
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          <div className="flex items-center justify-between px-5 py-3 shrink-0">
            <div>
              <h2 className="text-lg font-semibold">Connections</h2>
              <p className="text-xs text-muted-foreground">{CONNECTED.length + SENT.length + pendingList.length} total</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-4 pb-3 shrink-0">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSearch(''); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all"
                style={activeTab === tab.key
                  ? { background: '#10b981', color: '#fff' }
                  : { background: 'var(--input-background)', color: 'var(--muted-foreground)' }}
              >
                {tab.label}
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={activeTab === tab.key
                    ? { background: 'rgba(255,255,255,0.25)', color: '#fff' }
                    : { background: tab.key === 'pending' && counts.pending > 0 ? '#f59e0b' : 'rgba(0,0,0,0.08)', color: tab.key === 'pending' && counts.pending > 0 ? '#fff' : 'inherit' }}
                >
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-4 pb-3 shrink-0">
            <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5 bg-input-background">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
              {search && <button onClick={() => setSearch('')} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>}
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 px-4 pb-24 space-y-2">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-12 gap-3">
                <UserPlus className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  {search ? `No results for "${search}"` : 'Nothing here yet'}
                </p>
              </div>
            )}
            {filtered.map(person => (
              <div key={person.id} className="flex items-center gap-3 bg-input-background rounded-2xl px-3 py-3">
                <button
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                  onClick={() => setSelected(person)}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: person.color + '20', border: `2px solid ${person.color}`, color: person.color }}>
                    {person.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{person.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{person.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">{person.location}</span>
                    </div>
                  </div>
                </button>

                {activeTab === 'pending' && (
                  <div className="shrink-0 flex gap-1.5">
                    <button
                      onClick={() => setPendingList(prev => prev.filter(p => p.id !== person.id))}
                      className="text-xs px-2.5 py-1.5 rounded-xl bg-muted text-muted-foreground hover:bg-border transition-colors"
                    >Decline</button>
                    <button
                      onClick={() => setPendingList(prev => prev.filter(p => p.id !== person.id))}
                      className="text-xs px-2.5 py-1.5 rounded-xl bg-[#10b981] text-white hover:bg-[#059669] transition-colors font-medium"
                    >Accept</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <ProfileSheet person={selected} onClose={() => setSelected(null)} connected={activeTab === 'connected'} />}
    </>
  );
}
