import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({ baseURL: API, headers: { 'Content-Type': 'application/json' } });

/* ============ SIDEBAR ============ */
function Sidebar({ role, fullName, onLogout }) {
  const location = useLocation();
  const studentLinks = [
    { path: '/student', label: 'DASHBOARD', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/student/admit-card', label: 'ADMIT CARD', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    { path: '/student/results', label: 'VIEW RESULTS', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { path: '/student/grievance', label: 'RAISE GRIEVANCE', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  ];
  const adminLinks = [
    { path: '/admin', label: 'DASHBOARD', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/admin/students', label: 'MANAGE STUDENTS', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { path: '/admin/schedule', label: 'SCHEDULE EXAMS', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/admin/rooms', label: 'ASSIGN ROOMS', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { path: '/admin/results', label: 'PUBLISH RESULTS', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  ];
  const links = role === 'ADMIN' ? adminLinks : studentLinks;
  return (
    <aside data-testid="sidebar" className="w-64 min-h-screen bg-[#F7F7F7] border-r border-[#111111] flex flex-col shrink-0">
      <div className="p-6 border-b border-[#111111]">
        <h1 className="font-heading font-black text-2xl tracking-tighter uppercase">NEMS</h1>
        <p className="text-xs tracking-[0.2em] text-[#555555] mt-1 uppercase font-body">{role === 'ADMIN' ? 'Admin Panel' : 'Student Portal'}</p>
      </div>
      <nav className="flex-1 py-4">
        {links.map((link) => (
          <Link key={link.path} to={link.path} data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-wide transition-colors ${location.pathname === link.path ? 'bg-[#111111] text-white' : 'text-[#555555] hover:text-[#111111] hover:bg-[#E5E5E5]'}`}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} /></svg>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-[#111111]">
        <p className="text-sm font-bold truncate">{fullName}</p>
        <p className="text-xs text-[#888888] tracking-wide uppercase">{role}</p>
        <button data-testid="logout-button" onClick={onLogout} className="mt-3 w-full py-2 text-sm font-bold border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors">LOGOUT</button>
      </div>
    </aside>
  );
}

/* ============ LOGIN PAGE ============ */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { const res = await api.post('/api/auth/login', { email, password }); onLogin(res.data); }
    catch (err) { setError(err.response?.data?.detail || 'Login failed'); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white flex-col justify-center px-16">
        <h1 className="font-heading font-black text-6xl tracking-tighter leading-none uppercase">NEMS</h1>
        <div className="w-24 h-1 bg-[#E53E3E] mt-6 mb-8"></div>
        <p className="text-lg font-body text-[#E5E5E5] leading-relaxed max-w-md">National Examination Management System. A centralized platform for secure, efficient examination administration across all regions.</p>
        <div className="mt-12 grid grid-cols-2 gap-4 max-w-md">
          {[{v:'10+',l:'Exam Types'},{v:'10K+',l:'Students'},{v:'50+',l:'Centers'},{v:'100%',l:'Secure'}].map(s=>(
            <div key={s.l} className="border border-[#333333] p-4"><p className="font-heading font-bold text-3xl text-[#E53E3E]">{s.v}</p><p className="text-xs tracking-[0.15em] text-[#888888] uppercase mt-1">{s.l}</p></div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10"><h1 className="font-heading font-black text-4xl tracking-tighter uppercase">NEMS</h1><div className="w-16 h-1 bg-[#E53E3E] mt-3"></div></div>
          <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold mb-2">Welcome Back</p>
          <h2 className="font-heading font-black text-3xl tracking-tight uppercase mb-8">Sign In</h2>
          {error && <div data-testid="login-error" className="border border-[#E53E3E] bg-red-50 p-4 mb-6"><p className="text-sm text-[#E53E3E] font-medium">{error}</p></div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-2">Email Address</label><input data-testid="login-email-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@nems.com" required className="w-full px-4 py-3 border border-[#111111] bg-white text-[#111111] font-body placeholder-[#CCCCCC]" /></div>
            <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-2">Password</label><input data-testid="login-password-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" required className="w-full px-4 py-3 border border-[#111111] bg-white text-[#111111] font-body placeholder-[#CCCCCC]" /></div>
            <button data-testid="login-submit-button" type="submit" disabled={loading} className="w-full py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50">{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
          <div className="mt-6 text-center"><p className="text-sm text-[#555555]">New student? <Link to="/register" data-testid="register-link" className="font-bold text-[#111111] underline underline-offset-4 hover:text-[#E53E3E]">Register here</Link></p></div>
          <div className="mt-10 border-t border-[#E5E5E5] pt-6"><p className="text-xs text-[#888888] tracking-wide">Admin: <span className="font-mono text-[#111111]">admin@nems.com / admin123</span></p><p className="text-xs text-[#888888] tracking-wide mt-1">Student: <span className="font-mono text-[#111111]">student1@example.com / password123</span></p></div>
        </div>
      </div>
    </div>
  );
}

/* ============ REGISTER PAGE ============ */
function RegisterPage({ onLogin }) {
  const [form, setForm] = useState({ fullName:'', email:'', password:'', phone:'', dateOfBirth:'', gender:'Male' });
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { const res = await api.post('/api/auth/register', form); onLogin(res.data); }
    catch (err) { setError(err.response?.data?.detail || 'Registration failed'); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white flex-col justify-center px-16">
        <h1 className="font-heading font-black text-6xl tracking-tighter leading-none uppercase">NEMS</h1>
        <div className="w-24 h-1 bg-[#E53E3E] mt-6 mb-8"></div>
        <p className="text-lg font-body text-[#E5E5E5] leading-relaxed max-w-md">Register to access your examination portal, view admit cards, check results, and manage grievances.</p>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-md">
          <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold mb-2">New Student</p>
          <h2 className="font-heading font-black text-3xl tracking-tight uppercase mb-6">Register</h2>
          {error && <div data-testid="register-error" className="border border-[#E53E3E] bg-red-50 p-4 mb-4"><p className="text-sm text-[#E53E3E] font-medium">{error}</p></div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Full Name</label><input data-testid="register-name-input" type="text" name="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="Rahul Sharma" /></div>
            <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Email</label><input data-testid="register-email-input" type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="student@example.com" /></div>
            <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Password</label><input data-testid="register-password-input" type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="Min 6 characters" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Phone</label><input data-testid="register-phone-input" type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="9876543210" /></div>
              <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Date of Birth</label><input data-testid="register-dob-input" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="w-full px-4 py-3 border border-[#111111] bg-white font-body" /></div>
            </div>
            <div><label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Gender</label><select data-testid="register-gender-select" name="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-3 border border-[#111111] bg-white font-body"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
            <button data-testid="register-submit-button" type="submit" disabled={loading} className="w-full py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E] disabled:opacity-50">{loading ? 'Registering...' : 'Register'}</button>
          </form>
          <div className="mt-4 text-center"><p className="text-sm text-[#555555]">Already registered? <Link to="/login" className="font-bold text-[#111111] underline underline-offset-4 hover:text-[#E53E3E]">Sign in</Link></p></div>
        </div>
      </div>
    </div>
  );
}

/* ============ STUDENT DASHBOARD ============ */
function StudentDashboard({ user, onLogout }) {
  const actions = [
    { path: '/student/admit-card', label: 'View Admit Card', desc: 'Download your hall ticket', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    { path: '/student/results', label: 'View Results', desc: 'Check examination results', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { path: '/student/grievance', label: 'Raise Grievance', desc: 'Submit complaints or requests', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  ];
  return (
    <div className="flex min-h-screen"><Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="student-dashboard">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Welcome, {user.fullName}</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-10"></div>
        <div className="border border-[#111111] p-6 mb-8 bg-[#F7F7F7]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Status</p><p className="font-heading font-bold text-xl mt-1">Active</p></div>
            <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Email</p><p className="font-mono text-sm mt-1">{user.email}</p></div>
            <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Role</p><p className="font-heading font-bold text-xl mt-1 text-[#38A169]">STUDENT</p></div>
          </div>
        </div>
        <h2 className="font-heading font-bold text-xl uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map(a => (
            <Link key={a.path} to={a.path} data-testid={`quick-action-${a.label.toLowerCase().replace(/\s/g,'-')}`} className="border border-[#111111] p-6 bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all duration-200 group">
              <svg className="w-8 h-8 text-[#E53E3E] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon}/></svg>
              <h3 className="font-heading font-bold text-lg uppercase tracking-tight">{a.label}</h3>
              <p className="text-sm text-[#555555] mt-2">{a.desc}</p>
              <p className="text-xs font-bold text-[#E53E3E] mt-4 uppercase tracking-wider group-hover:underline">Go &rarr;</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ============ ADMIT CARD ============ */
function AdmitCardPage({ user, onLogout }) {
  const [data, setData] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/seat-allocations').then(r=>setData(r.data)).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  return (
    <div className="flex min-h-screen"><Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="admit-card-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Admit Card</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        {loading ? <p>Loading...</p> : data.length === 0 ? <div className="border border-[#E5E5E5] p-12 text-center bg-[#F7F7F7]"><p className="font-heading font-bold text-xl">No Admit Cards Found</p></div> :
          <div className="space-y-6">{data.map(a => (
            <div key={a.id} className="border border-[#111111] bg-white" data-testid={`admit-card-${a.id}`}>
              <div className="bg-[#111111] text-white px-6 py-4 flex justify-between items-center">
                <div><p className="text-xs tracking-[0.2em] uppercase text-[#888888]">Admit Card</p><p className="font-heading font-bold text-lg uppercase">{a.examName || 'Examination'}</p></div>
                <p className="font-mono text-sm">Seat: {a.seatNumber}</p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Student</p><p className="font-bold mt-1">{a.studentName || user.fullName}</p></div>
                <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Subject</p><p className="font-bold mt-1">{a.subject || 'N/A'}</p></div>
                <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Date</p><p className="font-bold mt-1">{a.examDate || 'N/A'}</p></div>
                <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Time</p><p className="font-bold mt-1">{a.startTime} - {a.endTime}</p></div>
                <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Center</p><p className="font-bold mt-1">{a.centerName || 'N/A'}</p></div>
                <div><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Room</p><p className="font-bold mt-1">{a.roomNumber || 'N/A'}</p></div>
              </div>
              <div className="px-6 pb-4"><button onClick={()=>window.print()} className="px-6 py-2 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] shadow-[4px_4px_0_0_#E53E3E]">Print</button></div>
            </div>
          ))}</div>}
      </main>
    </div>
  );
}

/* ============ RESULTS PAGE ============ */
function ViewResultPage({ user, onLogout }) {
  const [results, setResults] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/results').then(r=>setResults(r.data)).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  const gc = (g) => { if(g==='A+'||g==='A')return'text-[#38A169]';if(g==='A-'||g==='B+')return'text-[#3182CE]';if(g==='F')return'text-[#E53E3E]';return'text-[#D69E2E]'; };
  return (
    <div className="flex min-h-screen"><Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="view-result-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Exam Results</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        {loading ? <p>Loading...</p> :
        <div className="border border-[#111111] overflow-x-auto" data-testid="results-table">
          <table className="w-full border-collapse text-left">
            <thead><tr className="border-b-2 border-[#111111]">
              {['Exam','Student','Marks','%','Grade','Status','Rank'].map(h=><th key={h} className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">{h}</th>)}
            </tr></thead>
            <tbody>{results.map(r=>(
              <tr key={r.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7]">
                <td className="py-4 px-4 text-sm font-medium">{r.examName}</td>
                <td className="py-4 px-4 text-sm">{r.studentName}</td>
                <td className="py-4 px-4 font-mono text-sm">{r.marksObtained}/{r.totalMarks}</td>
                <td className="py-4 px-4 font-bold text-sm">{r.percentage}%</td>
                <td className={`py-4 px-4 font-heading font-bold text-lg ${gc(r.grade)}`}>{r.grade}</td>
                <td className="py-4 px-4"><span className={`inline-block px-3 py-1 text-xs font-bold uppercase border ${r.status==='PASS'?'border-[#38A169] text-[#38A169] bg-green-50':'border-[#E53E3E] text-[#E53E3E] bg-red-50'}`}>{r.status}</span></td>
                <td className="py-4 px-4 font-heading font-bold">{r.rank||'-'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>}
      </main>
    </div>
  );
}

/* ============ GRIEVANCE PAGE ============ */
function RaiseGrievancePage({ user, onLogout }) {
  const [grievances, setGrievances] = useState([]); const [exams, setExams] = useState([]); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState({examId:'',category:'RESULT',description:''});
  const [message, setMessage] = useState('');
  useEffect(() => { Promise.all([api.get('/api/grievances'),api.get('/api/exams')]).then(([g,e])=>{setGrievances(g.data);setExams(e.data);}).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  const ss = (s) => { if(s==='RESOLVED')return'border-[#38A169] text-[#38A169] bg-green-50';if(s==='UNDER_REVIEW')return'border-[#D69E2E] text-[#D69E2E] bg-yellow-50';if(s==='REJECTED')return'border-[#E53E3E] text-[#E53E3E] bg-red-50';return'border-[#3182CE] text-[#3182CE] bg-blue-50'; };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { const res = await api.post('/api/grievances', form); setMessage(`Grievance submitted! ${res.data.grievanceNumber}`); setShowForm(false); }
    catch(err) { setMessage('Failed to submit'); }
  };
  return (
    <div className="flex min-h-screen"><Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="grievance-page">
        <div className="flex justify-between items-start mb-8">
          <div><p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p><h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Grievances</h1><div className="w-16 h-1 bg-[#E53E3E] mt-3"></div></div>
          <button data-testid="new-grievance-button" onClick={()=>setShowForm(!showForm)} className="px-6 py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] shadow-[4px_4px_0_0_#E53E3E]">{showForm?'Cancel':'+ New Grievance'}</button>
        </div>
        {message && <div className="border border-[#38A169] bg-green-50 p-4 mb-6"><p className="text-sm text-[#38A169] font-bold">{message}</p></div>}
        {showForm && <div className="border border-[#111111] p-6 mb-8 bg-white" data-testid="grievance-form">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-[#555555] uppercase mb-1">Exam</label><select data-testid="grievance-exam-select" value={form.examId} onChange={e=>setForm({...form,examId:e.target.value})} className="w-full px-4 py-3 border border-[#111111] bg-white" required><option value="">Select</option>{exams.map(ex=><option key={ex.id} value={ex.id}>{ex.examName}</option>)}</select></div>
              <div><label className="block text-xs font-bold text-[#555555] uppercase mb-1">Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full px-4 py-3 border border-[#111111] bg-white"><option value="RESULT">Result</option><option value="EVALUATION">Evaluation</option><option value="ATTENDANCE">Attendance</option><option value="OTHER">Other</option></select></div>
            </div>
            <div><label className="block text-xs font-bold text-[#555555] uppercase mb-1">Description</label><textarea data-testid="grievance-description-input" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4} required className="w-full px-4 py-3 border border-[#111111] bg-white resize-none" placeholder="Describe your issue..." /></div>
            <button data-testid="grievance-submit-button" type="submit" className="px-8 py-3 bg-[#E53E3E] text-white font-bold text-sm uppercase border border-[#E53E3E] hover:bg-red-600">Submit</button>
          </form>
        </div>}
        {loading ? <p>Loading...</p> : <div className="space-y-4" data-testid="grievances-list">{grievances.map(g=>(
          <div key={g.id} className="border border-[#111111] p-6 bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] transition-all">
            <div className="flex justify-between items-start">
              <div><p className="font-mono text-xs text-[#888888]">{g.grievanceNumber}</p><p className="font-heading font-bold text-lg mt-1">{g.category}</p><p className="text-sm text-[#555555] mt-2">{g.description}</p></div>
              <span className={`inline-block px-3 py-1 text-xs font-bold uppercase border ${ss(g.status)}`}>{g.status?.replace('_',' ')}</span>
            </div>
            {g.resolution && <div className="mt-4 pt-4 border-t border-[#E5E5E5]"><p className="text-xs font-bold text-[#38A169] uppercase">Resolution</p><p className="text-sm text-[#555555] mt-1">{g.resolution}</p></div>}
          </div>
        ))}</div>}
      </main>
    </div>
  );
}

/* ============ ADMIN DASHBOARD ============ */
function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState({}); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/dashboard/stats').then(r=>setStats(r.data)).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  const cards = [
    {l:'Students',v:stats.students,c:'#3182CE',p:'/admin/students'},{l:'Exams',v:stats.exams,c:'#38A169',p:'/admin/schedule'},
    {l:'Schedules',v:stats.schedules,c:'#D69E2E',p:'/admin/schedule'},{l:'Results',v:stats.results,c:'#111111',p:'/admin/results'},
    {l:'Grievances',v:stats.grievances,c:'#E53E3E',p:'/admin/students'}
  ];
  const acts = [
    {p:'/admin/students',l:'Manage Students',d:'View and manage student records',i:'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'},
    {p:'/admin/schedule',l:'Schedule Exams',d:'Create and manage exam schedules',i:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'},
    {p:'/admin/rooms',l:'Assign Rooms',d:'Allocate rooms and seats',i:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'},
    {p:'/admin/results',l:'Publish Results',d:'Review and publish results',i:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'},
  ];
  return (
    <div className="flex min-h-screen"><Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="admin-dashboard">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Dashboard</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10" data-testid="admin-stats">
          {cards.map(c=><Link key={c.l} to={c.p} className="border border-[#111111] p-5 bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all"><p className="text-xs tracking-[0.15em] text-[#888888] uppercase">{c.l}</p><p className="font-heading font-black text-3xl mt-2" style={{color:c.c}}>{loading?'...':c.v}</p></Link>)}
        </div>
        <h2 className="font-heading font-bold text-xl uppercase tracking-wide mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {acts.map(a=><Link key={a.p} to={a.p} className="border border-[#111111] p-6 bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all group">
            <svg className="w-8 h-8 text-[#E53E3E] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.i}/></svg>
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight">{a.l}</h3><p className="text-sm text-[#555555] mt-2">{a.d}</p>
            <p className="text-xs font-bold text-[#E53E3E] mt-4 uppercase tracking-wider group-hover:underline">Open &rarr;</p>
          </Link>)}
        </div>
      </main>
    </div>
  );
}

/* ============ MANAGE STUDENTS ============ */
function ManageStudentsPage({ user, onLogout }) {
  const [students, setStudents] = useState([]); const [loading, setLoading] = useState(true); const [search, setSearch] = useState('');
  useEffect(() => { api.get('/api/students').then(r=>setStudents(r.data)).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  const filtered = students.filter(s=>(s.fullName||'').toLowerCase().includes(search.toLowerCase())||(s.studentId||'').toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex min-h-screen"><Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="manage-students-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Manage Students</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        <div className="mb-6"><input data-testid="student-search-input" type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or ID..." className="w-full max-w-md px-4 py-3 border border-[#111111] bg-white font-body" /></div>
        <p className="text-sm text-[#555555] mb-4">Showing <span className="font-bold text-[#111111]">{filtered.length}</span> students</p>
        {loading ? <p>Loading...</p> :
        <div className="border border-[#111111] overflow-x-auto" data-testid="students-table">
          <table className="w-full border-collapse text-left"><thead><tr className="border-b-2 border-[#111111]">
            {['ID','Name','Email','DOB','Gender','Category','City'].map(h=><th key={h} className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">{h}</th>)}
          </tr></thead><tbody>{filtered.map(s=>(
            <tr key={s.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7]">
              <td className="py-4 px-4 font-mono text-sm">{s.studentId}</td><td className="py-4 px-4 text-sm font-medium">{s.fullName}</td>
              <td className="py-4 px-4 text-sm text-[#555555]">{s.email}</td><td className="py-4 px-4 text-sm">{s.dateOfBirth}</td>
              <td className="py-4 px-4 text-sm">{s.gender}</td><td className="py-4 px-4"><span className="inline-block px-2 py-1 text-xs font-bold border border-[#111111]">{s.category}</span></td>
              <td className="py-4 px-4 text-sm">{s.city}</td>
            </tr>
          ))}</tbody></table>
        </div>}
      </main>
    </div>
  );
}

/* ============ SCHEDULE EXAMS ============ */
function ScheduleExamsPage({ user, onLogout }) {
  const [schedules, setSchedules] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/schedules').then(r=>setSchedules(r.data)).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  return (
    <div className="flex min-h-screen"><Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="schedule-exams-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Schedule Exams</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        {loading ? <p>Loading...</p> :
        <div className="border border-[#111111] overflow-x-auto" data-testid="schedules-table">
          <table className="w-full border-collapse text-left"><thead><tr className="border-b-2 border-[#111111]">
            {['Exam','Subject','Date','Time','Center'].map(h=><th key={h} className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">{h}</th>)}
          </tr></thead><tbody>{schedules.map(s=>(
            <tr key={s.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7]">
              <td className="py-4 px-4 text-sm font-medium">{s.examName}</td><td className="py-4 px-4 text-sm">{s.subject}</td>
              <td className="py-4 px-4 font-mono text-sm">{s.examDate}</td><td className="py-4 px-4 text-sm">{s.startTime} - {s.endTime}</td>
              <td className="py-4 px-4 text-sm">{s.centerName}</td>
            </tr>
          ))}</tbody></table>
        </div>}
      </main>
    </div>
  );
}

/* ============ ASSIGN ROOMS ============ */
function AssignRoomsPage({ user, onLogout }) {
  const [rooms, setRooms] = useState([]); const [allocs, setAllocs] = useState([]); const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('rooms');
  useEffect(() => { Promise.all([api.get('/api/rooms'),api.get('/api/seat-allocations')]).then(([r,a])=>{setRooms(r.data);setAllocs(a.data);}).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  return (
    <div className="flex min-h-screen"><Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="assign-rooms-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Assign Rooms</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        <div className="flex border-b-2 border-[#111111] mb-6">
          <button data-testid="rooms-tab" onClick={()=>setTab('rooms')} className={`px-6 py-3 text-sm font-bold uppercase tracking-wider ${tab==='rooms'?'bg-[#111111] text-white':'text-[#555555] hover:text-[#111111]'}`}>Rooms ({rooms.length})</button>
          <button data-testid="allocations-tab" onClick={()=>setTab('allocations')} className={`px-6 py-3 text-sm font-bold uppercase tracking-wider ${tab==='allocations'?'bg-[#111111] text-white':'text-[#555555] hover:text-[#111111]'}`}>Allocations ({allocs.length})</button>
        </div>
        {loading ? <p>Loading...</p> : tab==='rooms' ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="rooms-grid">{rooms.map(r=>(
          <div key={r.id} className="border border-[#111111] p-6 bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] transition-all">
            <p className="font-heading font-bold text-xl">Room {r.roomNumber}</p><p className="text-sm text-[#555555] mt-1">{r.centerName}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div><p className="text-xs text-[#888888] uppercase">Capacity</p><p className="font-heading font-bold text-2xl text-[#3182CE]">{r.capacity}</p></div>
              <div><p className="text-xs text-[#888888] uppercase">Floor</p><p className="font-bold text-sm mt-1">{r.floor}</p></div>
            </div>
          </div>
        ))}</div> :
        <div className="border border-[#111111] overflow-x-auto" data-testid="allocations-table">
          <table className="w-full border-collapse text-left"><thead><tr className="border-b-2 border-[#111111]">
            {['Student','Exam','Room','Seat','Center'].map(h=><th key={h} className="py-4 px-4 text-xs font-bold text-[#555555] uppercase">{h}</th>)}
          </tr></thead><tbody>{allocs.map(a=>(
            <tr key={a.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7]">
              <td className="py-4 px-4 text-sm font-medium">{a.studentName}</td><td className="py-4 px-4 text-sm">{a.examName}</td>
              <td className="py-4 px-4 font-mono text-sm">{a.roomNumber}</td><td className="py-4 px-4 font-heading font-bold text-[#E53E3E]">{a.seatNumber}</td>
              <td className="py-4 px-4 text-sm">{a.centerName}</td>
            </tr>
          ))}</tbody></table>
        </div>}
      </main>
    </div>
  );
}

/* ============ PUBLISH RESULTS ============ */
function PublishResultsPage({ user, onLogout }) {
  const [results, setResults] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/results').then(r=>setResults(r.data)).catch(()=>{}).finally(()=>setLoading(false)); }, []);
  const pass = results.filter(r=>r.status==='PASS').length; const fail = results.filter(r=>r.status==='FAIL').length;
  const avg = results.length ? (results.reduce((s,r)=>s+(r.percentage||0),0)/results.length).toFixed(1) : '0';
  const gc = (g) => { if(g==='A+'||g==='A')return'text-[#38A169]';if(g==='A-'||g==='B+')return'text-[#3182CE]';if(g==='F')return'text-[#E53E3E]';return'text-[#D69E2E]'; };
  return (
    <div className="flex min-h-screen"><Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="publish-results-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Publish Results</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-testid="results-stats">
          <div className="border border-[#111111] p-5 bg-white"><p className="text-xs text-[#888888] uppercase">Total</p><p className="font-heading font-black text-3xl mt-2">{results.length}</p></div>
          <div className="border border-[#111111] p-5 bg-white"><p className="text-xs text-[#888888] uppercase">Passed</p><p className="font-heading font-black text-3xl mt-2 text-[#38A169]">{pass}</p></div>
          <div className="border border-[#111111] p-5 bg-white"><p className="text-xs text-[#888888] uppercase">Failed</p><p className="font-heading font-black text-3xl mt-2 text-[#E53E3E]">{fail}</p></div>
          <div className="border border-[#111111] p-5 bg-white"><p className="text-xs text-[#888888] uppercase">Avg %</p><p className="font-heading font-black text-3xl mt-2 text-[#3182CE]">{avg}%</p></div>
        </div>
        {loading ? <p>Loading...</p> :
        <div className="border border-[#111111] overflow-x-auto" data-testid="admin-results-table">
          <table className="w-full border-collapse text-left"><thead><tr className="border-b-2 border-[#111111]">
            {['Rank','Student','Exam','Marks','%','Grade','Status'].map(h=><th key={h} className="py-4 px-4 text-xs font-bold text-[#555555] uppercase">{h}</th>)}
          </tr></thead><tbody>{results.sort((a,b)=>(a.rank||999)-(b.rank||999)).map(r=>(
            <tr key={r.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7]">
              <td className="py-4 px-4 font-heading font-bold">{r.rank||'-'}</td><td className="py-4 px-4 text-sm font-medium">{r.studentName}</td>
              <td className="py-4 px-4 text-sm">{r.examName}</td><td className="py-4 px-4 font-mono text-sm">{r.marksObtained}/{r.totalMarks}</td>
              <td className="py-4 px-4 font-bold text-sm">{r.percentage}%</td><td className={`py-4 px-4 font-heading font-bold text-lg ${gc(r.grade)}`}>{r.grade}</td>
              <td className="py-4 px-4"><span className={`inline-block px-3 py-1 text-xs font-bold uppercase border ${r.status==='PASS'?'border-[#38A169] text-[#38A169] bg-green-50':'border-[#E53E3E] text-[#E53E3E] bg-red-50'}`}>{r.status}</span></td>
            </tr>
          ))}</tbody></table>
        </div>}
      </main>
    </div>
  );
}

/* ============ MAIN APP ============ */
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => { const s = localStorage.getItem('nems_user'); if(s) setUser(JSON.parse(s)); }, []);
  const handleLogin = (d) => { localStorage.setItem('nems_token',d.token); localStorage.setItem('nems_user',JSON.stringify(d)); setUser(d); };
  const handleLogout = () => { localStorage.removeItem('nems_token'); localStorage.removeItem('nems_user'); setUser(null); };
  return (
    <Router><Routes>
      <Route path="/login" element={user ? <Navigate to={user.role==='ADMIN'?'/admin':'/student'}/> : <LoginPage onLogin={handleLogin}/>} />
      <Route path="/register" element={user ? <Navigate to="/student"/> : <RegisterPage onLogin={handleLogin}/>} />
      <Route path="/student" element={user?.role==='STUDENT' ? <StudentDashboard user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/student/admit-card" element={user ? <AdmitCardPage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/student/results" element={user ? <ViewResultPage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/student/grievance" element={user ? <RaiseGrievancePage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/admin" element={user?.role==='ADMIN' ? <AdminDashboard user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/admin/students" element={user?.role==='ADMIN' ? <ManageStudentsPage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/admin/schedule" element={user?.role==='ADMIN' ? <ScheduleExamsPage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/admin/rooms" element={user?.role==='ADMIN' ? <AssignRoomsPage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="/admin/results" element={user?.role==='ADMIN' ? <PublishResultsPage user={user} onLogout={handleLogout}/> : <Navigate to="/login"/>} />
      <Route path="*" element={<Navigate to="/login"/>} />
    </Routes></Router>
  );
}

export default App;
