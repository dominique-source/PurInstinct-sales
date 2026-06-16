import { useState, useEffect } from 'react';
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
  linkedin: '👥 Import LinkedIn',
  linkedin_network: '🌐 Réseau LinkedIn',
};

interface Props {
  view: ActiveView;
  todayCount: number;
  streakCount: number;
  onSurprise: () => void;
}

export function Header({ view, todayCount, streakCount, onSurprise }: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: '#0A0A0A',
      borderBottom: '1px solid #1F1F1F',
      padding: isMobile ? '12px 12px 12px 60px' : '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 8 : 20,
    }}>
      <h1 className="font-display" style={{
        margin: 0,
        fontSize: isMobile ? 16 : 22,
        color: '#F5F5F5',
        fontStyle: 'italic',
        letterSpacing: '-0.5px',
        flex: '0 0 auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: isMobile ? '40vw' : 'none',
      }}>
        {VIEW_TITLES[view]}
      </h1>

      {!isMobile && (
        <div style={{ flex: 1 }}>
          <DailyChallenge todayCount={todayCount} streakCount={streakCount} />
        </div>
      )}

      <div style={{ flex: isMobile ? 1 : 0 }} />

      <button
        onClick={onSurprise}
        style={{
          background: '#CCFF00',
          color: '#0A0A0A',
          border: 'none',
          borderRadius: 10,
          padding: isMobile ? '8px 12px' : '10px 18px',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 13,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'transform 0.1s',
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isMobile ? '🎲' : '🎲 Contact du Jour'}
      </button>
    </header>
  );
}
