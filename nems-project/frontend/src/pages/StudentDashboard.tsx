import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface Props { user: any; onLogout: () => void; }

const StudentDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const quickActions = [
    { path: '/student/admit-card', label: 'View Admit Card', desc: 'Download your hall ticket for upcoming exams', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    { path: '/student/results', label: 'View Results', desc: 'Check your examination results and grades', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { path: '/student/grievance', label: 'Raise Grievance', desc: 'Submit complaints or requests for review', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="student-dashboard">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
          <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">
            Welcome, {user.fullName}
          </h1>
          <div className="w-16 h-1 bg-[#E53E3E] mt-3"></div>
        </div>

        {/* Status Banner */}
        <div className="border border-[#111111] p-6 mb-8 bg-[#F7F7F7]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Status</p>
              <p className="font-heading font-bold text-xl mt-1">Active</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Email</p>
              <p className="font-mono text-sm mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Role</p>
              <p className="font-heading font-bold text-xl mt-1 text-[#38A169]">STUDENT</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="font-heading font-bold text-xl uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              data-testid={`quick-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              className="border border-[#111111] p-6 bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all duration-200 group"
            >
              <svg className="w-8 h-8 text-[#E53E3E] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
              <h3 className="font-heading font-bold text-lg uppercase tracking-tight">{action.label}</h3>
              <p className="text-sm text-[#555555] mt-2">{action.desc}</p>
              <p className="text-xs font-bold text-[#E53E3E] mt-4 uppercase tracking-wider group-hover:underline">
                Go &rarr;
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
