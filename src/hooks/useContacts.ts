import { useState, useCallback, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ContactStatus } from '../types';

const USER_DOC = 'users/dominique';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

interface CloudData {
  statuses: Record<string, ContactStatus>;
  notes: Record<string, string>;
  dates: Record<string, { contact?: string; relance?: string }>;
  streak: { last: string; count: number };
  today: { date: string; count: number };
}

const DEFAULT: CloudData = {
  statuses: {},
  notes: {},
  dates: {},
  streak: { last: '', count: 0 },
  today: { date: '', count: 0 },
};

export function useContacts() {
  const [data, setData] = useState<CloudData>(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const saveRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync réel depuis Firestore (écoute en temps réel)
  useEffect(() => {
    const ref = doc(db, USER_DOC);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData(snap.data() as CloudData);
      } else {
        // Premier accès : initialise le document
        setDoc(ref, DEFAULT);
      }
      setLoaded(true);
    }, (err) => {
      console.error('Firestore error:', err);
      // Fallback localStorage si Firestore indisponible
      try {
        const local = localStorage.getItem('purinstinct_cloud_backup');
        if (local) setData(JSON.parse(local));
      } catch { /* ignore */ }
      setLoaded(true);
    });
    return unsub;
  }, []);

  // Sauvegarde dans Firestore avec debounce 800ms
  function saveToCloud(next: CloudData) {
    // Backup local immédiat
    localStorage.setItem('purinstinct_cloud_backup', JSON.stringify(next));
    // Cloud avec debounce
    if (saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      setDoc(doc(db, USER_DOC), next).catch(console.error);
    }, 800);
  }

  const updateStatus = useCallback((id: string, status: ContactStatus) => {
    setData(prev => {
      const today = todayStr();
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

      // Today counter
      const newCount = prev.today.date === today ? prev.today.count + 1 : 1;

      // Streak
      let newStreak = prev.streak;
      if (status === 'message_envoyé') {
        if (prev.streak.last === today) {
          // already counted
        } else if (prev.streak.last === yesterday) {
          newStreak = { last: today, count: prev.streak.count + 1 };
        } else {
          newStreak = { last: today, count: 1 };
        }
      }

      const next: CloudData = {
        ...prev,
        statuses: { ...prev.statuses, [id]: status },
        dates: status === 'message_envoyé'
          ? { ...prev.dates, [id]: { ...prev.dates[id], contact: today } }
          : prev.dates,
        today: status === 'message_envoyé'
          ? { date: today, count: newCount }
          : prev.today,
        streak: newStreak,
      };
      saveToCloud(next);
      return next;
    });
  }, []);

  const updateNote = useCallback((id: string, note: string) => {
    setData(prev => {
      const next = { ...prev, notes: { ...prev.notes, [id]: note } };
      saveToCloud(next);
      return next;
    });
  }, []);

  const updateRelance = useCallback((id: string, date: string) => {
    setData(prev => {
      const next = { ...prev, dates: { ...prev.dates, [id]: { ...prev.dates[id], relance: date } } };
      saveToCloud(next);
      return next;
    });
  }, []);

  const getStatus = useCallback((id: string): ContactStatus => {
    return data.statuses[id] ?? 'non_contacté';
  }, [data.statuses]);

  const getNote = useCallback((id: string) => data.notes[id] ?? '', [data.notes]);
  const getDates = useCallback((id: string) => data.dates[id] ?? {}, [data.dates]);

  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const todayCount = data.today.date === today ? data.today.count : 0;
  const streakCount = (data.streak.last === today || data.streak.last === yesterday) ? data.streak.count : 0;

  const statusValues = Object.values(data.statuses) as ContactStatus[];
  const totalContacted = statusValues.filter(s => s !== 'non_contacté').length;
  const totalResponses = statusValues.filter(s => ['réponse_reçue', 'rendez_vous_fixé', 'partenariat_actif'].includes(s)).length;
  const totalRdv = statusValues.filter(s => ['rendez_vous_fixé', 'partenariat_actif'].includes(s)).length;
  const totalPartenariats = statusValues.filter(s => s === 'partenariat_actif').length;

  return {
    statuses: data.statuses,
    notes: data.notes,
    loaded,
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
