
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-white">
      {/* Hero Section - Editorial Layout */}
      <section className="min-h-screen flex flex-col relative overflow-hidden">
        <div className="container mx-auto px-8 pt-48 pb-24 relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-[90rem]">
            <h1 className="massive-text text-zinc-900 mb-12">
              Emotional Intelligence<br />
              <span className="text-zinc-400 font-serif italic font-light">for the digital mind.</span>
            </h1>
            
            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-5 space-y-8">
                <p className="text-xl text-zinc-600 font-serif leading-relaxed italic">
                  MindBridge AI observes the subtle architecture of your daily reflections, adapting your digital workspace to your current emotional state.
                </p>
                <button 
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] group"
                >
                  <span className="px-8 py-5 bg-zinc-900 text-white rounded-full group-hover:bg-zinc-800 transition-all">
                    Initiate Reflection
                  </span>
                  <div className="w-12 h-px bg-zinc-300 group-hover:w-16 transition-all"></div>
                </button>
              </div>
              
              <div className="col-span-12 lg:col-start-7 lg:col-span-6 relative aspect-[4/5] overflow-hidden rounded-2xl group">
                <img 
                  src="https://i.pinimg.com/736x/ca/9a/d6/ca9ad641a454f702694cfef2e1b1d891.jpg" 
                  alt="Introspective portrait"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-rose-500/20 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background text */}
        <div className="absolute top-1/2 -right-1/4 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
          <span className="text-[40vw] font-black leading-none tracking-tighter">FEEL</span>
        </div>
      </section>

      {/* Proof Section - Stats Grid */}
      <section className="px-8 py-32 border-t border-zinc-100">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          <div className="space-y-4">
            <span className="text-5xl font-bold tracking-tighter block">01</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Core Loop</p>
            <p className="text-sm text-zinc-600 leading-relaxed">Real-time inference of mental load and emotional baseline.</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl font-bold tracking-tighter block">3.0</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Gemini Engine</p>
            <p className="text-sm text-zinc-600 leading-relaxed">Leveraging the latest in multimodal reasoning for empathy.</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl font-bold tracking-tighter block">0%</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Data Sell</p>
            <p className="text-sm text-zinc-600 leading-relaxed">Your state is your own. We never share or sell journal metadata.</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl font-bold tracking-tighter block">∞</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Adaptive UI</p>
            <p className="text-sm text-zinc-600 leading-relaxed">Colors and densities that shift to match your cognitive capacity.</p>
          </div>
        </div>
      </section>

      {/* Editorial Split Section */}
      <section className="px-8 py-32 bg-zinc-50">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-6xl font-serif font-medium text-zinc-900 leading-[1.1]">
            From raw emotion to<br />intelligent action.
          </h2>
          <div className="w-12 h-px bg-zinc-900 mx-auto"></div>
          <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            MindBridge AI doesn't just record—it understands. By analyzing the structural patterns in your thoughts, we provide small, actionable interventions that respect your current capacity.
          </p>
        </div>
      </section>

      {/* Feature Blocks - Editorial Spread */}
      <section className="px-8 py-32">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold tracking-tighter">Emotion Inference</h3>
              <p className="text-lg text-zinc-500 font-serif leading-relaxed italic">Going beyond keywords to understand the weight behind words.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold tracking-tighter">Context-Aware UX</h3>
              <p className="text-lg text-zinc-500 font-serif leading-relaxed italic">Interfaces that calm or energize depending on your stress levels.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold tracking-tighter">Privacy by Design</h3>
              <p className="text-lg text-zinc-500 font-serif leading-relaxed italic">Local-first ethos with encrypted cloud transitions only when necessary.</p>
            </div>
          </div>
          
          <div className="relative aspect-square bg-zinc-100 overflow-hidden rounded-3xl group">
             <img 
              src="https://i.pinimg.com/1200x/80/73/93/8073935ebbe0680e4c06cfb9929f50a8.jpg" 
              alt="Minimalist textures"
              className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-48 text-center bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-7xl font-bold tracking-tighter">Experience AI that understands.</h2>
          <button 
            onClick={onGetStarted}
            className="px-12 py-6 bg-white text-zinc-900 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors"
          >
            Authenticate Identity
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
