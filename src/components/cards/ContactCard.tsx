import { useState } from 'react';
import type { ContactRH, ContactStatus } from '../../types';
import { StatusPill } from '../ui/StatusPill';

const STATUS_OPTIONS: ContactStatus[] = [
  'non_contacté', 'message_envoyé', 'réponse_reçue', 'rendez_vous_fixé', 'partenariat_actif', 'pas_intéressé',
];

interface Props {
  contact: ContactRH;
  status: ContactStatus;
  note: string;
  onStatusChange: (id: string, s: ContactStatus) => void;
  onNoteChange: (id: string, n: string) => void;
  onClick: () => void;
}

export function ContactCard({ contact, status, note, onStatusChange, onNoteChange, onClick }: Props) {
  const [editNote, setEditNote] = useState(false);
  const [noteVal, setNoteVal] = useState(note);

  const regionColors: Record<string, string> = {
    quebec_ville: '#1D4ED8',
    montreal: '#7C3AED',
    gatineau: '#059669',
    autre: '#6B7280',
  };

  return (
    <div
      style={{
        background: '#141414',
        border: `1px solid ${status === 'partenariat_actif' ? '#22C55E' : status === 'réponse_reçue' ? '#CCFF00' : '#1F1F1F'}`,
        borderRadius: 12,
        padding: 16,
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.1s',
        opacity: status === 'pas_intéressé' ? 0.5 : 1,
      }}
      onClick={onClick}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => {
        const c = e.currentTarget as HTMLElement;
        c.style.borderColor = status === 'partenariat_actif' ? '#22C55E' : status === 'réponse_reçue' ? '#CCFF00' : '#1F1F1F';
        c.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="font-display" style={{ fontSize: 17, color: '#F5F5F5' }}>{contact.nom_entreprise}</span>
            {contact.priorite === 1 && <span style={{ fontSize: 10, background: '#CCFF00', color: '#0A0A0A', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>⭐ PRIORITÉ</span>}
            {contact.linkedin_reseau && <span style={{ fontSize: 10, background: '#1D4ED8', color: '#93C5FD', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>LinkedIn</span>}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>{contact.secteur}</span>
            {contact.nb_employes && <span style={{ fontSize: 11, color: '#4B5563' }}>{contact.nb_employes} emp.</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{ fontSize: 11, background: regionColors[contact.region] + '33', color: regionColors[contact.region], padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
            {contact.ville}
          </span>
        </div>
      </div>

      {/* Contact info */}
      {contact.contact_rh && (
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>
          👤 {contact.contact_rh}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        {contact.site_web && (
          <a href={`https://${contact.site_web}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#3B82F6', textDecoration: 'none' }}
            onClick={e => e.stopPropagation()}>
            🌐 Site web
          </a>
        )}
        {contact.linkedin_url && (
          <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#60A5FA', textDecoration: 'none' }}
            onClick={e => e.stopPropagation()}>
            🔗 LinkedIn
          </a>
        )}
        {contact.email_type && <span style={{ fontSize: 12, color: '#6B7280' }}>📧 {contact.email_type}</span>}
      </div>

      {/* Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <StatusPill status={status} size="sm" />
        <select
          value={status}
          onChange={e => { e.stopPropagation(); onStatusChange(contact.id, e.target.value as ContactStatus); }}
          onClick={e => e.stopPropagation()}
          style={{ fontSize: 11, background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#9CA3AF', borderRadius: 6, padding: '2px 6px', cursor: 'pointer' }}
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Tags */}
      {contact.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {contact.tags.slice(0, 4).map(t => (
            <span key={t} style={{ fontSize: 10, background: '#1F1F1F', color: '#6B7280', padding: '2px 6px', borderRadius: 4 }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Note */}
      {editNote ? (
        <div onClick={e => e.stopPropagation()}>
          <textarea
            value={noteVal}
            onChange={e => setNoteVal(e.target.value)}
            autoFocus
            style={{ width: '100%', minHeight: 60, background: '#1F1F1F', border: '1px solid #CCFF00', borderRadius: 6, color: '#F5F5F5', fontSize: 12, padding: 8, resize: 'vertical' }}
          />
          <button onClick={() => { onNoteChange(contact.id, noteVal); setEditNote(false); }}
            style={{ marginTop: 4, fontSize: 11, background: '#CCFF00', color: '#0A0A0A', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontWeight: 700 }}>
            Sauvegarder
          </button>
        </div>
      ) : (
        <div onClick={e => { e.stopPropagation(); setEditNote(true); }}
          style={{ fontSize: 12, color: note ? '#9CA3AF' : '#374151', fontStyle: note ? 'normal' : 'italic', cursor: 'text', minHeight: 20 }}>
          {note || '+ Ajouter une note…'}
        </div>
      )}
    </div>
  );
}
