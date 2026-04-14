import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StudentIntelligence() {
  const [lang, setLang] = useState("en");
  const [streamResult, setStreamResult] = useState('');
  const [examResult, setExamResult] = useState('');
  const [collegeResult, setCollegeResult] = useState('');
  const [parentResult, setParentResult] = useState('');
  const [scholarshipResult, setScholarshipResult] = useState('');

  const [rank, setRank] = useState('');

  const toggleLanguage = () => {
    setLang(lang === "en" ? "hi" : "en");
  };

  const checkStream = () => setStreamResult("Eligibility ✔️\nSalary ₹5–15 LPA\nHigh Scope in India 🇮🇳");
  const checkExam = () => setExamResult("Difficulty: High\nCompetition: National Level\nPrep: 1–3 Years");
  const checkCollege = () => {
    const r = parseInt(rank);
    let chance = "Private College Recommended";
    if (r < 5000) chance = "High Chance (IIT/NIT)";
    else if (r < 20000) chance = "Medium Chance (Govt College)";
    setCollegeResult(chance + '\nFocus on counseling rounds.');
  };
  const showParentMode = () => setParentResult("This career offers stable income, long-term growth and opportunities.\nYour child will have multiple job options in India and abroad.");
  const checkScholarships = () => setScholarshipResult("1. National Scholarship Portal (NSP)\n2. State Government Scholarship\n3. Post-Matric Scholarship");

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 overflow-hidden py-16 px-4 flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-40"></div>

      <section className="relative z-10 w-full max-w-7xl animate-fade-in-up">
        
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
            {lang === "en" ? "Academic Guidance" : "अकादमिक मार्गदर्शन"}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            {lang === "en" ? "Student Career" : "छात्र करियर"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{lang === "en" ? "Intelligence" : "इंटेलिजेंस"}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            {lang === "en" ? "One platform for streams, exams, colleges & scholarships in India 🇮🇳" : "भारत में स्ट्रीम, परीक्षा, कॉलेज और छात्रवृत्ति के लिए एक मंच 🇮🇳"}
          </p>
          
          <button 
            onClick={toggleLanguage} 
            className="mt-8 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest hover:border-amber-400/50 hover:bg-white/10 transition-all shadow-xl"
          >
            {lang === "en" ? "Switch to हिंदी" : "English में बदलें"}
          </button>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Stream Selector */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6 flex flex-col">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">🎓</span> Stream Selector
            </h2>
            <div className="flex-1 space-y-4">
              <select className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-xs text-gray-300 outline-none focus:border-amber-400">
                <option>Science</option>
                <option>Commerce</option>
                <option>Arts</option>
              </select>
              <button onClick={checkStream} className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(245,166,35,0.3)] transition-all">
                Analyze Stream
              </button>
            </div>
            {streamResult && (
              <div className="mt-4 bg-slate-950/50 p-5 rounded-2xl border border-white/5 text-[10px] text-gray-400 leading-relaxed whitespace-pre-wrap animate-fade-in font-medium">
                {streamResult}
              </div>
            )}
          </div>

          {/* Exam Predictor */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6 flex flex-col">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">📝</span> Exam Predictor
            </h2>
            <div className="flex-1 space-y-4">
              <select className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-xs text-gray-300 outline-none focus:border-indigo-400">
                <option>JEE</option>
                <option>NEET</option>
                <option>UPSC</option>
                <option>GATE</option>
              </select>
              <button onClick={checkExam} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                Predict Exam
              </button>
            </div>
            {examResult && (
              <div className="mt-4 bg-slate-950/50 p-5 rounded-2xl border border-indigo-500/10 text-[10px] text-gray-400 leading-relaxed whitespace-pre-wrap animate-fade-in font-medium">
                {examResult}
              </div>
            )}
          </div>

          {/* College Probability */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6 flex flex-col">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">🏫</span> College Probability
            </h2>
            <div className="flex-1 space-y-4">
              <input 
                value={rank} 
                onChange={(e)=>setRank(e.target.value)} 
                type="number" 
                placeholder="Enter Your Rank" 
                className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-xs text-white placeholder-gray-600 outline-none focus:border-emerald-400" 
              />
              <button onClick={checkCollege} className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                Check Chances
              </button>
            </div>
            {collegeResult && (
              <div className="mt-4 bg-slate-950/50 p-5 rounded-2xl border border-emerald-500/10 text-[10px] text-gray-400 leading-relaxed whitespace-pre-wrap animate-fade-in font-medium">
                {collegeResult}
              </div>
            )}
          </div>

          {/* Parent Mode */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-purple-400">👨‍👩‍👧</span> Parent Guidance
            </h2>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Simplified explanations focused on stability, future security, and growth prospects for your child.</p>
            <button onClick={showParentMode} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest hover:border-purple-400/50 hover:bg-white/10 transition-all">
              Explain for Parents
            </button>
            {parentResult && (
              <div className="mt-4 bg-purple-500/5 p-5 rounded-2xl border border-purple-500/10 text-[10px] text-gray-300 leading-relaxed whitespace-pre-wrap animate-fade-in font-medium">
                {parentResult}
              </div>
            )}
          </div>

          {/* Scholarship Matcher */}
          <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">💰</span> Scholarship Matcher
              </h2>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Financial Aid</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Category</label>
                <select className="w-full bg-slate-900 border border-white/10 p-3.5 rounded-xl text-xs text-gray-300 outline-none">
                  <option>General</option>
                  <option>OBC / SC / ST</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase ml-1">Annual Income</label>
                <select className="w-full bg-slate-900 border border-white/10 p-3.5 rounded-xl text-xs text-gray-300 outline-none">
                  <option>Below ₹2.5 LPA</option>
                  <option>₹2.5–8 LPA</option>
                </select>
              </div>
            </div>
            
            <button onClick={checkScholarships} className="w-full py-4 rounded-2xl bg-slate-900 text-amber-400 border border-amber-400/30 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-slate-900 transition-all">
              Identify Opportunities
            </button>
            
            {scholarshipResult && (
              <div className="mt-4 bg-slate-950/50 p-5 rounded-2xl border border-amber-400/10 text-[10px] text-gray-400 leading-relaxed whitespace-pre-wrap animate-fade-in font-medium">
                {scholarshipResult}
              </div>
            )}
          </div>

        </div>

        <footer className="mt-16 text-center space-y-8">
          <Link to="/discover" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to Discover Hub
          </Link>
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Proprietary Guidance Systems by Marg.ai 🇮🇳</p>
        </footer>
      </section>
    </div>
  );
}
