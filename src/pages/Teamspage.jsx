import RightSideBar from '../components/RightSideBar';

const TeamsPage = () => {
  const teams = [
    { name: 'Alpha Team', status: 'Online', statusClass: 'status-dot-online active-pulse', color: 'text-primary-fixed-dim', members: '4 Operators', loc: 'Zurich' },
    { name: 'Bravo Team', status: 'On-Mission', statusClass: 'status-dot-on-mission', color: 'text-tertiary-fixed-dim', members: '3 Operators', loc: 'Chamonix' },
    { name: 'Charlie Team', status: 'Online', statusClass: 'status-dot-online active-pulse', color: 'text-primary-fixed-dim', members: '5 Operators', loc: 'Grindelwald' },
    { name: 'Delta Team', status: 'On-Mission', statusClass: 'status-dot-on-mission', color: 'text-tertiary-fixed-dim', members: '2 Operators', loc: 'Innsbruck' },
    { name: 'Echo Team', status: 'Offline', statusClass: 'status-dot-offline', color: 'text-outline', members: '3 Operators', loc: 'Signal Lost' },
  ];

  return (
    <div className="flex">
      <main className="flex-1 pt-24 pr-6 lg:pr-[calc(20rem+2rem)] pb-12 pl-6 lg:pl-margin-desktop min-h-screen">
        <div className="max-w-container-max-width mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
              <span className="font-label-mono text-[10px]">UNITS</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-label-mono text-[10px] text-primary-fixed-dim">DEPLOYMENT</span>
            </nav>
            <h1 className="font-display-lg text-4xl text-on-surface font-black tracking-tight">Active Rescue Units</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-sm">search</span>
              <input
                className="bg-surface-container-high/60 border border-outline-variant rounded-xl pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-primary-fixed-dim/50 text-xs transition-all"
                placeholder="Search teams..."
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="max-w-container-max-width mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team, idx) => (
            <div key={idx} className="glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(0,219,231,0.15)] transition-all duration-500">
              <div className="p-5 flex justify-between items-start border-b border-outline-variant">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${team.statusClass}`}></span>
                    <span className={`font-label-mono text-[10px] ${team.color} tracking-widest uppercase`}>{team.status}</span>
                  </div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">{team.name}</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="font-label-mono text-[9px] text-outline uppercase">Active Case</span>
                    <p className="font-label-mono text-xs text-on-surface-variant">{team.status === 'On-Mission' ? 'CASE-2044' : 'UNASSIGNED'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-mono text-[9px] text-outline uppercase">Members</span>
                    <p className="font-label-mono text-xs text-on-surface">{team.members}</p>
                  </div>
                </div>
                <button
                  className={`w-full py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-xs ${
                    team.status === 'Offline'
                      ? 'bg-surface-variant text-on-surface-variant'
                      : team.status === 'On-Mission'
                      ? 'bg-surface-variant/20 border border-outline-variant text-on-surface opacity-50 cursor-not-allowed'
                      : 'bg-primary-fixed-dim text-on-primary-fixed hover:bg-primary-container'
                  }`}
                >
                  <span>{team.status === 'Offline' ? 'Request Online' : team.status === 'On-Mission' ? 'Deployed' : 'Assign Mission'}</span>
                  {team.status !== 'Offline' && (
                    <span className="material-symbols-outlined text-sm">{team.status === 'On-Mission' ? 'lock' : 'arrow_forward'}</span>
                  )}
                </button>
              </div>
            </div>
          ))}
          <div className="border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary-fixed-dim/40 hover:bg-primary-fixed-dim/5 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-primary-fixed-dim">add</span>
            </div>
            <h4 className="font-headline-sm text-sm text-on-surface-variant group-hover:text-on-surface">Register New Unit</h4>
          </div>
        </div>
      </main>
      <RightSideBar />
    </div>
  );
};

export default TeamsPage;