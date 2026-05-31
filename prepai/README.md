# PrepAI — AI Interview Practice & Learning Platform

A full-stack AI-powered platform for technical interview preparation and technology learning.

---

## 🚀 Features

### Phase 1 — Interview Practice
- Upload resume + select role & experience level
- AI generates 10 tailored questions using Claude
- Complete interview with typed answers
- Detailed report: overall score, 4 sub-scores, strengths, weaknesses, study topics
- Per-question feedback with scores
- Recommendation: Strong Hire / Hire / Needs Work / Not Ready

### Phase 2 — Learning Hub
- **Python Path**: 8 modules, fundamentals → system design
- **Full Stack Path**: 9 modules, HTML → DevOps
- **AI Engineer Path**: 10 modules, ML → Agentic AI systems
- Click any topic for an AI-generated explanation
- Curated free & paid resources with links

---

## 📁 Project Structure

```
prepai/
├── backend/             # Node.js + Express API
│   ├── server.js
│   ├── routes/
│   │   ├── interview.js  # Question generation & evaluation
│   │   └── learning.js   # Courses & AI explanations
│   ├── .env.example
│   └── package.json
└── frontend/            # React app
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── components/
    │   │   ├── Nav.js
    │   │   └── ApiKeyModal.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── InterviewPage.js
    │   │   ├── ActiveInterviewPage.js
    │   │   ├── ResultsPage.js
    │   │   └── LearnPage.js
    │   ├── utils/
    │   │   └── api.js
    │   └── styles/
    │       └── global.css
    └── package.json
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- An Anthropic API key (https://console.anthropic.com)

---

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here

# Start development server
npm run dev
# Backend runs on http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# Frontend runs on http://localhost:3000
```

---

### Running Both Together

Open two terminals:

**Terminal 1 (Backend):**
```bash
cd prepai/backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd prepai/frontend && npm start
```

Open http://localhost:3000 in your browser.

---

## 🔑 API Key

You can set your Anthropic API key in two ways:

1. **Backend `.env` file** (recommended for production):
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

2. **In-app UI** (click "⚡ Set API Key" in the nav):
   - Key is stored in browser localStorage
   - Sent with each API request to the backend

---

## 🛠️ Supported Roles
- Python Developer
- Full Stack Developer
- Frontend Developer
- Backend Developer
- AI/ML Engineer
- Generative AI Engineer
- Data Scientist
- DevOps Engineer

## 📊 Evaluation Metrics
- **Overall Score** (0-100)
- **Technical Knowledge** — depth and accuracy
- **Communication** — clarity and structure
- **Question Understanding** — how well you addressed what was asked
- **Answer Delivery** — coherence and confidence

---

## 🌐 Production Deployment

### Backend (e.g. Railway, Render, Heroku)
1. Set `ANTHROPIC_API_KEY` environment variable
2. Set `NODE_ENV=production`
3. Set `FRONTEND_URL` to your frontend domain

### Frontend (e.g. Vercel, Netlify)
1. Set `REACT_APP_API_URL` to your backend URL
2. Run `npm run build` and deploy the `build/` folder

---

## 📝 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Axios |
| Backend | Node.js, Express |
| AI | Anthropic Claude (claude-sonnet-4-20250514) |
| Styling | CSS Variables, Space Grotesk font |
| Rate Limiting | express-rate-limit |

---

## 💡 Tips

- For best results, paste your actual resume text in Step 3
- Answer questions like you're in a real interview — be specific
- After results, click "Go Study →" to jump to the relevant learning track
- Click any topic chip in the Learning Hub to get an AI explanation
