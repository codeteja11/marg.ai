import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Intelligence() {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [salaryResult, setSalaryResult] = useState('');
  const [compareResult, setCompareResult] = useState('');
  const [loading, setLoading] = useState(false);

  const [careerSelect, setCareerSelect] = useState('AI Engineer');
  const [experience, setExperience] = useState('Fresher');
  
  const [c1, setC1] = useState('AI Engineer');
  const [c2, setC2] = useState('Government Officer');

  const predictSalary = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/ai/future-intel', { 
        career1: careerSelect, 
        career2: 'None (Solo Analysis)', 
        experience 
      });
      setSalaryResult(res.data.result);
    } catch (err) {
      setSalaryResult('Failed to calculate future earnings.');
    } finally {
      setLoading(false);
    }
  };

  const compareCareers = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/ai/future-intel', { 
        career1: c1, 
        career2: c2, 
        experience 
      });
      setCompareResult(res.data.result);
    } catch (err) {
      setCompareResult('Comparison failed.');
    } finally {
      setLoading(false);
    }
  };

  const mockAI = async () => {
    if(!aiQuestion) return;
    setLoading(true);
    try {
      const res = await api.post('/api/ai/mentor', { question: aiQuestion, mode: 'student', language: 'en' });
      setAiAnswer(res.data.result);
    } catch (err) {
      setAiAnswer('AI assistant is busy.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 overflow-hidden py-16 px-4">
      
      {/* Background Ambience */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>

      <section className="relative z-10 max-w-7xl mx-auto animate-fade-in-up">
        
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            Market Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Future Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Intelligence</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            AI-powered data processing for the evolving Indian job market 🇮🇳
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Career Trends */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6 group">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">📈</span> Live Industry Trends
              </h2>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time</span>
            </div>
            
            <div className="relative bg-slate-900/50 h-56 rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden group-hover:border-amber-400/20 transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent"></div>
              <div className="flex flex-col items-center gap-4 text-center px-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-xl">📊</div>
                <p className="text-xs text-gray-500 font-medium max-w-[200px]">Advanced charting engine processing 400+ career paths...</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                <span className="text-xs font-bold text-gray-300">AI Engineer</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">+42% Demand</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                <span className="text-xs font-bold text-gray-300">Cybersecurity Specialist</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">+28% Demand</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 opacity-50 grayscale transition-all">
                <span className="text-xs font-bold text-gray-300">Manual Data Entry</span>
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">-15% Decline</span>
              </div>
            </div>
          </div>

          {/* Salary Predictor */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">💰</span> Compensation Engine
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Select Domain</label>
                <select value={careerSelect} onChange={(e)=>setCareerSelect(e.target.value)} className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-xs text-gray-300 outline-none focus:border-amber-400 transition-all">
                  <option>AI Engineer</option>
                  <option>Software Developer</option>
                  <option>Government Officer</option>
                  <option>Data Analyst</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Experience Level</label>
                <select value={experience} onChange={(e)=>setExperience(e.target.value)} className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-xs text-gray-300 outline-none focus:border-amber-400 transition-all">
                  <option>Fresher</option>
                  <option>2–5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>
            </div>

            <button onClick={predictSalary} className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all">
              Run Matrix Analysis
            </button>

            {salaryResult && (
              <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/10 text-xs text-gray-400 leading-relaxed whitespace-pre-wrap animate-fade-in relative group">
                <button 
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    if (!token) return alert('Login to save');
                    try {
                      await api.post('/api/ai/save-profile', { 
                        savedCareer: { 
                          title: `Forecast: ${careerSelect}`, 
                          description: salaryResult, 
                          matchPercentage: 95,
                          dateSaved: new Date()
                        } 
                      });
                      alert('Forecast Saved!');
                    } catch (err) { alert('Save failed'); }
                  }}
                  className="absolute top-4 right-4 text-[9px] font-bold text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all font-sans"
                >
                  Save to Profile
                </button>
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
                  <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center font-bold">✓</div>
                  <span className="font-bold text-white uppercase tracking-wider text-[10px]">Calculation Output</span>
                </div>
                {salaryResult}
              </div>
            )}
          </div>

          {/* Career Comparison */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">⚖️</span> Differential Comparison
            </h2>
            
            <div className="flex items-center gap-3">
              <select value={c1} onChange={(e)=>setC1(e.target.value)} className="flex-1 bg-slate-900 border border-white/10 p-3.5 rounded-xl text-xs text-gray-300 outline-none focus:border-indigo-400">
                <option>AI Engineer</option>
                <option>Software Developer</option>
                <option>Government Officer</option>
              </select>
              <span className="text-[10px] font-bold text-gray-600 uppercase">vs</span>
              <select value={c2} onChange={(e)=>setC2(e.target.value)} className="flex-1 bg-slate-900 border border-white/10 p-3.5 rounded-xl text-xs text-gray-300 outline-none focus:border-indigo-400">
                <option>Government Officer</option>
                <option>Data Analyst</option>
                <option>AI Engineer</option>
              </select>
            </div>

            <button onClick={compareCareers} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:border-indigo-500/50 transition-all">
              Generate Comparison
            </button>

            {compareResult && (
              <div className="bg-slate-950/50 p-5 rounded-2xl border border-indigo-500/20 text-xs text-gray-400 leading-relaxed whitespace-pre-wrap animate-fade-in relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
                <button 
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    if (!token) return alert('Login to save');
                    try {
                      await api.post('/api/ai/save-profile', { 
                        savedCareer: { 
                          title: `Comparison: ${c1} vs ${c2}`, 
                          description: compareResult, 
                          matchPercentage: 88,
                          dateSaved: new Date()
                        } 
                      });
                      alert('Comparison Saved!');
                    } catch (err) { alert('Save failed'); }
                  }}
                  className="absolute top-4 right-4 text-[9px] font-bold text-indigo-400 border border-indigo-400/30 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all font-sans"
                >
                  Save
                </button>
                {compareResult}
              </div>
            )}
          </div>

          {/* AI Career Assistant */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">🤖</span> Predictive AI Helper
            </h2>
            
            <textarea 
              value={aiQuestion} 
              onChange={(e)=>setAiQuestion(e.target.value)} 
              rows="2" 
              className="w-full bg-slate-950/50 p-4 rounded-2xl border border-white/10 text-xs text-white placeholder-gray-600 outline-none focus:border-amber-400 transition-all" 
              placeholder="Query the market trends AI..."
            ></textarea>
            
            <button onClick={mockAI} className="w-full py-4 rounded-2xl bg-slate-900 text-amber-400 border border-amber-400/30 font-bold text-sm uppercase tracking-widest hover:bg-amber-400 hover:text-slate-950 transition-all">
              Execute AI Query
            </button>

            {aiAnswer && (
              <div className="flex gap-4 p-5 bg-amber-400/5 rounded-2xl border border-amber-400/10 animate-fade-in">
                <div className="text-xl">✨</div>
                <p className="text-xs text-gray-300 leading-relaxed italic">{aiAnswer}</p>
              </div>
            )}
          </div>

        </div>

        <footer className="mt-16 text-center space-y-8">
          <Link to="/discover" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to Discover Hub
          </Link>
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Future Intelligence Systems by Marg.ai 🇮🇳</p>
        </footer>
      </section>
    </div>
  );
}
