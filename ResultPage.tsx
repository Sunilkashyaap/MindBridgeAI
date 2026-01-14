
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultPageProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onReset }) => {
  const { analysis, coach, ui } = result;

  // Modern background adaptation
  const getBackgroundStyle = () => {
    switch (ui.color_tone) {
      case 'warm': return 'bg-rose-50/30';
      case 'cool': return 'bg-sky-50/30';
      default: return 'bg-zinc-50/30';
    }
  };

  const getAccentColor = () => {
    switch (ui.color_tone) {
      case 'warm': return 'text-rose-600';
      case 'cool': return 'text-sky-600';
      default: return 'text-zinc-600';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-[2s] ${getBackgroundStyle()} pt-48 pb-32 px-8`}>
      <div className="max-w-[90rem] mx-auto">
        
        {/* Editorial Header */}
        <header className="grid grid-cols-12 gap-8 mb-32 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 mb-6">Inferred state</div>
            <h1 className="massive-text text-zinc-900 flex flex-col">
              <span>Feeling</span>
              <span className={`italic font-serif font-light ${getAccentColor()}`}>
                {analysis.dominant_emotion}.
              </span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 border-l border-zinc-200 pl-8 pb-4">
            <p className="text-lg text-zinc-600 font-serif italic leading-relaxed">
              "{analysis.short_reasoning}"
            </p>
          </div>
        </header>

        {/* The Grid Spread */}
        <div className="grid grid-cols-12 gap-16">
          
          {/* Metrics Column */}
          <div className="col-span-12 lg:col-span-4 space-y-20">
            <div className="space-y-12">
              <MetricBox label="Stress Intensity" value={analysis.stress_level} />
              <MetricBox label="Motivational Flux" value={analysis.motivation_level} />
              
              <div className="pt-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 block mb-4">Cognitive Baseline</span>
                <span className="text-4xl font-bold tracking-tighter text-zinc-900">{analysis.cognitive_load} <span className="text-sm font-medium tracking-normal opacity-30">LOAD</span></span>
              </div>
            </div>

            <div className="p-8 border border-zinc-100 bg-white rounded-3xl space-y-4 shadow-sm">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">AI FOCUS</span>
               <p className="text-xl font-medium tracking-tight text-zinc-800 leading-snug">
                {analysis.suggested_action}
               </p>
            </div>
          </div>

          {/* Coach Spread Column */}
          <div className="col-span-12 lg:col-span-8 relative">
            <div className="bg-zinc-900 rounded-[3rem] p-12 lg:p-24 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="white" />
                </svg>
              </div>

              <div className="relative z-10 space-y-16">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-white/30"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/50">COACH DISCOURSE</span>
                </div>

                <h3 className="text-5xl lg:text-7xl font-serif font-light leading-[1.1] italic">
                  "{coach.validation}"
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Adaptive Step</span>
                    <p className="text-xl font-medium leading-relaxed opacity-90">{coach.practical_suggestion}</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">Encouragement</span>
                    <p className="text-lg font-serif italic opacity-70 leading-relaxed">{coach.encouragement}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-end">
              <button 
                onClick={onReset}
                className="group flex items-center gap-6 transition-all hover:gap-10"
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-900">New Reflection</span>
                <div className="w-24 h-px bg-zinc-900"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricBoxProps {
  label: string;
  value: number;
}

const MetricBox: React.FC<MetricBoxProps> = ({ label, value }) => (
  <div className="group">
    <div className="flex justify-between items-baseline mb-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">{label}</span>
      <span className="text-2xl font-bold tracking-tighter text-zinc-900">{value}%</span>
    </div>
    <div className="h-[1px] bg-zinc-100 w-full relative">
      <div 
        className="h-[2px] bg-zinc-900 absolute top-[-1px] left-0 transition-all duration-[2s] ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default ResultPage;
