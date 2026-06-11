import { useState } from 'react';
import type { ContactStatus } from '../../types';
import { StatusPill } from '../ui/StatusPill';
import { ContactModal } from '../cards/ContactModal';
import { useRandomPick } from '../../hooks/useRandomPick';
import { grandesEntreprises } from '../../data/grandes-entreprises';
import { startups } from '../../data/startups';
import { secrets } from '../../data/secrets';

interface Props {
  statuses: Record<string, ContactStatus>;
  notes: Record<string, string>;
  onStatusChange: (id: string, s: ContactStatus) => void;
}

const ALL_CONTACTS = [...grandesEntreprises, ...startups, ...secrets];

export function RandomPicker({ statuses, notes, onStatusChange }: Props) {
  const { picked, spinning, pick } = useRandomPick(ALL_CONTACTS, statuses);
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="font-display" style={{ fontSize: 48, color: '#CCFF00', margin: '0 0 8px', letterSpacing: '-1px' }}>
            SURPRISE DU JOUR
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15 }}>
            L'algorithme sélectionne un contact pondéré par priorité parmi tous les contacts non encore actifs.
          </p>
        </div>

        <button
          onClick={pick}
          disabled={spinning}
          style={{
            width: '100%',
            background: spinning ? '#1a2200' : '#CCFF00',
            color: spinning ? '#CCFF00' : '#0A0A0A',
            border: spinning ? '2px solid #CCFF00' : 'none',
            borderRadius: 16,
            padding: '20px 24px',
            fontSize: 20,
            fontWeight: 900,
            cursor: spinning ? 'wait' : 'pointer',
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: 'italic',
            marginBottom: 32,
          }}
        >
          {spinning ? '⚙️ SÉLECTION EN COURS…' : '🎲 QUI CONTACTER AUJOURD\'HUI ?'}
        </button>

        {picked && (
          <div
            className={spinning ? 'slot-spin' : ''}
            style={{
              background: '#141414',
              border: '2px solid #CCFF00',
              borderRadius: 16,
              padding: 28,
              animation: spinning ? undefined : 'badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="font-display" style={{ fontSize: 30, color: '#CCFF00', marginBottom: 4 }}>
                  {picked.nom_entreprise}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: 14 }}>{picked.secteur} · {picked.ville}</div>
              </div>
              <StatusPill status={statuses[picked.id] ?? 'non_contacté'} />
            </div>

            {picked.contact_rh && (
              <div style={{ background: '#1F1F1F', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
                <span style={{ color: '#6B7280', fontSize: 12 }}>👤 </span>
                <span style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 600 }}>{picked.contact_rh}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              {picked.site_web && (
                <a href={`https://${picked.site_web}`} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: '#3B82F6' }}>🌐 {picked.site_web}</a>
              )}
              {picked.nb_employes && <span style={{ fontSize: 12, color: '#6B7280' }}>👥 {picked.nb_employes} emp.</span>}
              {picked.priorite === 1 && <span style={{ fontSize: 12, color: '#CCFF00' }}>⭐ Priorité haute</span>}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowModal(true)}
                style={{ flex: 1, background: '#CCFF00', color: '#0A0A0A', border: 'none', borderRadius: 10, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                📋 Voir le message suggéré
              </button>
              <button
                onClick={() => { onStatusChange(picked.id, 'message_envoyé'); }}
                style={{ background: '#1D3461', color: '#60A5FA', border: '1px solid #3B82F6', borderRadius: 10, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                ✓ Envoyé !
              </button>
            </div>
          </div>
        )}

        {!picked && !spinning && (
          <div style={{ textAlign: 'center', color: '#4B5563', marginTop: 20 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 16 }}>Appuie sur le bouton pour découvrir ton contact du jour</div>
          </div>
        )}
      </div>

      {picked && showModal && (
        <ContactModal
          contact={picked}
          status={statuses[picked.id] ?? 'non_contacté'}
          note={notes[picked.id] ?? ''}
          onClose={() => setShowModal(false)}
          onStatusChange={(id, s) => { onStatusChange(id, s); setShowModal(false); }}
        />
      )}
    </div>
  );
}
