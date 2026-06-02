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

// POST /api/interview/generate-questions
router.post('/generate-questions', async (req, res) => {
  try {
    const { role, experience, techStack, resumeText, apiKey } = req.body;
    if (!role || !experience) {
      return res.status(400).json({ error: 'Role and experience are required' });
    }

    const client = getClient(apiKey);

    const systemPrompt = `You are an expert technical interviewer at a top tech company.
Generate exactly 10 interview questions as a JSON array.
Each question object must have:
- "q": the question text (clear, specific, not trivial)
- "hint": brief note on what a good answer should cover (1 sentence)
- "category": one of "Technical", "System Design", "Behavioral", "Problem Solving"
- "difficulty": one of "Easy", "Medium", "Hard"

Rules:
- Tailor questions to ${role} role at ${experience} level
- Mix categories: at least 5 Technical, 2 System Design, 1 Behavioral, 2 Problem Solving
- Match difficulty to experience level (fresher=mostly easy/medium, senior=mostly hard)
- Make questions practical and real-world relevant
${techStack ? `- Focus on these technologies: ${techStack}` : ''}
${resumeText ? `- Personalize based on this resume:\n${resumeText.substring(0, 2000)}` : ''}

Return ONLY the JSON array. No markdown, no explanation.`;

    const message = await client.messages.create({
      model: 'nvidia/nemotron-nano-9b-v2:free',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: 'Generate the 10 interview questions now.' }]
    });

    const raw = message.content[0].text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const questions = JSON.parse(raw);

    res.json({ success: true, questions, count: questions.length });
  } catch (err) {
    console.error('Generate questions error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/interview/evaluate
router.post('/evaluate', async (req, res) => {
  try {
    const { role, experience, questions, answers, apiKey } = req.body;
    if (!questions || !answers) {
      return res.status(400).json({ error: 'Questions and answers are required' });
    }

    const client = getClient(apiKey);

    const qa = questions.map((q, i) =>
      `Q${i + 1} [${q.category}]: ${q.q}\nAnswer: ${answers[i] || '[No answer given]'}`
    ).join('\n\n');

    const systemPrompt = `You are a senior technical interviewer evaluating a candidate.
Analyze the interview and return ONLY valid JSON in exactly this format:
{
  "overall": <0-100>,
  "technical": <0-100>,
  "communication": <0-100>,
  "understanding": <0-100>,
  "delivery": <0-100>,
  "strengths": ["specific strength 1", "specific strength 2", "specific strength 3"],
  "weaknesses": ["specific weakness 1", "specific weakness 2"],
  "improve": ["topic to study 1", "topic to study 2", "topic to study 3"],
  "summary": "2-3 sentence honest overall assessment of the candidate",
  "recommendation": "Strong Hire|Hire|Needs Work|Not Ready",
  "questionFeedback": [
    {"qIndex": 0, "score": <0-10>, "comment": "brief feedback on this answer"}
  ]
}
Be honest, specific, and constructive. Base scores on actual answer quality.
Return ONLY the JSON object, no other text.`;

    const message = await client.messages.create({
      model: 'nvidia/nemotron-nano-9b-v2:free',
      max_tokens: 2500,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `Role: ${role}\nExperience: ${experience}\n\nInterview Q&A:\n${qa}`
      }]
    });

    const raw = message.content[0].text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(raw);

    res.json({ success: true, result });
  } catch (err) {
    console.error('Evaluate error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/interview/followup
router.post('/followup', async (req, res) => {
  try {
    const { question, answer, role, apiKey } = req.body;
    const client = getClient(apiKey);

    const message = await client.messages.create({
      model: 'nvidia/nemotron-nano-9b-v2:free',
      max_tokens: 300,
      system: `You are a technical interviewer. Ask ONE brief follow-up question based on the candidate's answer to probe deeper or clarify. Keep it to 1-2 sentences max.`,
      messages: [{
        role: 'user',
        content: `Role being interviewed: ${role}\nOriginal question: ${question}\nCandidate answered: ${answer}\n\nAsk a follow-up question.`
      }]
    });

    res.json({ success: true, followup: message.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
