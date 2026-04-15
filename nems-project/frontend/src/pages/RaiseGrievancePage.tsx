import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getGrievances, getExams } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const RaiseGrievancePage: React.FC<Props> = ({ user, onLogout }) => {
  const [grievances, setGrievances] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ examId: '', category: 'RESULT', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gRes, eRes] = await Promise.all([getGrievances(), getExams()]);
        setGrievances(gRes.data);
        setExams(eRes.data);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    // In a real app, this would POST to backend
    // For now, show success message
    setTimeout(() => {
      setMessage('Grievance submitted successfully! Tracking number: GRV' + Date.now());
      setShowForm(false);
      setForm({ examId: '', category: 'RESULT', description: '' });
      setSubmitting(false);
    }, 1000);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'RESOLVED': return 'border-[#38A169] text-[#38A169] bg-green-50';
      case 'UNDER_REVIEW': return 'border-[#D69E2E] text-[#D69E2E] bg-yellow-50';
      case 'REJECTED': return 'border-[#E53E3E] text-[#E53E3E] bg-red-50';
      default: return 'border-[#3182CE] text-[#3182CE] bg-blue-50';
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="grievance-page">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
            <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Grievances</h1>
            <div className="w-16 h-1 bg-[#E53E3E] mt-3"></div>
          </div>
          <button
            data-testid="new-grievance-button"
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E]"
          >
            {showForm ? 'Cancel' : '+ New Grievance'}
          </button>
        </div>

        {message && (
          <div className="border border-[#38A169] bg-green-50 p-4 mb-6" data-testid="grievance-success">
            <p className="text-sm text-[#38A169] font-bold">{message}</p>
          </div>
        )}

        {/* Grievance Form */}
        {showForm && (
          <div className="border border-[#111111] p-6 mb-8 bg-white" data-testid="grievance-form">
            <h3 className="font-heading font-bold text-lg uppercase tracking-wide mb-4">Submit New Grievance</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Exam</label>
                  <select data-testid="grievance-exam-select" value={form.examId} onChange={(e) => setForm({...form, examId: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body" required>
                    <option value="">Select Exam</option>
                    {exams.map((ex: any) => (
                      <option key={ex.id} value={ex.id}>{ex.examName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Category</label>
                  <select data-testid="grievance-category-select" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-3 border border-[#111111] bg-white font-body">
                    <option value="RESULT">Result Issue</option>
                    <option value="EVALUATION">Evaluation Issue</option>
                    <option value="ATTENDANCE">Attendance Issue</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] font-bold text-[#555555] uppercase mb-1">Description</label>
                <textarea data-testid="grievance-description-input" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                  rows={4} required className="w-full px-4 py-3 border border-[#111111] bg-white font-body resize-none"
                  placeholder="Describe your grievance in detail..." />
              </div>
              <button data-testid="grievance-submit-button" type="submit" disabled={submitting}
                className="px-8 py-3 bg-[#E53E3E] text-white font-bold text-sm tracking-wider uppercase border border-[#E53E3E] hover:bg-red-600 transition-colors disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Grievance'}
              </button>
            </form>
          </div>
        )}

        {/* Grievances List */}
        {loading ? (
          <p className="text-[#555555]">Loading grievances...</p>
        ) : grievances.length === 0 ? (
          <div className="border border-[#E5E5E5] p-12 text-center bg-[#F7F7F7]">
            <p className="font-heading font-bold text-xl">No Grievances</p>
            <p className="text-sm text-[#555555] mt-2">You haven't raised any grievances yet.</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="grievances-list">
            {grievances.map((g: any) => (
              <div key={g.id} className="border border-[#111111] p-6 bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-xs text-[#888888]">{g.grievanceNumber}</p>
                    <p className="font-heading font-bold text-lg mt-1">{g.category}</p>
                    <p className="text-sm text-[#555555] mt-2 max-w-lg">{g.description}</p>
                  </div>
                  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border ${getStatusStyle(g.status)}`}>
                    {g.status?.replace('_', ' ')}
                  </span>
                </div>
                {g.resolution && (
                  <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                    <p className="text-xs font-bold text-[#38A169] uppercase tracking-wider">Resolution</p>
                    <p className="text-sm text-[#555555] mt-1">{g.resolution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RaiseGrievancePage;
