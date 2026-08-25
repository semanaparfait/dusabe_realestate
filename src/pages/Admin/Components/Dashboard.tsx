import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Database,
  Globe2,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { type Property, type Agent } from '@/data';

interface DashboardOverviewProps {
  properties: Property[];
  agents: Agent[];
}

const kpiCardClass = "p-6 rounded-2xl border border-border-light bg-bg-secondary [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]";

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ properties, agents }) => {
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] ADMIN: Session authenticated for Security Key #0089`,
    `[${new Date().toLocaleTimeString()}] NODE: Redis cache synced (0.12ms)`,
    `[${new Date().toLocaleTimeString()}] DATABASE: Active connection pool: 24 active nodes`,
    `[${new Date().toLocaleTimeString()}] TELEMETRY: Real-time currency parity verified (USD/EUR/AED)`
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const mockEvents = [
        `[${timestamp}] VISITOR: New view recorded on Obsidian Glass Oasis`,
        `[${timestamp}] SYSTEM: Automated SSL certificate validation check: PASSED`,
        `[${timestamp}] API: Rate limit metrics healthy (0.01% load)`,
        `[${timestamp}] AGENT: Consultation request dispatched to Sophia Sterling`,
        `[${timestamp}] METRICS: Edge CDN bandwidth throughput at 1.4 Gbps`
      ];
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setLogs(prev => [randomEvent, ...prev.slice(0, 15)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const totalValuation = properties.reduce((acc, p) => acc + (p.discountPrice || p.price), 0);
  const avgPrice = properties.length > 0 ? Math.round(totalValuation / properties.length) : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-[1.5rem] sm:text-[1.8rem] font-heading font-bold">Admin Dashboard</h1>
          <p className="text-[0.85rem] text-text-tertiary mt-1">Real-time statistics and management overview for DUSABE Real Estate.</p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 py-2 px-4 rounded-[30px] text-emerald-500 text-[0.8rem] font-semibold w-fit">
          <CheckCircle2 size={16} /> All Systems Online
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className={kpiCardClass}>
          <div className="flex justify-between items-center text-text-tertiary text-[0.75rem] uppercase tracking-[0.05em]">
            <span>Total Property Value</span>
            <DollarSign size={16} className="text-accent-gold" />
          </div>
          <div className="text-[1.8rem] font-bold my-3 mb-1 text-accent-gold">
            ${(totalValuation / 1000000).toFixed(1)}M
          </div>
          <div className="text-[0.75rem] text-emerald-500 flex items-center gap-1">
            <TrendingUp size={12} /> +14.2% growth this month
          </div>
        </div>

        <div className={kpiCardClass}>
          <div className="flex justify-between items-center text-text-tertiary text-[0.75rem] uppercase tracking-[0.05em]">
            <span>Active Properties</span>
            <Building2 size={16} className="text-accent-gold" />
          </div>
          <div className="text-[1.8rem] font-bold my-3 mb-1 text-text-primary">
            {properties.length} Listings
          </div>
          <div className="text-[0.75rem] text-text-tertiary">
            Avg price: ${(avgPrice / 1000000).toFixed(2)}M
          </div>
        </div>

        <div className={kpiCardClass}>
          <div className="flex justify-between items-center text-text-tertiary text-[0.75rem] uppercase tracking-[0.05em]">
            <span>Real Estate Agents</span>
            <Users size={16} className="text-accent-gold" />
          </div>
          <div className="text-[1.8rem] font-bold my-3 mb-1 text-text-primary">
            {agents.length} Experts
          </div>
          <div className="text-[0.75rem] text-emerald-500">
            100% active representation
          </div>
        </div>

        <div className={kpiCardClass}>
          <div className="flex justify-between items-center text-text-tertiary text-[0.75rem] uppercase tracking-[0.05em]">
            <span>Monthly Unique Visits</span>
            <Globe2 size={16} className="text-accent-gold" />
          </div>
          <div className="text-[1.8rem] font-bold my-3 mb-1 text-text-primary">
            52.4k
          </div>
          <div className="text-[0.75rem] text-emerald-500">
            +28.5% organic growth
          </div>
        </div>
      </div>

      {/* Analytics Graph & Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className={`${kpiCardClass} p-7`}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[1.1rem] font-bold flex items-center gap-2.5">
              <TrendingUp size={18} className="text-accent-gold" /> Investor Portal Engagement (Weekly)
            </h3>
            <span className="text-[0.75rem] text-text-tertiary">Updated 5 mins ago</span>
          </div>

          <div className="h-[200px] w-full relative">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="30" x2="500" y2="30" stroke="var(--border-light)" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="var(--border-light)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border-light)" strokeDasharray="4 4" />
              <path d="M 0 120 L 0 90 Q 80 40 160 70 T 320 20 T 500 40 L 500 150 L 0 150 Z" fill="url(#chartGrad)" />
              <path d="M 0 90 Q 80 40 160 70 T 320 20 T 500 40" fill="none" stroke="var(--accent-gold)" strokeWidth="3" />
              <circle cx="160" cy="70" r="4" fill="var(--bg-secondary)" stroke="var(--accent-gold)" strokeWidth="2.5" />
              <circle cx="320" cy="20" r="5" fill="var(--accent-gold)" />
              <circle cx="500" cy="40" r="4" fill="var(--bg-secondary)" stroke="var(--accent-gold)" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="flex justify-between text-[0.75rem] text-text-tertiary mt-3">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className={`${kpiCardClass} p-7`}>
          <h3 className="text-[1.1rem] font-bold mb-5 flex items-center gap-2.5">
            <Layers size={18} className="text-accent-gold" /> Portfolio Asset Allocation
          </h3>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Villas', pct: '45%', color: 'var(--accent-gold)' },
              { label: 'Mansions', pct: '25%', color: 'var(--accent-gold-dark)' },
              { label: 'Penthouses', pct: '18%', color: 'var(--text-secondary)' },
              { label: 'Commercial', pct: '12%', color: 'var(--text-tertiary)' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-[0.8rem] mb-1.5">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-bold text-text-primary">{item.pct}</span>
                </div>
                <div className="h-1.5 bg-bg-tertiary rounded-[3px] overflow-hidden">
                  <div className="h-full rounded-[3px]" style={{ width: item.pct, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Telemetry Stream */}
      <div className={kpiCardClass}>
        <div className="flex flex-wrap gap-2 justify-between items-center mb-3.5 border-b border-border-light pb-3">
          <span className="text-[0.85rem] font-semibold text-text-primary flex items-center gap-2">
            <Database size={15} className="text-emerald-500" /> Real-Time Telemetry Stream
          </span>
          <span className="text-[0.7rem] text-emerald-500 bg-emerald-500/15 py-0.5 px-2 rounded font-mono">
            LIVE SOCKET ACTIVE
          </span>
        </div>

        <div className="font-mono text-[0.8rem] text-emerald-500 flex flex-col gap-1.5 max-h-[160px] overflow-y-auto">
          {logs.map((logLine, idx) => (
            <div key={idx} style={{ opacity: idx === 0 ? 1 : 0.7 - idx * 0.04 }}>
              {logLine}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
