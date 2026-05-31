import React, { useState } from 'react';
import { learningAPI } from '../utils/api';

const courses = {
  python: {
    id: 'python', title: 'Python Developer Path', icon: '🐍',
    description: 'Fundamentals to advanced backend development. Django, FastAPI, async, testing, Docker.',
    duration: '~120 hrs', moduleCount: 8,
    modules: [
      { id: 1, title: 'Python Fundamentals', desc: 'Variables, data types, control flow, functions, OOP, Pythonic idioms', level: 'Beginner', topics: ['Variables & Types', 'Control Flow', 'Functions', 'OOP', 'List Comprehensions', 'Error Handling'] },
      { id: 2, title: 'Advanced Python', desc: 'Decorators, generators, context managers, metaclasses, async/await, performance', level: 'Intermediate', topics: ['Decorators', 'Generators', 'Context Managers', 'Async/Await', 'Metaclasses', 'Memory Management'] },
      { id: 3, title: 'Data & Algorithms', desc: 'NumPy, Pandas, data structures, sorting, searching, complexity analysis', level: 'Intermediate', topics: ['NumPy', 'Pandas', 'DSA', 'Big-O Notation', 'Sorting', 'Trees & Graphs'] },
      { id: 4, title: 'Web: Django & FastAPI', desc: 'REST APIs, authentication, ORM, middleware, async endpoints, OpenAPI', level: 'Intermediate', topics: ['Django ORM', 'FastAPI', 'REST Design', 'Auth', 'Middleware', 'OpenAPI'] },
      { id: 5, title: 'Databases & ORM', desc: 'PostgreSQL, SQLAlchemy, Redis, query optimization, migrations, indexing', level: 'Intermediate', topics: ['PostgreSQL', 'SQLAlchemy', 'Redis', 'Migrations', 'Indexing', 'Query Optimization'] },
      { id: 6, title: 'Testing & Quality', desc: 'pytest, unittest, mocking, coverage, TDD, CI integration', level: 'Intermediate', topics: ['pytest', 'Mocking', 'TDD', 'Coverage', 'CI/CD', 'Code Quality'] },
      { id: 7, title: 'Docker & Deployment', desc: 'Containerization, Gunicorn, Nginx, environment management, cloud deploy', level: 'Advanced', topics: ['Docker', 'Docker Compose', 'Gunicorn', 'Nginx', 'AWS/GCP', 'Env Config'] },
      { id: 8, title: 'System Design', desc: 'Scalability patterns, microservices, message queues, caching strategies', level: 'Advanced', topics: ['Scalability', 'Microservices', 'Message Queues', 'Caching', 'Load Balancing', 'CAP Theorem'] },
    ],
    resources: [
      { name: 'Official Python Docs', url: 'https://docs.python.org/3/tutorial/', type: 'free', desc: 'python.org — authoritative source' },
      { name: 'Real Python', url: 'https://realpython.com/', type: 'free', desc: 'In-depth tutorials & projects' },
      { name: 'Learn Python Interactive', url: 'https://www.learnpython.org/', type: 'free', desc: 'Browser-based exercises' },
      { name: '100 Days of Code: Python', url: 'https://www.udemy.com/course/complete-python-bootcamp/', type: 'paid', desc: 'Udemy · Angela Yu · 60+ hrs' },
      { name: 'TestDriven.io', url: 'https://testdriven.io/', type: 'paid', desc: 'FastAPI, Django, Docker, TDD' },
      { name: 'LeetCode Python', url: 'https://leetcode.com/', type: 'free', desc: '2500+ coding problems' },
    ]
  },
  fullstack: {
    id: 'fullstack', title: 'Full Stack Developer Path', icon: '⚡',
    description: 'HTML/CSS to React, Node.js, databases, auth, Next.js and production deployment.',
    duration: '~160 hrs', moduleCount: 9,
    modules: [
      { id: 1, title: 'HTML, CSS & Accessibility', desc: 'Semantic HTML, Flexbox, Grid, responsive design, WCAG, CSS variables', level: 'Beginner', topics: ['Semantic HTML', 'Flexbox', 'CSS Grid', 'Responsive', 'WCAG', 'CSS Variables'] },
      { id: 2, title: 'JavaScript & TypeScript', desc: 'ES6+, async/await, DOM, TypeScript types, generics', level: 'Beginner', topics: ['ES6+', 'Async/Await', 'DOM API', 'TypeScript', 'Generics', 'Type Guards'] },
      { id: 3, title: 'React & State Management', desc: 'Hooks, Context, Redux Toolkit, React Query, performance', level: 'Intermediate', topics: ['React Hooks', 'Context API', 'Redux Toolkit', 'React Query', 'Memoization', 'Code Splitting'] },
      { id: 4, title: 'Node.js & Express', desc: 'REST API design, middleware, error handling, file uploads, rate limiting', level: 'Intermediate', topics: ['Express.js', 'REST Design', 'Middleware', 'File Uploads', 'Rate Limiting', 'Streaming'] },
      { id: 5, title: 'Databases: SQL & NoSQL', desc: 'PostgreSQL, MongoDB, Redis, ORMs, query optimization, schema design', level: 'Intermediate', topics: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Query Optimization', 'Schema Design'] },
      { id: 6, title: 'Authentication & Security', desc: 'JWT, OAuth2, session management, OWASP top 10, HTTPS, CORS', level: 'Intermediate', topics: ['JWT', 'OAuth2', 'Sessions', 'OWASP Top 10', 'HTTPS', 'CORS'] },
      { id: 7, title: 'Next.js & SSR', desc: 'App Router, SSR/SSG/ISR, API routes, Vercel deployment, SEO', level: 'Advanced', topics: ['App Router', 'SSR/SSG/ISR', 'Server Components', 'API Routes', 'Vercel', 'SEO'] },
      { id: 8, title: 'DevOps for Full Stack', desc: 'Docker, CI/CD, GitHub Actions, Nginx, cloud platforms', level: 'Advanced', topics: ['Docker', 'GitHub Actions', 'CI/CD', 'Nginx', 'AWS/GCP', 'Monitoring'] },
      { id: 9, title: 'System Design', desc: 'Load balancing, caching, CDN, microservices, WebSockets, scaling', level: 'Advanced', topics: ['Load Balancing', 'CDN', 'WebSockets', 'Microservices', 'Horizontal Scaling', 'DB Sharding'] },
    ],
    resources: [
      { name: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'free', desc: 'Full project-based curriculum' },
      { name: 'Full Stack Open — Helsinki', url: 'https://fullstackopen.com/', type: 'free', desc: 'React, Node, GraphQL, TypeScript' },
      { name: 'Next.js Official Course', url: 'https://nextjs.org/learn', type: 'free', desc: 'Official, always updated' },
      { name: 'Frontend Mentor', url: 'https://www.frontendmentor.io/', type: 'free', desc: 'Real projects with designs' },
      { name: 'Web Dev Bootcamp', url: 'https://www.udemy.com/course/the-web-developer-bootcamp/', type: 'paid', desc: 'Udemy · Colt Steele · 60+ hrs' },
      { name: 'Full Stack Roadmap', url: 'https://roadmap.sh/full-stack', type: 'free', desc: 'roadmap.sh visual path' },
    ]
  },
  ai: {
    id: 'ai', title: 'AI Engineer Path', icon: '🤖',
    description: 'Classical ML, deep learning, NLP, LLMs, prompt engineering, RAG, and agentic AI systems.',
    duration: '~200 hrs', moduleCount: 10,
    modules: [
      { id: 1, title: 'ML Foundations', desc: 'Supervised/unsupervised learning, regression, classification, scikit-learn', level: 'Traditional AI', topics: ['Supervised Learning', 'Unsupervised', 'scikit-learn', 'Eval Metrics', 'Cross Validation', 'Feature Eng'] },
      { id: 2, title: 'Deep Learning', desc: 'Neural networks, CNNs, RNNs, backpropagation, PyTorch', level: 'Traditional AI', topics: ['Neural Networks', 'CNNs', 'RNNs', 'Backprop', 'PyTorch', 'Regularization'] },
      { id: 3, title: 'NLP & Transformers', desc: 'Tokenization, attention, BERT, fine-tuning, Hugging Face, embeddings', level: 'Traditional + Gen AI', topics: ['Tokenization', 'Attention', 'BERT', 'Fine-tuning', 'Hugging Face', 'Embeddings'] },
      { id: 4, title: 'Large Language Models', desc: 'GPT architecture, RLHF, instruction tuning, context windows', level: 'Gen AI', topics: ['GPT Architecture', 'RLHF', 'Instruction Tuning', 'Context Windows', 'Model Eval', 'Quantization'] },
      { id: 5, title: 'Prompt Engineering', desc: 'Few-shot, chain-of-thought, ReAct, structured output, eval frameworks', level: 'Gen AI', topics: ['Few-shot', 'Chain-of-Thought', 'ReAct', 'Structured Output', 'System Prompts', 'Evals'] },
      { id: 6, title: 'RAG & Vector DBs', desc: 'Retrieval-Augmented Generation, Pinecone/Chroma, hybrid search', level: 'Gen AI', topics: ['RAG Architecture', 'Vector Embeddings', 'Pinecone', 'Chroma', 'Hybrid Search', 'Chunking'] },
      { id: 7, title: 'LangChain & LlamaIndex', desc: 'Chains, agents, memory, document loaders, tool use', level: 'Agentic AI', topics: ['LangChain', 'LlamaIndex', 'Memory Systems', 'Doc Loaders', 'Tool Use', 'Production'] },
      { id: 8, title: 'Agentic AI Systems', desc: 'Multi-agent, AutoGen, CrewAI, planning, reflection loops', level: 'Agentic AI', topics: ['Multi-Agent', 'AutoGen', 'CrewAI', 'Tool Calling', 'Planning', 'Reflection'] },
      { id: 9, title: 'Fine-tuning & MLOps', desc: 'LoRA, PEFT, QLoRA, model serving, MLflow, A/B testing', level: 'Advanced', topics: ['LoRA', 'PEFT', 'QLoRA', 'MLflow', 'Model Serving', 'A/B Testing'] },
      { id: 10, title: 'AI System Design', desc: 'Scalable AI infra, latency, guardrails, evaluation, responsible AI', level: 'Advanced', topics: ['AI Infrastructure', 'Latency', 'Guardrails', 'Evals', 'Safety', 'Cost Optimization'] },
    ],
    resources: [
      { name: 'DeepLearning.AI — Andrew Ng', url: 'https://www.deeplearning.ai/', type: 'free', desc: 'ML Specialization, Gen AI courses' },
      { name: 'Hugging Face Courses', url: 'https://huggingface.co/learn', type: 'free', desc: 'NLP, Diffusion, RL — updated' },
      { name: 'Fast.ai', url: 'https://www.fast.ai/', type: 'free', desc: 'Practical deep learning, top-down' },
      { name: 'Anthropic Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', type: 'free', desc: 'Official advanced prompting guide' },
      { name: 'LangChain Docs', url: 'https://python.langchain.com/', type: 'free', desc: 'RAG, agents, chains — official' },
      { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'free', desc: 'Hands-on ML with real datasets' },
      { name: 'Microsoft Gen AI Beginners', url: 'https://github.com/microsoft/generative-ai-for-beginners', type: 'free', desc: 'GitHub · 18-lesson curriculum' },
    ]
  }
};

const levelColors = {
  'Beginner': { bg: 'rgba(79,142,247,.12)', color: 'var(--accent)' },
  'Intermediate': { bg: 'rgba(245,158,11,.12)', color: 'var(--amber)' },
  'Advanced': { bg: 'rgba(239,68,68,.12)', color: 'var(--red)' },
  'Traditional AI': { bg: 'rgba(79,142,247,.12)', color: 'var(--accent)' },
  'Traditional + Gen AI': { bg: 'rgba(245,158,11,.12)', color: 'var(--amber)' },
  'Gen AI': { bg: 'rgba(45,212,191,.12)', color: 'var(--accent3)' },
  'Agentic AI': { bg: 'rgba(124,94,247,.12)', color: 'var(--accent2)' },
};

export default function LearnPage() {
  const [activeCourse, setActiveCourse] = useState('python');
  const [expandedModule, setExpandedModule] = useState(null);
  const [explanation, setExplanation] = useState({ topic: '', text: '', loading: false });
  const course = courses[activeCourse];

  const explainTopic = async (topic) => {
    setExplanation({ topic, text: '', loading: true });
    try {
      const { explanation: text } = await learningAPI.explainTopic({ topic, level: 'intermediate' });
      setExplanation({ topic, text, loading: false });
    } catch (e) {
      setExplanation({ topic, text: 'Error: ' + (e.response?.data?.error || e.message), loading: false });
    }
  };

  return (
    <div style={{ overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-.5px', marginBottom: '.5rem' }}>Learning Hub 📚</h2>
          <div style={{ color: 'var(--text2)', fontSize: '.9rem' }}>Master technologies with curated courses and AI explanations</div>
        </div>

        {/* Course tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {Object.values(courses).map(c => (
            <button key={c.id} onClick={() => setActiveCourse(c.id)} style={{
              padding: '8px 18px', borderRadius: '10px', fontSize: '.85rem', fontWeight: 500, cursor: 'pointer',
              border: `1px solid ${activeCourse === c.id ? 'var(--accent)' : 'var(--border)'}`,
              background: activeCourse === c.id ? 'rgba(79,142,247,.1)' : 'var(--bg2)',
              color: activeCourse === c.id ? 'var(--accent)' : 'var(--text2)',
              fontFamily: 'var(--font)', transition: 'all .2s'
            }}>{c.icon} {c.title.split(' ')[0]} {c.title.split(' ')[1]}</button>
          ))}
        </div>

        {/* Course hero */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ fontSize: '3rem', flexShrink: 0 }}>{course.icon}</div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '.5rem' }}>{course.title}</h3>
            <p style={{ color: 'var(--text2)', fontSize: '.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{course.description}</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {[['Modules', course.modules.length], ['Duration', course.duration], ['Level', 'Beginner → Expert']].map(([k, v]) => (
                <div key={k} style={{ fontSize: '.8rem', color: 'var(--text3)' }}>
                  <strong style={{ color: 'var(--text)', fontSize: '.9rem' }}>{v}</strong> {k}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {course.modules.map(m => (
            <div key={m.id} onClick={() => setExpandedModule(expandedModule === m.id ? null : m.id)} style={{
              background: 'var(--bg2)', border: `1px solid ${expandedModule === m.id ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '12px', padding: '1.25rem', cursor: 'pointer', transition: 'all .2s'
            }}>
              <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)', marginBottom: '.5rem', fontFamily: 'var(--mono)' }}>
                MODULE {String(m.id).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '.9rem', fontWeight: 600, marginBottom: '.4rem' }}>{m.title}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text2)', lineHeight: 1.5, marginBottom: '.75rem' }}>{m.desc}</div>
              <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '6px', fontSize: '.75rem', fontWeight: 500, ...(levelColors[m.level] || levelColors['Intermediate']) }}>
                {m.level}
              </span>

              {expandedModule === m.id && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text3)', marginBottom: '.75rem', textTransform: 'uppercase', letterSpacing: '.5px' }}>Topics — click to get AI explanation</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {m.topics.map(t => (
                      <span key={t} onClick={(e) => { e.stopPropagation(); explainTopic(t); }} style={{
                        padding: '4px 10px', borderRadius: '6px', fontSize: '.75rem', cursor: 'pointer',
                        background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)',
                        transition: 'all .2s'
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Explanation box */}
        {(explanation.topic || explanation.loading) && (
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600 }}>🤖 AI Explanation: {explanation.topic}</div>
              <button onClick={() => setExplanation({ topic: '', text: '', loading: false })} style={{ background: 'transparent', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            </div>
            {explanation.loading ? (
              <div className="typing"><span /><span /><span /></div>
            ) : (
              <div style={{ fontSize: '.9rem', color: 'var(--text2)', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: '400px', overflowY: 'auto' }}>{explanation.text}</div>
            )}
          </div>
        )}

        {/* Resources */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Best Learning Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {course.resources.map(r => (
              <div key={r.name} onClick={() => window.open(r.url, '_blank')} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px',
                padding: '.875rem 1rem', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', cursor: 'pointer', transition: 'all .2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: r.type === 'free' ? 'rgba(34,197,94,.1)' : 'rgba(245,158,11,.1)', fontSize: '.85rem' }}>
                    {r.type === 'free' ? '🆓' : '💳'}
                  </div>
                  <div>
                    <div style={{ fontSize: '.875rem', fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--text3)', marginTop: '2px' }}>{r.desc}</div>
                  </div>
                </div>
                <span style={{ fontSize: '.7rem', padding: '3px 8px', borderRadius: '6px', fontWeight: 500, background: r.type === 'free' ? 'rgba(34,197,94,.1)' : 'rgba(245,158,11,.1)', color: r.type === 'free' ? 'var(--green)' : 'var(--amber)', border: `1px solid ${r.type === 'free' ? 'rgba(34,197,94,.2)' : 'rgba(245,158,11,.2)'}` }}>
                  {r.type === 'free' ? 'Free' : 'Paid'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
