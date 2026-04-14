import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Job() {
  const [roleInput, setRoleInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  const jobTrends = [
    { role: 'AI / ML Engineer', demand: 'Very High', salary: '₹12L - ₹45L', growth: '+35%' },
    { role: 'Full Stack Dev', demand: 'High', salary: '₹8L - ₹25L', growth: '+15%' },
    { role: 'Data Scientist', demand: 'High', salary: '₹10L - ₹30L', growth: '+22%' },
    { role: 'Cybersecurity', demand: 'Rising', salary: '₹9L - ₹28L', growth: '+40%' },
    { role: 'UI/UX Designer', demand: 'Stable', salary: '₹6L - ₹18L', growth: '+12%' }
  ];

  const handleDeepDive = async () => {
    if (!roleInput) return alert('Enter a role for deep analysis');
    setLoading(true);
    try {
      const res = await api.post('/api/ai/job-market', { role: roleInput });
      setAiResult(res.data.result);
    } catch (err) {
      setAiResult('Unable to fetch market data at this time.');
    } finally {
      setLoading(false);
    }
  };

  const companies = [
    { type: 'FAANG / Product', profile: 'Highest Salary, High Innovation', examples: 'Google, Microsoft, Amazon' },
    { type: 'Service Based', profile: 'Stability, Global Projects', examples: 'TCS, Infosys, Wipro' },
    { type: 'Hyper-Growth Startup', profile: 'Equity, Rapid Learning', examples: 'Zomato, Swiggy, Cred' }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden py-16 px-4 flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d135d] to-[#1a0a2e] z-0"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>

      <section className="relative z-10 w-full max-w-6xl animate-fade-in-up">
        
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-amber-500/10 border border-amber-500/20 text-[#fbc531]">
            Market Dynamics 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Job Market <span className="text-[#fbc531]">Intelligence</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            Real-time salary benchmarks, demand forecasting, and industry alignment for the Indian tech ecosystem 🇮🇳
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* AI Deep Dive Section - FULL WIDTH TOP */}
          <div className="lg:col-span-3">
             <div className="glass-panel p-8 rounded-[40px] border border-[#fbc531]/20 shadow-[0_0_50px_rgba(251,197,49,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbc531]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-[#fbc531]/10 text-[#fbc531] flex items-center justify-center text-2xl shadow-inner">👁️</span>
                  Infinite Market Intelligence
                </h2>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                   <input 
                      type="text" 
                      placeholder="Enter any role (e.g. AI Product Manager in Mumbai)..." 
                      className="flex-grow bg-slate-900/80 border border-white/10 p-5 rounded-3xl text-white outline-none focus:border-[#fbc531] transition-all font-medium"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                   />
                   <button 
                      onClick={handleDeepDive}
                      disabled={loading}
                      className="px-10 py-5 rounded-3xl bg-[#fbc531] text-slate-950 font-black text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(251,197,49,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                   >
                      {loading ? 'Consulting Market Oracle...' : 'Launch Deep Analysis'}
                   </button>
                </div>

                {aiResult && (
                  <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 animate-fade-in custom-scrollbar max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-2 text-[#fbc531]">
                          <span className="text-lg">✨</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Intelligence Report</span>
                       </div>
                       <button 
                          onClick={async () => {
                             const token = localStorage.getItem('token');
                             if (!token) return alert('Login to save insights');
                             try {
                                await api.post('/api/ai/save-profile', { 
                                   savedCareer: { 
                                      title: `Market: ${roleInput}`, 
                                      description: aiResult, 
                                      matchPercentage: 90,
                                      dateSaved: new Date()
                                   } 
                                });
                                alert('Saved to Dharma Profile!');
                             } catch (err) { alert('Save failed'); }
                          }}
                          className="text-[10px] font-bold text-[#fbc531] border border-[#fbc531]/30 px-4 py-1.5 rounded-full hover:bg-[#fbc531] hover:text-slate-950 transition-all"
                       >
                          Save Insight
                       </button>
                    </div>
                    <div className="text-gray-300 text-sm leading-loose whitespace-pre-wrap font-medium font-mono">
                      {aiResult}
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* Salary & Demand Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-8 rounded-[40px] border-white/5 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#fbc531] flex items-center justify-center text-xl">📊</span>
                Role Benchmark Matrix
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Market Role</th>
                      <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Demand</th>
                      <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 text-right">Avg Salary (LPA)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {jobTrends.map((job, idx) => (
                      <tr key={idx} className="group/row hover:bg-white/5 transition-colors">
                        <td className="py-5 px-2">
                          <p className="text-white font-bold group-hover/row:text-[#fbc531] transition-colors">{job.role}</p>
                          <p className="text-[10px] text-[#fbc531] font-bold">{job.growth} YoY Growth</p>
                        </td>
                        <td className="py-5 px-2 text-gray-400 font-medium text-xs">{job.demand}</td>
                        <td className="py-5 px-2 text-right text-gray-300 font-mono text-xs">{job.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Industry Mapping */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-panel p-8 rounded-[40px] border-white/5 shadow-2xl h-full flex flex-col">
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl">🏢</span>
                Sector Guide
              </h2>
              <div className="space-y-6 flex-grow">
                {companies.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">{item.type}</h3>
                    <p className="text-white font-medium mb-3 text-sm">{item.profile}</p>
                    <p className="text-[10px] text-gray-500 italic">Key Players: {item.examples}</p>
                  </div>
                ))}
              </div>
              <div className="pt-8 text-center">
                 <Link to="/career-tool" className="inline-block py-3 px-8 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">
                   Run Compatibility Check
                 </Link>
              </div>
            </div>
          </div>

        </div>

        <footer className="mt-20 text-center space-y-8">
          <Link to="/discover" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#fbc531] hover:text-amber-300 transition-colors">
            ← Return to Discover Hub
          </Link>
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Engineered for career excellence by Marg.ai Intelligence</p>
        </footer>

      </section>
    </div>
  );
}
