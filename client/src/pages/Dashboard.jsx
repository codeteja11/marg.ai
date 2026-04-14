import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [formData, setFormData] = useState({ currentClass: '', interest: '' });
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/ai/profile');
        setProfile(res.data);
        setFormData({
          currentClass: res.data.studentInfo?.currentClass || '',
          interest: res.data.studentInfo?.interest || ''
        });
      } catch (err) {
        console.error('Error fetching profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/ai/save-profile', { studentInfo: formData });
      setProfile(res.data);
      setEditingProfile(false);
      alert('Dharma Profile Updated!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🧭' },
    { id: 'paths', name: 'My Saved Paths', icon: '🎯' },
    { id: 'settings', name: 'Profile Settings', icon: '⚙️' }
  ];

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#fbc531]/20 border-t-[#fbc531] rounded-full animate-spin"></div>
        <p className="text-[#fbc531] font-bold uppercase tracking-widest text-xs animate-pulse">Syncing Journey...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-black/20 border-r border-white/5 backdrop-blur-3xl z-30">
        <div className="p-8">
           <Link to="/" className="flex items-center gap-3 font-bold text-xl group">
             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fbc531] shadow-lg animate-float">
               <div className="w-6 h-6 rounded-full bg-[#4cd137] flex items-center justify-center">
                 🪷
               </div>
             </div>
             <span className="text-white font-black text-2xl tracking-tight">Marg<span className="text-[#fbc531]">.ai</span></span>
           </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id ? 'bg-[#fbc531] text-slate-950 shadow-[0_0_20px_rgba(251,197,49,0.2)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
           <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="w-full py-4 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-400/10 rounded-2xl transition">Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar pt-20 lg:pt-0">
        
        {/* Background Ambience */}
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-[#fbc531]/5 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

        <div className="max-w-6xl mx-auto p-6 md:p-12 relative z-10 space-y-12">
          
          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in">
             <div>
               <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                 Hello, <span className="text-[#fbc531]">{user.name?.split(' ')[0] || 'Seeker'}</span>
               </h1>
               <p className="text-gray-400 font-medium mt-2">Continue your journey of purpose.</p>
             </div>
             <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
                <div className="text-right">
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Journey Progress</p>
                   <p className="text-sm font-black text-[#fbc531]">{profile?.savedCareers?.length ? '65' : '15'}% Complete</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#fbc531] flex items-center justify-center text-xs font-black shadow-[0_0_15px_rgba(251,197,49,0.3)]">
                  {profile?.savedCareers?.length ? '65' : '15'}%
                </div>
             </div>
          </header>

          {/* TAB CONTENT */}
          <div className="animate-fade-in animate-delay-100">
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: 'Saved Paths', val: profile?.savedCareers?.length || 0, icon: '🎯', color: 'indigo' },
                    { label: 'AI Insights', val: 12, icon: '⚡', color: 'amber' },
                    { label: 'Credits', val: 'Infinite', icon: '🔋', color: 'emerald' }
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel p-8 rounded-[40px] border-white/5 flex items-center justify-between group hover:border-[#fbc531]/30 transition-all cursor-default">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black text-white">{stat.val}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                    </div>
                  ))}
                </div>

                {/* Main Cards Row */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="glass-panel p-10 rounded-[48px] border-white/5 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <span className="text-[#fbc531]">📄</span> Resume Strength
                    </h2>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 w-3/4 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    </div>
                    <p className="text-gray-400 text-sm italic">"Your resume matches 75% of industry standards. Try adding relevant projects!"</p>
                    <Link to="/resume" className="inline-block pt-4 text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Boost Score →</Link>
                  </div>

                  <div className="glass-panel p-10 rounded-[48px] border-white/5 flex flex-col justify-center gap-4 bg-gradient-to-br from-indigo-600/10 to-transparent">
                    <p className="text-[10px] font-bold text-[#fbc531] uppercase tracking-[0.3em]">GuruBot Insight</p>
                    <h3 className="text-2xl font-bold leading-tight uppercase italic">“Excellence is not an act, but a habit.”</h3>
                    <Link to="/mentor" className="mt-4 inline-block w-fit px-8 py-3 rounded-2xl bg-white/10 border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Talk to Mentor</Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'paths' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Your Discovered Paths</h2>
                  <Link to="/discover" className="text-xs font-bold text-[#fbc531] uppercase tracking-widest hover:underline">+ New Assessment</Link>
                </div>
                
                {!profile?.savedCareers?.length ? (
                  <div className="text-center py-20 glass-panel rounded-[48px] border-dashed border-white/10">
                    <p className="text-gray-500 italic mb-6">No saved paths yet. Start your journey!</p>
                    <Link to="/discover" className="px-10 py-4 rounded-2xl bg-[#fbc531] text-slate-950 font-black uppercase text-xs tracking-widest">Launch Discover Hub</Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {profile.savedCareers.map((path, idx) => (
                      <div key={idx} className="glass-panel p-8 rounded-[40px] border-white/5 hover:border-[#fbc531]/30 transition-all group relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-all"></div>
                         
                         <div className="flex justify-between items-start mb-6">
                           <div className="space-y-1">
                              <h3 className="text-xl font-bold text-white group-hover:text-[#fbc531] transition-colors">{path.title}</h3>
                              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Saved Roadmap</p>
                           </div>
                           <span className="text-[10px] font-bold bg-[#fbc531] text-slate-950 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(251,197,49,0.3)]">{path.matchPercentage}% Match</span>
                         </div>

                         <div className="bg-black/20 p-5 rounded-2xl border border-white/5 mb-6">
                           <p className="text-gray-400 text-xs leading-relaxed line-clamp-4 font-medium italic">"{path.description}"</p>
                         </div>

                         <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                               <span className="text-[10px] text-gray-600 font-bold uppercase">{new Date(path.dateSaved).toLocaleDateString()}</span>
                            </div>
                            <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white hover:bg-[#fbc531] hover:text-slate-950 transition-all uppercase tracking-widest">
                               Open Full Insight
                            </button>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <div className="glass-panel p-10 md:p-14 rounded-[48px] border-white/5 space-y-10">
                  <header>
                    <h2 className="text-2xl font-bold mb-2">Dharma Profile</h2>
                    <p className="text-gray-500 text-sm font-medium italic underline decoration-[#fbc531]">Keep your profile updated for better AI results.</p>
                  </header>

                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Academic Level</label>
                      <input 
                        value={formData.currentClass} 
                        onChange={(e)=>setFormData({...formData, currentClass: e.target.value})}
                        className="w-full bg-slate-950/50 border border-white/10 p-5 rounded-[24px] text-sm text-white focus:border-[#fbc531] outline-none transition-all font-medium" 
                        placeholder="e.g. 12th Grade, Graduate, Working Professional"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Primary Interests</label>
                      <textarea 
                        value={formData.interest} 
                        onChange={(e)=>setFormData({...formData, interest: e.target.value})}
                        rows="4"
                        className="w-full bg-slate-950/50 border border-white/10 p-5 rounded-[24px] text-sm text-white focus:border-[#fbc531] outline-none transition-all font-medium" 
                        placeholder="e.g. Artificial Intelligence, Sustainability, Design"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full py-5 rounded-[24px] bg-[#fbc531] text-slate-950 font-black uppercase text-xs tracking-widest hover:shadow-[0_0_30px_rgba(251,197,49,0.4)] transition-all">
                      Update Dharma
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-3xl border-t border-white/10 z-50 flex justify-around p-4 rounded-t-3xl shadow-2xl">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${activeTab === tab.id ? 'text-[#fbc531]' : 'text-gray-500'}`}>
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[9px] font-black uppercase">{tab.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

      </main>
    </div>
  );
}
