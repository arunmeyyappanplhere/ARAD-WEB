import React, { useState, useEffect, useRef } from 'react';
import RightSideBar from '../components/RightSideBar';

const BASE_LAT = 13.049607988049031;
const BASE_LNG = 80.07550881830879;

// One alert turns red (critical) every minute; the rest stay blue
const CRITICAL_ALERT_INTERVAL_MS = 60000;

// Slightly randomize coordinates around the proper location (~±200m) for non-critical alerts
const jitterCoords = (lat, lng) => {
  const offset = () => (Math.random() - 0.5) * 0.004;
  return {
    lat: (Number(lat) + offset()).toFixed(6),
    lng: (Number(lng) + offset()).toFixed(6)
  };
};

const EmergenciesPage = () => {
  const [emergencies, setEmergencies] = useState([]);
  const prevCoordsRef = useRef({ lat: null, lng: null });
  const lastCriticalRef = useRef(0);

  const getActiveCoordinates = async () => {
    // 1. Try fetching live backend data (proper/actual location)
    try {
      const response = await fetch('http://localhost:8000/api/sensor-data');
      if (response.ok) {
        const data = await response.json();
        if (data.location?.latitude && data.location?.longitude) {
          return {
            id: 'ARAD-SNOW-RESCUE',
            lat: Number(data.location.latitude).toFixed(6),
            lng: Number(data.location.longitude).toFixed(6)
          };
        }
      }
    } catch (err) {
      // Backend unavailable, fallback below
    }

    // 2. Try fetching coordinates saved from dashboard
    try {
      const savedCoords = localStorage.getItem('arad_active_coordinates');
      if (savedCoords) {
        const parsed = JSON.parse(savedCoords);
        if (parsed.lat && parsed.lng) {
          return {
            id: 'ARAD-NODE-01',
            lat: Number(parsed.lat).toFixed(6),
            lng: Number(parsed.lng).toFixed(6)
          };
        }
      }
    } catch (e) {
      // Fallback
    }

    // 3. Default base coordinates
    return {
      id: 'ARAD-NODE-01',
      lat: BASE_LAT.toFixed(6),
      lng: BASE_LNG.toFixed(6)
    };
  };

  const updateManifest = async () => {
    const active = await getActiveCoordinates();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    // Once every minute the new alert is RED (critical) with the proper location,
    // all other alerts are BLUE with slightly randomized coordinates.
    const now = Date.now();
    const isCritical = now - lastCriticalRef.current >= CRITICAL_ALERT_INTERVAL_MS;
    if (isCritical) {
      lastCriticalRef.current = now;
    }

    const coords = isCritical
      ? { lat: active.lat, lng: active.lng }
      : jitterCoords(active.lat, active.lng);

    const newRecord = {
      id: active.id,
      lat: coords.lat,
      lng: coords.lng,
      time: currentTime,
      status: isCritical ? 'SOS Triggered' : 'Active Broadcast',
      p: isCritical ? 'P1 CRITICAL' : 'P2 HIGH',
      team: isCritical ? 'SkyRescue-4' : 'Ground Alpha',
      color: isCritical ? 'text-error' : 'text-primary-fixed-dim',
      bg: isCritical ? 'bg-error' : 'bg-primary-fixed-dim',
      uid: `${active.id}-${currentTime}-${Math.random().toString(36).substr(2, 4)}`
    };

    setEmergencies((prev) => [newRecord, ...prev].slice(0, 15));
    prevCoordsRef.current = { lat: active.lat, lng: active.lng };
  };

  useEffect(() => {
    // Initial fetch
    updateManifest();

    // 3-second recurring interval
    const interval = setInterval(() => {
      updateManifest();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const criticalCount = emergencies.filter(e => e.p === 'P1 CRITICAL').length;

  const handleTrackLocation = () => {
    // Always route to the static base location, regardless of the (jittered) row coordinates shown
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${BASE_LAT},${BASE_LNG}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-6 lg:pr-[calc(20rem+2rem)] pb-12 pl-6 lg:pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-display-lg text-3xl font-black text-on-surface">Live Emergency Manifest</h1>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${criticalCount > 0 ? 'bg-error-container/20 text-error' : 'bg-surface-variant text-on-surface-variant'}`}>
                Critical Alerts
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
                    <tr key={row.uid} className="hover:bg-surface-variant/20 transition-colors animate-fade-in">
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
                          onClick={() => handleTrackLocation()}
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