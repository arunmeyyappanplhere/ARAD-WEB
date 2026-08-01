const RightSideBar = ({ showStats = false }) => {
  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col bg-surface-container-low/40 backdrop-blur-lg border-l border-outline-variant w-80 overflow-hidden">
      <div className="p-6 border-b border-outline-variant">
        <div className="flex items-center gap-3 mb-1">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
          <h2 className="font-headline-sm text-lg text-primary">Live Data Feed</h2>
        </div>
        <p className="font-label-mono text-[10px] text-on-surface-variant uppercase opacity-70">Real-time Telemetry</p>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-2 space-y-2">
          <div className="p-3 rounded bg-surface-variant/20 border-l-2 border-primary-fixed-dim hover:bg-surface-variant/30 transition-all">
            <div className="flex justify-between items-start mb-1">
              <span className="font-label-mono text-[10px] text-primary-fixed-dim">ARD-001</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant">14:22:01</span>
            </div>
            <p className="text-[11px] leading-tight">Location updated via LoRa Gate-04. Signal RSSI: -92dBm.</p>
          </div>
          <div className="p-3 rounded bg-error-container/10 border-l-2 border-error hover:bg-error-container/20 transition-all">
            <div className="flex justify-between items-start mb-1">
              <span className="font-label-mono text-[10px] text-error font-bold">ARD-084</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant">14:21:45</span>
            </div>
            <p className="text-[11px] leading-tight font-medium">SOS Triggered. Motion: FALL DETECTED.</p>
          </div>
          <div className="p-3 rounded bg-surface-variant/20 border-l-2 border-on-surface-variant/30">
            <div className="flex justify-between items-start mb-1">
              <span className="font-label-mono text-[10px] text-on-surface-variant">SYS-CORE</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant">14:21:10</span>
            </div>
            <p className="text-[11px] leading-tight">Health: 98%. All LoRa meshes synchronized.</p>
          </div>
          <div className="p-3 rounded bg-surface-variant/20 border-l-2 border-primary-fixed-dim/40">
            <div className="flex justify-between items-start mb-1">
              <span className="font-label-mono text-[10px] text-primary-fixed-dim">ARD-012</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant">14:20:55</span>
            </div>
            <p className="text-[11px] leading-tight">Status OK. Temp 24°C. HR 72 BPM.</p>
          </div>
        </div>
      </div>
      {showStats && (
        <div className="p-4 bg-surface-container-lowest border-t border-outline-variant">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2 rounded bg-surface-variant/20 text-center">
              <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Packets</p>
              <p className="font-label-mono text-sm text-primary font-bold">12.4k</p>
            </div>
            <div className="p-2 rounded bg-surface-variant/20 text-center">
              <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Latency</p>
              <p className="font-label-mono text-sm text-primary font-bold">12ms</p>
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        <button className="w-full py-3 bg-surface-variant/20 border border-outline-variant text-on-surface font-label-mono text-[11px] rounded-xl hover:bg-surface-variant/40 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Export Logs
        </button>
      </div>
    </aside>
  );
};

export default RightSideBar;