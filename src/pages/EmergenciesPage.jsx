import React, { useState, useEffect } from 'react';
import RightSideBar from '../components/RightSideBar';

const BASE_LAT = 13.0489;
const BASE_LNG = 80.1149;

const EMERGENCY_TYPES = [
  { status: 'SOS Triggered', p: 'P1 CRITICAL', team: 'SkyRescue-4', color: 'text-error', bg: 'bg-error' },
  { status: 'Abnormal Immobility', p: 'P2 HIGH', team: 'Ground Alpha', color: 'text-tertiary-fixed-dim', bg: 'bg-tertiary-fixed-dim' },
  { status: 'Geofence Breach', p: 'P2 HIGH', team: 'Ground Beta', color: 'text-primary-fixed-dim', bg: 'bg-primary-fixed-dim' }
];

const EmergenciesPage = () => {
  const [emergencies, setEmergencies] = useState([{
    id: 'ARD-001',
    lat: BASE_LAT.toFixed(6),
    lng: BASE_LNG.toFixed(6),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    status: 'SOS Triggered',
    p: 'P1 CRITICAL',
    team: 'SkyRescue-4',
    color: 'text-error',
    bg: 'bg-error',
  }]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencies((prev) => {
        const newId = `ARD-${Math.floor(Math.random() * 900 + 100)}`;
        
        // Decreased the offset multiplier from 0.01 to 0.0005 
        // This ensures only the 4th, 5th, and 6th decimal points deflect
        const latOffset = (Math.random() - 0.5) * 0.0005;
        const lngOffset = (Math.random() - 0.5) * 0.0005;
        
        const randomType = EMERGENCY_TYPES[Math.floor(Math.random() * EMERGENCY_TYPES.length)];
        
        const newEmergency = {
          id: newId,
          lat: (BASE_LAT + latOffset).toFixed(6),
          lng: (BASE_LNG + lngOffset).toFixed(6),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
          ...randomType
        };

        return [newEmergency, ...prev].slice(0, 15);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const criticalCount = emergencies.filter(e => e.p === 'P1 CRITICAL').length;

  const handleTrackLocation = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-[calc(20rem+2rem)] pb-12 pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-display-lg text-3xl font-black text-on-surface">Live Emergency Manifest</h1>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${criticalCount > 0 ? 'bg-error-container/20 text-error' : 'bg-surface-variant text-on-surface-variant'}`}>
                {criticalCount} Critical Alerts
              </span>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-variant/10">
                  <tr>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Device ID</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Coordinates</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Time</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Priority</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Assigned Team</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {emergencies.map((row) => (
                    <tr key={row.id + row.time} className="hover:bg-surface-variant/20 transition-colors animate-fade-in">
                      <td className="px-6 py-4 font-label-mono text-xs">{row.id}</td>
                      <td className="px-6 py-4 text-xs font-label-mono text-on-surface-variant">{row.lat}, {row.lng}</td>
                      <td className="px-6 py-4 font-label-mono text-xs">{row.time}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 ${row.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${row.bg} ${row.p === 'P1 CRITICAL' ? 'animate-ping' : ''}`}></span>
                          <span className="text-[11px] font-semibold">{row.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className={`px-2 py-0.5 ${row.bg} text-on-primary rounded text-[9px] font-black`}>{row.p}</span></td>
                      <td className="px-6 py-4 text-xs">{row.team}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleTrackLocation(row.lat, row.lng)}
                          className="flex items-center gap-1 bg-primary-fixed-dim/20 text-primary-fixed-dim hover:bg-primary-fixed-dim/40 px-3 py-1 rounded transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">map</span>
                          <span className="text-[10px] font-bold uppercase">View on Maps</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <RightSideBar />
    </div>
  );
};

export default EmergenciesPage;