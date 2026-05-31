import React, { useState } from 'react';
import { getApiKey } from '../utils/api';

const roles = [
  { icon: '🐍', name: 'Python Developer' },
  { icon: '⚡', name: 'Full Stack Developer' },
  { icon: '🎨', name: 'Frontend Developer' },
  { icon: '⚙️', name: 'Backend Developer' },
  { icon: '🤖', name: 'AI/ML Engineer' },
  { icon: '✨', name: 'Generative AI Engineer' },
  { icon: '📊', name: 'Data Scientist' },
  { icon: '🔧', name: 'DevOps Engineer' },
];

const expLevels = [
  'Fresher (0-6 months)',
  'Junior (1-2 years)',
  'Mid-level (3-5 years)',
  'Senior (5-8 years)',
  'Lead/Principal (8+ years)',
];

const btn = (active) => ({
  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
  border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
  background: active ? 'rgba(79,142,247,.1)' : 'var(--bg2)',
  color: active ? 'var(--accent)' : 'var(--text2)',
  fontFamily: 'var(--font)', fontSize: '.85rem', transition: 'all .2s'
});

export default function InterviewPage({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [exp, setExp] = useState('');
  const [techStack, setTechStack] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileUploaded(true);
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = ev => setResumeText(ev.target.result.substring(0, 3000));
      reader.readAsText(file);
    }
  };

  const startInterview = () => {
    if (!getApiKey()) { alert('Please set your Anthropic API key first (⚡ Set API Key button in nav)'); return; }
    onNavigate('active', { role, experience: exp, techStack, resumeText });
  };

  const container = { maxWidth: '700px', margin: '0 auto', padding: '2rem', width: '100%' };
  const stepDot = (n) => ({
    width: step > n ? '8px' : n === step ? '24px' : '8px',
    height: '8px', borderRadius: n === step ? '4px' : '50%',
    background: step > n ? 'var(--green)' : n === step ? 'var(--accent)' : 'var(--border)',
    transition: 'all .3s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Sub-nav */}
      <div style={{ padding: '1.5rem 2rem 0', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {['', 'Setup Your Interview', 'Experience Level', 'Resume Upload', 'Review & Start'][step]}
            </div>
            <div style={{ fontSize: '.85rem', color: 'var(--text2)' }}>
              {['', 'Tell us about yourself', 'How experienced are you?', 'Personalize questions', 'Almost ready!'][step]}
            </div>
          </div>
          <button onClick={() => onNavigate('home')} style={btn(false)}>← Back</button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1,2,3,4].map(n => <div key={n} style={stepDot(n)} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={container}>

          {/* Step 1: Role */}
          {step === 1 && (
            <div className="fade-in">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '.5rem', marginTop: '1.5rem' }}>What role are you applying for?</h2>
              <p style={{ color: 'var(--text2)', fontSize: '.9rem', marginBottom: '1.5rem' }}>Choose the closest match to your target position</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '10px', marginBottom: '1.5rem' }}>
                {roles.map(r => (
                  <div key={r.name} onClick={() => setRole(r.name)} style={{
                    padding: '1rem', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                    border: `1px solid ${role === r.name ? 'var(--accent)' : 'var(--border)'}`,
                    background: role === r.name ? 'rgba(79,142,247,.08)' : 'var(--bg2)', transition: 'all .2s'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{r.icon}</div>
                    <div style={{ fontSize: '.8rem', fontWeight: 500 }}>{r.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button disabled={!role} onClick={() => setStep(2)} style={{
                  ...btn(!!role), padding: '10px 20px', opacity: role ? 1 : .4
                }}>Next →</button>
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div className="fade-in">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '.5rem', marginTop: '1.5rem' }}>Years of experience?</h2>
              <p style={{ color: 'var(--text2)', fontSize: '.9rem', marginBottom: '1.5rem' }}>Shapes question difficulty and depth</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {expLevels.map(e => (
                  <button key={e} onClick={() => setExp(e)} style={btn(exp === e)}>{e}</button>
                ))}
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '.85rem', fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>
                  Specific tech stack to focus on (optional)
                </label>
                <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)}
                  placeholder="e.g. React, Node.js, PostgreSQL, Docker..."
                  style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '.9rem', width: '100%', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} style={btn(false)}>← Back</button>
                <button disabled={!exp} onClick={() => setStep(3)} style={{ ...btn(!!exp), padding: '10px 20px', opacity: exp ? 1 : .4 }}>Next →</button>
              </div>
            </div>
          )}

          {/* Step 3: Resume */}
          {step === 3 && (
            <div className="fade-in">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '.5rem', marginTop: '1.5rem' }}>Upload your resume</h2>
              <p style={{ color: 'var(--text2)', fontSize: '.9rem', marginBottom: '1.5rem' }}>AI personalizes questions based on your background</p>
              <div onClick={() => document.getElementById('fileInput').click()} style={{
                border: `2px dashed ${fileUploaded ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer',
                marginBottom: '1.5rem', background: fileUploaded ? 'rgba(34,197,94,.04)' : 'transparent',
                transition: 'all .2s'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{fileUploaded ? '✅' : '📄'}</div>
                <div style={{ fontWeight: 500 }}>{fileUploaded ? 'File uploaded!' : 'Click to upload resume'}</div>
                <div style={{ fontSize: '.8rem', color: 'var(--text2)', marginTop: '.25rem' }}>.txt files supported</div>
                <input id="fileInput" type="file" accept=".txt" style={{ display: 'none' }} onChange={handleFile} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '.85rem', fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>
                  Or paste resume text / key experience details
                </label>
                <textarea value={resumeText} onChange={e => setResumeText(e.target.value)}
                  placeholder="Paste your resume or briefly describe your experience, projects, and skills..."
                  style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '.9rem', width: '100%', outline: 'none', resize: 'vertical', minHeight: '140px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} style={btn(false)}>← Back</button>
                <button onClick={() => setStep(4)} style={{ ...btn(true), padding: '10px 20px' }}>Next →</button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="fade-in">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '.5rem', marginTop: '1.5rem' }}>Ready to Interview?</h2>
              <p style={{ color: 'var(--text2)', fontSize: '.9rem', marginBottom: '1.5rem' }}>Review your setup</p>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Role', value: role, color: 'var(--accent)' },
                  { label: 'Experience', value: exp },
                  { label: 'Resume', value: resumeText ? '✓ Provided' : 'Skipped (generic questions)', color: resumeText ? 'var(--green)' : undefined },
                  { label: 'Duration', value: '15–30 minutes' },
                  { label: 'Questions', value: '10 questions' },
                ].map((item, i) => (
                  <div key={item.label}>
                    {i > 0 && <div style={{ height: '1px', background: 'var(--border)', margin: '.75rem 0' }} />}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '.85rem', color: 'var(--text2)' }}>{item.label}</span>
                      <span style={{ fontSize: '.85rem', fontFamily: 'var(--mono)', color: item.color || 'var(--text)' }}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(79,142,247,.06)', border: '1px solid rgba(79,142,247,.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', fontSize: '.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>
                💡 <strong style={{ color: 'var(--text)' }}>Tips:</strong> Answer as you would in a real interview. Be specific, use examples. AI evaluates technical accuracy, communication, and problem-solving.
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(3)} style={btn(false)}>← Back</button>
                <button onClick={startInterview} style={{
                  padding: '12px 28px', borderRadius: '10px', border: 'none', background: 'var(--grad)',
                  color: '#fff', fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 500, cursor: 'pointer'
                }}>🎯 Start Interview</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
