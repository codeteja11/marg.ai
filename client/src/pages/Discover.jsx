import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Discover() {
  const [showMatchTool, setShowMatchTool] = useState(false);
  const [formData, setFormData] = useState({ interest: '', strength: '', education: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const services = [
    {
      id: 'match',
      title: 'Discover What Fits You Best',
      desc: 'Understand your core personality and strengths to find the path you were meant for.',
      features: ['AI Career Recommendation', 'Skill Gap Analyzer', 'Action Roadmap'],
      icon: '🎯',
      color: 'amber',
      action: () => setShowMatchTool(true)
    },
    {
      id: 'future',
      title: 'Future Career Intelligence',
      desc: 'Stay ahead with AI-driven insights on emerging technologies and declining job roles.',
      features: ['Future Trends', 'Salary & Stress Predictor', 'Comparison Tool'],
      icon: '🔮',
      path: '/intelligence',
      color: 'indigo'
    },
    {
      id: 'job',
      title: 'Job & Industry Intelligence',
      desc: 'Real-world insights into pay scales, work-life balance, and industry growth in India.',
      features: ['Salary Database', 'Industry Benchmarking', 'Market Heatmap'],
      icon: '💼',
      path: '/job',
      color: 'emerald'
    },
    {
      id: 'resume',
      title: 'Resume & Interview AI',
      desc: 'Build high-converting resumes and prepare for tough interviews with AI simulators.',
      features: ['ATS Resume Builder', 'Mock Interview AI', 'Real-time Feedback'],
      icon: '📄',
      path: '/resume',
      color: 'blue'
    },
    {
      id: 'student',
      title: 'Student Intelligence (India)',
      desc: 'Specially designed for Indian students — from stream selection to college matching.',
      features: ['Stream Selector', 'Exam Predictors', 'JEE/NEET Analysis'],
      icon: '🎓',
      path: '/student-intelligence',
      color: 'purple'
    },
    {
      id: 'extra',
      title: 'Extra Features & Stories',
      desc: 'Success stories, parent guidance hub, and daily motivation for your journey.',
      features: ['Success Stories', 'Parent Guidance', 'Daily Career Wisdom'],
      icon: '🌟',
      path: '/extra',
      color: 'rose'
    }
  ];

  const handleRecommend = async () => {
    if (!formData.interest || !formData.strength) return alert('Please select interest and strength');
    setLoading(true);
    try {
      const res = await api.post('/api/ai/career-match', formData);
      setResult(res.data.result);
      
      // PERSIST TO DASHBOARD if logged in
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/api/ai/save-profile', 
          { 
            savedCareer: { 
              title: `${formData.interest} x ${formData.strength} Path`, 
              description: res.data.result,
              matchPercentage: 85 // Mock or based on logic
            } 
          }
        );
      }
    } catch (err) {
      setResult('Error generating recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 overflow-hidden py-16 px-4">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

      <main className="relative z-10 max-w-7xl mx-auto space-y-16 animate-fade-in-up">
        
        <header className="text-center space-y-6">
          <div className="inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-white/5 border border-white/10 text-amber-500">
             Discover Your Dharma
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Intelligence Services</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-medium">
            AI-powered guidance for students and professionals across India. <br className="hidden md:block"/>
            <span className="text-xs uppercase tracking-[0.4em] text-gray-600 mt-4 block">“योगः कर्मसु कौशलम्” — Excellence in action</span>
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="glass-panel group relative overflow-hidden flex flex-col p-8 rounded-[40px] border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-${service.color}-500 to-transparent opacity-50`}></div>
              
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <div>
                   <h2 className="text-xl font-bold text-white leading-tight">{service.title}</h2>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>

              <div className="space-y-3 mb-10">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className={`w-1 h-1 rounded-full bg-${service.color}-500`}></span>
                    {f}
                  </div>
                ))}
              </div>

              {service.path ? (
                <Link to={service.path} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white hover:bg-white/10 hover:border-amber-400/50 transition-all group-hover:tracking-widest">
                  Try Now →
                </Link>
              ) : (
                <button onClick={service.action} className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-extrabold text-sm hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all">
                  Launch Tool
                </button>
              )}
            </div>
          ))}
        </div>

      </main>

      {/* Career Match Tool Modal Overlay */}
      {showMatchTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={()=>setShowMatchTool(false)}></div>
          <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[48px] p-10 shadow-2xl animate-fade-in-up">
            <button onClick={()=>setShowMatchTool(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">✕</button>
            
            <h2 className="text-3xl font-extrabold text-white mb-2">Career Match Finder</h2>
            <p className="text-gray-400 mb-8 italic text-sm">Finding your path using AI & Psychology</p>

            <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Your Core Interest</label>
                  <select onChange={(e)=>setFormData({...formData, interest: e.target.value})} className="w-full bg-slate-800 border-white/5 p-5 rounded-2xl text-gray-300 outline-none focus:border-amber-400 transition-all appearance-none cursor-pointer">
                    <option value="">Choose Domain...</option>
                    <option value="Technology">Technology & AI</option>
                    <option value="Arts">Arts & Creativity</option>
                    <option value="Business">Business & Finance</option>
                    <option value="Medical">Biology & Healthcare</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Your Main Strength</label>
                  <select onChange={(e)=>setFormData({...formData, strength: e.target.value})} className="w-full bg-slate-800 border-white/5 p-5 rounded-2xl text-gray-300 outline-none focus:border-amber-400 transition-all appearance-none cursor-pointer">
                    <option value="">Select Ability...</option>
                    <option value="Logic">Logical Problem Solving</option>
                    <option value="Design">Visual imagination</option>
                    <option value="People">Leadership & Empathy</option>
                    <option value="Words">Communication & Writing</option>
                  </select>
                </div>

                <button onClick={handleRecommend} disabled={loading} className="w-full py-5 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg hover:shadow-[0_0_30px_rgba(245,166,35,0.4)] disabled:opacity-50 transition-all">
                  {loading ? 'Consulting GuruBot...' : 'Match My Career'}
                </button>

                {result && (
                  <div className="mt-8 p-6 bg-slate-800/50 rounded-3xl border border-amber-400/20 text-gray-200 text-sm leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">
                    {result}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Service Grid specific alignment */}
      <style>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
