import { useState, useMemo } from 'react';
import type { ActiveView, ContactStatus, DailyStats } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { EntrepriseModule } from './components/modules/EntrepriseModule';
import { EducationModule } from './components/modules/EducationModule';
import { RandomPicker } from './components/modules/RandomPicker';
import { StatsPage } from './components/modules/StatsPage';
import { BadgeSystem } from './components/ui/BadgeSystem';
import { LinkedInImport } from './components/modules/LinkedInImport';
import { useContacts } from './hooks/useContacts';
import { useBadges } from './hooks/useBadges';
import { grandesEntreprises } from './data/grandes-entreprises';
import { startups } from './data/startups';
import { secrets } from './data/secrets';
import { cssFrancophones, csAnglophones, csOntario, ecolesPrivees } from './data/education';

const ALL_ENTREPRISES = [...grandesEntreprises, ...startups, ...secrets];
const ALL_EDUCATION = [...cssFrancophones, ...csAnglophones, ...csOntario, ...ecolesPrivees];

export default function App() {
  const [view, setView] = useState<ActiveView>('grandes_entreprises');

  const {
    statuses, notes, loaded, updateStatus, updateNote,
    todayCount, streakCount,
    totalContacted, totalResponses, totalRdv, totalPartenariats,
  } = useContacts();

  const stats: DailyStats = useMemo(() => ({
    contacts_aujourd_hui: todayCount,
    total_contacts: totalContacted,
    streak_jours: streakCount,
    reponses_recues: totalResponses,
    rdv_fixes: totalRdv,
    partenariats: totalPartenariats,
  }), [todayCount, totalContacted, streakCount, totalResponses, totalRdv, totalPartenariats]);

  const { badges, newlyUnlocked, clearNewlyUnlocked } = useBadges(stats);

  function handleStatusChange(id: string, s: ContactStatus) {
    updateStatus(id, s);
  }

  if (!loaded) return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A', flexDirection: 'column', gap: 16 }}>
      <div className="font-display" style={{ fontSize: 40, color: '#CCFF00' }}>PÜR<span style={{ color: '#F5F5F5' }}>INSTINCT</span></div>
      <div style={{ color: '#4B5563', fontSize: 14 }}>Connexion au cloud…</div>
      <div style={{ width: 120, height: 3, background: '#1F1F1F', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '60%', background: '#CCFF00', borderRadius: 2, animation: 'slot-spin 1s ease-in-out infinite' }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0A0A0A' }}>
      <Sidebar active={view} onChange={v => setView(v)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header
          view={view}
          todayCount={todayCount}
          streakCount={streakCount}
          onSurprise={() => setView('surprise')}
        />

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {view === 'grandes_entreprises' && (
            <EntrepriseModule contacts={grandesEntreprises} liste="grandes_entreprises" statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'startups' && (
            <EntrepriseModule contacts={startups} liste="startups" statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'secrets' && (
            <EntrepriseModule contacts={secrets} liste="secrets" statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'surprise' && (
            <RandomPicker statuses={statuses} notes={notes} onStatusChange={handleStatusChange} />
          )}
          {view === 'css_franco' && (
            <EducationModule schools={cssFrancophones} statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'cs_anglo' && (
            <EducationModule schools={csAnglophones} statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'cs_ontario' && (
            <EducationModule schools={csOntario} statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'ecoles_privees' && (
            <EducationModule schools={ecolesPrivees} statuses={statuses} notes={notes} onStatusChange={handleStatusChange} onNoteChange={updateNote} />
          )}
          {view === 'stats' && (
            <StatsPage
              allStatuses={statuses}
              totalEntreprises={ALL_ENTREPRISES.length}
              totalEducation={ALL_EDUCATION.length}
              streakCount={streakCount}
              todayCount={todayCount}
            />
          )}
          {view === 'badges' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <h2 className="font-display" style={{ fontSize: 36, color: '#CCFF00', margin: '0 0 24px' }}>MES BADGES</h2>
              <BadgeSystem badges={badges} />
            </div>
          )}
          {view === 'linkedin' && (
            <LinkedInImport />
          )}
        </div>
      </div>

      {newlyUnlocked && (
        <div
          className="badge-pop"
          style={{
            position: 'fixed', bottom: 24, right: 24, background: '#141414',
            border: '2px solid #CCFF00', borderRadius: 16, padding: '20px 24px',
            zIndex: 100, maxWidth: 280, cursor: 'pointer',
          }}
          onClick={clearNewlyUnlocked}
        >
          <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 8 }}>{newlyUnlocked.emoji}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#CCFF00', textAlign: 'center', marginBottom: 4 }}>Badge débloqué!</div>
          <div className="font-display" style={{ fontSize: 20, color: '#F5F5F5', textAlign: 'center', marginBottom: 6 }}>{newlyUnlocked.nom}</div>
          <div style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>{newlyUnlocked.description}</div>
        </div>
      )}
    </div>
  );
}
