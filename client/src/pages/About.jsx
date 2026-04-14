import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 animate-fade-in-up">
        
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Marg.ai</span>
          </h1>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
              "In a world full of noise, comparisons, and expectations, many students don’t lack talent — <span className="text-amber-400 font-bold not-italic">they lack clarity</span>."
            </p>
            <p className="text-gray-500 font-medium tracking-wide">Marg.ai was born from this silence.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 mb-32">
            <div className="text-center space-y-4 animate-float">
                <p className="text-2xl md:text-3xl text-white font-light italic">"What is right for me?"</p>
                <p className="text-lg md:text-xl text-gray-500 font-medium tracking-tight italic">"Am I choosing my path... or following someone else's?"</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-32 items-stretch">
          <div className="glass-panel p-10 md:p-12 rounded-[48px] border-white/5 relative group overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
            <h3 className="text-3xl font-bold text-white mb-8 relative z-10">The Meaning of Marg</h3>
            <p className="text-gray-400 mb-6 relative z-10 text-lg leading-relaxed">In Sanskrit, <strong>Marg (मार्ग)</strong> means the path.</p>
            <ul className="space-y-3 mb-8 relative z-10 text-gray-500 font-medium">
                <li className="flex items-center gap-3">▹ Not a shortcut.</li>
                <li className="flex items-center gap-3">▹ Not a race.</li>
                <li className="flex items-center gap-3">▹ But a journey that unfolds — step by step.</li>
            </ul>
            <blockquote className="border-l-4 border-amber-400 pl-6 italic text-gray-200 py-4 relative z-10 bg-white/5 rounded-r-2xl">
              “स्वधर्मे निधनं श्रेयः”<br/>
              <span className="text-xs text-gray-500 mt-2 block tracking-widest uppercase font-bold">Better to follow your own path, even imperfectly.</span>
            </blockquote>
          </div>

          <div className="flex flex-col gap-8">
            <div className="glass-panel p-10 rounded-[48px] border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-6">Technology Guided by Wisdom</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Marg.ai blends modern AI technology with timeless wisdom to help students understand:
                </p>
                <ul className="space-y-2 text-amber-400 font-bold mb-8">
                    <li>• their strengths</li>
                    <li>• their interests</li>
                    <li>• their inner calling</li>
                </ul>
                <p className="text-gray-400 text-sm italic">So they can choose careers that feel right — not rushed.</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-32 text-center">
            <div className="glass-panel p-12 md:p-16 rounded-[60px] border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-amber-400/20 transition-all duration-700">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">A Quiet Guide, A Digital Farishta</h2>
                <p className="text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                    Marg.ai is not here to push trends, pressure, or comparison. <br/><br/>
                    We walk beside you — as a quiet guide, a patient mentor, a light on your journey.
                </p>
                <div className="pt-8 border-t border-white/5">
                    <p className="text-white text-xl font-medium tracking-tight italic">
                        "Because when the path is true, <br className="md:hidden"/>
                        <span className="text-amber-400 font-bold not-italic">the destination takes care of itself.</span>"
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">🌸 Our Promise</h2>
            <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full mb-10"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[40px] border-white/5 text-center group hover:border-amber-400/30 transition-all">
              <p className="font-bold text-white text-lg leading-tight">Guidance with compassion</p>
            </div>
            <div className="glass-card p-10 rounded-[40px] border-white/5 text-center group hover:border-amber-400/30 transition-all">
              <p className="font-bold text-white text-lg leading-tight">Technology with consciousness</p>
            </div>
            <div className="glass-card p-10 rounded-[40px] border-white/5 text-center group hover:border-amber-400/30 transition-all">
              <p className="font-bold text-white text-lg leading-tight">Careers aligned with purpose</p>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
           <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-widest uppercase">
              Marg.ai — <span className="text-amber-400 underline decoration-white/10 underline-offset-8">where your journey begins within.</span>
           </h2>
           <Link to="/discover" className="mt-16 inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xl hover:shadow-[0_0_40px_rgba(245,166,35,0.4)] hover:scale-105 transition-all">
             Begin Your Yatra →
           </Link>
        </div>

      </section>
    </div>
  );
}
