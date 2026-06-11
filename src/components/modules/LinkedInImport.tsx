import { useState } from 'react';
import { grandesEntreprises } from '../../data/grandes-entreprises';
import { startups } from '../../data/startups';
import { secrets } from '../../data/secrets';

const ALL = [...grandesEntreprises, ...startups, ...secrets];
const LI_KEY = 'purinstinct_linkedin_network';

function loadLinkedIn(): string[] {
  try { return JSON.parse(localStorage.getItem(LI_KEY) ?? '[]'); } catch { return []; }
}

interface Match {
  contactLine: string;
  entreprise: string;
  id: string;
}

export function LinkedInImport() {
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [saved, setSaved] = useState(false);
  const existing = loadLinkedIn();

  function processImport() {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const found: Match[] = [];

    for (const line of lines) {
      const parts = line.split('|').map(p => p.trim());
      const entreprisePart = parts[2] ?? parts[parts.length - 1] ?? '';

      const matched = ALL.find(c => {
        const eName = c.nom_entreprise.toLowerCase();
        return entreprisePart.toLowerCase().includes(eName) ||
          eName.includes(entreprisePart.toLowerCase().split(' ')[0]);
      });

      if (matched) {
        found.push({ contactLine: line, entreprise: matched.nom_entreprise, id: matched.id });
      }
    }
    setMatches(found);
    setSaved(false);
  }

  function saveMatches() {
    const ids = matches.map(m => m.id);
    const merged = Array.from(new Set([...existing, ...ids]));
    localStorage.setItem(LI_KEY, JSON.stringify(merged));
    setSaved(true);
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24, maxWidth: 700 }}>
      <h2 className="font-display" style={{ fontSize: 32, color: '#CCFF00', margin: '0 0 8px' }}>RÉSEAU LINKEDIN</h2>
      <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
        Importe tes contacts LinkedIn pour identifier lesquels sont déjà dans ta base de prospection.
      </p>

      <div style={{ background: '#141414', border: '1px solid #1F1F1F', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 12, fontWeight: 600 }}>FORMAT ATTENDU (un contact par ligne)</div>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#4B5563', background: '#0A0A0A', padding: '8px 12px', borderRadius: 6, marginBottom: 16 }}>
          Prénom Nom | Titre du poste | Entreprise
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Jean Tremblay | Directeur RH | Desjardins&#10;Marie Côté | VP Marketing | Bell Canada&#10;..."
          style={{ width: '100%', minHeight: 160, background: '#1F1F1F', border: '1px solid #2A2A2A', color: '#F5F5F5', fontSize: 13, padding: 12, borderRadius: 8, resize: 'vertical', lineHeight: 1.6 }}
        />
        <button
          onClick={processImport}
          disabled={!text.trim()}
          style={{ marginTop: 12, background: '#CCFF00', color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: text.trim() ? 'pointer' : 'not-allowed', opacity: text.trim() ? 1 : 0.5 }}
        >
          🔍 Analyser les correspondances
        </button>
      </div>

      {matches.length > 0 && (
        <div style={{ background: '#141414', border: '1px solid #1F1F1F', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#CCFF00', marginBottom: 16 }}>
            ✓ {matches.length} correspondances trouvées
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {matches.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a2200', borderRadius: 8, padding: '10px 14px' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#F5F5F5', marginBottom: 2 }}>{m.contactLine}</div>
                  <div style={{ fontSize: 12, color: '#CCFF00' }}>→ {m.entreprise}</div>
                </div>
                <span style={{ fontSize: 18 }}>🔗</span>
              </div>
            ))}
          </div>
          <button
            onClick={saveMatches}
            style={{ background: saved ? '#14532D' : '#CCFF00', color: saved ? '#22C55E' : '#0A0A0A', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            {saved ? '✓ Sauvegardé!' : '💾 Enregistrer les correspondances'}
          </button>
        </div>
      )}

      {existing.length > 0 && (
        <div style={{ marginTop: 20, background: '#141414', border: '1px solid #1F1F1F', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: '#6B7280' }}>
            📊 {existing.length} entreprise(s) déjà marquées LinkedIn dans ta base
          </div>
        </div>
      )}
    </div>
  );
}
