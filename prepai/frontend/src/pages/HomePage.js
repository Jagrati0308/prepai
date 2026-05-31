import React from 'react';

const features = [
  { icon: '🎯', color: 'rgba(79,142,247,.12)', textColor: 'var(--accent)', title: 'Smart Interview Simulation', desc: 'AI analyzes your resume & tailors 10 questions to your exact role and experience level' },
  { icon: '📊', color: 'rgba(124,94,247,.12)', textColor: 'var(--accent2)', title: 'Deep Performance Report', desc: 'Rated on technical depth, communication, problem-solving, question understanding & more' },
  { icon: '📚', color: 'rgba(45,212,191,.12)', textColor: 'var(--accent3)', title: 'Curated Learning Paths', desc: 'Python, Full Stack, and AI/Gen AI courses with best free & paid resources' },
  { icon: '🤖', color: 'rgba(34,197,94,.12)', textColor: 'var(--green)', title: 'AI-Powered Everything', desc: 'Questions, evaluation, topic explanations — all powered by Claude AI' }
];

const roles = [
  { icon: '🐍', label: 'Python Dev' },
  { icon: '⚡', label: 'Full Stack' },
  { icon: '🤖', label: 'AI Engineer' },
  { icon: '✨', label: 'Gen AI Eng' },
  { icon: '🎨', label: 'Frontend' },
  { icon: '⚙️', label: 'Backend' },
];

export default function HomePage({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 60px)' }}>
      {/* Hero */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle,rgba(79,142,247,.08) 0%,transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          fontSize: '.8rem', fontWeight: 500, padding: '5px 14px', borderRadius: '100px',
          background: 'rgba(79,142,247,.12)', border: '1px solid rgba(79,142,247,.3)',
          color: 'var(--accent)', display: 'inline-block', marginBottom: '1.5rem',
          letterSpacing: '.5px', textTransform: 'uppercase'
        }}>🚀 AI-Powered Career Platform</div>

        <h1 style={{
          fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 700,
          lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-1px'
        }}>
          Ace Your Next<br />
          <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Tech Interview
          </span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text2)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Upload your resume, practice with AI-driven interviews tailored to your role & experience, then master any technology with curated learning paths.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <button onClick={() => onNavigate('interview')} style={{
            padding: '12px 28px', borderRadius: '10px', border: 'none', background: 'var(--grad)',
            color: '#fff', fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 500, cursor: 'pointer'
          }}>Start Interview Practice ↗</button>
          <button onClick={() => onNavigate('learn')} style={{
            padding: '12px 28px', borderRadius: '10px', border: '1px solid var(--border)',
            background: 'var(--bg3)', color: 'var(--text)', fontFamily: 'var(--font)',
            fontSize: '1rem', fontWeight: 500, cursor: 'pointer'
          }}>Browse Courses →</button>
        </div>

        {/* Role chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {roles.map(r => (
            <div key={r.label} style={{
              padding: '6px 14px', borderRadius: '8px', background: 'var(--bg2)',
              border: '1px solid var(--border)', fontSize: '.8rem', color: 'var(--text2)',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>{r.icon} {r.label}</div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
        gap: '1rem', padding: '2rem', borderTop: '1px solid var(--border)', background: 'var(--bg2)'
      }}>
        {features.map(f => (
          <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '1rem' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: f.color, color: f.textColor, fontSize: '1.1rem'
            }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: '.9rem', fontWeight: 600, marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text2)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
