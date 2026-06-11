import { useState, useMemo } from 'react';
import type { EtablissementScolaire, ContactStatus } from '../../types';
import { SchoolCard } from '../cards/SchoolCard';

interface Props {
  schools: EtablissementScolaire[];
  statuses: Record<string, ContactStatus>;
  notes: Record<string, string>;
  onStatusChange: (id: string, s: ContactStatus) => void;
  onNoteChange: (id: string, n: string) => void;
}

type SortKey = 'priorite' | 'region' | 'nom' | 'status';

const STATUS_ORDER: Record<string, number> = {
  partenariat_actif: 0, rendez_vous_fixé: 1, réponse_reçue: 2,
  message_envoyé: 3, non_contacté: 4, pas_intéressé: 5,
};

export function EducationModule({ schools, statuses, notes, onStatusChange, onNoteChange }: Props) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ContactStatus | 'all'>('all');
  const [filterPrio, setFilterPrio] = useState<0 | 1 | 2 | 3>(0);
  const [filterRegion, setFilterRegion] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('priorite');

  const regions = useMemo(() => {
    const r = new Set(schools.map(s => s.region));
    return ['all', ...Array.from(r).sort()];
  }, [schools]);

  const filtered = useMemo(() => {
    let list = schools;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.nom.toLowerCase().includes(q) ||
        s.ville_siege.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== 'all') list = list.filter(s => (statuses[s.id] ?? 'non_contacté') === filterStatus);
    if (filterPrio) list = list.filter(s => s.priorite === filterPrio);
    if (filterRegion !== 'all') list = list.filter(s => s.region === filterRegion);

    return [...list].sort((a, b) => {
      if (sortKey === 'priorite') return a.priorite - b.priorite;
      if (sortKey === 'region') return a.region.localeCompare(b.region);
      if (sortKey === 'nom') return a.nom.localeCompare(b.nom);
      if (sortKey === 'status') {
        const sa = statuses[a.id] ?? 'non_contacté';
        const sb = statuses[b.id] ?? 'non_contacté';
        return (STATUS_ORDER[sa] ?? 9) - (STATUS_ORDER[sb] ?? 9);
      }
      return 0;
    });
  }, [schools, search, filterStatus, filterPrio, filterRegion, sortKey, statuses]);

  const contacted = schools.filter(s => (statuses[s.id] ?? 'non_contacté') !== 'non_contacté').length;

  const selectStyle = { background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#D1D5DB', borderRadius: 8, padding: '8px 12px', fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total', val: schools.length, color: '#9CA3AF' },
          { label: 'Contactés', val: contacted, color: '#CCFF00' },
          { label: 'Restants', val: schools.length - contacted, color: '#F97316' },
        ].map(s => (
          <div key={s.label} style={{ background: '#141414', border: '1px solid #1F1F1F', borderRadius: 10, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Rechercher…"
          style={{ ...selectStyle, flex: '1 1 200px', minWidth: 160 }}
        />
        <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} style={selectStyle}>
          {regions.map(r => <option key={r} value={r}>{r === 'all' ? 'Toutes les régions' : r}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ContactStatus | 'all')} style={selectStyle}>
          <option value="all">Tous les statuts</option>
          <option value="non_contacté">Non contacté</option>
          <option value="message_envoyé">Message envoyé</option>
          <option value="réponse_reçue">Réponse reçue</option>
          <option value="rendez_vous_fixé">RDV fixé</option>
          <option value="partenariat_actif">Partenariat actif</option>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {filtered.map(s => (
          <SchoolCard
            key={s.id}
            school={s}
            status={statuses[s.id] ?? 'non_contacté'}
            note={notes[s.id] ?? ''}
            onStatusChange={onStatusChange}
            onNoteChange={onNoteChange}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#4B5563', marginTop: 60, fontSize: 16 }}>
          Aucun résultat pour ces filtres
        </div>
      )}
    </div>
  );
}
