import RightSideBar from '../components/RightSideBar';

const EmergenciesPage = () => {
  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-80 pb-12 pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-display-lg text-3xl font-black text-on-surface">Live Emergency Manifest</h1>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-error-container/20 text-error rounded-full text-[11px] font-bold uppercase tracking-wider">3 Critical Alerts</span>
            </div>
          </div>
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-variant/10">
                  <tr>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Device ID</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Time</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Priority</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Assigned Team</th>
                    <th className="px-6 py-4 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {[
                    { id: 'ARD-001', loc: 'Summit Peak Path', time: '14:02', status: 'SOS Triggered', p: 'P1 CRITICAL', team: 'SkyRescue-4', color: 'text-error', bg: 'bg-error' },
                    { id: 'ARD-042', loc: 'Gorge Valley Crossing', time: '14:15', status: 'Abnormal Immobility', p: 'P2 HIGH', team: 'Ground Alpha', color: 'text-tertiary-fixed-dim', bg: 'bg-tertiary-fixed-dim' },
                    { id: 'ARD-084', loc: 'Sector-3 Lowlands', time: '14:18', status: 'Low Battery', p: 'P3 MONITOR', team: 'Pending...', color: 'text-primary-fixed-dim', bg: 'bg-primary-fixed-dim' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-variant/20 transition-colors">
                      <td className="px-6 py-4 font-label-mono text-xs">{row.id}</td>
                      <td className="px-6 py-4 text-xs">{row.loc}</td>
                      <td className="px-6 py-4 font-label-mono text-xs">{row.time}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 ${row.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${row.bg}`}></span>
                          <span className="text-[11px] font-semibold">{row.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className={`px-2 py-0.5 ${row.bg} text-on-primary rounded text-[9px] font-black`}>{row.p}</span></td>
                      <td className="px-6 py-4 text-xs">{row.team}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary-fixed-dim hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
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