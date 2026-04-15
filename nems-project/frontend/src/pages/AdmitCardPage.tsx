import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getSeatAllocations } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const AdmitCardPage: React.FC<Props> = ({ user, onLogout }) => {
  const [allocations, setAllocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSeatAllocations();
        setAllocations(res.data);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar role="STUDENT" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="admit-card-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Student Portal</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Admit Card</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>

        {loading ? (
          <div className="border border-[#E5E5E5] p-8 text-center">
            <p className="text-[#555555]">Loading admit cards...</p>
          </div>
        ) : allocations.length === 0 ? (
          <div className="border border-[#E5E5E5] p-12 text-center bg-[#F7F7F7]">
            <p className="font-heading font-bold text-xl">No Admit Cards Found</p>
            <p className="text-sm text-[#555555] mt-2">No exam registrations found for your account.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {allocations.map((alloc: any) => (
              <div key={alloc.id} className="border border-[#111111] bg-white" data-testid={`admit-card-${alloc.id}`}>
                {/* Card Header */}
                <div className="bg-[#111111] text-white px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#888888]">Admit Card</p>
                    <p className="font-heading font-bold text-lg uppercase">
                      {alloc.examSchedule?.exam?.examName || 'Examination'}
                    </p>
                  </div>
                  <p className="font-mono text-sm">Seat: {alloc.seatNumber}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Student Name</p>
                    <p className="font-bold mt-1">{alloc.student?.user?.fullName || user.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Student ID</p>
                    <p className="font-mono text-sm mt-1">{alloc.student?.studentId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Subject</p>
                    <p className="font-bold mt-1">{alloc.examSchedule?.subject || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Date</p>
                    <p className="font-bold mt-1">{alloc.examSchedule?.examDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Time</p>
                    <p className="font-bold mt-1">
                      {alloc.examSchedule?.startTime || ''} - {alloc.examSchedule?.endTime || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Center / Room</p>
                    <p className="font-bold mt-1">
                      {alloc.room?.examCenter?.centerName || 'N/A'} / Room {alloc.room?.roomNumber || ''}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <button
                    data-testid={`print-admit-card-${alloc.id}`}
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-[#111111] text-white font-bold text-sm tracking-wider uppercase border border-[#111111] hover:bg-[#333333] transition-colors shadow-[4px_4px_0_0_#E53E3E]"
                  >
                    Print Admit Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdmitCardPage;
