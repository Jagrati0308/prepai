import React, { useState } from 'react';
import { getApiKey, setApiKey } from '../utils/api';

export default function ApiKeyModal({ onClose }) {
  const [val, setVal] = useState(getApiKey());
  const [err, setErr] = useState('');

  const save = () => {
    if (!val.trim().startsWith('sk-')) {
      setErr('Must start with sk-'); return;
    }
    setApiKey(val.trim());
    onClose();
  };

  const overlay = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 200, animation: 'fadeIn .2s ease'
  };
  const modal = {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '16px', padding: '2rem', width: '100%',
    maxWidth: '440px', margin: '1rem'
  };

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '.5rem' }}>🔑 Anthropic API Key</h3>
        <p style={{ fontSize: '.85rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Your key powers AI interviews and explanations. Stored only in your browser's localStorage — never sent to any server except Anthropic's API directly.
        </p>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '.85rem', fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>
            API Key
          </label>
          <input
            type="password"
            value={val}
            onChange={e => { setVal(e.target.value); setErr(''); }}
            placeholder="sk-ant-..."
            onKeyDown={e => e.key === 'Enter' && save()}
            style={{
              background: 'var(--bg3)', border: `1px solid ${err ? 'var(--red)' : 'var(--border)'}`,
              borderRadius: '10px', padding: '10px 14px', color: 'var(--text)',
              fontFamily: 'var(--font)', fontSize: '.9rem', width: '100%', outline: 'none'
            }}
          />
          {err && <div style={{ color: 'var(--red)', fontSize: '.8rem', marginTop: '4px' }}>{err}</div>}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={save} style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none',
            background: 'var(--grad)', color: '#fff', fontFamily: 'var(--font)',
            fontSize: '.9rem', fontWeight: 500, cursor: 'pointer'
          }}>Save & Continue</button>
          <button onClick={onClose} style={{
            padding: '10px 20px', borderRadius: '10px',
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text2)', fontFamily: 'var(--font)', fontSize: '.9rem', cursor: 'pointer'
          }}>Cancel</button>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '.75rem', color: 'var(--text3)' }}>
          Get your key at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>console.anthropic.com</a>
        </div>
      </div>
    </div>
  );
}
