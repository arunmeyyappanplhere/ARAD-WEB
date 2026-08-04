import RightSideBar from '../components/RightSideBar';

const DevicesPage = () => {
  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-[calc(20rem+2rem)] pb-12 pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-headline-md text-2xl font-black text-on-surface mb-1">Device Management</h2>
              <p className="font-body-md text-sm text-on-surface-variant">Monitoring 12 active ESP32 traveler beacons across sectors.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary-fixed-dim text-on-primary px-5 py-2 rounded-lg font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,219,231,0.2)]">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Register New Device
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { l: 'Online', v: '12', s: '/ 14', c: 'text-primary-fixed-dim' },
              { l: 'Emergencies', v: '01', s: '', c: 'text-error' },
              { l: 'Avg Battery', v: '84', s: '%', c: 'text-on-surface' },
              { l: 'Gateway', v: 'SAT-01', s: '', c: 'text-secondary' }
            ].map((s, i) => (
              <div key={i} className="glass-panel p-5 rounded-xl">
                <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">{s.l}</p>
                <p className={`text-3xl font-black ${s.c}`}>{s.v}<span className="text-xs ml-1 font-normal text-on-surface-variant">{s.s}</span></p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/30">
                      <th className="p-4 font-label-mono text-[10px] text-on-surface-variant uppercase">Device ID</th>
                      <th className="p-4 font-label-mono text-[10px] text-on-surface-variant uppercase">Battery</th>
                      <th className="p-4 font-label-mono text-[10px] text-on-surface-variant uppercase">RSSI</th>
                      <th className="p-4 font-label-mono text-[10px] text-on-surface-variant uppercase">State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {[
                      { id: 'ARD-001', bat: 82, rssi: '-72 dBm', state: 'Normal', color: 'text-primary-fixed-dim', bg: 'bg-primary' },
                      { id: 'ARD-055', bat: 14, rssi: '-104 dBm', state: 'Emergency', color: 'text-error', bg: 'bg-error' },
                      { id: 'ARD-102', bat: 45, rssi: '-91 dBm', state: 'Warning', color: 'text-tertiary-fixed-dim', bg: 'bg-tertiary-container' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-surface-variant/20 transition-colors cursor-pointer group">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined ${row.color} text-sm`}>memory</span>
                            <span className="font-label-mono text-xs font-bold">{row.id}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-1 bg-surface-variant rounded-full overflow-hidden">
                              <div className={`h-full ${row.color === 'text-error' ? 'bg-error' : 'bg-primary-fixed-dim'}`} style={{ width: `${row.bat}%` }}></div>
                            </div>
                            <span className="font-label-mono text-[10px]">{row.bat}%</span>
                          </div>
                        </td>
                        <td className="p-4 font-label-mono text-[10px]">{row.rssi}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 ${row.bg}/10 ${row.color} rounded text-[9px] font-black uppercase`}>{row.state}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
                <h3 className="font-headline-sm text-sm font-bold mb-4">Signal Analytics: ARD-055</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-label-mono mb-1 text-on-surface-variant">
                      <span>Quality (SNR)</span>
                      <span className="text-primary">7.8 dB</span>
                    </div>
                    <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary-fixed-dim" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-high/40 p-3 rounded-lg border border-outline-variant text-center">
                      <span className="text-[9px] text-on-surface-variant block uppercase">Packet Loss</span>
                      <span className="text-sm font-black text-error">1.2%</span>
                    </div>
                    <div className="bg-surface-container-high/40 p-3 rounded-lg border border-outline-variant text-center">
                      <span className="text-[9px] text-on-surface-variant block uppercase">SF</span>
                      <span className="text-sm font-black text-secondary">SF12</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="glass-panel rounded-xl h-48 overflow-hidden relative grayscale opacity-60 bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsnj_pRWj8zrqyyYxEao4YqW4wDUpQfzEE5MA3IMoj9p5d13M77RANwiflaujB9DgssyVzKqmho9NZ3ZM0hSeGd8_4HhlvEsCcjuyU1yj3zO6rPnKXtrOqd4hGJ4YQ4T-nhBkwF6uMtGB_h9RjYqrfLXtkApxsN-BbDAlNxSwHdC37unGo0Diwa-xpBImdiEJcVrOHEZehUHIrdfqDCGwZdlmn5bx04Y0UFutJxrkWkNLlYd49P1kTyw')" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <RightSideBar />
    </div>
  );
};

export default DevicesPage;