import { useState, useRef, useEffect } from 'react';
import api from '../services/api';

export default function AIMentor() {
  const [messages, setMessages] = useState([{ sender: 'ai', text: '👋 Hello! I’m your AI Career Mentor. I remember your progress and guide you step-by-step.' }]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState('student');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const [profile, setProfile] = useState({ name: '', studentClass: '', interest: '' });

  useEffect(() => {
    // Scroll to bottom
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/api/ai/mentor', {
        question: input,
        mode,
        language,
        profile
      });
      setMessages([...newMessages, { sender: 'ai', text: res.data.result }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'ai', text: 'Sorry, I am having trouble connecting to the server.' }]);
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is supported only in Chrome browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 overflow-hidden py-12 px-4 flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50"></div>

      <section className="relative z-10 w-full max-w-5xl animate-fade-in-up">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Marg.ai — <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">AI Career Mentor</span>
          </h1>
          <div className="flex justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Voice Input</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Memory Mode</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Parent Assistance</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Sidebar / Configuration */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-white/5 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Context Mode</label>
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={()=>setMode('student')} className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${mode === 'student' ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>Student</button>
                  <button onClick={()=>setMode('parent')} className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${mode === 'parent' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>Parent</button>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Language</label>
                <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-xl text-xs text-gray-300 outline-none focus:border-amber-400">
                  <option value="en">English (default)</option>
                  <option value="hi">Hindi (हिंदी)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Personal Memory</label>
                <div className="space-y-3">
                  <input placeholder="Your Name" value={profile.name} onChange={(e)=>setProfile({...profile, name: e.target.value})} className="w-full bg-slate-900/50 p-3 rounded-xl border border-white/5 text-xs text-gray-300 outline-none focus:border-amber-400/50" />
                  <input placeholder="Grade (e.g. 12th)" value={profile.studentClass} onChange={(e)=>setProfile({...profile, studentClass: e.target.value})} className="w-full bg-slate-900/50 p-3 rounded-xl border border-white/5 text-xs text-gray-300 outline-none focus:border-amber-400/50" />
                </div>
              </div>

              <button onClick={startVoice} className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-amber-400/50 transition-all flex items-center justify-center gap-2">
                <span className="text-lg">🎙️</span> Voice Chat
              </button>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-white/5 hidden lg:block">
              <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-4">India Education Guide</h4>
              <ul className="text-[10px] space-y-3 text-gray-500 font-medium">
                <li className="flex justify-between items-center"><span className="text-gray-300">Engineering</span> <span>JEE/CUET</span></li>
                <li className="flex justify-between items-center"><span className="text-gray-300">Medical</span> <span>NEET</span></li>
                <li className="flex justify-between items-center"><span className="text-gray-300">Design</span> <span>NID/UCEED</span></li>
                <li className="flex justify-between items-center"><span className="text-gray-300">Law</span> <span>CLAT</span></li>
              </ul>
            </div>
          </aside>

          {/* Main Chat Interface */}
          <main className="lg:col-span-3">
            <div className="glass-panel rounded-[32px] border-white/5 h-[700px] flex flex-col relative overflow-hidden shadow-2xl">
              
              {/* Chat Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar bg-slate-900/20">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}>
                    <div className={`relative max-w-[85%] p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-lg transition-all ${msg.sender === 'user' ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 font-medium rounded-tr-none' : 'bg-slate-800 border border-white/10 text-gray-200 rounded-tl-none'}`}>
                      {msg.text}
                      <span className={`absolute top-0 ${msg.sender === 'user' ? 'right-[-8px] text-orange-500' : 'left-[-8px] text-slate-800'} text-xl leading-none select-none`}>
                        {msg.sender === 'user' ? '◥' : '◤'}
                      </span>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-slate-800/50 border border-white/5 p-4 rounded-2xl rounded-tl-none text-xs text-gray-500 italic">
                      AI is deeply reflecting...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 md:p-8 bg-slate-900/40 border-t border-white/5 backdrop-blur-md">
                <div className="relative flex items-center gap-3">
                  <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-slate-950/80 p-5 pr-16 rounded-2xl border border-white/10 text-white placeholder-gray-600 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner" 
                    placeholder="Ask anything about your career path..." 
                  />
                  <button 
                    onClick={sendMessage} 
                    className="absolute right-2 p-3 rounded-xl bg-amber-400 text-slate-900 hover:bg-amber-300 transition-colors shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-center text-gray-600 font-medium uppercase tracking-[0.2em]">Guided by Marg.ai Intelligence</p>
              </div>

            </div>
          </main>

        </div>
      </section>
    </div>
  );
}
