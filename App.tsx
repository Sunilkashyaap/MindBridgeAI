
import React, { useState, useEffect } from 'react';
import { AnalysisResult } from './types';
import LandingPage from './pages/LandingPage';
import JournalPage from './pages/JournalPage';
import ResultPage from './pages/ResultPage';

type View = 'landing' | 'journal' | 'result';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('mb_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = () => {
    const mockUser = { name: 'Alex Student', email: 'alex@college.edu' };
    localStorage.setItem('mb_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setCurrentView('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('mb_user');
    setUser(null);
    setCurrentView('landing');
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setLastResult(result);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-8 flex justify-between items-baseline mix-blend-difference pointer-events-none">
        <div 
          className="text-2xl font-bold tracking-tighter text-white pointer-events-auto cursor-pointer"
          onClick={() => setCurrentView(user ? 'journal' : 'landing')}
        >
          MindBridge <span className="italic font-serif font-light opacity-80">AI</span>
        </div>
        
        <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white pointer-events-auto">
          {user ? (
            <>
              <span className="hidden sm:inline opacity-50">{user.name}</span>
              <button onClick={handleLogout} className="hover:opacity-50 transition-opacity underline underline-offset-4">End Session</button>
            </>
          ) : (
            <button onClick={handleLogin} className="hover:opacity-50 transition-opacity underline underline-offset-4">Authenticate</button>
          )}
        </div>
      </nav>

      {/* View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage onGetStarted={handleLogin} />
        )}
        
        {currentView === 'journal' && (
          <JournalPage onAnalysisComplete={handleAnalysisComplete} />
        )}
        
        {currentView === 'result' && lastResult && (
          <ResultPage 
            result={lastResult} 
            onReset={() => setCurrentView('journal')} 
          />
        )}
      </main>

      <footer className="px-8 py-12 flex flex-col sm:flex-row justify-between items-end border-t border-zinc-100 bg-white">
        <div className="max-w-xs space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">MindBridge AI Collective</p>
          <p className="text-sm text-zinc-500 font-serif leading-relaxed italic">
            Navigating the intersection of digital experience and emotional depth.
          </p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 mt-8 sm:mt-0">
          © 2024 Design for Wellness
        </div>
      </footer>
    </div>
  );
};

export default App;
