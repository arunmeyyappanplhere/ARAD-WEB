import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import RightSideBar from '../components/RightSideBar';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Auto-pan and fly-to controller on incoming coordinate changes
const MapTracker = ({ coords }) => {
  const map = useMap();
  const prevCoordsRef = useRef({ lat: null, lng: null });

  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      if (
        prevCoordsRef.current.lat !== coords.lat ||
        prevCoordsRef.current.lng !== coords.lng
      ) {
        map.flyTo([coords.lat, coords.lng], 16, {
          animate: true,
          duration: 1.2
        });
        prevCoordsRef.current = { lat: coords.lat, lng: coords.lng };
      }
    }
  }, [coords, map]);

  return null;
};

// Custom Marker with radar ping effect based on DB status
const createCustomIcon = (status, dbId) => {
  const isEmergency = status === 'EMERGENCY';
  const displayId = dbId ? `ID: ${String(dbId).slice(-6)}` : 'ARAD';
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
      ${isEmergency ? '<div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ef4444; position: absolute; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.75;"></div>' : ''}
      <div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${isEmergency ? '#ef4444' : '#06b6d4'}; box-shadow: 0 0 12px ${isEmergency ? 'rgba(239, 68, 68, 0.8)' : 'rgba(6, 182, 212, 0.8)'}; border: 2px solid #ffffff;"></div>
      <div style="margin-top: 4px; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; font-family: monospace; background: rgba(15, 23, 42, 0.85); color: ${isEmergency ? '#fca5a5' : '#67e8f9'}; border: 1px solid rgba(255,255,255,0.1); white-space: nowrap;">
        ${displayId}
      </div>
    </div>
  `;
  return L.divIcon({ className: 'bg-transparent border-none', html, iconSize: [0, 0], iconAnchor: [0, 0] });
};

const DashboardPage = () => {
  const location = useLocation();

  // Full sensor telemetry state matching MongoDB schema including _id
  const [telemetry, setTelemetry] = useState({
    id: null,
    status: 'INITIALIZING',
    latitude: 13.054333296140987,
    longitude: 80.0747078506986,
    altitude: 0,
    satellites: 0,
    accel: { x: 0, y: 0, z: 0 },
    gyro: { x: 0, y: 0, z: 0 },
    rssi: null,
    snr: null,
    timestamp: null
  });
    console.log(telemetry.latitude)
  console.log(telemetry.longitude)

  const [history, setHistory] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Manual Coordinates Modal State
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputLat, setInputLat] = useState('');
  const [inputLng, setInputLng] = useState('');
  const [manualOverride, setManualOverride] = useState(null);

  // Thunderforest outdoor map tiles
  const thunderforestApiKey = 'a94e71df876b4b7380b930912403dd63';
  const thunderforestStyle = 'outdoors';

  // Poll DB endpoint every 2 seconds for fresh sensor readings
  // useEffect(() => {
  //   const fetchLatestTelemetry = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/api/sensor-data');
  //       if (!response.ok) {
  //         setIsConnected(false);
  //         return;
  //       }

  //       const data = await response.json();
  //       setIsConnected(true);

  //       if (data.location?.latitude && data.location?.longitude) {
  //         const freshData = {
  //           id: data._id || null,
  //           status: data.status || 'SAFE',
  //           latitude: Number(data.location.latitude),
  //           longitude: Number(data.location.longitude),
  //           altitude: Number(data.location.altitude) || 0,
  //           satellites: Number(data.location.satellites) || 0,
  //           accel: {
  //             x: data.imu?.accel?.x ?? 0,
  //             y: data.imu?.accel?.y ?? 0,
  //             z: data.imu?.accel?.z ?? 0
  //           },
  //           gyro: {
  //             x: data.imu?.gyro?.x ?? 0,
  //             y: data.imu?.gyro?.y ?? 0,
  //             z: data.imu?.gyro?.z ?? 0
  //           },
  //           rssi: data.rf?.rssi ?? null,
  //           snr: data.rf?.snr ?? null,
  //           timestamp: data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()
  //         };

  //         setTelemetry(freshData);
  //         setLastSyncTime(new Date().toLocaleTimeString());

  //         // Append to short roll of previous packets (keeps last 5)
  //         setHistory((prev) => [freshData, ...prev.slice(0, 4)]);
  //       }
  //     } catch (err) {
  //       console.error('Failed to query DB endpoint:', err);
  //       setIsConnected(false);
  //     }
  //   };

  //   fetchLatestTelemetry();
  //   const interval = setInterval(fetchLatestTelemetry, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(inputLat);
    const lng = parseFloat(inputLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setManualOverride({ lat, lng });
      setShowInputModal(false);
    }
  };

  const activeLat = telemetry.latitude;
  const activeLng = telemetry.longitude;


  return (
    <div className="flex relative bg-slate-950 text-slate-100 min-h-screen">
      <main className="flex-1 pt-8 pr-[calc(20rem+2rem)] pb-12 pl-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header Bar */}
          <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-xl">
            <div>
              <h1 className="text-2xl font-black tracking-wide text-cyan-400">ARAD Telemetry Hub</h1>
              <p className="text-xs text-slate-400 font-mono">Real-Time MongoDB Sync to Thunderforest Map</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${isConnected ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                <span className={`w-2 h-2 mr-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400 animate-ping'}`} />
                {isConnected ? 'DB POLLING ACTIVE' : 'DISCONNECTED'}
              </span>
              {lastSyncTime && (
                <span className="text-xs text-slate-400 font-mono">Last Sync: {lastSyncTime}</span>
              )}
            </div>
          </div>

          {/* Grid: Map (Left) & Realtime DB Telemetry (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[480px]">
            {/* Map Container */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-800 relative shadow-xl">
              <MapContainer
                center={[activeLat, activeLng]}
                zoom={16}
                className="w-full h-full"
                zoomControl={false}
              >
                <TileLayer
                  url={`https://{s}.tile.thunderforest.com/${thunderforestStyle}/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
                  attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; OpenStreetMap'
                  maxZoom={22}
                />

                <MapTracker coords={{ lat: activeLat, lng: activeLng }} />

                <Marker
                  position={[activeLat, activeLng]}
                  icon={createCustomIcon(telemetry.status, telemetry.id)}
                >
                  <Popup className="rounded-lg shadow-xl">
                    <div className="text-slate-900 font-mono text-xs space-y-1 p-1">
                      <div className="font-bold border-b border-slate-300 pb-1 text-slate-950">
                        Status: <span className={telemetry.status === 'EMERGENCY' ? 'text-red-600 font-black' : 'text-emerald-700'}>{telemetry.status}</span>
                      </div>
                      {telemetry.id && <div className="text-[10px] text-slate-600 break-all">ID: {telemetry.id}</div>}
                      <div>Lat: {activeLat.toFixed(6)}</div>
                      <div>Lng: {activeLng.toFixed(6)}</div>
                      <div>Alt: {telemetry.altitude.toFixed(1)} m | Sats: {telemetry.satellites}</div>
                      <div>RSSI: {telemetry.rssi ?? 'N/A'} dBm | SNR: {telemetry.snr ?? 'N/A'}</div>
                      <div className="text-[10px] text-slate-500 pt-1">Logged: {telemetry.timestamp}</div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Live Database Diagnostics Panel */}
            <div className="lg:col-span-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Active Device Status</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${telemetry.status === 'EMERGENCY' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {telemetry.status}
                  </span>
                </div>

                <div className="space-y-3 font-mono">
                  {telemetry.id && (
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] uppercase text-slate-400">Database ID (_id)</div>
                      <div className="text-cyan-400 text-xs font-bold mt-0.5 break-all">
                        {telemetry.id}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] uppercase text-slate-400">GPS Coordinates</div>
                    <div className="text-cyan-400 text-sm font-semibold mt-0.5">
                      {activeLat.toFixed(36)}°, {activeLng.toFixed(36)}°
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] uppercase text-slate-400">Altitude</div>
                      <div className="text-slate-200 text-xs font-bold mt-0.5">{telemetry.altitude.toFixed(1)} m</div>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] uppercase text-slate-400">Satellites</div>
                      <div className="text-slate-200 text-xs font-bold mt-0.5">{telemetry.satellites} Locked</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] uppercase text-slate-400">IMU Accelerometer (g)</div>
                    <div className="text-slate-300 text-xs mt-0.5">
                      X: <span className="text-cyan-400">{telemetry.accel.x}</span> | Y: <span className="text-cyan-400">{telemetry.accel.y}</span> | Z: <span className="text-cyan-400">{telemetry.accel.z}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] uppercase text-slate-400">IMU Gyroscope (dps)</div>
                    <div className="text-slate-300 text-xs mt-0.5">
                      X: <span className="text-cyan-400">{telemetry.gyro.x}</span> | Y: <span className="text-cyan-400">{telemetry.gyro.y}</span> | Z: <span className="text-cyan-400">{telemetry.gyro.z}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] uppercase text-slate-400">LoRa RSSI</div>
                      <div className="text-emerald-400 text-xs font-bold mt-0.5">{telemetry.rssi !== null ? `${telemetry.rssi} dBm` : 'N/A'}</div>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] uppercase text-slate-400">LoRa SNR</div>
                      <div className="text-emerald-400 text-xs font-bold mt-0.5">{telemetry.snr !== null ? `${telemetry.snr} dB` : 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=${activeLat},${activeLng}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-center py-2.5 px-4 text-xs font-mono rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition duration-150"
              >
                Open in External Maps
              </a>
            </div>
          </div>

          {/* Real-time DB Telemetry Stream Log Table */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-xl">
            <h2 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 tracking-wider">
              Recent MongoDB Telemetry Ingestion Log (2s Updates)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2">Database ID</th>
                    <th className="p-2">Timestamp</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Latitude</th>
                    <th className="p-2">Longitude</th>
                    <th className="p-2">Altitude</th>
                    <th className="p-2">Accel (X, Y, Z)</th>
                    <th className="p-2">RSSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {history.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? 'bg-cyan-950/20' : ''}>
                      <td className="p-2 text-cyan-400 text-[11px] break-all">{row.id ? String(row.id).slice(-6) : 'N/A'}</td>
                      <td className="p-2 text-slate-400">{row.timestamp}</td>
                      <td className="p-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${row.status === 'EMERGENCY' ? 'bg-red-900/40 text-red-300' : 'bg-emerald-900/40 text-emerald-300'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-2 text-cyan-300">{row.latitude.toFixed(6)}</td>
                      <td className="p-2 text-cyan-300">{row.longitude.toFixed(6)}</td>
                      <td className="p-2">{row.altitude.toFixed(1)} m</td>
                      <td className="p-2 text-slate-400">{row.accel.x}, {row.accel.y}, {row.accel.z}</td>
                      <td className="p-2 text-emerald-400">{row.rssi ? `${row.rssi} dBm` : 'N/A'}</td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-slate-500">Waiting for live records from database...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      <RightSideBar showStats={true} />

      {/* Manual Pin Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowInputModal(!showInputModal)}
          className="w-12 h-12 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center transition focus:outline-none border-2 border-white/20"
          title="Manual Coordinates Override"
        >
          <span className="material-symbols-outlined text-xl">pin_drop</span>
        </button>

        {showInputModal && (
          <div className="absolute bottom-16 left-0 w-72 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm">Manual Location Override</span>
              <button onClick={() => setShowInputModal(false)} className="text-slate-400 hover:text-white text-xs font-bold">✕</button>
            </div>
            <form onSubmit={handleManualSubmit} className="space-y-3 z-50">
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 13.0489"
                  value={inputLat}
                  onChange={(e) => setInputLat(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 80.1149"
                  value={inputLng}
                  onChange={(e) => setInputLng(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 px-3 rounded text-xs transition font-mono"
                >
                  Apply Pin
                </button>
                {manualOverride && (
                  <button
                    type="button"
                    onClick={() => { setManualOverride(null); setShowInputModal(false); }}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-1.5 px-2 rounded text-xs transition font-mono"
                  >
                    Reset to DB
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;