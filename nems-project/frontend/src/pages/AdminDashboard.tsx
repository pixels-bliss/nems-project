import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getStudents, getExams, getSchedules, getResults, getGrievances } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const AdminDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [stats, setStats] = useState({ students: 0, exams: 0, schedules: 0, results: 0, grievances: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sRes, eRes, schRes, rRes, gRes] = await Promise.all([
          getStudents(), getExams(), getSchedules(), getResults(), getGrievances()
        ]);
        setStats({
          students: sRes.data.length,
          exams: eRes.data.length,
          schedules: schRes.data.length,
          results: rRes.data.length,
          grievances: gRes.data.length,
        });
      } catch { }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const cards = [
    { label: 'Total Students', value: stats.students, color: '#3182CE', path: '/admin/students' },
    { label: 'Active Exams', value: stats.exams, color: '#38A169', path: '/admin/schedule' },
    { label: 'Scheduled', value: stats.schedules, color: '#D69E2E', path: '/admin/schedule' },
    { label: 'Results Published', value: stats.results, color: '#111111', path: '/admin/results' },
    { label: 'Grievances', value: stats.grievances, color: '#E53E3E', path: '/admin/students' },
  ];

  const adminActions = [
    { path: '/admin/students', label: 'Manage Students', desc: 'View, edit, and manage student records', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { path: '/admin/schedule', label: 'Schedule Exams', desc: 'Create and manage exam schedules', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/admin/rooms', label: 'Assign Rooms', desc: 'Allocate rooms and seats for exams', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { path: '/admin/results', label: 'Publish Results', desc: 'Review and publish examination results', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="admin-dashboard">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Dashboard</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10" data-testid="admin-stats">
          {cards.map((card) => (
            <Link key={card.label} to={card.path}
              className="border border-[#111111] p-5 bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all">
              <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">{card.label}</p>
              <p className="font-heading font-black text-3xl mt-2" style={{ color: card.color }}>
                {loading ? '...' : card.value}
              </p>
            </Link>
          ))}
        </div>

        {/* Admin Actions */}
        <h2 className="font-heading font-bold text-xl uppercase tracking-wide mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              data-testid={`admin-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              className="border border-[#111111] p-6 bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all group"
            >
              <svg className="w-8 h-8 text-[#E53E3E] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
              <h3 className="font-heading font-bold text-lg uppercase tracking-tight">{action.label}</h3>
              <p className="text-sm text-[#555555] mt-2">{action.desc}</p>
              <p className="text-xs font-bold text-[#E53E3E] mt-4 uppercase tracking-wider group-hover:underline">
                Open &rarr;
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
