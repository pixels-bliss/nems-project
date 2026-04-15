import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/api';

interface LoginProps {
  onLogin: (data: any) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password);
      onLogin(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white flex-col justify-center px-16">
        <h1 className="font-heading font-black text-6xl tracking-tighter leading-none uppercase">
          NEMS
        </h1>
        <div className="w-24 h-1 bg-[#E53E3E] mt-6 mb-8"></div>
        <p className="text-lg font-body text-[#E5E5E5] leading-relaxed max-w-md">
          National Examination Management System. A centralized platform for secure, 
          efficient examination administration across all regions.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 max-w-md">
          <div className="border border-[#333333] p-4">
            <p className="font-heading font-bold text-3xl text-[#E53E3E]">10+</p>
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase mt-1">Exam Types</p>
          </div>
          <div className="border border-[#333333] p-4">
            <p className="font-heading font-bold text-3xl text-[#E53E3E]">10K+</p>
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase mt-1">Students</p>
          </div>
          <div className="border border-[#333333] p-4">
            <p className="font-heading font-bold text-3xl text-[#E53E3E]">50+</p>
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase mt-1">Centers</p>
          </div>
          <div className="border border-[#333333] p-4">
            <p className="font-heading font-bold text-3xl text-[#E53E3E]">100%</p>
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase mt-1">Secure</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <h1 className="font-heading font-black text-4xl tracking-tighter uppercase">NEMS</h1>
            <div className="w-16 h-1 bg-[#E53E3E] mt-3"></div>
          </div>

          <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold mb-2">Welcome Back</p>
          <h2 className="font-heading font-black text-3xl tracking-tight uppercase mb-8">Sign In</h2>

          {error && (
            <div data-testid="login-error" className="border border-[#E53E3E] bg-red-50 p-4 mb-6">
              <p className="text-sm text-[#E53E3E] font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-2">
                Email Address
              </label>
              <input
                data-testid="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nems.com"
                required
                className="w-full px-4 py-3 border border-[#111111] bg-white text-[#111111] font-body placeholder-[#CCCCCC]"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-2">
                Password
              </label>
              <input
                data-testid="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-[#111111] bg-white text-[#111111] font-body placeholder-[#CCCCCC]"
              />
            </div>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#555555]">
              New student?{' '}
              <Link to="/register" data-testid="register-link" className="font-bold text-[#111111] underline underline-offset-4 hover:text-[#E53E3E]">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-10 border-t border-[#E5E5E5] pt-6">
            <p className="text-xs text-[#888888] tracking-wide">
              Default credentials: <span className="font-mono text-[#111111]">admin@nems.com / admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
