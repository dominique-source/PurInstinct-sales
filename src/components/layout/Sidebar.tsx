import { useState, useEffect } from 'react';
import type { ActiveView } from '../../types';

interface NavItem {
  icon: string;
  label: string;
  view: ActiveView;
}

const ENTERPRISE_ITEMS: NavItem[] = [
  { icon: '🏢', label: 'Grandes Entreprises', view: 'grandes_entreprises' },
  { icon: '🚀', label: 'Startups', view: 'startups' },
  { icon: '🤫', label: 'Secrets Bien Gardés', view: 'secrets' },
  { icon: '🎲', label: 'Surprise du Jour', view: 'surprise' },
];

const EDUCATION_ITEMS: NavItem[] = [
  { icon: '🏫', label: 'CSS Francophones', view: 'css_franco' },
  { icon: '🏫', label: 'CS Anglophones', view: 'cs_anglo' },
  { icon: '🏫', label: 'Ottawa-Gatineau', view: 'cs_ontario' },
  { icon: '🏫', label: 'Écoles Privées', view: 'ecoles_privees' },
];

const DASHBOARD_ITEMS: NavItem[] = [
  { icon: '📊', label: 'Mes Stats', view: 'stats' },
  { icon: '🏆', label: 'Mes Badges', view: 'badges' },
  { icon: '👥', label: 'Import LinkedIn', view: 'linkedin' },
  { icon: '🌐', label: '300 Contacts Réseau', view: 'linkedin_network' },
];

interface Props {
  active: ActiveView;
  onChange: (v: ActiveView) => void;
}

function NavGroup({ title, items, active, onChange }: { title: string; items: NavItem[]; active: ActiveView; onChange: (v: ActiveView) => void }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 16px 8px' }}>
        {title}
      </div>
      {items.map(item => (
        <button
          key={item.view}
          onClick={() => onChange(item.view)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '10px 16px',
            background: active === item.view ? '#1a2200' : 'transparent',
            border: 'none',
            borderLeft: active === item.view ? '3px solid #CCFF00' : '3px solid transparent',
            color: active === item.view ? '#CCFF00' : '#9CA3AF',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: active === item.view ? 600 : 400,
            textAlign: 'left',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { if (active !== item.view) (e.currentTarget as HTMLButtonElement).style.color = '#F5F5F5'; }}
          onMouseLeave={e => { if (active !== item.view) (e.currentTarget as HTMLButtonElement).style.color = '#9CA3AF'; }}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

const SIDEBAR_CONTENT = (active: ActiveView, onChange: (v: ActiveView) => void) => (
  <>
    <div style={{ padding: '24px 16px 20px', borderBottom: '1px solid #1F1F1F' }}>
      <div className="font-display" style={{ fontSize: 26, color: '#CCFF00', lineHeight: 1 }}>
        PÜR<span style={{ color: '#F5F5F5' }}>INSTINCT</span>
      </div>
      <div style={{ fontSize: 10, color: '#4B5563', marginTop: 2 }}>PROSPECTION HUB</div>
    </div>
    <nav style={{ flex: 1, paddingTop: 16 }}>
      <NavGroup title="Module Entreprises" items={ENTERPRISE_ITEMS} active={active} onChange={onChange} />
      <NavGroup title="Module Éducation" items={EDUCATION_ITEMS} active={active} onChange={onChange} />
      <NavGroup title="Tableau de Bord" items={DASHBOARD_ITEMS} active={active} onChange={onChange} />
    </nav>
    <div style={{ padding: '16px', borderTop: '1px solid #1F1F1F' }}>
      <div style={{ fontSize: 11, color: '#4B5563' }}>Dominique Soucy</div>
      <div style={{ fontSize: 10, color: '#374151' }}>CEO · PürInstinct</div>
    </div>
  </>
);

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '6px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        borderRadius: 8,
      }}
      aria-label="Ouvrir le menu"
    >
      <span style={{ display: 'block', width: 22, height: 2, background: '#CCFF00', borderRadius: 2 }} />
      <span style={{ display: 'block', width: 22, height: 2, background: '#CCFF00', borderRadius: 2 }} />
      <span style={{ display: 'block', width: 22, height: 2, background: '#CCFF00', borderRadius: 2 }} />
    </button>
  );
}

export function Sidebar({ active, onChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close drawer when a nav item is selected on mobile
  const handleChange = (v: ActiveView) => {
    onChange(v);
    setMobileOpen(false);
  };

  if (isMobile) {
    return (
      <>
        {/* Hamburger button — rendered inside Header via HamburgerButton export */}
        {/* Overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
              zIndex: 40, backdropFilter: 'blur(2px)',
            }}
          />
        )}

        {/* Hamburger trigger (floating, top-left) */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            position: 'fixed', top: 14, left: 14, zIndex: 60,
            background: '#141414', border: '1px solid #2A2A2A',
            borderRadius: 10, padding: '8px 10px',
            display: 'flex', flexDirection: 'column', gap: 5,
            cursor: 'pointer',
          }}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <span style={{ fontSize: 18, color: '#CCFF00', lineHeight: 1, fontWeight: 700 }}>✕</span>
          ) : (
            <>
              <span style={{ display: 'block', width: 20, height: 2, background: '#CCFF00', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 20, height: 2, background: '#CCFF00', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 20, height: 2, background: '#CCFF00', borderRadius: 2 }} />
            </>
          )}
        </button>

        {/* Drawer */}
        <aside style={{
          position: 'fixed', top: 0, left: 0, height: '100vh',
          width: 240, background: '#0D0D0D',
          borderRight: '1px solid #1F1F1F',
          display: 'flex', flexDirection: 'column',
          zIndex: 50, overflowY: 'auto',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
        }}>
          {SIDEBAR_CONTENT(active, handleChange)}
        </aside>
      </>
    );
  }

  // Desktop — sidebar fixe classique
  return (
    <aside style={{
      width: 220, minWidth: 220,
      background: '#0D0D0D',
      borderRight: '1px solid #1F1F1F',
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0, overflowY: 'auto',
    }}>
      {SIDEBAR_CONTENT(active, onChange)}
    </aside>
  );
}
