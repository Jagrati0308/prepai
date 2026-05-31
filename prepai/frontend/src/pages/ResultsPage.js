import React from 'react';

function Tag({ children, type }) {
  const styles = {
    green: { background: 'rgba(34,197,94,.12)', color: 'var(--green)', border: '1px solid rgba(34,197,94,.2)' },
    red: { background: 'rgba(239,68,68,.12)', color: 'var(--red)', border: '1px solid rgba(239,68,68,.2)' },
    amber: { background: 'rgba(245,158,11,.12)', color: 'var(--amber)', border: '1px solid rgba(245,158,11,.2)' },
    blue: { background: 'rgba(79,142,247,.12)', color: 'var(--accent)', border: '1px solid rgba(79,142,247,.2)' },
  };
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '6px', fontSize: '.75rem', fontWeight: 500, ...styles[type] }}>
      {children}
    </span>
  );
}

export default function ResultsPage({ results, setup, onNavigate }) {
  if (!results) return null;
  const { result } = results;
  const r = result;

  const scoreColor = r.overall >= 75 ? 'var(--green)' : r.overall >= 55 ? 'var(--amber)' : 'var(--red)';
  const recColor = { 'Strong Hire': 'green', 'Hire': 'green', 'Needs Work': 'amber', 'Not Ready': 'red' };
  const circ = 2 * Math.PI * 45;
  const dash = circ - (r.overall / 100) * circ;

  const metrics = [
    { name: 'Technical Knowledge', score: r.technical, color: '#4f8ef7' },
    { name: 'Communication', score: r.communication, color: '#7c5ef7' },
    { name: 'Question Understanding', score: r.understanding, color: '#2dd4bf' },
    { name: 'Answer Delivery', score: r.delivery, color: '#22c55e' },
  ];

  return (
    <div style={{ overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-.5px' }}>Interview Complete 🎉</div>
            <div style={{ fontSize: '.85rem', color: 'var(--text2)' }}>Detailed performance analysis for {setup?.role}</div>
          </div>
          <button onClick={() => onNavigate('interview')} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text)', fontFamily: 'var(--font)', cursor: 'pointer', fontSize: '.85rem' }}>
            Practice Again
          </button>
        </div>

        {/* Score hero */}
        <div style={{ textAlign: 'center', padding: '2rem 0 2.5rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
          <div style={{ width: '120px', height: '120px', margin: '0 auto 1rem', position: 'relative' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="45" fill="none" stroke="var(--bg3)" strokeWidth="8" />
              <circle cx="60" cy="60" r="45" fill="none" stroke={scoreColor} strokeWidth="8"
                strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease .2s' }} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '1.8rem', fontWeight: 700, color: scoreColor }}>
              {r.overall}
            </div>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '.25rem' }}>{setup?.role}</div>
          <div style={{ fontSize: '.85rem', color: 'var(--text2)', marginBottom: '.75rem' }}>Overall Interview Score</div>
          <Tag type={recColor[r.recommendation] || 'blue'}>{r.recommendation}</Tag>
        </div>

        {/* Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {metrics.map(m => (
            <div key={m.name} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '.8rem', color: 'var(--text2)', marginBottom: '.5rem', fontWeight: 500 }}>{m.name}</div>
              <div style={{ height: '6px', background: 'var(--bg3)', borderRadius: '3px', overflow: 'hidden', marginBottom: '.5rem' }}>
                <div style={{ height: '100%', width: `${m.score}%`, background: m.color, borderRadius: '3px', transition: 'width 1s ease .3s' }} />
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: m.color }}>
                {m.score}<span style={{ fontSize: '.75rem', fontWeight: 400, color: 'var(--text3)' }}>/100</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '.75rem' }}>📋 Summary</div>
          <div style={{ fontSize: '.9rem', color: 'var(--text2)', lineHeight: 1.7 }}>{r.summary}</div>
        </div>

        {/* Strengths */}
        <div style={{ background: 'rgba(34,197,94,.03)', border: '1px solid rgba(34,197,94,.2)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--green)' }}>✦ Strengths</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {r.strengths?.map(s => <Tag key={s} type="green">{s}</Tag>)}
          </div>
        </div>

        {/* Weaknesses */}
        <div style={{ background: 'rgba(239,68,68,.03)', border: '1px solid rgba(239,68,68,.2)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--red)' }}>△ Areas to Improve</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {r.weaknesses?.map(w => <Tag key={w} type="red">{w}</Tag>)}
          </div>
        </div>

        {/* Study topics */}
        <div style={{ background: 'rgba(245,158,11,.03)', border: '1px solid rgba(245,158,11,.2)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--amber)' }}>→ Study These Topics</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {r.improve?.map(t => <Tag key={t} type="amber">{t}</Tag>)}
          </div>
        </div>

        {/* Per-question feedback */}
        {r.questionFeedback?.length > 0 && (
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '1rem' }}>📝 Per-Question Feedback</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {r.questionFeedback.map((fb, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', fontWeight: 600, flexShrink: 0, color: fb.score >= 7 ? 'var(--green)' : fb.score >= 5 ? 'var(--amber)' : 'var(--red)' }}>
                    {fb.score}/10
                  </div>
                  <div>
                    <div style={{ fontSize: '.8rem', fontWeight: 600, marginBottom: '2px' }}>Q{fb.qIndex + 1}</div>
                    <div style={{ fontSize: '.8rem', color: 'var(--text2)' }}>{fb.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('learn')} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'var(--grad)', color: '#fff', fontFamily: 'var(--font)', fontWeight: 500, cursor: 'pointer' }}>📚 Go Study →</button>
          <button onClick={() => onNavigate('interview')} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text)', fontFamily: 'var(--font)', cursor: 'pointer' }}>🔄 Practice Again</button>
        </div>
      </div>
    </div>
  );
}
