import { useState } from 'react';
import type { EtablissementScolaire, ContactStatus } from '../../types';
import { StatusPill } from '../ui/StatusPill';

const STATUS_OPTIONS: ContactStatus[] = [
  'non_contacté', 'message_envoyé', 'réponse_reçue', 'rendez_vous_fixé', 'partenariat_actif', 'pas_intéressé',
];

interface Props {
  school: EtablissementScolaire;
  status: ContactStatus;
  note: string;
  onStatusChange: (id: string, s: ContactStatus) => void;
  onNoteChange: (id: string, n: string) => void;
}

export function SchoolCard({ school, status, note, onStatusChange, onNoteChange }: Props) {
  const [editNote, setEditNote] = useState(false);
  const [noteVal, setNoteVal] = useState(note);

  const typeColors: Record<string, string> = {
    css_francophone: '#7C3AED',
    cs_anglophone: '#1D4ED8',
    ecole_privee: '#B45309',
    cs_statut_particulier: '#374151',
    cs_ontario: '#059669',
  };

  const typeLabels: Record<string, string> = {
    css_francophone: 'CSS Francophone',
    cs_anglophone: 'CS Anglophone',
    ecole_privee: 'École Privée',
    cs_statut_particulier: 'Statut particulier',
    cs_ontario: 'Ontario',
  };

  return (
    <div style={{
      background: '#141414',
      border: `1px solid ${status === 'partenariat_actif' ? '#22C55E' : status === 'réponse_reçue' ? '#CCFF00' : '#1F1F1F'}`,
      borderRadius: 12,
      padding: 16,
      opacity: status === 'pas_intéressé' ? 0.5 : 1,
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F5', letterSpacing: '-0.2px' }}>{school.nom}</span>
            {school.priorite === 1 && <span style={{ fontSize: 10, background: '#CCFF00', color: '#0A0A0A', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>⭐</span>}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, background: typeColors[school.type] + '22', color: typeColors[school.type], padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
              {typeLabels[school.type]}
            </span>
            <span style={{ fontSize: 11, color: '#6B7280' }}>{school.ville_siege}</span>
            <span style={{ fontSize: 11, color: '#4B5563' }}>{school.region}</span>
          </div>
        </div>
      </div>

      {school.contact_responsable && (
        <div style={{ fontSize: 14, fontWeight: 600, color: '#D1D5DB', marginBottom: 6 }}>👤 {school.contact_responsable}</div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        {school.site_web && (
          <a href={`https://${school.site_web}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#3B82F6', textDecoration: 'none' }}>
            🌐 Site web
          </a>
        )}
        {school.nb_eleves && <span style={{ fontSize: 11, color: '#4B5563' }}>{school.nb_eleves.toLocaleString()} élèves</span>}
        {school.nb_ecoles && <span style={{ fontSize: 11, color: '#4B5563' }}>{school.nb_ecoles} écoles</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <StatusPill status={status} size="sm" />
        <select
          value={status}
          onChange={e => onStatusChange(school.id, e.target.value as ContactStatus)}
          style={{ fontSize: 11, background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#9CA3AF', borderRadius: 6, padding: '2px 6px', cursor: 'pointer' }}
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {editNote ? (
        <div>
          <textarea
            value={noteVal}
            onChange={e => setNoteVal(e.target.value)}
            autoFocus
            style={{ width: '100%', minHeight: 60, background: '#1F1F1F', border: '1px solid #CCFF00', borderRadius: 6, color: '#F5F5F5', fontSize: 12, padding: 8, resize: 'vertical' }}
          />
          <button onClick={() => { onNoteChange(school.id, noteVal); setEditNote(false); }}
            style={{ marginTop: 4, fontSize: 11, background: '#CCFF00', color: '#0A0A0A', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontWeight: 700 }}>
            Sauvegarder
          </button>
        </div>
      ) : (
        <div onClick={() => setEditNote(true)}
          style={{ fontSize: 12, color: note ? '#9CA3AF' : '#374151', fontStyle: note ? 'normal' : 'italic', cursor: 'text', minHeight: 20 }}>
          {note || '+ Ajouter une note…'}
        </div>
      )}
    </div>
  );
}
