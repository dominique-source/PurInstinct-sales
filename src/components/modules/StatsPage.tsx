import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ContactStatus } from '../../types';

interface Props {
  allStatuses: Record<string, ContactStatus>;
  totalEntreprises: number;
  totalEducation: number;
  streakCount: number;
  todayCount?: number;
}

const STATUS_LABELS: Record<ContactStatus, string> = {
  non_contacté: 'Non contacté',
  message_envoyé: 'Envoyé',
  réponse_reçue: 'Réponse',
  rendez_vous_fixé: 'RDV',
  partenariat_actif: 'Partenariat',
  pas_intéressé: 'Refus',
};

const STATUS_COLORS: Record<ContactStatus, string> = {
  non_contacté: '#2A2A2A',
  message_envoyé: '#3B82F6',
  réponse_reçue: '#CCFF00',
  rendez_vous_fixé: '#F97316',
  partenariat_actif: '#22C55E',
  pas_intéressé: '#EF4444',
};

export function StatsPage({ allStatuses, totalEntreprises, totalEducation, streakCount }: Props) {
  const statusValues = Object.values(allStatuses);

  const counts: Record<ContactStatus, number> = {
    non_contacté: 0, message_envoyé: 0, réponse_reçue: 0,
    rendez_vous_fixé: 0, partenariat_actif: 0, pas_intéressé: 0,
  };
  for (const s of statusValues) counts[s] = (counts[s] ?? 0) + 1;

  const totalContacted = statusValues.filter(s => s !== 'non_contacté').length;
  const totalAll = totalEntreprises + totalEducation;
  const responseRate = totalContacted > 0
    ? Math.round(((counts.réponse_reçue + counts.rendez_vous_fixé + counts.partenariat_actif) / totalContacted) * 100)
    : 0;

  const funnelData = [
    { name: 'Contactés', value: totalContacted, color: '#3B82F6' },
    { name: 'Réponses', value: counts.réponse_reçue + counts.rendez_vous_fixé + counts.partenariat_actif, color: '#CCFF00' },
    { name: 'RDV', value: counts.rendez_vous_fixé + counts.partenariat_actif, color: '#F97316' },
    { name: 'Partenariats', value: counts.partenariat_actif, color: '#22C55E' },
  ];

  const statCards = [
    { icon: '📊', label: 'Total base', val: totalAll, color: '#9CA3AF' },
    { icon: '✉️', label: 'Contactés', val: totalContacted, color: '#3B82F6' },
    { icon: '📬', label: 'Taux réponse', val: `${responseRate}%`, color: '#CCFF00' },
    { icon: '🤝', label: 'RDV fixés', val: counts.rendez_vous_fixé + counts.partenariat_actif, color: '#F97316' },
    { icon: '👑', label: 'Partenariats', val: counts.partenariat_actif, color: '#22C55E' },
    { icon: '🔥', label: 'Streak', val: `${streakCount}j`, color: '#F97316' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 32 }}>
        {statCards.map(s => (
          <div key={s.label} style={{ background: '#141414', border: '1px solid #1F1F1F', borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, fontFamily: "'Barlow Condensed', sans-serif", fontStyle: 'italic' }}>{s.val}</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Funnel */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, color: '#F5F5F5', margin: '0 0 16px', fontWeight: 600 }}>Entonnoir de prospection</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={funnelData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#141414', border: '1px solid #2A2A2A', color: '#F5F5F5', borderRadius: 8 }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {funnelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status breakdown */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, color: '#F5F5F5', margin: '0 0 16px', fontWeight: 600 }}>Répartition par statut</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(Object.entries(counts) as [ContactStatus, number][]).map(([status, count]) => {
            const pct = totalAll > 0 ? Math.round((count / totalAll) * 100) : 0;
            return (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 130, fontSize: 13, color: '#9CA3AF', flexShrink: 0 }}>{STATUS_LABELS[status]}</span>
                <div style={{ flex: 1, height: 8, background: '#1F1F1F', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: STATUS_COLORS[status], borderRadius: 4, transition: 'width 0.4s' }} />
                </div>
                <span style={{ width: 40, fontSize: 13, color: STATUS_COLORS[status], fontWeight: 700, textAlign: 'right' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module breakdown */}
      <div>
        <h3 style={{ fontSize: 16, color: '#F5F5F5', margin: '0 0 16px', fontWeight: 600 }}>Par module</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: '#141414', border: '1px solid #1F1F1F', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>🏢 Entreprises</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#CCFF00', fontFamily: "'Barlow Condensed', sans-serif", fontStyle: 'italic' }}>{totalEntreprises}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>contacts</div>
          </div>
          <div style={{ flex: 1, background: '#141414', border: '1px solid #1F1F1F', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>🏫 Éducation</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#3B82F6', fontFamily: "'Barlow Condensed', sans-serif", fontStyle: 'italic' }}>{totalEducation}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>établissements</div>
          </div>
        </div>
      </div>
    </div>
  );
}
