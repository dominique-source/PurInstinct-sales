import { DailyChallenge } from '../ui/DailyChallenge';
import type { ActiveView } from '../../types';

const VIEW_TITLES: Record<ActiveView, string> = {
  grandes_entreprises: '🏢 Grandes Entreprises',
  startups: '🚀 Startups',
  secrets: '🤫 Secrets Bien Gardés',
  surprise: '🎲 Surprise du Jour',
  css_franco: '🏫 CSS Francophones',
  cs_anglo: '🏫 CS Anglophones',
  cs_ontario: '🏫 Ottawa-Gatineau (Ontario)',
  ecoles_privees: '🏫 Écoles Privées (FEEP)',
  stats: '📊 Mes Stats',
  badges: '🏆 Mes Badges',
  linkedin: '👥 Réseau LinkedIn',
};

interface Props {
  view: ActiveView;
  todayCount: number;
  streakCount: number;
  onSurprise: () => void;
}

export function Header({ view, todayCount, streakCount, onSurprise }: Props) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: '#0A0A0A',
      borderBottom: '1px solid #1F1F1F',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}>
      <h1 className="font-display" style={{ margin: 0, fontSize: 22, color: '#F5F5F5', fontStyle: 'italic', letterSpacing: '-0.5px', flex: '0 0 auto' }}>
        {VIEW_TITLES[view]}
      </h1>

      <div style={{ flex: 1 }}>
        <DailyChallenge todayCount={todayCount} streakCount={streakCount} />
      </div>

      <button
        onClick={onSurprise}
        style={{
          background: '#CCFF00',
          color: '#0A0A0A',
          border: 'none',
          borderRadius: 10,
          padding: '10px 18px',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'transform 0.1s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        🎲 Contact du Jour
      </button>
    </header>
  );
}
