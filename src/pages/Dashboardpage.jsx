import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import RightSideBar from '../components/RightSideBar';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // Added useMap
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 1. Create a controller component to force the map to center/fly to coordinates
const MapTracker = ({ activeDevice }) => {
  const map = useMap();
  useEffect(() => {
    if (activeDevice && activeDevice.lat && activeDevice.lng) {
      // .flyTo( [lat, lng], zoomLevel, animationOptions )
      map.flyTo([activeDevice.lat, activeDevice.lng], 16, {
        animate: true,
        duration: 1.5 // Animation duration in seconds
      });
    }
  }, [activeDevice, map]);
  return null;
};

const createCustomIcon = (device) => {
  const isSos = device.type === 'sos';
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
      ${isSos ? '<div style="width: 16px; height: 16px; border-radius: 50%; background-color: rgb(220 38 38); position: absolute; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
      <div style="width: 16px; height: 16px; border-radius: 50%; position: relative; background-color: ${isSos ? 'rgb(220 38 38)' : 'rgb(0 219 231)'}; box-shadow: 0 0 15px ${isSos ? 'rgba(255,0,0,0.5)' : 'rgba(0,219,231,0.5)'};"></div>
      <div style="margin-top: 4px; padding: 2px 8px; border-radius: 4px; font-size: 10px; white-space: nowrap; font-family: monospace; background: rgba(0,0,0,0.6); color: ${isSos ? 'rgb(220 38 38)' : 'rgb(0 219 231)'}; backdrop-filter: blur(4px);">
        ${device.id}
      </div>
    </div>
  `;
  return L.divIcon({ className: 'bg-transparent border-none', html: html, iconSize: [0, 0], iconAnchor: [0, 0] });
};

const DashboardPage = () => {
  const location = useLocation();
  const incomingTrackedDevice = location.state?.trackedDevice; // Grab data passed from the table

  // Standard mock array as a fallback
  const mockDeviceLocations = [
    { id: 'ARD-STATIC-1', type: 'active', lat: 10.935, lng: 76.975, status: 'Active', battery: '89%' },
  ];

  // 2. Set up devices. If an incoming device from the list is clicked, add it to the map array
  const [devices, setDevices] = useState(() => {
    if (incomingTrackedDevice) {
      return [incomingTrackedDevice, ...mockDeviceLocations];
    }
    return mockDeviceLocations;
  });

  // Set the selected device to the incoming one if it exists, otherwise use fallback
  const [selectedDevice, setSelectedDevice] = useState(incomingTrackedDevice || mockDeviceLocations[0]);

  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-[calc(20rem+2rem)] pb-12 pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto space-y-8">
          
          {/* Header & Stats Code removed for brevity (Keep yours unchanged here) */}
          <h1 className="font-display-lg text-4xl text-primary font-black">Tracking Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
            <div className="lg:col-span-9 relative rounded-2xl overflow-hidden group z-0 glass-panel">
              <MapContainer 
                center={[selectedDevice.lat, selectedDevice.lng]} 
                zoom={14} 
                className="w-full h-full"
                zoomControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

                {/* 3. Drop in the MapTracker component to handle the zoom/pan logic */}
                <MapTracker activeDevice={selectedDevice} />

                {devices.map((device) => (
                  <Marker 
                    key={device.id}
                    position={[device.lat, device.lng]}
                    icon={createCustomIcon(device)}
                    eventHandlers={{ click: () => setSelectedDevice(device) }}
                  >
                    <Popup className="bg-surface-container rounded-lg border-none shadow-xl">
                      <div className="text-on-surface font-label-mono text-xs text-center">
                        <strong>{device.id}</strong>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Right Side Device Details Panel */}
            <div className="lg:col-span-3 glass-panel rounded-2xl flex flex-col overflow-hidden">
              <div className={`p-4 border-b border-outline-variant ${selectedDevice.type === 'sos' ? 'bg-error-container/10' : 'bg-primary-container/10'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-headline-sm ${selectedDevice.type === 'sos' ? 'text-error' : 'text-primary'}`}>
                    {selectedDevice.id}
                  </span>
                  <span className={`material-symbols-outlined ${selectedDevice.type === 'sos' ? 'text-error' : 'text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {selectedDevice.type === 'sos' ? 'warning' : 'radar'}
                  </span>
                </div>
                <p className={`font-label-mono text-[10px] uppercase ${selectedDevice.type === 'sos' ? 'text-error/80' : 'text-primary/80'}`}>
                  {selectedDevice.status}
                </p>
              </div>
              <div className="p-4 flex-1 space-y-4">
                <div>
                  <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Coordinates</p>
                  <p className="font-label-mono text-xs mt-1">{selectedDevice.lat}°, {selectedDevice.lng}°</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Motion</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-sm text-secondary">person_off</span>
                      <span className="font-label-mono text-xs">STATIC</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Battery</p>
                    <p className="font-label-mono text-xs text-primary">{selectedDevice.battery || '90%'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <RightSideBar showStats={true} />
    </div>
  );
};

export default DashboardPage;