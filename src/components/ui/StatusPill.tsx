import type { ContactStatus } from '../../types';

const CONFIG: Record<ContactStatus, { label: string; bg: string; text: string }> = {
  non_contacté:     { label: 'Non contacté',    bg: '#2A2A2A', text: '#9CA3AF' },
  message_envoyé:   { label: 'Message envoyé',  bg: '#1D3461', text: '#60A5FA' },
  réponse_reçue:    { label: 'Réponse reçue',   bg: '#1a2e00', text: '#CCFF00' },
  rendez_vous_fixé: { label: 'RDV fixé',         bg: '#431407', text: '#F97316' },
  partenariat_actif:{ label: 'Partenariat actif',bg: '#14532D', text: '#22C55E' },
  pas_intéressé:    { label: 'Pas intéressé',   bg: '#1f0a0a', text: '#EF4444' },
};

interface Props {
  status: ContactStatus;
  size?: 'sm' | 'md';
}

export function StatusPill({ status, size = 'md' }: Props) {
  const cfg = CONFIG[status];
  const px = size === 'sm' ? '8px' : '12px';
  const py = size === 'sm' ? '2px' : '4px';
  const fs = size === 'sm' ? '11px' : '12px';
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.text, padding: `${py} ${px}`, borderRadius: 9999, fontSize: fs, fontWeight: 600, whiteSpace: 'nowrap' }}>
      {cfg.label}
    </span>
  );
}
