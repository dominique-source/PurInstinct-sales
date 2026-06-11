import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Badge, DailyStats } from '../types';

const BADGE_DOC = 'users/dominique_badges';

const BADGE_DEFS: Omit<Badge, 'obtenu' | 'date_obtenu'>[] = [
  { id: 'first_blood',         nom: 'Premier Contact',    emoji: '🎯', description: "Ton premier contact envoyé. C'est parti!", condition: s => s.total_contacts >= 1 },
  { id: 'cinq_en_un_jour',     nom: 'Machine de Guerre',  emoji: '⚡', description: '5 contacts en une seule journée!',          condition: s => s.contacts_aujourd_hui >= 5 },
  { id: 'dix_en_un_jour',      nom: 'Mode Bête',          emoji: '🔥', description: "10 contacts en une journée.",               condition: s => s.contacts_aujourd_hui >= 10 },
  { id: 'streak_3',            nom: 'Sur une Lancée',     emoji: '💪', description: '3 jours consécutifs de contacts',            condition: s => s.streak_jours >= 3 },
  { id: 'streak_7',            nom: 'Semaine Parfaite',   emoji: '🏆', description: '7 jours de suite. Respect.',                 condition: s => s.streak_jours >= 7 },
  { id: 'premiere_reponse',    nom: 'Ça Répond!',         emoji: '📬', description: 'Première réponse reçue.',                    condition: s => s.reponses_recues >= 1 },
  { id: 'premier_rdv',         nom: 'Dans la Place',      emoji: '🤝', description: 'Premier rendez-vous fixé!',                  condition: s => s.rdv_fixes >= 1 },
  { id: 'premier_partenariat', nom: 'GAME CHANGER',       emoji: '👑', description: 'Premier partenariat actif.',                 condition: s => s.partenariats >= 1 },
  { id: 'ecoles_50',           nom: 'Champion des Écoles',emoji: '🏫', description: '50 établissements contactés.',               condition: s => s.total_contacts >= 50 },
  { id: 'cent_contacts',       nom: 'Centenaire',         emoji: '💯', description: '100 contacts au total. Légende.',            condition: s => s.total_contacts >= 100 },
];

export function useBadges(stats: DailyStats) {
  const [badgeData, setBadgeData] = useState<Record<string, { obtenu: boolean; date?: string }>>({});
  const [newlyUnlocked, setNewlyUnlocked] = useState<Badge | null>(null);

  // Écoute les badges depuis Firestore
  useEffect(() => {
    const ref = doc(db, BADGE_DOC);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setBadgeData(snap.data() as Record<string, { obtenu: boolean; date?: string }>);
    });
    return unsub;
  }, []);

  // Vérifie les badges débloqués
  useEffect(() => {
    if (!stats) return;
    let updated = false;
    const current = { ...badgeData };
    let justUnlocked: Badge | null = null;

    for (const def of BADGE_DEFS) {
      if (!current[def.id]?.obtenu && def.condition(stats)) {
        const dateStr = new Date().toISOString().slice(0, 10);
        current[def.id] = { obtenu: true, date: dateStr };
        updated = true;
        justUnlocked = { ...def, obtenu: true, date_obtenu: dateStr };
      }
    }

    if (updated) {
      setBadgeData(current);
      setDoc(doc(db, BADGE_DOC), current).catch(console.error);
      if (justUnlocked) setNewlyUnlocked(justUnlocked);
    }
  }, [stats.total_contacts, stats.contacts_aujourd_hui, stats.streak_jours, stats.reponses_recues, stats.rdv_fixes, stats.partenariats]);

  const badges: Badge[] = BADGE_DEFS.map(def => ({
    ...def,
    obtenu: badgeData[def.id]?.obtenu ?? false,
    date_obtenu: badgeData[def.id]?.date,
  }));

  return { badges, newlyUnlocked, clearNewlyUnlocked: () => setNewlyUnlocked(null) };
}
