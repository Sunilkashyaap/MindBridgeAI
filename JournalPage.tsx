
import React, { useState } from 'react';
import { analyzeJournalEntry } from '../geminiService';
import { AnalysisResult } from '../types';

interface JournalPageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const JournalPage: React.FC<JournalPageProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length < 20) {
      setError('The depth of your insight requires more context. Write at least a few sentences.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeJournalEntry(text);
      onAnalysisComplete(result);
    } catch (err) {
      console.error(err);
      setError('The connection to the emotional engine was interrupted. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-48 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Journal Session 01</div>
          <h1 className="text-6xl font-bold tracking-tighter text-zinc-900">
            Tell the machine<br />
            <span className="font-serif italic font-light text-zinc-400">how you truly feel.</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="relative group">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter the stream of consciousness..."
            className="w-full min-h-[40vh] text-3xl font-serif leading-relaxed text-zinc-800 placeholder:text-zinc-100 focus:outline-none bg-transparent resize-none border-none"
            disabled={isAnalyzing}
            autoFocus
          />
          
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center border-t border-zinc-100 pt-12 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">Metric Count</span>
              <span className="text-sm font-medium font-mono">{text.length} <span className="opacity-30">chars</span></span>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !text.trim()}
              className={`group flex items-center gap-6 transition-all ${
                isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:gap-8'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-900">
                {isAnalyzing ? 'Analyzing Frequency...' : 'Submit to Engine'}
              </span>
              <div className={`w-12 h-px bg-zinc-900 transition-all ${isAnalyzing ? 'animate-pulse w-24' : ''}`}></div>
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-12 p-6 border border-rose-100 bg-rose-50 rounded-2xl text-rose-700 text-sm font-medium font-serif italic">
            {error}
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-24 text-center">
            <div className="inline-block relative">
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300 animate-pulse">Deconstructing Sentiment</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
