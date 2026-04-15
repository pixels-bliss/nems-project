import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getRooms, getSeatAllocations, getExamCenters } from '../services/api';

interface Props { user: any; onLogout: () => void; }

const AssignRoomsPage: React.FC<Props> = ({ user, onLogout }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [allocations, setAllocations] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'rooms' | 'allocations'>('rooms');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rRes, aRes, cRes] = await Promise.all([getRooms(), getSeatAllocations(), getExamCenters()]);
        setRooms(rRes.data);
        setAllocations(aRes.data);
        setCenters(cRes.data);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar role="ADMIN" fullName={user.fullName} onLogout={onLogout} />
      <main className="flex-1 p-8" data-testid="assign-rooms-page">
        <p className="text-xs tracking-[0.2em] text-[#555555] uppercase font-bold">Admin Panel</p>
        <h1 className="font-heading font-black text-4xl tracking-tighter uppercase mt-1">Assign Rooms</h1>
        <div className="w-16 h-1 bg-[#E53E3E] mt-3 mb-8"></div>

        {/* Tabs */}
        <div className="flex border-b-2 border-[#111111] mb-6">
          <button
            data-testid="rooms-tab"
            onClick={() => setActiveTab('rooms')}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'rooms' ? 'bg-[#111111] text-white' : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            Rooms ({rooms.length})
          </button>
          <button
            data-testid="allocations-tab"
            onClick={() => setActiveTab('allocations')}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'allocations' ? 'bg-[#111111] text-white' : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            Seat Allocations ({allocations.length})
          </button>
        </div>

        {loading ? (
          <p className="text-[#555555]">Loading...</p>
        ) : activeTab === 'rooms' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="rooms-grid">
            {rooms.map((room: any) => (
              <div key={room.id} className="border border-[#111111] p-6 bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-heading font-bold text-xl">Room {room.roomNumber}</p>
                    <p className="text-sm text-[#555555] mt-1">{room.examCenter?.centerName || 'N/A'}</p>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-bold uppercase border ${room.active ? 'border-[#38A169] text-[#38A169]' : 'border-[#E53E3E] text-[#E53E3E]'}`}>
                    {room.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Capacity</p>
                    <p className="font-heading font-bold text-2xl text-[#3182CE]">{room.capacity}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#888888] uppercase">Floor</p>
                    <p className="font-bold text-sm mt-1">{room.floor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#111111] overflow-x-auto" data-testid="allocations-table">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#111111]">
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Student</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Exam</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Room</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Seat</th>
                  <th className="py-4 px-6 text-xs tracking-[0.1em] font-bold text-[#555555] uppercase">Center</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((a: any) => (
                  <tr key={a.id} className="border-b border-[#E5E5E5] hover:bg-[#F7F7F7] transition-colors">
                    <td className="py-4 px-6 text-sm font-medium">{a.student?.user?.fullName || 'N/A'}</td>
                    <td className="py-4 px-6 text-sm">{a.examSchedule?.exam?.examName || 'N/A'}</td>
                    <td className="py-4 px-6 font-mono text-sm">{a.room?.roomNumber || 'N/A'}</td>
                    <td className="py-4 px-6 font-heading font-bold text-[#E53E3E]">{a.seatNumber}</td>
                    <td className="py-4 px-6 text-sm">{a.room?.examCenter?.centerName || 'N/A'}</td>
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

export default AssignRoomsPage;
