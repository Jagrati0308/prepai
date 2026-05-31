import React from 'react';
import { getApiKey } from '../utils/api';

const s = {
  nav: {
    background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
    padding: '0 2rem', height: '60px', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100
  },
  logo: {
    fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px',
    background: 'var(--grad)', WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', cursor: 'pointer'
  },
  tabs: { display: 'flex', gap: '4px' },
  tab: (active) => ({
    padding: '6px 16px', borderRadius: '8px', fontSize: '.85rem',
    fontWeight: 500, cursor: 'pointer', border: 'none',
    background: active ? 'var(--bg3)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text2)',
    transition: 'all .2s', fontFamily: 'var(--font)'
  }),
  badge: (hasKey) => ({
    fontSize: '.75rem', padding: '4px 10px', borderRadius: '6px',
    background: 'var(--bg3)', border: `1px solid ${hasKey ? 'var(--green)' : 'var(--border)'}`,
    color: hasKey ? 'var(--green)' : 'var(--text3)', cursor: 'pointer',
    transition: 'all .2s', fontFamily: 'var(--font)'
  })
};

export default function Nav({ activeScreen, onNavigate, onApiClick }) {
  const hasKey = !!getApiKey();
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'interview', label: 'Interview' },
    { id: 'learn', label: 'Learn' }
  ];
  const activeTab = ['active', 'results'].includes(activeScreen) ? 'interview' : activeScreen;

  return (
    <nav style={s.nav}>
      <div style={s.logo} onClick={() => onNavigate('home')}>PrepAI</div>
      <div style={s.tabs}>
        {tabs.map(t => (
          <button key={t.id} style={s.tab(activeTab === t.id)} onClick={() => onNavigate(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <button style={s.badge(hasKey)} onClick={onApiClick}>
        {hasKey ? '✓ API Key Set' : '⚡ Set API Key'}
      </button>
    </nav>
  );
}
