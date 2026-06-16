import { useState, useMemo } from 'react';
import { linkedInNetwork, TIER_CONFIG, type LinkedInTier, type LinkedInContact } from '../../data/linkedin-network';

const LI_STATUS_KEY = 'purinstinct_li_statuses';
const LI_NOTES_KEY = 'purinstinct_li_notes';

type ContactStatus = LinkedInContact['status'];

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

const STATUS_OPTIONS: ContactStatus[] = [
  'non_contacté', 'message_envoyé', 'réponse_reçue', 'rendez_vous_fixé', 'partenariat_actif', 'pas_intéressé',
];

const STATUS_CONFIG: Record<ContactStatus, { label: string; bg: string; text: string }> = {
  non_contacté:     { label: 'Non contacté',    bg: '#2A2A2A', text: '#9CA3AF' },
  message_envoyé:   { label: 'Message envoyé',  bg: '#1D3461', text: '#60A5FA' },
  réponse_reçue:    { label: 'Réponse reçue',   bg: '#1a2e00', text: '#CCFF00' },
  rendez_vous_fixé: { label: 'RDV fixé',        bg: '#431407', text: '#F97316' },
  partenariat_actif:{ label: 'Partenariat',     bg: '#14532D', text: '#22C55E' },
  pas_intéressé:    { label: 'Pas intéressé',   bg: '#1f0a0a', text: '#EF4444' },
};

function ContactRow({ contact, status, note, onStatus, onNote }: {
  contact: LinkedInContact;
  status: ContactStatus;
  note: string;
  onStatus: (id: string, s: ContactStatus) => void;
  onNote: (id: string, n: string) => void;
}) {
  const [editNote, setEditNote] = useState(false);
  const [noteVal, setNoteVal] = useState(note);
  const cfg = STATUS_CONFIG[status];

  return (
    <div style={{
      background: '#141414',
      border: `1px solid ${status === 'partenariat_actif' ? '#22C55E' : status === 'réponse_reçue' ? '#CCFF00' : '#1F1F1F'}`,
      borderRadius: 10,
      padding: '14px 16px',
      opacity: status === 'pas_intéressé' ? 0.45 : 1,
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Name + info */}
        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F5', letterSpacing: '-0.2px' }}>
              {contact.prenom} {contact.nom}
            </span>
            {contact.priorite === 1 && <span style={{ fontSize: 10, background: '#CCFF00', color: '#0A0A0A', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>⭐ TOP</span>}
          </div>
          <div style={{ fontSize: 13, color: '#D1D5DB', marginBottom: 2 }}>{contact.poste}</div>
          <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 600 }}>{contact.entreprise}</div>
        </div>

        {/* Note stratégique */}
        <div style={{ flex: '2 1 200px', minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#4B5563', background: '#0D0D0D', borderRadius: 6, padding: '6px 10px', lineHeight: 1.5, borderLeft: '2px solid #2A2A2A' }}>
            💡 {contact.note_strategique}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ background: cfg.bg, color: cfg.text, fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {cfg.label}
            </span>
            <select
              value={status}
              onChange={e => onStatus(contact.id, e.target.value as ContactStatus)}
              style={{ fontSize: 11, background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#9CA3AF', borderRadius: 6, padding: '3px 6px', cursor: 'pointer' }}
            >
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
          <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: '#3B82F6', textDecoration: 'none' }}>
            🔗 Voir profil LinkedIn
          </a>
        </div>
      </div>

      {/* Note personnelle */}
      <div style={{ marginTop: 8 }}>
        {editNote ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              value={noteVal}
              onChange={e => setNoteVal(e.target.value)}
              autoFocus
              placeholder="Note personnelle…"
              style={{ flex: 1, background: '#1F1F1F', border: '1px solid #CCFF00', borderRadius: 6, color: '#F5F5F5', fontSize: 12, padding: '5px 8px' }}
            />
            <button onClick={() => { onNote(contact.id, noteVal); setEditNote(false); }}
              style={{ background: '#CCFF00', color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '5px 10px', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
              ✓
            </button>
            <button onClick={() => setEditNote(false)}
              style={{ background: '#2A2A2A', color: '#9CA3AF', border: 'none', borderRadius: 6, padding: '5px 8px', fontSize: 11, cursor: 'pointer' }}>
              ✕
            </button>
          </div>
        ) : (
          <div onClick={() => setEditNote(true)}
            style={{ fontSize: 12, color: note ? '#9CA3AF' : '#374151', fontStyle: note ? 'normal' : 'italic', cursor: 'text' }}>
            {note || '+ Note personnelle…'}
          </div>
        )}
      </div>
    </div>
  );
}

function TierSection({ tier, contacts, statuses, notes, onStatus, onNote }: {
  tier: LinkedInTier;
  contacts: LinkedInContact[];
  statuses: Record<string, ContactStatus>;
  notes: Record<string, string>;
  onStatus: (id: string, s: ContactStatus) => void;
  onNote: (id: string, n: string) => void;
}) {
  const [open, setOpen] = useState(tier === 'tier1_megamarques' || tier === 'tier9_quebec_canada');
  const cfg = TIER_CONFIG[tier];
  const contacted = contacts.filter(c => (statuses[c.id] ?? 'non_contacté') !== 'non_contacté').length;
  const pct = Math.round((contacted / contacts.length) * 100);

  return (
    <div style={{ marginBottom: 16, border: '1px solid #1F1F1F', borderRadius: 12, overflow: 'hidden' }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 20px', background: '#0D0D0D', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 24 }}>{cfg.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="font-display" style={{ fontSize: 20, color: cfg.color }}>{cfg.label.toUpperCase()}</span>
            <span style={{ fontSize: 12, color: '#4B5563' }}>{contacts.length} contacts</span>
            {contacted > 0 && (
              <span style={{ fontSize: 11, background: '#1a2200', color: '#CCFF00', padding: '2px 8px', borderRadius: 20 }}>
                {contacted} contacté{contacted > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>{cfg.description}</div>
        </div>
        {/* Progress mini */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 80, height: 4, background: '#1F1F1F', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: cfg.color, borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 11, color: cfg.color, width: 30 }}>{pct}%</span>
          <span style={{ fontSize: 18, color: '#4B5563', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
        </div>
      </button>

      {open && (
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: '#0A0A0A' }}>
          {contacts.map(c => (
            <ContactRow
              key={c.id}
              contact={c}
              status={statuses[c.id] ?? 'non_contacté'}
              note={notes[c.id] ?? ''}
              onStatus={onStatus}
              onNote={onNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function LinkedInNetworkModule() {
  const [statuses, setStatuses] = useState<Record<string, ContactStatus>>(() => load(LI_STATUS_KEY, {}));
  const [notes, setNotes] = useState<Record<string, string>>(() => load(LI_NOTES_KEY, {}));
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<LinkedInTier | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ContactStatus | 'all'>('all');

  const handleStatus = (id: string, s: ContactStatus) => {
    setStatuses(prev => { const n = { ...prev, [id]: s }; localStorage.setItem(LI_STATUS_KEY, JSON.stringify(n)); return n; });
  };
  const handleNote = (id: string, note: string) => {
    setNotes(prev => { const n = { ...prev, [id]: note }; localStorage.setItem(LI_NOTES_KEY, JSON.stringify(n)); return n; });
  };

  const filtered = useMemo(() => {
    let list = linkedInNetwork;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.prenom.toLowerCase().includes(q) ||
        c.nom.toLowerCase().includes(q) ||
        c.entreprise.toLowerCase().includes(q) ||
        c.poste.toLowerCase().includes(q) ||
        c.note_strategique.toLowerCase().includes(q)
      );
    }
    if (filterTier !== 'all') list = list.filter(c => c.tier === filterTier);
    if (filterStatus !== 'all') list = list.filter(c => (statuses[c.id] ?? 'non_contacté') === filterStatus);
    return list;
  }, [search, filterTier, filterStatus, statuses]);

  const byTier = useMemo(() => {
    const map: Record<LinkedInTier, LinkedInContact[]> = {} as Record<LinkedInTier, LinkedInContact[]>;
    for (const t of Object.keys(TIER_CONFIG) as LinkedInTier[]) map[t] = [];
    for (const c of filtered) map[c.tier].push(c);
    return map;
  }, [filtered]);

  const totalContacted = Object.values(statuses).filter(s => s !== 'non_contacté').length;

  const selectStyle = { background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#D1D5DB', borderRadius: 8, padding: '8px 12px', fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 className="font-display" style={{ fontSize: 36, color: '#CCFF00', margin: '0 0 4px' }}>
          RÉSEAU LINKEDIN — 300 CONTACTS STRATÉGIQUES
        </h2>
        <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>
          Analysé depuis 4 767 connexions · Classés en 10 tiers de valeur stratégique pour PürInstinct
        </p>
      </div>

      {/* Stats rapides */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: '👥 Total sélectionnés', val: linkedInNetwork.length, color: '#9CA3AF' },
          { label: '✉️ Contactés', val: totalContacted, color: '#CCFF00' },
          { label: '📊 Base totale analysée', val: '4 767', color: '#3B82F6' },
          { label: '🏆 Tiers', val: 10, color: '#F97316' },
        ].map(s => (
          <div key={s.label} style={{ background: '#141414', border: '1px solid #1F1F1F', borderRadius: 10, padding: '10px 16px' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'Barlow Condensed', sans-serif", fontStyle: 'italic' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Rechercher nom, poste, entreprise…"
          style={{ ...selectStyle, flex: '1 1 240px', minWidth: 200 }}
        />
        <select value={filterTier} onChange={e => setFilterTier(e.target.value as LinkedInTier | 'all')} style={selectStyle}>
          <option value="all">Tous les tiers</option>
          {(Object.entries(TIER_CONFIG) as [LinkedInTier, typeof TIER_CONFIG[LinkedInTier]][]).map(([k, v]) => (
            <option key={k} value={k}>{v.emoji} {v.label}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ContactStatus | 'all')} style={selectStyle}>
          <option value="all">Tous les statuts</option>
          <option value="non_contacté">Non contacté</option>
          <option value="message_envoyé">Message envoyé</option>
          <option value="réponse_reçue">Réponse reçue</option>
          <option value="rendez_vous_fixé">RDV fixé</option>
          <option value="partenariat_actif">Partenariat actif</option>
        </select>
      </div>

      <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 16 }}>{filtered.length} contacts affichés</div>

      {/* Tier sections */}
      {(Object.keys(TIER_CONFIG) as LinkedInTier[]).map(tier => {
        const contacts = byTier[tier];
        if (!contacts?.length) return null;
        return (
          <TierSection
            key={tier}
            tier={tier}
            contacts={contacts}
            statuses={statuses}
            notes={notes}
            onStatus={handleStatus}
            onNote={handleNote}
          />
        );
      })}
    </div>
  );
}
