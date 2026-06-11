interface Props {
  value: number;
  max: number;
  label?: string;
  showConfetti?: boolean;
}

export function ProgressBar({ value, max, label }: Props) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const done = value >= max;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {label && <span style={{ fontSize: 13, color: '#9CA3AF', whiteSpace: 'nowrap' }}>{label}</span>}
      <div style={{ flex: 1, height: 8, background: '#2A2A2A', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: done ? '#22C55E' : '#CCFF00',
          borderRadius: 4,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <span style={{ fontSize: 13, color: done ? '#22C55E' : '#CCFF00', fontWeight: 700, whiteSpace: 'nowrap' }}>
        {value} / {max}
      </span>
    </div>
  );
}
