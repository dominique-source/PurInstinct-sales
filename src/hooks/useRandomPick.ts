import { useState, useCallback } from 'react';
import type { ContactRH } from '../types';

export function useRandomPick(contacts: ContactRH[], statuses: Record<string, string>) {
  const [picked, setPicked] = useState<ContactRH | null>(null);
  const [spinning, setSpinning] = useState(false);

  const pick = useCallback(() => {
    const pool = contacts.filter(c => {
      const s = statuses[c.id] ?? 'non_contacté';
      return s === 'non_contacté' || s === 'message_envoyé';
    });

    if (!pool.length) return;

    // Weight by priority: 1 = 3×, 2 = 2×, 3 = 1×
    const weighted: ContactRH[] = [];
    for (const c of pool) {
      const w = c.priorite === 1 ? 3 : c.priorite === 2 ? 2 : 1;
      for (let i = 0; i < w; i++) weighted.push(c);
    }

    setSpinning(true);
    setPicked(null);

    const iterations = 8;
    let count = 0;
    const interval = setInterval(() => {
      const rand = weighted[Math.floor(Math.random() * weighted.length)];
      setPicked(rand);
      count++;
      if (count >= iterations) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 150);
  }, [contacts, statuses]);

  return { picked, spinning, pick, clear: () => setPicked(null) };
}
