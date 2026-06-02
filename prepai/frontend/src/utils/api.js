import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api` 
  : '/api';

export function getApiKey() {
  return localStorage.getItem('prepai_api_key') || '';
}

export function setApiKey(key) {
  localStorage.setItem('prepai_api_key', key);
}

export function clearApiKey() {
  localStorage.removeItem('prepai_api_key');
}

// Interview API
export const interviewAPI = {
  generateQuestions: async ({ role, experience, techStack, resumeText }) => {
    const res = await axios.post(`${BASE}/interview/generate-questions`, {
      role, experience, techStack, resumeText, apiKey: getApiKey()
    });
    return res.data;
  },

  evaluate: async ({ role, experience, questions, answers }) => {
    const res = await axios.post(`${BASE}/interview/evaluate`, {
      role, experience, questions, answers, apiKey: getApiKey()
    });
    return res.data;
  },

  followup: async ({ question, answer, role }) => {
    const res = await axios.post(`${BASE}/interview/followup`, {
      question, answer, role, apiKey: getApiKey()
    });
    return res.data;
  }
};

// Learning API
export const learningAPI = {
  getCourses: async () => {
    const res = await axios.get(`${BASE}/learning/courses`);
    return res.data;
  },

  getCourse: async (id) => {
    const res = await axios.get(`${BASE}/learning/courses/${id}`);
    return res.data;
  },

  explainTopic: async ({ topic, level }) => {
    const res = await axios.post(`${BASE}/learning/explain`, {
      topic, level, apiKey: getApiKey()
    });
    return res.data;
  }
};
