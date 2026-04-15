import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getResults } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const PublishResultsPage: React.FC<Props> = ({ user, onLogout }) => {
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

  const passCount = results.filter((r: any) => r.status === 'PASS').length;
  const failCount = results.filter((r: any) => r.status === 'FAIL').length;
  const avgPercentage = results.length > 0
    ? (results.reduce((sum: number, r: any) => sum + (r.percentage || 0), 0) / results.length).toFixed(1)
    : '0';

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-[#38A169]';
    if (grade === 'A-' || grade === 'B+') return 'text-[#3182CE]';
    if (grade === 'B' || grade === 'B-') return 'text-[#D69E2E]';
    if (grade === 'F') return 'text-[#E53E3E]';
    return 'text-[#111111]';
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="publish-results-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Publish Results</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-testid="results-stats">
          <div className="border border-[#111111] p-5 bg-white">
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Total Results</p>
            <p className="font-heading font-black text-3xl mt-2">{results.length}</p>
          </div>
          <div className="border border-[#111111] p-5 bg-white">
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Passed</p>
            <p className="font-heading font-black text-3xl mt-2 text-[#38A169]">{passCount}</p>
          </div>
          <div className="border border-[#111111] p-5 bg-white">
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Failed</p>
            <p className="font-heading font-black text-3xl mt-2 text-[#E53E3E]">{failCount}</p>
          </div>
          <div className="border border-[#111111] p-5 bg-white">
            <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Avg %</p>
            <p className="font-heading font-black text-3xl mt-2 text-[#3182CE]">{avgPercentage}%</p>
          </div>
        </div>

        {/* Results Table */}
        {loading ? (
          <p className="text-[#555555]">Loading results...</p>
        ) : (
          <div className="border border-[#111111] overflow-x-auto" data-testid="admin-results-table">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#111111]">
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Rank</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Student</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Exam</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Marks</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">%</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Grade</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Status</th>
                  <th className="py-4 px-4 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Published</th>
                </tr>
              </thead>
              <tbody>
                {results.sort((a: any, b: any) => (a.rank || 999) - (b.rank || 999)).map((r: any) => (
                  <tr key={r.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7] transition-colors">
                    <td className="py-4 px-4 font-heading font-bold">{r.rank || '-'}</td>
                    <td className="py-4 px-4 text-sm font-medium">{r.student?.user?.fullName || 'N/A'}</td>
                    <td className="py-4 px-4 text-sm">{r.exam?.examName || 'N/A'}</td>
                    <td className="py-4 px-4 font-mono text-sm">{r.marksObtained}/{r.totalMarks}</td>
                    <td className="py-4 px-4 font-bold text-sm">{r.percentage}%</td>
                    <td className={`py-4 px-4 font-heading font-bold text-lg ${getGradeColor(r.grade)}`}>{r.grade}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                        r.status === 'PASS' ? 'border-[#38A169] text-[#38A169] bg-green-50' : 'border-[#E53E3E] text-[#E53E3E] bg-red-50'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-[#888888]">
                      {r.publishedAt ? 'Yes' : 'Pending'}
                    </td>
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

export default PublishResultsPage;
