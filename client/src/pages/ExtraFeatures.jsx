import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ExtraFeatures() {
  const [tip, setTip] = useState('');
  const [careerSelect, setCareerSelect] = useState('');
  
  useEffect(() => {
    const tips = [
      "Consistency beats talent. 30 minutes daily can change your future.",
      "Choose skills, not just degrees.",
      "Failure is feedback, not defeat.",
      "Your background does not decide your future.",
      "Learning never stops — especially after college."
    ];
    setTip(tips[new Date().getDate() % tips.length]);
  }, []);

  const getParentInfo = () => {
    const info = {
      engineering: "Engineering teaches problem-solving and technology skills. It offers jobs in IT, core industries, and startups. Good salary growth, but requires continuous learning.",
      medical: "Medical careers focus on helping people. It needs long-term study but provides respect and stability. Includes doctor, nurse, lab technician roles.",
      design: "Design combines creativity with technology. Jobs include UI/UX, graphic design, animation. Portfolio matters more than marks.",
      government: "Government jobs provide stability and security. Includes UPSC, SSC, State exams. Competition is high but benefits are lifelong."
    };
    return info[careerSelect] || "Select a career above to see a parent-friendly explanation.";
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 overflow-hidden py-16 px-4 flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>

      <section className="relative z-10 w-full max-w-6xl animate-fade-in-up">
        
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
            Guided by Purpose
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Guidance <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">& Stories</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            Real success stories, daily motivation, and parent-friendly career explainers 🇮🇳
          </p>
        </header>

        <div className="space-y-10">
          
          {/* Daily Tip - Hero Style */}
          <div className="relative group overflow-hidden rounded-[40px] p-1 bg-gradient-to-r from-amber-400 to-orange-600 shadow-2xl">
            <div className="bg-slate-950 rounded-[39px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>
               <div className="text-5xl md:text-7xl">🌅</div>
               <div className="space-y-4 text-center md:text-left">
                 <h2 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">Daily Career Wisdom</h2>
                 <p className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                   {tip}
                 </p>
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Success Stories Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">🌟</span> Success Stories
                </h2>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Inspirational</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Village → SE", name: "Ramesh", story: "Learned coding from YouTube, cracked a startup job, and now earns ₹12 LPA.", icon: "💻" },
                  { title: "Arts → UX", name: "Sneha", story: "Switched from BA to UX design, built a portfolio, and now works at a product company.", icon: "🎨" },
                  { title: "Town → Data", name: "Aman", story: "Learned Excel & Python online and entered analytics without an engineering degree.", icon: "📊" }
                ].map((item, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-[32px] border-white/5 hover:border-amber-400/30 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors uppercase text-xs tracking-wider mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed italic">"{item.story}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Explainer Column */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-8 rounded-[40px] border-white/5 space-y-8 h-full flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                  <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg">👨‍👩‍👧</span>
                  Parent Hub
                </h2>
                
                <div className="space-y-6 flex-grow relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Select Career Topic</label>
                    <select value={careerSelect} onChange={(e)=>setCareerSelect(e.target.value)} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-gray-300 outline-none focus:border-indigo-400 transition-all">
                      <option value="">Choose Domain...</option>
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                      <option value="design">Design</option>
                      <option value="government">Government Jobs</option>
                    </select>
                  </div>

                  <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5 min-h-[160px] flex items-center justify-center text-center">
                    <p className={`text-xs leading-relaxed font-medium transition-colors ${careerSelect ? 'text-gray-300' : 'text-gray-600 italic'}`}>
                      {getParentInfo()}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-[9px] text-center text-gray-600 font-bold uppercase tracking-widest">Simplified for Family Guidance</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <footer className="mt-20 text-center space-y-8">
          <Link to="/discover" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to Discover Hub
          </Link>
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Empowering the next generation with Marg.ai</p>
        </footer>

      </section>
    </div>
  );
}
