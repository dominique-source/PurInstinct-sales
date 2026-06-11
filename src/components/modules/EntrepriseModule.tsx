import { useState, useMemo } from 'react';
import type { ContactRH, ContactStatus, ListeType } from '../../types';
import { ContactCard } from '../cards/ContactCard';
import { ContactModal } from '../cards/ContactModal';

type Region = 'all' | 'quebec_ville' | 'montreal' | 'gatineau' | 'autre';
type SortKey = 'priorite' | 'region' | 'nom' | 'status';

interface Props {
  contacts: ContactRH[];
  liste: ListeType;
  statuses: Record<string, ContactStatus>;
  notes: Record<string, string>;
  onStatusChange: (id: string, s: ContactStatus) => void;
  onNoteChange: (id: string, n: string) => void;
}

const REGION_ORDER: Record<string, number> = { quebec_ville: 0, montreal: 1, gatineau: 2, autre: 3 };
const STATUS_ORDER: Record<string, number> = {
  partenariat_actif: 0, rendez_vous_fixé: 1, réponse_reçue: 2,
  message_envoyé: 3, non_contacté: 4, pas_intéressé: 5,
};

export function EntrepriseModule({ contacts, statuses, notes, onStatusChange, onNoteChange }: Props) {
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState<Region>('all');
  const [filterStatus, setFilterStatus] = useState<ContactStatus | 'all'>('all');
  const [filterPrio, setFilterPrio] = useState<1 | 2 | 3 | 0>(0);
  const [sortKey, setSortKey] = useState<SortKey>('priorite');
  const [modal, setModal] = useState<ContactRH | null>(null);

  const filtered = useMemo(() => {
    let list = contacts;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.nom_entreprise.toLowerCase().includes(q) ||
        c.secteur.toLowerCase().includes(q) ||
        c.ville.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filterRegion !== 'all') list = list.filter(c => c.region === filterRegion);
    if (filterStatus !== 'all') list = list.filter(c => (statuses[c.id] ?? 'non_contacté') === filterStatus);
    if (filterPrio) list = list.filter(c => c.priorite === filterPrio);

    return [...list].sort((a, b) => {
      if (sortKey === 'priorite') return a.priorite - b.priorite;
      if (sortKey === 'region') return (REGION_ORDER[a.region] ?? 9) - (REGION_ORDER[b.region] ?? 9);
      if (sortKey === 'nom') return a.nom_entreprise.localeCompare(b.nom_entreprise);
      if (sortKey === 'status') {
        const sa = statuses[a.id] ?? 'non_contacté';
        const sb = statuses[b.id] ?? 'non_contacté';
        return (STATUS_ORDER[sa] ?? 9) - (STATUS_ORDER[sb] ?? 9);
      }
      return 0;
    });
  }, [contacts, search, filterRegion, filterStatus, filterPrio, sortKey, statuses]);

  const statCount = useMemo(() => {
    const total = contacts.length;
    const contacted = contacts.filter(c => (statuses[c.id] ?? 'non_contacté') !== 'non_contacté').length;
    return { total, contacted };
  }, [contacts, statuses]);

  const selectStyle = { background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#D1D5DB', borderRadius: 8, padding: '8px 12px', fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total', val: statCount.total, color: '#9CA3AF' },
          { label: 'Contactés', val: statCount.contacted, color: '#CCFF00' },
          { label: 'Restants', val: statCount.total - statCount.contacted, color: '#F97316' },
        ].map(s => (
          <div key={s.label} style={{ background: '#141414', border: '1px solid #1F1F1F', borderRadius: 10, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Rechercher…"
          style={{ ...selectStyle, flex: '1 1 200px', minWidth: 160 }}
        />
        <select value={filterRegion} onChange={e => setFilterRegion(e.target.value as Region)} style={selectStyle}>
          <option value="all">Toutes les régions</option>
          <option value="quebec_ville">Québec Ville</option>
          <option value="montreal">Montréal</option>
          <option value="gatineau">Gatineau</option>
          <option value="autre">Autre</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ContactStatus | 'all')} style={selectStyle}>
          <option value="all">Tous les statuts</option>
          <option value="non_contacté">Non contacté</option>
          <option value="message_envoyé">Message envoyé</option>
          <option value="réponse_reçue">Réponse reçue</option>
          <option value="rendez_vous_fixé">RDV fixé</option>
          <option value="partenariat_actif">Partenariat actif</option>
          <option value="pas_intéressé">Pas intéressé</option>
        </select>
        <select value={filterPrio} onChange={e => setFilterPrio(Number(e.target.value) as 0 | 1 | 2 | 3)} style={selectStyle}>
          <option value={0}>Toutes priorités</option>
          <option value={1}>⭐ Priorité 1</option>
          <option value={2}>Priorité 2</option>
          <option value={3}>Priorité 3</option>
        </select>
        <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} style={selectStyle}>
          <option value="priorite">Trier: Priorité</option>
          <option value="region">Trier: Région</option>
          <option value="nom">Trier: Nom</option>
          <option value="status">Trier: Statut</option>
        </select>
      </div>

      <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 12 }}>{filtered.length} résultats</div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
        {filtered.map(c => (
          <ContactCard
            key={c.id}
            contact={c}
            status={statuses[c.id] ?? 'non_contacté'}
            note={notes[c.id] ?? ''}
            onStatusChange={onStatusChange}
            onNoteChange={onNoteChange}
            onClick={() => setModal(c)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#4B5563', marginTop: 60, fontSize: 16 }}>
          Aucun résultat pour ces filtres
        </div>
      )}

      {modal && (
        <ContactModal
          contact={modal}
          status={statuses[modal.id] ?? 'non_contacté'}
          note={notes[modal.id] ?? ''}
          onClose={() => setModal(null)}
          onStatusChange={(id, s) => { onStatusChange(id, s); }}
        />
      )}
    </div>
  );
}
