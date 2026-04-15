import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getResults } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const ViewResultPage: React.FC<Props> = ({ user, onLogout }) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResults();
        setResults(res.data);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-[#38A169]';
    if (grade === 'A-' || grade === 'B+') return 'text-[#3182CE]';
    if (grade === 'B' || grade === 'B-') return 'text-[#D69E2E]';
    if (grade === 'F') return 'text-[#E53E3E]';
    return 'text-[#111111]';
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="view-result-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Exam Results</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>

        {loading ? (
          <div className="border border-[#E5E5E5] p-8 text-center">
            <p className="text-[#555555]">Loading results...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="border border-[#E5E5E5] p-12 text-center bg-[#F7F7F7]">
            <p className="font-heading font-bold text-xl">No Results Found</p>
            <p className="text-sm text-[#555555] mt-2">Results have not been published yet.</p>
          </div>
        ) : (
          <div className="border border-[#111111]" data-testid="results-table">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#111111]">
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Exam</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Student</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Marks</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Percentage</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Grade</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Status</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Rank</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r: any) => (
                  <tr key={r.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7] transition-colors">
                    <td className="py-4 px-6 text-sm font-medium">{r.exam?.examName || 'N/A'}</td>
                    <td className="py-4 px-6 text-sm">{r.student?.user?.fullName || 'N/A'}</td>
                    <td className="py-4 px-6 font-mono text-sm">{r.marksObtained}/{r.totalMarks}</td>
                    <td className="py-4 px-6 font-bold text-sm">{r.percentage}%</td>
                    <td className={`py-4 px-6 font-heading font-bold text-lg ${getGradeColor(r.grade)}`}>{r.grade}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                        r.status === 'PASS' ? 'border-[#38A169] text-[#38A169] bg-green-50' : 'border-[#E53E3E] text-[#E53E3E] bg-red-50'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-heading font-bold">{r.rank || '-'}</td>
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

export default ViewResultPage;
