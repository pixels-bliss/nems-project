import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/api';

interface RegisterProps {
  onLogin: (data: any) => void;
}

const RegisterPage: React.FC<RegisterProps> = ({ onLogin }) => {
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', dateOfBirth: '', gender: 'Male'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await register(form);
      onLogin(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white flex-col justify-center px-16">
        <h1 className="font-heading font-black text-6xl tracking-tighter leading-none uppercase">
          NEMS
        </h1>
        <div className="w-24 h-1 bg-[#E53E3E] mt-6 mb-8"></div>
        <p className="text-lg font-body text-[#E5E5E5] leading-relaxed max-w-md">
          Register as a new student to access your examination portal, view admit cards,
          check results, and manage grievances.
        </p>
        <div className="mt-12 space-y-4 max-w-md">
          <div className="flex items-center gap-4 border border-[#333333] p-4">
            <span className="text-[#E53E3E] font-heading font-bold text-xl">01</span>
            <p className="text-sm text-[#E5E5E5]">Fill registration details</p>
          </div>
          <div className="flex items-center gap-4 border border-[#333333] p-4">
            <span className="text-[#E53E3E] font-heading font-bold text-xl">02</span>
            <p className="text-sm text-[#E5E5E5]">Access your student portal</p>
          </div>
          <div className="flex items-center gap-4 border border-[#333333] p-4">
            <span className="text-[#E53E3E] font-heading font-bold text-xl">03</span>
            <p className="text-sm text-[#E5E5E5]">Register for exams & view results</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <h1 className="font-heading font-black text-4xl tracking-tighter uppercase">NEMS</h1>
            <div className="w-16 h-1 bg-[#E53E3E] mt-3"></div>
          </div>

          <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold mb-2">New Student</p>
          <h2 className="font-heading font-black text-3xl tracking-tight uppercase mb-6">Register</h2>

          {error && (
            <div data-testid="register-error" className="border border-[#E53E3E] bg-red-50 p-4 mb-4">
              <p className="text-sm text-[#E53E3E] font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Full Name</label>
              <input data-testid="register-name-input" type="text" name="fullName" value={form.fullName} onChange={handleChange} required
                className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="Rahul Sharma" />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Email</label>
              <input data-testid="register-email-input" type="email" name="email" value={form.email} onChange={handleChange} required
                className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="student@example.com" />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Password</label>
              <input data-testid="register-password-input" type="password" name="password" value={form.password} onChange={handleChange} required
                className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="Min 6 characters" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Phone</label>
                <input data-testid="register-phone-input" type="text" name="phone" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Date of Birth</label>
                <input data-testid="register-dob-input" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#111111] bg-white font-body" />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Gender</label>
              <select data-testid="register-gender-select" name="gender" value={form.gender} onChange={handleChange}
                className="w-full px-4 py-3 border border-[#111111] bg-white font-body">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button data-testid="register-submit-button" type="submit" disabled={loading}
              className="w-full py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#555555]">
              Already registered?{' '}
              <Link to="/login" data-testid="login-link" className="font-bold text-[#111111] underline underline-offset-4 hover:text-[#E53E3E]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
