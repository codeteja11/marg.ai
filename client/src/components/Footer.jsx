import { Link } from 'react-router-dom';

export default function Footer() {
  const links = [
    { name: 'Vision', path: '/about' },
    { name: 'Discover Hub', path: '/discover' },
    { name: 'GuruBot AI', path: '/mentor' },
    { name: 'Future Career', path: '/intelligence' },
    { name: 'Student Intel', path: '/student-intelligence' },
    { name: 'Resume AI', path: '/resume' },
    { name: 'Job Market', path: '/job' },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-slate-950 to-indigo-950/40 border-t border-white/10 mt-20 pt-16 pb-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-10 md:px-20 grid md:grid-cols-4 gap-12 relative z-10">
        
        {/* BRAND */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-3 font-bold text-2xl mb-4 group inline-flex">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#fbc531] shadow-lg animate-float">
              <div className="w-5 h-5 rounded-full bg-[#4cd137] flex items-center justify-center">
                🪷
              </div>
            </div>
            <span className="text-white group-hover:text-[#fbc531] transition-colors">Marg<span className="text-[#fbc531] group-hover:text-white transition-colors">.ai</span></span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mt-2 font-medium">
            AI-powered career mentor blending technology, psychology, and Dharma to help Indians find their true purpose.
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-[10px]">Ecosystem</h4>
          <ul className="space-y-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
            {links.slice(0, 4).map(l => (
              <li key={l.path}><Link to={l.path} className="hover:text-amber-400 transition-colors">▹ {l.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-[10px]">Intelligence</h4>
          <ul className="space-y-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
            {links.slice(4).map(l => (
              <li key={l.path}><Link to={l.path} className="hover:text-amber-400 transition-colors">▹ {l.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* WISDOM */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-[32px] border border-white/10 hover:border-amber-400/30 transition-all duration-500">
          <h4 className="font-bold mb-4 text-white text-xs uppercase tracking-[0.2em] opacity-40">Sanskrit Wisdom</h4>
          <p className="text-amber-400 font-extrabold text-xl mb-3 tracking-tight">
            योगः कर्मसु कौशलम्
          </p>
          <p className="text-gray-400 text-xs leading-relaxed font-medium">
            "Yoga is excellence in action." Let awareness guide every career choice.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-10 md:px-20 mt-16 pt-8 text-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em] border-t border-white/5">
        <p>© {new Date().getFullYear()} Marg.ai platform • Serving the Next Generation 🇮🇳</p>
      </div>
    </footer>
  );
}
