import RightSideBar from '../components/RightSideBar';

const DashboardPage = () => {
  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-80 pb-12 pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="font-display-lg text-4xl text-primary leading-tight font-black">Emergency Rescue Monitoring</h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2">Real-time traveler safety monitoring using GPS, LoRa and ESP32 IoT Network.</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 glass-panel rounded-full">
              <div className="w-3 h-3 rounded-full bg-primary-fixed-dim active-pulse"></div>
              <span className="font-label-mono text-primary-fixed-dim tracking-widest text-xs">SYSTEM ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Emergencies', value: '03', icon: 'emergency', color: 'text-error' },
              { label: 'Connected', value: '124', icon: 'sensors', color: 'text-primary' },
              { label: 'Rescue Teams', value: '12', icon: 'groups', color: 'text-secondary' },
              { label: 'Resolved', value: '45', icon: 'check_circle', color: 'text-on-surface' },
              { label: 'Response', value: '18m', icon: 'timer', color: 'text-on-surface' },
              { label: 'Signal', value: '98%', icon: 'signal_cellular_alt', color: 'text-primary-fixed-dim' }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl border-l-4 border-primary-fixed-dim/20">
                <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">{stat.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <span className={`font-black text-2xl ${stat.color}`}>{stat.value}</span>
                  <span className={`material-symbols-outlined text-lg opacity-30 ${stat.color}`}>{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
            <div className="lg:col-span-9 relative glass-panel rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-surface-container-lowest map-mesh"></div>
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7Rfu-xujqRw7uhJ6NOWUDE7enIpSraOGSUprr09cCnKbqs7kCcvfJnZqApLns9rbiL6ASzIuD3oWzc1uxex31jy9XUHmi1lvtIhhPK8nNLTsfPKdQzhCRalueijsNS-QX-5p-S1Mc2MZpCNn0l76MBLOyMURT7V5A-FPKl-Pq4rPaLy-VkJo-9cATxzOpwziqR4HzX1NuhbFQ9un5qMxEWQOFkxIjRZo9DH9VgXt7QrnDJ32CyNSF3A')" }}
              ></div>
              <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                <div className="w-4 h-4 bg-error rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-error rounded-full relative shadow-[0_0_15px_rgba(255,0,0,0.5)]"></div>
                <div className="mt-1 glass-panel px-2 py-1 rounded text-[10px] font-label-mono text-error">ARD-001 (SOS)</div>
              </div>
              <div className="absolute bottom-1/3 left-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-primary-fixed-dim rounded-full relative shadow-[0_0_15px_rgba(0,219,231,0.5)]"></div>
                <div className="mt-1 glass-panel px-2 py-1 rounded text-[10px] font-label-mono text-primary-fixed-dim">ARD-012 (Active)</div>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 glass-panel flex items-center justify-center rounded hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="w-10 h-10 glass-panel flex items-center justify-center rounded hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-3 glass-panel rounded-2xl flex flex-col overflow-hidden">
              <div className="p-4 border-b border-outline-variant bg-error-container/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-headline-sm text-error">ARD-001</span>
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <p className="font-label-mono text-[10px] text-error/80 uppercase">SOS Triggered</p>
              </div>
              <div className="p-4 flex-1 space-y-4">
                <div>
                  <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Coordinates</p>
                  <p className="font-label-mono text-xs mt-1">42.3601° N, 71.0589° W</p>
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
                    <p className="font-label-mono text-xs text-error">14%</p>
                  </div>
                </div>
                <div className="h-px bg-outline-variant"></div>
                <div>
                  <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Assigned Team</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-8 h-8 rounded bg-secondary-container/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-sm">helicopter</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">SkyRescue-4</p>
                      <p className="text-[10px] text-on-surface-variant">ETA: 4 mins</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-surface-container-highest flex gap-2">
                <button className="flex-1 bg-surface-variant/20 hover:bg-surface-variant/40 py-2 rounded text-[11px] font-bold transition-all">Dismiss</button>
                <button className="flex-1 bg-primary-fixed-dim text-on-primary py-2 rounded text-[11px] font-bold hover:brightness-110 transition-all">Direct Link</button>
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