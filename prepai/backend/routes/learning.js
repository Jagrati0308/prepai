const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

// In learning.js and interview.js, replace getClient():
function getClient(apiKey) {
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('No API key provided');
  
  return new Anthropic({
    apiKey: key,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': process.env.FRONTEND_URL,
    }
  });
}

// Static course data
const courses = {
  python: {
    id: 'python',
    title: 'Python Developer Path',
    icon: '🐍',
    description: 'From Python fundamentals to advanced backend development, data manipulation, and automation.',
    duration: '~120 hrs',
    modules: [
      { id: 1, title: 'Python Fundamentals', desc: 'Variables, data types, control flow, functions, OOP basics, Pythonic idioms', level: 'Beginner', topics: ['Variables & Types', 'Control Flow', 'Functions', 'OOP', 'List Comprehensions', 'Error Handling'] },
      { id: 2, title: 'Advanced Python', desc: 'Decorators, generators, context managers, metaclasses, async/await, performance', level: 'Intermediate', topics: ['Decorators', 'Generators', 'Context Managers', 'Async/Await', 'Metaclasses', 'Memory Management'] },
      { id: 3, title: 'Data & Algorithms', desc: 'NumPy, Pandas, data structures, sorting, searching, complexity analysis', level: 'Intermediate', topics: ['NumPy', 'Pandas', 'DSA', 'Big-O Notation', 'Sorting Algorithms', 'Trees & Graphs'] },
      { id: 4, title: 'Web: Django & FastAPI', desc: 'REST APIs, authentication, ORM, middleware, async endpoints, OpenAPI docs', level: 'Intermediate', topics: ['Django ORM', 'FastAPI', 'REST Design', 'Authentication', 'Middleware', 'OpenAPI'] },
      { id: 5, title: 'Databases & ORM', desc: 'PostgreSQL, SQLAlchemy, Redis, query optimization, migrations, indexing', level: 'Intermediate', topics: ['PostgreSQL', 'SQLAlchemy', 'Redis', 'Migrations', 'Indexing', 'Query Optimization'] },
      { id: 6, title: 'Testing & Quality', desc: 'pytest, unittest, mocking, coverage, TDD principles, CI integration', level: 'Intermediate', topics: ['pytest', 'Mocking', 'TDD', 'Coverage', 'CI/CD', 'Code Quality'] },
      { id: 7, title: 'Docker & Deployment', desc: 'Containerization, Gunicorn, Nginx, environment management, cloud deploy', level: 'Advanced', topics: ['Docker', 'Docker Compose', 'Gunicorn', 'Nginx', 'AWS/GCP', 'Environment Config'] },
      { id: 8, title: 'System Design', desc: 'Scalability patterns, microservices, message queues, caching strategies', level: 'Advanced', topics: ['Scalability', 'Microservices', 'Message Queues', 'Caching', 'Load Balancing', 'CAP Theorem'] }
    ],
    resources: [
      { name: 'Official Python Docs', url: 'https://docs.python.org/3/tutorial/', type: 'free', desc: 'python.org — Most authoritative source' },
      { name: 'Real Python', url: 'https://realpython.com/', type: 'free', desc: 'In-depth articles & project tutorials' },
      { name: 'Learn Python Interactive', url: 'https://www.learnpython.org/', type: 'free', desc: 'Browser-based interactive exercises' },
      { name: '100 Days of Code: Python', url: 'https://www.udemy.com/course/complete-python-bootcamp/', type: 'paid', desc: 'Udemy · Angela Yu · 60+ hours' },
      { name: 'TestDriven.io', url: 'https://testdriven.io/', type: 'paid', desc: 'FastAPI, Django, Docker, TDD tutorials' },
      { name: 'LeetCode Python', url: 'https://leetcode.com/', type: 'free', desc: '2500+ coding problems for practice' }
    ]
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full Stack Developer Path',
    icon: '⚡',
    description: 'Complete web development from HTML/CSS basics to React, Node.js, databases, API design, and deployment.',
    duration: '~160 hrs',
    modules: [
      { id: 1, title: 'HTML, CSS & Accessibility', desc: 'Semantic HTML, Flexbox, Grid, responsive design, WCAG, CSS variables', level: 'Beginner', topics: ['Semantic HTML', 'Flexbox', 'CSS Grid', 'Responsive Design', 'WCAG', 'CSS Variables'] },
      { id: 2, title: 'JavaScript & TypeScript', desc: 'ES6+, async/await, DOM manipulation, TypeScript types, generics', level: 'Beginner', topics: ['ES6+', 'Async/Await', 'DOM API', 'TypeScript', 'Generics', 'Type Guards'] },
      { id: 3, title: 'React & State Management', desc: 'Hooks, Context, Redux Toolkit, React Query, performance optimization', level: 'Intermediate', topics: ['React Hooks', 'Context API', 'Redux Toolkit', 'React Query', 'Memoization', 'Code Splitting'] },
      { id: 4, title: 'Node.js & Express', desc: 'REST API design, middleware, error handling, file uploads, rate limiting', level: 'Intermediate', topics: ['Express.js', 'REST Design', 'Middleware', 'File Uploads', 'Rate Limiting', 'Streaming'] },
      { id: 5, title: 'Databases: SQL & NoSQL', desc: 'PostgreSQL, MongoDB, Redis, ORMs, query optimization, schema design', level: 'Intermediate', topics: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Query Optimization', 'Schema Design'] },
      { id: 6, title: 'Authentication & Security', desc: 'JWT, OAuth2, session management, OWASP top 10, HTTPS, CORS', level: 'Intermediate', topics: ['JWT', 'OAuth2', 'Session Management', 'OWASP Top 10', 'HTTPS', 'CORS'] },
      { id: 7, title: 'Next.js & SSR', desc: 'App Router, SSR/SSG/ISR, API routes, Vercel deployment, SEO optimization', level: 'Advanced', topics: ['App Router', 'SSR/SSG/ISR', 'Server Components', 'API Routes', 'Vercel Deploy', 'SEO'] },
      { id: 8, title: 'DevOps for Full Stack', desc: 'Docker, CI/CD, GitHub Actions, Nginx, cloud platforms', level: 'Advanced', topics: ['Docker', 'GitHub Actions', 'CI/CD', 'Nginx', 'AWS/GCP', 'Monitoring'] },
      { id: 9, title: 'System Design', desc: 'Load balancing, caching, CDN, microservices, WebSockets, scaling', level: 'Advanced', topics: ['Load Balancing', 'CDN', 'WebSockets', 'Microservices', 'Horizontal Scaling', 'Database Sharding'] }
    ],
    resources: [
      { name: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'free', desc: 'Full curriculum, project-based learning' },
      { name: 'Full Stack Open — Helsinki', url: 'https://fullstackopen.com/', type: 'free', desc: 'React, Node, GraphQL, TypeScript' },
      { name: 'Next.js Official Course', url: 'https://nextjs.org/learn', type: 'free', desc: 'Official, always updated' },
      { name: 'Frontend Mentor', url: 'https://www.frontendmentor.io/', type: 'free', desc: 'Real projects with professional designs' },
      { name: 'Web Dev Bootcamp — Colt Steele', url: 'https://www.udemy.com/course/the-web-developer-bootcamp/', type: 'paid', desc: 'Udemy · 60+ hrs HTML to Node.js' },
      { name: 'Full Stack Roadmap', url: 'https://roadmap.sh/full-stack', type: 'free', desc: 'roadmap.sh — Visual learning path' }
    ]
  },
  ai: {
    id: 'ai',
    title: 'AI Engineer Path',
    icon: '🤖',
    description: 'Comprehensive AI track: classical ML, deep learning, NLP, generative AI (LLMs), prompt engineering, RAG, and agentic AI systems.',
    duration: '~200 hrs',
    modules: [
      { id: 1, title: 'ML Foundations', desc: 'Supervised/unsupervised learning, regression, classification, evaluation, scikit-learn', level: 'Traditional AI', topics: ['Supervised Learning', 'Unsupervised Learning', 'scikit-learn', 'Evaluation Metrics', 'Cross Validation', 'Feature Engineering'] },
      { id: 2, title: 'Deep Learning', desc: 'Neural networks, CNNs, RNNs, backpropagation, PyTorch, training techniques', level: 'Traditional AI', topics: ['Neural Networks', 'CNNs', 'RNNs/LSTMs', 'Backpropagation', 'PyTorch', 'Regularization'] },
      { id: 3, title: 'NLP & Transformers', desc: 'Tokenization, attention mechanism, BERT, fine-tuning, Hugging Face, embeddings', level: 'Traditional + Gen AI', topics: ['Tokenization', 'Attention Mechanism', 'BERT', 'Fine-tuning', 'Hugging Face', 'Embeddings'] },
      { id: 4, title: 'Large Language Models', desc: 'GPT architecture, RLHF, instruction tuning, context windows, model comparison', level: 'Gen AI', topics: ['GPT Architecture', 'RLHF', 'Instruction Tuning', 'Context Windows', 'Model Evaluation', 'Quantization'] },
      { id: 5, title: 'Prompt Engineering', desc: 'Few-shot, chain-of-thought, ReAct, structured output, system prompts, eval frameworks', level: 'Gen AI', topics: ['Few-shot Prompting', 'Chain-of-Thought', 'ReAct Pattern', 'Structured Output', 'System Prompts', 'Prompt Evaluation'] },
      { id: 6, title: 'RAG & Vector DBs', desc: 'Retrieval-Augmented Generation, embeddings, Pinecone/Weaviate/Chroma, hybrid search', level: 'Gen AI', topics: ['RAG Architecture', 'Vector Embeddings', 'Pinecone', 'Chroma', 'Hybrid Search', 'Chunking Strategies'] },
      { id: 7, title: 'LangChain & LlamaIndex', desc: 'Chains, agents, memory, document loaders, tool use, production patterns', level: 'Agentic AI', topics: ['LangChain Chains', 'LlamaIndex', 'Memory Systems', 'Document Loaders', 'Tool Use', 'Production Deploy'] },
      { id: 8, title: 'Agentic AI Systems', desc: 'Multi-agent frameworks, AutoGen, CrewAI, tool calling, planning, reflection loops', level: 'Agentic AI', topics: ['Multi-Agent Systems', 'AutoGen', 'CrewAI', 'Tool Calling', 'Planning Algorithms', 'Reflection Loops'] },
      { id: 9, title: 'Fine-tuning & MLOps', desc: 'LoRA, PEFT, QLoRA, model serving, MLflow, monitoring, A/B testing', level: 'Advanced', topics: ['LoRA', 'PEFT', 'QLoRA', 'MLflow', 'Model Serving', 'A/B Testing Models'] },
      { id: 10, title: 'AI System Design', desc: 'Scalable AI infra, latency optimization, guardrails, evaluation, responsible AI', level: 'Advanced', topics: ['AI Infrastructure', 'Latency Optimization', 'Guardrails', 'Evals', 'Safety & Alignment', 'Cost Optimization'] }
    ],
    resources: [
      { name: 'DeepLearning.AI — Andrew Ng', url: 'https://www.deeplearning.ai/', type: 'free', desc: 'ML Specialization, LLMOps, Gen AI courses' },
      { name: 'Hugging Face Courses', url: 'https://huggingface.co/learn', type: 'free', desc: 'NLP, Diffusion, RL — always updated' },
      { name: 'Fast.ai — Practical DL', url: 'https://www.fast.ai/', type: 'free', desc: 'Top-down approach, project-first' },
      { name: 'Anthropic Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', type: 'free', desc: 'Official advanced prompting guide' },
      { name: 'LangChain Documentation', url: 'https://python.langchain.com/', type: 'free', desc: 'RAG, agents, chains — official docs' },
      { name: 'Kaggle Learn + Competitions', url: 'https://www.kaggle.com/learn', type: 'free', desc: 'Hands-on ML/DL with real datasets' },
      { name: 'Microsoft Gen AI Beginners', url: 'https://github.com/microsoft/generative-ai-for-beginners', type: 'free', desc: 'GitHub · 18-lesson curriculum' }
    ]
  }
};

// GET /api/learning/courses
router.get('/courses', (req, res) => {
  const summary = Object.values(courses).map(c => ({
    id: c.id, title: c.title, icon: c.icon,
    description: c.description, duration: c.duration,
    moduleCount: c.modules.length
  }));
  res.json({ success: true, courses: summary });
});

// GET /api/learning/courses/:id
router.get('/courses/:id', (req, res) => {
  const course = courses[req.params.id];
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json({ success: true, course });
});

// POST /api/learning/explain
router.post('/explain', async (req, res) => {
  try {
    const { topic, level, apiKey } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    const client = getClient(apiKey);

    const message = await client.messages.create({
      model: 'openai/gpt-oss-20b:free',
      max_tokens: 1000,
      system: `You are a brilliant tech educator. Explain concepts clearly with examples, analogies, and code snippets where helpful. Keep explanations concise but complete. Format with clear sections.`,
      messages: [{
        role: 'user',
        content: `Explain "${topic}" for a ${level || 'intermediate'} developer. Include: what it is, why it matters, a simple example, and one common interview question about it.`
      }]
    });

    res.json({ success: true, explanation: message.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
