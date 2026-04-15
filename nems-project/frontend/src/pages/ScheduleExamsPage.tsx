import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getSchedules, getExams, getExamCenters } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const ScheduleExamsPage: React.FC<Props> = ({ user, onLogout }) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ examId: '', centerId: '', examDate: '', startTime: '09:00', endTime: '12:00', subject: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, eRes, cRes] = await Promise.all([getSchedules(), getExams(), getExamCenters()]);
        setSchedules(sRes.data);
        setExams(eRes.data);
        setCenters(cRes.data);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Schedule created successfully! (Frontend demo - connect to backend POST /api/schedules)');
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="schedule-exams-page">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
            <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Schedule Exams</h1>
            <div className="w-16 h-1 bg-[#E53E3E] mt-3"></div>
          </div>
          <button
            data-testid="new-schedule-button"
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E]"
          >
            {showForm ? 'Cancel' : '+ New Schedule'}
          </button>
        </div>

        {message && (
          <div className="border border-[#38A169] bg-green-50 p-4 mb-6">
            <p className="text-sm text-[#38A169] font-bold">{message}</p>
          </div>
        )}

        {showForm && (
          <div className="border border-[#111111] p-6 mb-8 bg-white" data-testid="schedule-form">
            <h3 className="font-heading font-bold text-lg uppercase tracking-wide mb-4">Create New Schedule</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Exam</label>
                  <select data-testid="schedule-exam-select" value={form.examId} onChange={(e) => setForm({...form, examId: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" required>
                    <option value="">Select Exam</option>
                    {exams.map((ex: any) => (
                      <option key={ex.id} value={ex.id}>{ex.examName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Exam Center</label>
                  <select data-testid="schedule-center-select" value={form.centerId} onChange={(e) => setForm({...form, centerId: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" required>
                    <option value="">Select Center</option>
                    {centers.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.centerName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Exam Date</label>
                  <input data-testid="schedule-date-input" type="date" value={form.examDate} onChange={(e) => setForm({...form, examDate: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" required />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Subject</label>
                  <input data-testid="schedule-subject-input" type="text" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" placeholder="Mathematics" required />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Start Time</label>
                  <input type="time" value={form.startTime} onChange={(e) => setForm({...form, startTime: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">End Time</label>
                  <input type="time" value={form.endTime} onChange={(e) => setForm({...form, endTime: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" />
                </div>
              </div>
              <button data-testid="schedule-submit-button" type="submit"
                className="px-8 py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E]">
                Create Schedule
              </button>
            </form>
          </div>
        )}

        {/* Schedules Table */}
        {loading ? (
          <p className="text-[#555555]">Loading schedules...</p>
        ) : (
          <div className="border border-[#111111] overflow-x-auto" data-testid="schedules-table">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#111111]">
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Exam</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Subject</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Date</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Time</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Center</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s: any) => (
                  <tr key={s.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7] transition-colors">
                    <td className="py-4 px-6 text-sm font-medium">{s.exam?.examName || 'N/A'}</td>
                    <td className="py-4 px-6 text-sm">{s.subject}</td>
                    <td className="py-4 px-6 text-sm font-mono">{s.examDate}</td>
                    <td className="py-4 px-6 text-sm">{s.startTime} - {s.endTime}</td>
                    <td className="py-4 px-6 text-sm">{s.examCenter?.centerName || 'N/A'}</td>
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

export default ScheduleExamsPage;
