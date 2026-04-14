import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vision', path: '/about' },
    { name: 'Discover', path: '/discover' },
    { name: 'GuruBot', path: '/mentor' },
    { name: 'Future Intel', path: '/intelligence' },
    { name: 'Student Intel', path: '/student-intelligence' },
    { name: 'Resume AI', path: '/resume' },
    { name: 'Job Market', path: '/job' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 font-bold text-xl group shrink-0">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fbc531] shadow-lg animate-float">
            <div className="w-6 h-6 rounded-full bg-[#4cd137] flex items-center justify-center">
              🪷
            </div>
          </div>
          <span className="text-white font-black text-2xl tracking-tight">Marg<span className="text-[#fbc531]">.ai</span></span>
        </Link>

        {/* NAV LINKS DESKTOP */}
        <div className="hidden lg:flex items-center gap-5 text-[11px] text-gray-300 font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className="hover:text-[#fbc531] transition-colors duration-300 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-400 hover:text-[#fbc531] font-bold text-xs uppercase tracking-widest transition">Dashboard</Link>
              <button onClick={handleLogout} className="px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-all">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-400 hover:text-[#fbc531] font-bold text-xs uppercase tracking-widest transition">Login</Link>
              <Link to="/register" className="px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-950 bg-[#fbc531] hover:shadow-[0_0_20px_rgba(251,197,49,0.5)] transition-all">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-white">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-white/10 flex flex-col p-8 gap-6 transition-all duration-300 origin-top overflow-y-auto max-h-[80vh] ${menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} className="text-lg font-bold uppercase tracking-wider hover:text-[#fbc531] transition">
            {link.name}
          </Link>
        ))}
        <hr className="border-white/10" />
        <Link to="/register" onClick={() => setMenuOpen(false)} className="py-4 text-center rounded-2xl font-bold uppercase tracking-widest text-slate-900 bg-[#fbc531]">Sign Up</Link>
      </div>
    </nav>
  );
}
