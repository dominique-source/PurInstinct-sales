import type { ContactRH, ContactStatus } from '../../types';
import { StatusPill } from '../ui/StatusPill';

const MESSAGE_TEMPLATES: Record<string, string> = {
  sport: `Bonjour [Nom],

Je suis Dominique Soucy, fondatrice de PürInstinct — un sport hybride 3c2 sans contact qui combine basketball, soccer et football américain. Nous avons rejoint plus de 10 000 jeunes au Québec.

Je vous contacte pour explorer une collaboration avec [Entreprise] autour de nos programmes de bien-être sportif corporatif. Notre approche clé-en-main peut s'intégrer facilement dans vos initiatives RH et mieux-être.

Seriez-vous disponible pour une courte conversation cette semaine?

Dominique Soucy
Fondatrice & CEO, PürInstinct Worldwide Inc.
dominique@purinstinct.com`,

  tech: `Bonjour [Nom],

Je suis Dominique Soucy, fondatrice de PürInstinct — une entreprise sport-tech qui développe un sport hybride innovant à fort potentiel de croissance. Nous travaillons avec 150+ écoles et organisations.

Je vous contacte pour explorer des synergies potentielles entre PürInstinct et [Entreprise], notamment autour de [tech/data/platform].

Seriez-vous disponible pour un échange de 20 minutes?

Dominique Soucy
Fondatrice & CEO, PürInstinct Worldwide Inc.`,

  education: `Bonjour [Nom],

Je suis Dominique Soucy, fondatrice de PürInstinct — un sport hybride 3c2 sans contact qui combine basketball, soccer et football américain. Nous travaillons avec plus de 150 écoles au Québec.

Je vous contacte pour explorer une collaboration avec [Établissement] dans le cadre de nos programmes parascolaires et tournois. Notre approche est clé-en-main et s'adapte à tous les niveaux.

Seriez-vous disponible pour une courte conversation cette semaine?

Dominique Soucy
Fondatrice & CEO, PürInstinct Worldwide Inc.
dominique@purinstinct.com`,

  entreprise: `Bonjour [Nom],

Je suis Dominique Soucy, fondatrice de PürInstinct Worldwide Inc. Nous développons un sport hybride innovant (basketball + soccer + football américain, sans contact) et cherchons des partenaires corporatifs au Québec.

PürInstinct offre des programmes clé-en-main pour vos employés : team-building sportif, tournois inter-entreprises, et activités bien-être. Déjà actifs dans 150+ organisations.

Puis-je vous présenter notre programme en 15 minutes?

Dominique Soucy
Fondatrice & CEO, PürInstinct Worldwide Inc.
dominique@purinstinct.com`,
};

function getTemplate(contact: ContactRH): string {
  if (contact.tags.includes('tech') || contact.tags.includes('sport_tech')) return MESSAGE_TEMPLATES.tech;
  if (contact.secteur.toLowerCase().includes('éducation') || contact.secteur.toLowerCase().includes('sport')) return MESSAGE_TEMPLATES.sport;
  return MESSAGE_TEMPLATES.entreprise;
}

interface Props {
  contact: ContactRH;
  status: ContactStatus;
  note: string;
  onClose: () => void;
  onStatusChange: (id: string, s: ContactStatus) => void;
}

export function ContactModal({ contact, status, note, onClose, onStatusChange }: Props) {
  const template = getTemplate(contact);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: 16, padding: 28, maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h2 className="font-display" style={{ margin: 0, fontSize: 26, color: '#CCFF00' }}>{contact.nom_entreprise}</h2>
            <div style={{ color: '#9CA3AF', fontSize: 14, marginTop: 4 }}>{contact.secteur} · {contact.ville}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 24, cursor: 'pointer', padding: '0 4px' }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <StatusPill status={status} />
          {contact.nb_employes && <span style={{ fontSize: 12, color: '#6B7280' }}>👥 {contact.nb_employes} employés</span>}
          {contact.priorite === 1 && <span style={{ fontSize: 12, color: '#CCFF00' }}>⭐ Priorité haute</span>}
        </div>

        {contact.contact_rh && (
          <div style={{ background: '#1F1F1F', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Contact RH</div>
            <div style={{ fontSize: 14, color: '#F5F5F5', fontWeight: 600 }}>👤 {contact.contact_rh}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {contact.site_web && (
            <a href={`https://${contact.site_web}`} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#3B82F6' }}>🌐 {contact.site_web}</a>
          )}
          {contact.linkedin_url && (
            <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#60A5FA' }}>🔗 LinkedIn</a>
          )}
          {contact.telephone && <span style={{ fontSize: 13, color: '#9CA3AF' }}>📞 {contact.telephone}</span>}
        </div>

        {note && (
          <div style={{ background: '#1a2200', border: '1px solid #CCFF00', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: '#CCFF00', marginBottom: 4 }}>MES NOTES</div>
            <div style={{ fontSize: 13, color: '#F5F5F5', whiteSpace: 'pre-wrap' }}>{note}</div>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            💬 Message suggéré
          </div>
          <textarea
            defaultValue={template
              .replace('[Nom]', contact.contact_rh || '[Nom]')
              .replace(/\[Entreprise\]|\[Établissement\]/g, contact.nom_entreprise)
            }
            style={{ width: '100%', minHeight: 200, background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#D1D5DB', fontSize: 12, padding: 12, borderRadius: 8, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => { onStatusChange(contact.id, 'message_envoyé'); onClose(); }}
            style={{ flex: 1, background: '#CCFF00', color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            ✓ Marquer Message Envoyé
          </button>
          <button
            onClick={() => { onStatusChange(contact.id, 'réponse_reçue'); onClose(); }}
            style={{ background: '#1a2e00', color: '#CCFF00', border: '1px solid #CCFF00', borderRadius: 8, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            📬 Réponse Reçue
          </button>
          <button
            onClick={() => { onStatusChange(contact.id, 'rendez_vous_fixé'); onClose(); }}
            style={{ background: '#431407', color: '#F97316', border: '1px solid #F97316', borderRadius: 8, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            🤝 RDV Fixé
          </button>
        </div>
      </div>
    </div>
  );
}
