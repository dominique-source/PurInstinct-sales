import { useState, useCallback } from 'react';
import type { ContactStatus } from '../types';

const KEYS = {
  STATUS: 'purinstinct_contacts_status',
  NOTES: 'purinstinct_contacts_notes',
  DATES: 'purinstinct_contacts_dates',
  STREAK: 'purinstinct_streak',
  TODAY: 'purinstinct_today_count',
};

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useContacts() {
  const [statuses, setStatuses] = useState<Record<string, ContactStatus>>(() =>
    load(KEYS.STATUS, {})
  );
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    load(KEYS.NOTES, {})
  );
  const [dates, setDates] = useState<Record<string, { contact?: string; relance?: string }>>(() =>
    load(KEYS.DATES, {})
  );

  const updateStatus = useCallback((id: string, status: ContactStatus) => {
    setStatuses(prev => {
      const next = { ...prev, [id]: status };
      save(KEYS.STATUS, next);
      return next;
    });

    if (status === 'message_envoyé') {
      setDates(prev => {
        const next = { ...prev, [id]: { ...prev[id], contact: todayStr() } };
        save(KEYS.DATES, next);
        return next;
      });

      // update today counter
      const stored = load<{ date: string; count: number }>(KEYS.TODAY, { date: '', count: 0 });
      const today = todayStr();
      const newCount = stored.date === today ? stored.count + 1 : 1;
      save(KEYS.TODAY, { date: today, count: newCount });

      // update streak
      const streak = load<{ last: string; count: number }>(KEYS.STREAK, { last: '', count: 0 });
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (streak.last === today) {
        // already counted today
      } else if (streak.last === yesterday) {
        save(KEYS.STREAK, { last: today, count: streak.count + 1 });
      } else {
        save(KEYS.STREAK, { last: today, count: 1 });
      }
    }
  }, []);

  const updateNote = useCallback((id: string, note: string) => {
    setNotes(prev => {
      const next = { ...prev, [id]: note };
      save(KEYS.NOTES, next);
      return next;
    });
  }, []);

  const updateRelance = useCallback((id: string, date: string) => {
    setDates(prev => {
      const next = { ...prev, [id]: { ...prev[id], relance: date } };
      save(KEYS.DATES, next);
      return next;
    });
  }, []);

  const getStatus = useCallback((id: string): ContactStatus => {
    return statuses[id] ?? 'non_contacté';
  }, [statuses]);

  const getNote = useCallback((id: string): string => {
    return notes[id] ?? '';
  }, [notes]);

  const getDates = useCallback((id: string) => {
    return dates[id] ?? {};
  }, [dates]);

  const todayCount = (() => {
    const stored = load<{ date: string; count: number }>(KEYS.TODAY, { date: '', count: 0 });
    return stored.date === todayStr() ? stored.count : 0;
  })();

  const streakCount = (() => {
    const streak = load<{ last: string; count: number }>(KEYS.STREAK, { last: '', count: 0 });
    const today = todayStr();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    return streak.last === today || streak.last === yesterday ? streak.count : 0;
  })();

  const totalContacted = Object.values(statuses).filter(s => s !== 'non_contacté').length;
  const totalResponses = Object.values(statuses).filter(s => s === 'réponse_reçue' || s === 'rendez_vous_fixé' || s === 'partenariat_actif').length;
  const totalRdv = Object.values(statuses).filter(s => s === 'rendez_vous_fixé' || s === 'partenariat_actif').length;
  const totalPartenariats = Object.values(statuses).filter(s => s === 'partenariat_actif').length;

  return {
    statuses,
    notes,
    updateStatus,
    updateNote,
    updateRelance,
    getStatus,
    getNote,
    getDates,
    todayCount,
    streakCount,
    totalContacted,
    totalResponses,
    totalRdv,
    totalPartenariats,
  };
}
