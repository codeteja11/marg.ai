import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({ name: '', role: '', skills: '', education: '', projects: '' });
  const [resumeOutput, setResumeOutput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [interviewCompany, setInterviewCompany] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [analysis, setAnalysis] = useState('');

  const generateResume = async () => {
    if(!formData.role || !formData.skills) return alert('Enter role and skills');
    setLoading(true);
    try {
      const res = await api.post('/api/ai/generate-resume', formData);
      setResumeOutput(res.data.result);
    } catch (err) {
      setResumeOutput('Resume generation failed.');
    } finally {
      setLoading(false);
    }
  };

  const startInterview = () => {
    if(!interviewCompany) return alert('Select a company first!');
    setInterviewStarted(true);
  };

  const submitAnswer = async () => {
    if(!answer) return;
    setLoading(true);
    try {
      const res = await api.post('/api/ai/mentor', { 
        question: `Evaluate this interview answer for a ${interviewCompany} role: ${answer}`,
        mode: 'student', 
        language: 'en' 
      });
      setAnalysis(res.data.result);
    } catch (err) {
      setAnalysis('Evaluation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 overflow-hidden py-16 px-4 flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>

      <section className="relative z-10 w-full max-w-6xl animate-fade-in-up">
        
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Career Readiness
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Resume & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Interview AI</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            ATS-optimized resume generation and real-time AI mock interviews designed for the Indian job market 🇮🇳
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Resume Builder Card */}
          <div className="glass-panel p-8 md:p-10 rounded-[40px] border-white/5 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-all"></div>
            
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-xl shadow-inner">📄</span>
              AI Resume Engine
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Full Name" onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                <input placeholder="Target Role" onChange={(e)=>setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
              </div>
              <input placeholder="Core Skills (comma separated)" onChange={(e)=>setFormData({...formData, skills: e.target.value})} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-amber-400" />
              <input placeholder="Highest Education" onChange={(e)=>setFormData({...formData, education: e.target.value})} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-amber-400" />
              <textarea placeholder="Key Projects or Prior Experience..." rows="4" onChange={(e)=>setFormData({...formData, projects: e.target.value})} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-white placeholder-gray-600 outline-none focus:border-amber-400"></textarea>
              
              <button onClick={generateResume} className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(245,166,35,0.4)] hover:scale-[1.01] transition-all">
                Export ATS Resume
              </button>
            </div>

            {resumeOutput && (
              <div className="mt-8 bg-white p-8 rounded-3xl text-slate-900 font-mono text-[11px] leading-relaxed shadow-2xl border border-white/20 animate-fade-in relative group">
                <div className="absolute top-4 right-4 text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-50 rounded px-2">Preview</div>
                <button 
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    if (!token) return alert('Login to save');
                    try {
                      await api.post('/api/ai/save-profile', { 
                        savedCareer: { 
                          title: `Resume: ${formData.role}`, 
                          description: resumeOutput, 
                          matchPercentage: 100,
                          dateSaved: new Date()
                        } 
                      });
                      alert('Resume Saved to Profile!');
                    } catch (err) { alert('Save failed'); }
                  }}
                  className="absolute bottom-4 right-4 text-[10px] font-bold text-white bg-amber-500 px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  Save to Profile
                </button>
                <div className="whitespace-pre-wrap">{resumeOutput}</div>
              </div>
            )}
          </div>

          {/* Interview Simulator Card */}
          <div className="glass-panel p-8 md:p-10 rounded-[40px] border-white/5 space-y-8 flex flex-col relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
            
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl shadow-inner">🎙️</span>
              HR Interview Lab
            </h2>

            {!interviewStarted ? (
              <div className="flex-grow flex flex-col justify-center space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Simulation Setup</p>
                  <p className="text-gray-400 text-sm">Target a specific company environment for highly relevant mock sessions.</p>
                </div>
                <div className="space-y-4">
                  <select value={interviewCompany} onChange={(e)=>setInterviewCompany(e.target.value)} className="w-full bg-slate-900 border border-white/10 p-4 rounded-2xl text-xs text-gray-300 outline-none focus:border-indigo-400 transition-all">
                    <option value="">Select Target Entity</option>
                    <option>Product Based (FAANG)</option>
                    <option>Indian Tech Giants (TCS/Infosys)</option>
                    <option>High-Growth Startup</option>
                    <option>Fintech/Banking</option>
                  </select>
                  <button onClick={startInterview} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-[1.01] transition-all">
                    Initiate Mock Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-grow space-y-6 animate-fade-in flex flex-col">
                <div className="glass-card p-6 rounded-2xl border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Live Question</label>
                  <p className="text-white font-medium">Briefly describe a challenging project you've worked on and how you handled obstacles.</p>
                </div>
                
                <div className="flex-grow flex flex-col space-y-3">
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Your Response</label>
                  <textarea 
                    value={answer} 
                    onChange={(e)=>setAnswer(e.target.value)} 
                    rows="6" 
                    placeholder="Type or use voice input to answer..." 
                    className="flex-grow w-full bg-slate-950/50 border border-white/5 p-5 rounded-3xl text-xs text-white placeholder-gray-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-medium"
                  ></textarea>
                </div>

                <button onClick={submitAnswer} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-indigo-300 font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-indigo-400 transition-all">
                  Submit for Evaluation
                </button>

                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl animate-fade-in relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500/30"></div>
                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem('token');
                        if (!token) return alert('Login to save');
                        try {
                          await api.post('/api/ai/save-profile', { 
                            savedCareer: { 
                              title: `Interview: ${interviewCompany}`, 
                              description: analysis, 
                              matchPercentage: 75,
                              dateSaved: new Date()
                            } 
                          });
                          alert('Interview Report Saved!');
                        } catch (err) { alert('Save failed'); }
                      }}
                      className="absolute top-2 right-4 text-[9px] font-bold text-emerald-500 border border-emerald-500/30 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all font-sans"
                    >
                      Save Report
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-emerald-400 text-lg">📊</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Matrix Analysis Complete</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-medium">{analysis}</p>
                  </div>
              </div>
            )}
          </div>

        </div>

        <footer className="mt-20 text-center space-y-8">
          <Link to="/discover" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to Discover Hub
          </Link>
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Engineered for career excellence by Marg.ai Intelligence</p>
        </footer>

      </section>
    </div>
  );
}
