import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getStudents } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const ManageStudentsPage: React.FC<Props> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudents();
        setStudents(res.data);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = students.filter((s: any) =>
    (s.user?.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.studentId || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="manage-students-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Manage Students</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>

        {/* Search */}
        <div className="mb-6">
          <input
            data-testid="student-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or student ID..."
            className="w-full max-w-md px-4 py-3 border border-[#111111] bg-white font-body"
          />
        </div>

        {/* Count */}
        <p className="text-sm text-[#555555] mb-4">
          Showing <span className="font-bold text-[#111111]">{filtered.length}</span> students
        </p>

        {loading ? (
          <p className="text-[#555555]">Loading students...</p>
        ) : (
          <div className="border border-[#111111] overflow-x-auto" data-testid="students-table">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#111111]">
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Student ID</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Name</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Email</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">DOB</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Gender</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Category</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">City</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s: any) => (
                  <tr key={s.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7] transition-colors">
                    <td className="py-4 px-6 font-mono text-sm">{s.studentId}</td>
                    <td className="py-4 px-6 text-sm font-medium">{s.user?.fullName || 'N/A'}</td>
                    <td className="py-4 px-6 text-sm text-[#555555]">{s.user?.email || 'N/A'}</td>
                    <td className="py-4 px-6 text-sm">{s.dateOfBirth}</td>
                    <td className="py-4 px-6 text-sm">{s.gender}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2 py-1 text-xs font-bold border border-[#111111]">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">{s.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageStudentsPage;
