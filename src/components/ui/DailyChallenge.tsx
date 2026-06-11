import { ProgressBar } from './ProgressBar';

interface Props {
  todayCount: number;
  goal?: number;
  streakCount: number;
}

export function DailyChallenge({ todayCount, goal = 5, streakCount }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
      <div style={{ flex: 1, maxWidth: 300 }}>
        <ProgressBar value={todayCount} max={goal} label="Contacts aujourd'hui" />
      </div>
      {streakCount >= 2 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#431407', borderRadius: 20 }}>
          <span style={{ fontSize: 18 }}>🔥</span>
          <span style={{ fontWeight: 700, color: '#F97316', fontSize: 14 }}>{streakCount} jours</span>
        </div>
      )}
    </div>
  );
}
