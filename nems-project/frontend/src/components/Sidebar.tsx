import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  role: string;
  fullName: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, fullName, onLogout }) => {
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
    <aside data-testid="sidebar" className="w-64 min-h-screen bg-[#F7F7F7] border-r border-[#111111] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#111111]">
        <h1 className="font-heading font-black text-2xl tracking-tighter uppercase">NEMS</h1>
        <p className="text-xs tracking-[0.2em] text-[#555555] mt-1 uppercase font-body">
          {role === 'ADMIN' ? 'Admin Panel' : 'Student Portal'}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-wide transition-colors ${
                isActive
                  ? 'bg-[#111111] text-white'
                  : 'text-[#555555] hover:text-[#111111] hover:bg-[#E5E5E5]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
              </svg>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-6 border-t border-[#111111]">
        <p className="text-sm font-bold truncate">{fullName}</p>
        <p className="text-xs text-[#888888] tracking-wide uppercase">{role}</p>
        <button
          data-testid="logout-button"
          onClick={onLogout}
          className="mt-3 w-full py-2 text-sm font-bold border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
        >
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
