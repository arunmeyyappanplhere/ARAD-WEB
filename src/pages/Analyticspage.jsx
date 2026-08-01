import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '../context/useTheme';

const AnalyticsPage = () => {
  const lineRef = useRef(null);
  const barRef = useRef(null);
  const areaRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const charts = [];
    const isDark = theme === 'dark';
    const textColor = isDark ? '#b9cacb' : '#4a4f57';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = 'Inter';
    Chart.defaults.font.size = 10;

    const commonOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: gridColor }, border: { display: false } },
        x: { grid: { display: false }, border: { display: false } }
      }
    };

    // Line Chart
    if (lineRef.current) {
      charts.push(new Chart(lineRef.current, {
        type: 'line',
        data: {
          labels: ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'],
          datasets: [{
            label: 'Incidents',
            data: [12, 19, 3, 5, 22, 3, 10],
            borderColor: '#00dbe7',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(0, 219, 231, 0.1)',
            tension: 0.4
          }]
        },
        options: commonOpts
      }));
    }

    // Bar Chart
    if (barRef.current) {
      charts.push(new Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: ['Squad A', 'Squad B', 'Squad C', 'Squad D', 'Squad E'],
          datasets: [{
            label: 'Minutes',
            data: [5.2, 7.8, 4.1, 9.2, 6.5],
            backgroundColor: '#b8c3ff',
            borderRadius: 4
          }]
        },
        options: commonOpts
      }));
    }

    // Area Chart
    if (areaRef.current) {
      charts.push(new Chart(areaRef.current, {
        type: 'line',
        data: {
          labels: ['00:00', '08:00', '16:00', '23:59'],
          datasets: [{
            label: 'Packets',
            data: [400, 800, 1100, 600],
            fill: true,
            backgroundColor: 'rgba(184, 195, 255, 0.1)',
            borderColor: '#b8c3ff',
            tension: 0.3
          }]
        },
        options: commonOpts
      }));
    }

    return () => charts.forEach((c) => c.destroy());
  }, [theme]);

  return (
    <main className="pt-24 px-margin-desktop pb-12 max-w-container-max-width mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="font-headline-md text-2xl text-primary-fixed-dim font-black mb-1">Fleet Analytics</h1>
          <p className="text-on-surface-variant font-label-mono uppercase tracking-widest text-[10px]">Command Center Hub // Section 04-A</p>
        </div>
        <button className="bg-primary-fixed-dim text-on-primary px-4 py-2 rounded-lg font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">file_download</span>
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Emergencies', val: '1,284', change: '+12.5%', color: 'text-primary-fixed-dim' },
          { label: 'Avg. Response Time', val: '06:12', change: '-4.2%', color: 'text-error' },
          { label: 'Active Devices', val: '4,592', change: 'Active', color: 'text-primary-fixed-dim' },
          { label: 'Success Rate', val: '94.3%', change: '99.8%', color: 'text-primary-fixed-dim' }
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className={`font-label-mono text-[10px] ${stat.color}`}>{stat.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-on-surface-variant font-label-mono text-[10px] uppercase">{stat.label}</h3>
              <p className="text-2xl font-bold text-on-surface">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden h-[400px] relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJcpBqMVBGWbb-8LgQhKLON0Ie1z895nPvOxymibYW_opgexGMdSpt4bVcncqoAUa3mRi5O197l2oGwgTkJ-VboFVWwQbAMcCvOH1dsQ-7Fg3gNQjR_mxQYqRDkHZ4I9UNsN9IVTf1Oi1JRwKsKLb0r6j6Gfj5cYo_XPV4SkwMBQrcTNbQOYiJgS1Xnk4Ffr4Eo8iDq-wthTtjVS0rRW8qZo-8n6K9H-_zEU1nJuBtTNF9zmfAX2eDQA')" }}
          ></div>
          <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full text-[10px] font-bold uppercase">Regional Heatmap</div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-xl p-5 h-[240px]">
            <h2 className="font-headline-sm text-sm text-on-surface mb-4">Daily Volume</h2>
            <div className="h-full pb-8"><canvas ref={lineRef}></canvas></div>
          </div>
          <div className="glass-panel rounded-xl p-5 h-[240px]">
            <h2 className="font-headline-sm text-sm text-on-surface mb-4">Response Time</h2>
            <div className="h-full pb-8"><canvas ref={barRef}></canvas></div>
          </div>
        </div>
      </div>

      {/* areaRef is reserved for an additional traffic chart if this section is expanded */}
      <canvas ref={areaRef} className="hidden"></canvas>
    </main>
  );
};

export default AnalyticsPage;