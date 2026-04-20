import { useState } from 'react';
import { X, Phone, UserPlus, Search, Users, Clock } from 'lucide-react';

interface PhoneContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  pending: boolean;
}

const STORAGE_KEY = 'sagi_phone_contacts';

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function nameColor(name: string) {
  const palette = ['#7c6af0', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6', '#f97316'];
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) & 0xffff;
  return palette[h % palette.length];
}


export function ContactsModal({ onClose }: { onClose: () => void }) {
  const [contacts, setContacts] = useState<PhoneContact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [importing, setImporting] = useState(false);
  const [search, setSearch] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');

  const apiSupported = typeof navigator !== 'undefined' && 'contacts' in navigator;

  const persist = (list: PhoneContact[]) => {
    setContacts(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const importFromPhone = async () => {
    setImporting(true);
    try {
      const results = await (navigator as any).contacts.select(['name', 'tel', 'email'], { multiple: true });
      const existing = new Set(contacts.map(c => c.name));
      const added: PhoneContact[] = results
        .filter((r: any) => r.name?.[0] && !existing.has(r.name[0]))
        .map((r: any) => ({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2),
          name: r.name[0],
          phone: r.tel?.[0],
          email: r.email?.[0],
          pending: false,
        }));
      persist([...contacts, ...added]);
    } catch {
      // user cancelled
    }
    setImporting(false);
  };

  const addManual = () => {
    if (!manualName.trim()) return;
    const c: PhoneContact = {
      id: Date.now().toString(36),
      name: manualName.trim(),
      phone: manualPhone.trim() || undefined,
      pending: false,
    };
    persist([...contacts, c]);
    setManualName('');
    setManualPhone('');
    setShowManual(false);
  };

  const togglePending = (id: string) => {
    persist(contacts.map(c => c.id === id ? { ...c, pending: !c.pending } : c));
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone ?? '').includes(search)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end items-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md bg-card rounded-t-3xl flex flex-col"
        style={{ maxHeight: '88vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#10b981]" />
            <h2 className="text-lg font-semibold">Contacts</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Import + search */}
        <div className="px-4 py-3 shrink-0 space-y-2.5">
          <div className="flex gap-2">
            <button
              onClick={apiSupported ? importFromPhone : () => alert('Contact import is only available on Android Chrome. Please add contacts manually.')}
              disabled={importing}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-opacity"
              style={{
                background: 'rgba(16,185,129,0.12)',
                color: '#10b981',
                border: '1px solid rgba(16,185,129,0.3)',
                opacity: importing ? 0.6 : 1,
              }}
            >
              <Phone className="w-4 h-4" />
              {importing ? 'Importing…' : 'Import from Phone'}
            </button>

            <button
              onClick={() => setShowManual(v => !v)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-colors"
              style={{
                background: showManual ? 'rgba(16,185,129,0.18)' : 'rgba(16,185,129,0.06)',
                color: '#10b981',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <UserPlus className="w-4 h-4" />
              Add Manually
            </button>
          </div>

          {contacts.length > 0 && (
            <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5 bg-input-background">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search contacts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-muted-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Manual add form */}
        {showManual && (
          <div className="px-4 pb-3 shrink-0 space-y-2 border-b border-border">
            <input
              type="text"
              placeholder="Full name *"
              value={manualName}
              onChange={e => setManualName(e.target.value)}
              className="w-full bg-input-background rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={manualPhone}
              onChange={e => setManualPhone(e.target.value)}
              className="w-full bg-input-background rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowManual(false); setManualName(''); setManualPhone(''); }}
                className="flex-1 py-2.5 rounded-xl text-sm text-muted-foreground bg-input-background"
              >
                Cancel
              </button>
              <button
                onClick={addManual}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#10b981' }}
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="overflow-y-auto flex-1 px-4 pb-8">
          {contacts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-16 h-16 rounded-full bg-input-background flex items-center justify-center">
                <Users className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                No contacts yet.<br />Import from your phone or add manually.
              </p>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="space-y-2 mt-1">
              {filtered.map(c => (
                <ContactRow key={c.id} contact={c} onToggle={togglePending} />
              ))}
            </div>
          )}

          {filtered.length === 0 && contacts.length > 0 && (
            <p className="text-center text-sm text-muted-foreground py-10">
              No results for "{search}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactRow({ contact, onToggle }: { contact: PhoneContact; onToggle: (id: string) => void }) {
  const color = nameColor(contact.name);
  const initials = getInitials(contact.name);

  return (
    <div className="flex items-center gap-3 bg-input-background rounded-2xl px-3 py-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
        style={{ background: color }}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{contact.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {contact.phone ?? contact.email ?? 'No details'}
        </p>
      </div>

      <button
        onClick={() => onToggle(contact.id)}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
        style={
          contact.pending
            ? { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }
            : { background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }
        }
      >
        {contact.pending
          ? <><Clock className="w-3.5 h-3.5" /> Pending</>
          : <><UserPlus className="w-3.5 h-3.5" /> Connect</>}
      </button>
    </div>
  );
}
