import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d135d] to-[#1a0a2e] z-0"></div>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-32 pb-20 px-6 z-10">
        
        {/* Spiritual Glow */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/10 via-amber-500/5 to-transparent blur-3xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">
          
          <div className="flex justify-center mb-12 relative animate-float">
            <div className="absolute inset-0 bg-amber-400 blur-[50px] opacity-20 rounded-full"></div>
            <div className="text-7xl drop-shadow-[0_0_30px_rgba(245,166,35,0.6)] z-10 select-none">🪷</div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-bold uppercase tracking-widest rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-400 hover:bg-white/10 transition-colors duration-300 cursor-default">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Discover Your True Path
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 text-white tracking-tight animate-fade-in-up">
            Your Career is a <br className="hidden md:block" />
            <span className="text-[#fbc531] drop-shadow-sm">Journey of Purpose</span>
          </h1>

          <div className="space-y-4 mb-12 animate-fade-in-up animate-delay-100">
            <p className="italic text-xl opacity-90 text-gray-300 font-light">
              “Your career is not just what you do, but who you are becoming.”
            </p>
            <div className="flex flex-col items-center gap-1 mt-4">
              <p className="text-[#fbc531] text-lg font-bold tracking-widest uppercase">स्वधर्मे निधनं श्रेयः</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">Better to follow your own path</p>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-12 leading-relaxed animate-fade-in-up animate-delay-200 font-medium">
            AI-powered career guidance for Indian students — aligning your <strong className="text-white">skills</strong>, <strong className="text-white">interests</strong>, and <strong className="text-white">inner calling</strong> to build a meaningful life.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto animate-fade-in-up animate-delay-300">
            <Link to="/discover" className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-black rounded-full bg-[#fbc531] text-slate-950 overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(251,197,49,0.5)]">
              <span className="relative flex items-center gap-2">Start Your Journey <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>
            <Link to="/mentor" className="px-10 py-4 text-lg font-bold text-white rounded-full bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300">
              Talk to AI Mentor
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] animate-fade-in-up animate-delay-300">
            <span className="flex items-center gap-2"><span className="text-xl">🤖</span> AI Powered</span>
            <span className="flex items-center gap-2"><span className="text-xl">🇮🇳</span> Built for India</span>
            <span className="flex items-center gap-2"><span className="text-xl">📊</span> Industry-Ready</span>
            <span className="flex items-center gap-2"><span className="text-xl">🌱</span> Purpose-Led</span>
          </div>

        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative px-6 md:px-20 py-32 z-10 border-t border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              How <span className="text-[#fbc531]">Marg.ai</span> Guides You
            </h2>
            <div className="h-1.5 w-24 bg-[#fbc531] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* CARD 1 */}
            <div className="group glass-panel p-10 rounded-[40px] hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(76,29,149,0.3)] hover:border-purple-500/30">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#fbc531] transition-colors">Self Discovery</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Understand your personality, strengths, aptitude, and emotional patterns using advanced AI models.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="group glass-panel p-10 rounded-[40px] hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(245,166,35,0.1)] hover:border-amber-400/30 translate-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-8 border border-amber-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#fbc531] transition-colors">Career Mapping</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Get data-driven career paths mapped with real industry demand and your current skill gaps.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group glass-panel p-10 rounded-[40px] hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(16,185,129,0.1)] hover:border-emerald-400/30 translate-y-12">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#fbc531] transition-colors">Purpose Alignment</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Discover careers fully aligned with your core values, deep fulfillment, and long-term happiness.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
