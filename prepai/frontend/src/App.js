import React, { useState } from 'react';
import './styles/global.css';
import Nav from './components/Nav';
import ApiKeyModal from './components/ApiKeyModal';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import ActiveInterviewPage from './pages/ActiveInterviewPage';
import ResultsPage from './pages/ResultsPage';
import LearnPage from './pages/LearnPage';

export default function App() {
  const [screen, setScreen] = useState('home'); // home | interview | active | results | learn
  const [showApiModal, setShowApiModal] = useState(false);
  const [interviewSetup, setInterviewSetup] = useState(null);
  const [interviewData, setInterviewData] = useState(null); // {questions, answers}
  const [results, setResults] = useState(null);

  const navigate = (to, data) => {
    if (data) {
      if (to === 'active') setInterviewSetup(data);
      if (to === 'results') setResults(data);
    }
    setScreen(to);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav
        activeScreen={screen}
        onNavigate={navigate}
        onApiClick={() => setShowApiModal(true)}
      />

      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}

      {screen === 'home' && <HomePage onNavigate={navigate} />}
      {screen === 'interview' && <InterviewPage onNavigate={navigate} />}
      {screen === 'active' && (
        <ActiveInterviewPage
          setup={interviewSetup}
          onFinish={(data) => navigate('results', data)}
          onNavigate={navigate}
        />
      )}
      {screen === 'results' && (
        <ResultsPage
          results={results}
          setup={interviewSetup}
          onNavigate={navigate}
        />
      )}
      {screen === 'learn' && <LearnPage onNavigate={navigate} />}
    </div>
  );
}
