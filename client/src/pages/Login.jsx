import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-slate-950 overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-60"></div>

      <div className="relative z-10 w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl animate-fade-in-up">
        
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fbc531] shadow-lg animate-float">
            <div className="w-6 h-6 rounded-full bg-[#4cd137] flex items-center justify-center">
              🪷
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-white mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Continue your journey of purpose.</p>
        
        {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-sm border border-red-500/20 flex items-center gap-2"><span className="text-lg">⚠</span>{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">Email Address</label>
            <input 
              type="email" 
              name="email"
              required 
              placeholder="you@example.com"
              className="w-full bg-slate-900/60 text-white placeholder-gray-500 p-4 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all" 
              onChange={handleChange} 
            />
          </div>
          <div className="group">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              placeholder="••••••••"
              className="w-full bg-slate-900/60 text-white placeholder-gray-500 p-4 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all" 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="w-full py-4 mt-2 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:scale-[1.02] transition-all duration-300">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400">
          New here? <Link to="/register" className="text-[#fbc531] font-semibold hover:text-amber-300 hover:underline transition-all">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
