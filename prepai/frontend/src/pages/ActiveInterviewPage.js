import React, { useState, useEffect } from 'react';
import { interviewAPI } from '../utils/api';

export default function ActiveInterviewPage({ setup, onFinish, onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await interviewAPI.generateQuestions(setup);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(undefined));
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) { alert('Please type an answer or skip.'); return; }
    const newAnswers = [...answers];
    newAnswers[currentQ] = currentAnswer;
    setAnswers(newAnswers);
    setCurrentAnswer('');
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else finishInterview(newAnswers);
  };

  const skipQ = () => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = '[Skipped]';
    setAnswers(newAnswers);
    setCurrentAnswer('');
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else finishInterview(newAnswers);
  };

  const finishInterview = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const { result } = await interviewAPI.evaluate({
        role: setup.role, experience: setup.experience,
        questions, answers: finalAnswers
      });
      onFinish({ result, questions, answers: finalAnswers, setup });
    } catch (e) {
      setError('Evaluation failed: ' + (e.response?.data?.error || e.message));
      setSubmitting(false);
    }
  };

  const answered = answers.filter(a => a !== undefined).length;
  const pct = questions.length ? Math.round((answered / questions.length) * 100) : 0;

  if (loading || submitting) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', gap: '1rem' }}>
        <div className="typing" style={{ justifyContent: 'center' }}><span /><span /><span /></div>
        <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{submitting ? 'Evaluating your answers...' : 'Preparing your interview...'}</div>
        <div style={{ fontSize: '.85rem', color: 'var(--text2)' }}>{submitting ? 'This takes ~15 seconds' : 'AI is analyzing your profile'}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', gap: '1rem' }}>
        <div style={{ color: 'var(--red)', fontSize: '1.1rem' }}>⚠️ {error}</div>
        <button onClick={() => onNavigate('interview')} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text)', fontFamily: 'var(--font)', cursor: 'pointer' }}>← Go Back</button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100vh - 60px)' }}>
      {/* Sidebar */}
      <div style={{ background: 'var(--bg2)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto', height: 'calc(100vh - 60px)', position: 'sticky', top: '60px' }}>
        <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: '.75rem' }}>Questions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {questions.map((qItem, i) => (
            <div key={i} onClick={() => answers[i] !== undefined && setCurrentQ(i)} style={{
              padding: '8px 12px', borderRadius: '8px', fontSize: '.8rem',
              color: i === currentQ ? 'var(--accent)' : answers[i] !== undefined ? 'var(--green)' : 'var(--text2)',
              background: i === currentQ ? 'rgba(79,142,247,.1)' : 'transparent',
              border: `1px solid ${i === currentQ ? 'rgba(79,142,247,.3)' : 'transparent'}`,
              cursor: answers[i] !== undefined ? 'pointer' : 'default', transition: 'all .2s'
            }}>
              {answers[i] !== undefined && i !== currentQ ? '✓ ' : ''}Q{i + 1}. {qItem.q.substring(0, 40)}{qItem.q.length > 40 ? '...' : ''}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: 'var(--text2)', marginBottom: '.35rem' }}>
            <span>{answered} / {questions.length} answered</span><span>{pct}%</span>
          </div>
          <div style={{ height: '4px', background: 'var(--bg3)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--grad2)', borderRadius: '2px', transition: 'width .5s ease' }} />
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: '2rem', overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem' }}>
          <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '.75rem' }}>
            Question {currentQ + 1} of {questions.length} · {q.category} · {q.difficulty}
          </div>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500, marginBottom: '1.25rem' }}>{q.q}</div>
          <div style={{ fontSize: '.8rem', color: 'var(--text3)', marginBottom: '1.25rem', fontStyle: 'italic' }}>💡 Consider: {q.hint}</div>
          <textarea
            value={currentAnswer}
            onChange={e => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '.9rem', width: '100%', outline: 'none', resize: 'vertical', minHeight: '140px' }}
            onKeyDown={e => { if (e.ctrlKey && e.key === 'Enter') submitAnswer(); }}
          />
          <div style={{ fontSize: '.75rem', color: 'var(--text3)', marginTop: '6px', marginBottom: '1rem' }}>Ctrl+Enter to submit</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={skipQ} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontFamily: 'var(--font)', cursor: 'pointer' }}>Skip</button>
            <button onClick={submitAnswer} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--grad)', color: '#fff', fontFamily: 'var(--font)', fontWeight: 500, cursor: 'pointer' }}>
              {currentQ === questions.length - 1 ? 'Finish & Get Results →' : 'Submit Answer →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
