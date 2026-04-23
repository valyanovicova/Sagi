import { useState, useRef } from 'react';
import {
  ChevronLeft, Pencil, GripVertical, Plus, ToggleLeft, ToggleRight,
  Users, Building2, Tag, TrendingUp, MoreHorizontal, ImagePlus, ShieldCheck, X,
  List, Check, Trash2, Copy, MapPin, Globe
} from 'lucide-react';
import { Link } from 'react-router';

// ── Types ──────────────────────────────────────────────────────────────────
type ItemStatus = 'active' | 'draft';
type FieldType = 'text' | 'number' | 'select' | 'date' | 'toggle';

interface SchemaField {
  id: number;
  name: string;
  type: FieldType;
  options?: string; // comma-separated for select type
}

interface ContentItem {
  id: number;
  title: string;
  sub: string;
  points?: number;
  status: ItemStatus;
  image?: string;
}

interface Tab {
  key: string;
  label: string;
  icon: string;
  schema: SchemaField[];
  items: ContentItem[];
}

const initialTabs: Tab[] = [
  {
    key: 'offers', label: 'Offers', icon: '🏷️', schema: [],
    items: [
      { id: 1, title: '10% off beverages & food', sub: 'Master Coffee', status: 'active' },
      { id: 2, title: '15% off best available rate', sub: 'Wyndham Garden Astana', status: 'active' },
      { id: 3, title: '10% off services', sub: 'Rafe Beauty Lounge', status: 'active' },
      { id: 4, title: 'Corporate discount', sub: 'Air Astana', status: 'draft' },
    ],
  },
  {
    key: 'events', label: 'Events', icon: '📅', schema: [],
    items: [
      { id: 1, title: 'AIFC Startup Pitch Day', sub: 'May 15 · Floor 4 Auditorium', status: 'active' },
      { id: 2, title: 'FinTech Forum 2026', sub: 'May 22 · AIFC Congress Hall', status: 'active' },
      { id: 3, title: 'Networking Breakfast', sub: 'Jun 3 · Lounge B', status: 'draft' },
    ],
  },
  {
    key: 'tasks', label: 'Tasks', icon: '✅', schema: [],
    items: [
      { id: 1, title: 'Complete AIFC onboarding', sub: '', points: 50, status: 'active' },
      { id: 2, title: 'Use 3 partner offers', sub: '', points: 100, status: 'active' },
      { id: 3, title: 'Refer a colleague', sub: '', points: 150, status: 'active' },
    ],
  },
  {
    key: 'vacancies', label: 'Vacancies', icon: '💼', schema: [],
    items: [
      { id: 1, title: 'Senior Compliance Officer', sub: 'AIFC Authority · Full-time', status: 'active' },
      { id: 2, title: 'FinTech Analyst', sub: 'Astana Finance · Full-time', status: 'active' },
      { id: 3, title: 'UX Designer', sub: 'Horizon Tech · Contract', status: 'draft' },
    ],
  },
  {
    key: 'news', label: 'News', icon: '📰', schema: [],
    items: [
      { id: 1, title: 'AIFC hits 570 resident members', sub: 'Apr 1, 2026 · Broadcast', status: 'active' },
      { id: 2, title: 'New partner: Bronx Fitness', sub: 'Mar 20, 2026 · Broadcast', status: 'active' },
      { id: 3, title: 'Spring Offers Campaign', sub: 'Draft · Not published', status: 'draft' },
    ],
  },
  {
    key: 'members', label: 'Members', icon: '👥', schema: [],
    items: [
      { id: 1, title: 'Alima Alieva', sub: 'Resident · Since Jan 2024', status: 'active' },
      { id: 2, title: 'Bakyt Nurlanov', sub: 'Resident · Since Feb 2024', status: 'active' },
    ],
  },
  {
    key: 'resources', label: 'Resources', icon: '📚', schema: [],
    items: [
      { id: 1, title: 'AIFC Resident Guide 2026', sub: 'PDF · Updated Apr 2026', status: 'active' },
      { id: 2, title: 'Community Rules', sub: 'PDF · Draft', status: 'draft' },
    ],
  },
  {
    key: 'partners', label: 'Partners', icon: '🤝', schema: [],
    items: [
      { id: 1, title: 'Wyndham Garden Astana', sub: 'Hotel · Active partner', status: 'active' },
      { id: 2, title: 'Air Astana', sub: 'Travel · Active partner', status: 'active' },
    ],
  },
  {
    key: 'gallery', label: 'Gallery', icon: '🖼️', schema: [],
    items: [
      { id: 1, title: 'AIFC Opening Ceremony', sub: 'Apr 2026 · 24 photos', status: 'active' },
    ],
  },
];

// ── Construct Module Modal ─────────────────────────────────────────────────
interface ConstructModuleProps {
  onSave: (tab: Tab) => void;
  onClose: () => void;
}

const MODULE_TYPES: { value: string; label: string; icon: string; desc: string }[] = [
  { value: 'offers',     label: 'Offers',         icon: '🏷️', desc: 'Discounts & deals'     },
  { value: 'events',     label: 'Events',         icon: '📅', desc: 'Community events'       },
  { value: 'tasks',      label: 'Tasks',          icon: '✅', desc: 'Missions & challenges'  },
  { value: 'vacancies',  label: 'Vacancies',      icon: '💼', desc: 'Job listings'           },
  { value: 'news',       label: 'News',           icon: '📰', desc: 'Broadcasts & updates'  },
  { value: 'members',    label: 'Member List',    icon: '👥', desc: 'People directory'       },
  { value: 'resources',  label: 'Resources',      icon: '📚', desc: 'Links & documents'      },
  { value: 'custom',     label: 'Custom',         icon: '✨', desc: 'Start from scratch'     },
];

function ConstructModuleSheet({ onSave, onClose }: ConstructModuleProps) {
  const [moduleName, setModuleName] = useState('');
  const [moduleType, setModuleType] = useState('');

  const selectedType = MODULE_TYPES.find((t) => t.value === moduleType);

  const handleSave = () => {
    const name = moduleName.trim();
    if (!name || !moduleType) return;
    const icon = selectedType?.icon ?? '📋';
    const key = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    onSave({ key, label: name, icon, schema: [], items: [] });
  };

  const ready = moduleName.trim() && moduleType;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-t-3xl flex flex-col"
        style={{
          background: 'linear-gradient(160deg, rgba(8,22,14,0.98) 0%, rgba(4,12,8,0.99) 100%)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderBottom: 'none',
          boxShadow: '0 -6px 32px rgba(16,185,129,0.10)',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/10" />
        </div>

        {/* scrollable body — includes save button so it's never hidden */}
        <div className="px-5 pt-2 pb-6 space-y-5 overflow-y-auto flex-1">
          {/* Title row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedType?.icon ?? '📋'}</span>
              <p className="text-base font-bold text-white">New Module</p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-white/40" />
            </button>
          </div>

          {/* Module name */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-medium">Module name</label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g. Offers, News, Family Members…"
              autoFocus
              className="w-full px-4 py-3 text-sm text-white placeholder-white/20 rounded-2xl focus:outline-none transition-colors"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          {/* Module type grid */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-medium">Module type</label>
            <div className="grid grid-cols-4 gap-2">
              {MODULE_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setModuleType(t.value)}
                  className="flex flex-col items-center gap-1 py-3 rounded-2xl transition-all active:scale-95"
                  style={{
                    background: moduleType === t.value ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.03)',
                    border: moduleType === t.value ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: moduleType === t.value ? '0 0 12px rgba(16,185,129,0.12)' : 'none',
                  }}
                >
                  <span className="text-xl leading-none">{t.icon}</span>
                  <span
                    className="text-[10px] font-medium leading-tight text-center"
                    style={{ color: moduleType === t.value ? '#10b981' : 'rgba(255,255,255,0.4)' }}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Save button — inside scroll so it's always reachable */}
          <button
            onClick={handleSave}
            disabled={!ready}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
            style={{
              background: ready
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'rgba(255,255,255,0.06)',
              boxShadow: ready ? '0 4px 0 #047857, 0 6px 20px rgba(16,185,129,0.25)' : 'none',
              opacity: ready ? 1 : 0.35,
              cursor: ready ? 'pointer' : 'not-allowed',
            }}
          >
            <Check className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export function AdminCommunityBuilder() {
  const [adminMode, setAdminMode] = useState(true);
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [location, setLocation] = useState('Astana, Kazakhstan');
  const [editingLocation, setEditingLocation] = useState(false);
  const [locationDraft, setLocationDraft] = useState('');
  const [tags, setTags] = useState<string[]>(['FinTech', 'PropTech', 'Investment']);
  const [tagInput, setTagInput] = useState('');
  const [editingTags, setEditingTags] = useState(false);
  const [activeKey, setActiveKey] = useState('offers');
  const [showConstructSheet, setShowConstructSheet] = useState(false);

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSub, setEditSub] = useState('');
  const [editPoints, setEditPoints] = useState('');

  const startEdit = (item: ContentItem) => {
    setEditingItemId(item.id);
    setEditTitle(item.title);
    setEditSub(item.sub);
    setEditPoints(item.points != null ? String(item.points) : '');
    setMenuOpenId(null);
  };

  const saveEdit = () => {
    const pts = parseInt(editPoints, 10);
    setTabs(prev => prev.map(t => t.key === activeKey
      ? { ...t, items: t.items.map(i => i.id === editingItemId
          ? { ...i, title: editTitle.trim() || i.title, sub: editSub.trim(), points: isNaN(pts) ? undefined : pts }
          : i) }
      : t
    ));
    setEditingItemId(null);
  };

  // new item within current tab
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemSub, setNewItemSub] = useState('');
  const [newItemPoints, setNewItemPoints] = useState('');
  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  const addPhotoRef = useRef<HTMLInputElement | null>(null);

  const activeTab = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  const toggleStatus = (tabKey: string, id: number) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.key === tabKey
          ? { ...t, items: t.items.map((item) => item.id === id ? { ...item, status: item.status === 'active' ? 'draft' : 'active' } : item) }
          : t
      )
    );
  };

  const handleSaveModule = (tab: Tab) => {
    setTabs((prev) => [...prev, tab]);
    setActiveKey(tab.key);
    setShowConstructSheet(false);
  };

  const handleAddItem = () => {
    const title = newItemTitle.trim();
    if (!title) return;
    const pts = parseInt(newItemPoints, 10);
    setTabs((prev) =>
      prev.map((t) =>
        t.key === activeKey
          ? { ...t, items: [...t.items, { id: Date.now(), title, sub: newItemSub.trim(), points: isNaN(pts) ? undefined : pts, status: 'draft', image: newItemImage ?? undefined }] }
          : t
      )
    );
    setNewItemTitle('');
    setNewItemSub('');
    setNewItemPoints('');
    setNewItemImage(null);
    setShowAddItem(false);
  };

  const deleteTab = (key: string) => {
    const remaining = tabs.filter((t) => t.key !== key);
    setTabs(remaining);
    if (activeKey === key) setActiveKey(remaining[0]?.key ?? '');
  };

  const activeCount = activeTab?.items.filter((i) => i.status === 'active').length ?? 0;
  const draftCount  = activeTab?.items.filter((i) => i.status === 'draft').length ?? 0;

  return (
    <div className="min-h-screen bg-background pb-24 relative">

      {/* ── Banner ── */}
      <div className="relative h-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #020d07 0%, #071c12 40%, #0d3d26 70%, #0a2a1a 100%)' }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border border-white/5" />
        <div className="absolute left-1/3 -bottom-6 w-32 h-32 rounded-full border border-emerald-500/10" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 z-10">
          <Link to="/admin/communities"
            className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <button onClick={() => setAdminMode(!adminMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              adminMode
                ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 backdrop-blur-sm'
                : 'bg-black/30 text-white/60 border border-white/10 backdrop-blur-sm'
            }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Mode
            {adminMode ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          </button>
        </div>

        {adminMode && (
          <button className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors">
            <ImagePlus className="w-3.5 h-3.5" />
            Edit banner
          </button>
        )}
      </div>

      <div className="max-w-md mx-auto px-4">

        {/* ── Logo + Identity ── */}
        <div className="flex items-end gap-3 -mt-8 mb-4 relative z-10">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl border-2 border-background p-2">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path d="M32 6 A26 26 0 1 0 32 58 A26 26 0 0 0 56 38" fill="none" stroke="#008080" strokeWidth="7" strokeLinecap="round" />
                <path d="M32 16 A16 16 0 1 0 32 48 A16 16 0 0 0 46 40" fill="none" stroke="#008080" strokeWidth="5" strokeLinecap="round" />
                <circle cx="32" cy="32" r="4.5" fill="#111" />
              </svg>
            </div>
            {adminMode && (
              <button className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center shadow">
                <Pencil className="w-2.5 h-2.5 text-white" />
              </button>
            )}
          </div>
          <div className="pb-1 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold leading-tight">AIFC</h1>
              <span className="text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full font-medium">Active</span>
            </div>
            <p className="text-xs text-muted-foreground">Astana International Financial Centre</p>
            {!editingLocation ? (
              <button
                onClick={() => adminMode && (setLocationDraft(location), setEditingLocation(true))}
                className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground hover:text-[#10b981] transition-colors"
              >
                {location ? <><MapPin className="w-3 h-3 shrink-0" />{location}</> : <><Globe className="w-3 h-3 shrink-0" />Worldwide</>}
                {adminMode && <Pencil className="w-2.5 h-2.5 ml-0.5 opacity-50" />}
              </button>
            ) : (
              <div className="flex items-center gap-1 mt-1">
                <input
                  autoFocus
                  type="text"
                  value={locationDraft}
                  onChange={e => setLocationDraft(e.target.value)}
                  placeholder="City, Country or leave empty"
                  className="flex-1 text-xs px-2 py-1 rounded-lg bg-input-background border border-[#10b981]/40 outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={() => { setLocation(locationDraft.trim()); setEditingLocation(false); }} className="text-[#10b981]"><Check className="w-3.5 h-3.5" /></button>
                <button onClick={() => setEditingLocation(false)} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
              </div>
            )}
          </div>
        </div>

        {/* ── Bento Stats ── */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { icon: <Users className="w-4 h-4 text-[#10b981]" />, label: 'Members', value: '570' },
            { icon: <Building2 className="w-4 h-4 text-blue-400" />, label: 'Businesses', value: '42' },
            { icon: <Tag className="w-4 h-4 text-purple-400" />, label: 'Active Offers', value: '8' },
            { icon: <TrendingUp className="w-4 h-4 text-amber-400" />, label: 'Offer Usage', value: '682' },
          ].map((stat) => (
            <div key={stat.label}
              className="bg-card border border-border rounded-2xl p-3 flex items-center gap-2.5"
              style={{ boxShadow: '0 2px 0 0 rgba(16,185,129,0.04)' }}>
              <div className="w-8 h-8 rounded-xl bg-input-background flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
                <p className="text-base font-bold leading-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
              {tag}
              {adminMode && (
                <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-0.5 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {adminMode && (
            editingTags ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                      e.preventDefault();
                      const v = tagInput.trim().replace(/,$/, '');
                      if (v && !tags.includes(v)) setTags([...tags, v]);
                      setTagInput('');
                    }
                  }}
                  placeholder="Add tag..."
                  className="text-xs px-2 py-1 rounded-xl bg-input-background border border-[#10b981]/40 outline-none w-24 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => {
                    const v = tagInput.trim();
                    if (v && !tags.includes(v)) setTags([...tags, v]);
                    setTagInput('');
                    setEditingTags(false);
                  }}
                  className="text-[#10b981]"
                ><Check className="w-3.5 h-3.5" /></button>
                <button onClick={() => { setTagInput(''); setEditingTags(false); }} className="text-muted-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button onClick={() => setEditingTags(true)} className="text-xs px-3 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:border-[#10b981]/50 hover:text-[#10b981] transition-colors">
                + tag
              </button>
            )
          )}
        </div>

        {/* ── Tab bar ── */}
        <div
          className="border border-border rounded-2xl mb-3 relative"
          style={{
            background: 'var(--color-card)',
            boxShadow: '0 3px 0 0 rgba(16,185,129,0.06)',
          }}
        >
          {/* Subtle node-graph pattern in background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="nodes" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                {/* connector lines */}
                <line x1="4" y1="4" x2="20" y2="20" stroke="#10b981" strokeWidth="0.8" />
                <line x1="20" y1="20" x2="36" y2="4" stroke="#10b981" strokeWidth="0.8" />
                <line x1="20" y1="20" x2="20" y2="36" stroke="#10b981" strokeWidth="0.8" />
                {/* nodes */}
                <circle cx="4"  cy="4"  r="2" fill="none" stroke="#10b981" strokeWidth="0.8" />
                <circle cx="36" cy="4"  r="2" fill="none" stroke="#10b981" strokeWidth="0.8" />
                <circle cx="20" cy="20" r="2.5" fill="#10b981" opacity="0.6" />
                <circle cx="20" cy="36" r="1.5" fill="none" stroke="#10b981" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nodes)" />
          </svg>

          <div className="flex overflow-x-auto scrollbar-hide relative z-10 w-full">
            {tabs.map((tab) => (
              <div key={tab.key} className="flex items-center flex-shrink-0 relative group">
                <button
                  onClick={() => setActiveKey(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeKey === tab.key
                      ? 'text-[#10b981] border-[#10b981]'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  {adminMode && <GripVertical className="w-3 h-3 text-muted-foreground/30 flex-shrink-0" />}
                  <span className="text-sm leading-none">{tab.icon}</span>
                  {tab.label}
                </button>
                {adminMode && !initialTabs.find((t) => t.key === tab.key) && (
                  <button
                    onClick={() => deleteTab(tab.key)}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-2.5 h-2.5 text-white" />
                  </button>
                )}
              </div>
            ))}

            {/* ── Pro Mode Edit badge ── sits right after the last tab ── */}
            {adminMode && (
              <div className="flex items-center px-2 py-1.5 flex-shrink-0 self-center">
                <button
                  onClick={() => setShowConstructSheet(true)}
                  title="Construct new module (Pro)"
                  className="relative flex items-center justify-center w-7 h-7 rounded-lg transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.10) 100%)',
                    border: '1px solid rgba(16,185,129,0.35)',
                    boxShadow: '0 0 10px rgba(16,185,129,0.20), 0 2px 0 0 rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Pencil className="w-3.5 h-3.5 text-[#10b981]" />
                  {/* tiny PRO dot */}
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-[7px] font-black text-white leading-none"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 1px 4px rgba(16,185,129,0.5)' }}
                  >P</span>
                </button>
              </div>
            )}

            {adminMode && (
              <div className="flex items-center pl-1 pr-3 flex-shrink-0 self-center">
                <button
                  onClick={() => setShowConstructSheet(true)}
                  title="Add new list"
                  className="w-7 h-7 rounded-xl flex items-center justify-center transition-all active:scale-95 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 3px 0 #047857, 0 4px 10px rgba(16,185,129,0.35)',
                  }}
                >
                  <Plus className="w-4 h-4 text-white" strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Add Module row ── */}
        {adminMode && (
          <button
            onClick={() => setShowConstructSheet(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 mb-3 rounded-2xl text-xs font-semibold transition-all active:scale-[0.98] hover:brightness-110"
            style={{
              background: 'rgba(16,185,129,0.07)',
              border: '1px dashed rgba(16,185,129,0.3)',
              color: '#10b981',
            }}
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add module
          </button>
        )}

        {/* ── Tab content ── */}
        {activeTab && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-full font-medium">{activeCount} active</span>
                {draftCount > 0 && (
                  <span className="text-xs px-2 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full font-medium">{draftCount} draft</span>
                )}
              </div>
              {adminMode && (
                <button onClick={() => setShowAddItem(true)}
                  className="flex items-center gap-1 text-xs text-[#10b981] font-medium hover:text-[#059669] transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add item
                </button>
              )}
            </div>

            {/* Add item form */}
            {showAddItem && (
              <div className="mb-3 bg-card border border-[#10b981]/40 rounded-2xl p-3 space-y-2">
                <input type="text" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="Title…" autoFocus
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm" />
                <input type="text" value={newItemSub} onChange={(e) => setNewItemSub(e.target.value)}
                  placeholder="Subtitle / detail (optional)"
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm" />
                <div className="relative">
                  <input type="number" min="0" value={newItemPoints} onChange={(e) => setNewItemPoints(e.target.value)}
                    placeholder="Points reward (optional)"
                    className="w-full px-3 py-2 pr-10 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">pts</span>
                </div>

                {/* Photo upload */}
                <input
                  ref={addPhotoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) setNewItemImage(URL.createObjectURL(file));
                    e.target.value = '';
                  }}
                />
                {newItemImage ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={newItemImage} alt="preview" className="w-full h-32 object-cover" />
                    <button
                      onClick={() => setNewItemImage(null)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => addPhotoRef.current?.click()}
                    className="w-full py-2.5 border border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-xs text-muted-foreground hover:border-[#10b981]/50 hover:text-[#10b981] transition-colors"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Add photo (optional)
                  </button>
                )}

                <div className="flex gap-2">
                  <button onClick={handleAddItem} disabled={!newItemTitle.trim()}
                    className="flex-1 py-2 bg-[#10b981] text-white rounded-xl text-sm font-medium disabled:opacity-40">Add</button>
                  <button onClick={() => { setShowAddItem(false); setNewItemTitle(''); setNewItemSub(''); setNewItemPoints(''); setNewItemImage(null); }}
                    className="px-4 py-2 bg-input-background text-muted-foreground rounded-xl text-sm">Cancel</button>
                </div>
              </div>
            )}

            {/* Content cards */}
            <div className="space-y-2">
              {activeTab.items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground/40">
                  <List className="w-8 h-8 mb-2" />
                  <p className="text-sm">No items yet</p>
                  {adminMode && (
                    <button onClick={() => setShowAddItem(true)} className="mt-3 text-xs text-[#10b981]">
                      + Add first item
                    </button>
                  )}
                </div>
              )}
              {activeTab.items.map((item) => (
                <div key={item.id}
                  className={`bg-card rounded-2xl border transition-all ${item.status === 'active' ? 'border-border' : 'border-dashed border-border/50 opacity-70'}`}
                  style={{ boxShadow: item.status === 'active' ? '0 2px 0 0 rgba(16,185,129,0.05)' : 'none' }}>
                  <div className="flex items-center gap-3 p-3">
                    {adminMode && <GripVertical className="w-4 h-4 text-muted-foreground/30 flex-shrink-0 cursor-grab" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${
                          item.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                        }`}>{item.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.sub && <p className="text-xs text-muted-foreground truncate">{item.sub}</p>}
                        {item.points != null && (
                          <span className="flex-shrink-0 text-xs px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded-full font-semibold">
                            +{item.points} pts
                          </span>
                        )}
                      </div>
                    </div>
                    {adminMode && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => toggleStatus(activeKey, item.id)} title={item.status === 'active' ? 'Set to draft' : 'Publish'}>
                          {item.status === 'active'
                            ? <ToggleRight className="w-6 h-6 text-[#10b981]" />
                            : <ToggleLeft className="w-6 h-6 text-muted-foreground/50" />}
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-input-background transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                          {menuOpenId === item.id && (
                            <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[140px]">
                              <button
                                onClick={() => startEdit(item)}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-input-background transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setTabs(prev => prev.map(t => t.key === activeKey
                                    ? { ...t, items: [...t.items, { ...item, id: Date.now(), title: item.title + ' (copy)' }] }
                                    : t
                                  ));
                                  setMenuOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-input-background transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                                Duplicate
                              </button>
                              <div className="border-t border-border" />
                              <button
                                onClick={() => {
                                  setTabs(prev => prev.map(t => t.key === activeKey
                                    ? { ...t, items: t.items.filter(i => i.id !== item.id) }
                                    : t
                                  ));
                                  setMenuOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Inline edit form */}
                  {editingItemId === item.id && (
                    <div className="px-3 pb-3 pt-1 border-t border-border space-y-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        autoFocus
                        className="w-full px-3 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={editSub}
                        onChange={(e) => setEditSub(e.target.value)}
                        placeholder="Subtitle (optional)"
                        className="w-full px-3 py-2 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm"
                      />
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          value={editPoints}
                          onChange={(e) => setEditPoints(e.target.value)}
                          placeholder="Points (optional)"
                          className="w-full px-3 py-2 pr-10 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">pts</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="flex-1 py-2 bg-[#10b981] text-white rounded-xl text-sm font-medium hover:bg-[#059669] transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="px-4 py-2 bg-input-background text-muted-foreground rounded-xl text-sm hover:text-foreground transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {menuOpenId !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpenId(null)} />
      )}

      {/* ── Construct Module Sheet ── */}
      {showConstructSheet && (
        <ConstructModuleSheet
          onSave={handleSaveModule}
          onClose={() => setShowConstructSheet(false)}
        />
      )}
    </div>
  );
}
