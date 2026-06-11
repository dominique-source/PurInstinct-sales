import type { Badge } from '../../types';

interface Props {
  badges: Badge[];
  compact?: boolean;
}

export function BadgeSystem({ badges, compact = false }: Props) {
  if (compact) {
    const earned = badges.filter(b => b.obtenu);
    return (
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {earned.map(b => (
          <span key={b.id} title={b.nom} style={{ fontSize: 20 }}>{b.emoji}</span>
        ))}
        {earned.length === 0 && <span style={{ color: '#4B5563', fontSize: 13 }}>Aucun badge encore</span>}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
      {badges.map(b => (
        <div key={b.id} style={{
          background: b.obtenu ? '#1a2200' : '#141414',
          border: `1px solid ${b.obtenu ? '#CCFF00' : '#2A2A2A'}`,
          borderRadius: 12,
          padding: '16px 12px',
          textAlign: 'center',
          opacity: b.obtenu ? 1 : 0.45,
          transition: 'all 0.3s',
        }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>{b.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: b.obtenu ? '#CCFF00' : '#F5F5F5', marginBottom: 4 }}>{b.nom}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.4 }}>{b.description}</div>
          {b.obtenu && b.date_obtenu && (
            <div style={{ fontSize: 10, color: '#22C55E', marginTop: 6 }}>✓ {b.date_obtenu}</div>
          )}
        </div>
      ))}
    </div>
  );
}
