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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Admin Dashboard</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Real-time statistics and management overview for DUSABE Real Estate.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '8px 16px', borderRadius: '30px', color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }}>
          <CheckCircle2 size={16} /> All Systems Online
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Total Property Value</span>
            <DollarSign size={16} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--accent-gold)' }}>
            ${(totalValuation / 1000000).toFixed(1)}M
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> +14.2% growth this month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Active Properties</span>
            <Building2 size={16} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--text-primary)' }}>
            {properties.length} Listings
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Avg price: ${(avgPrice / 1000000).toFixed(2)}M
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Real Estate Agents</span>
            <Users size={16} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--text-primary)' }}>
            {agents.length} Experts
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981' }}>
            100% active representation
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Monthly Unique Visits</span>
            <Globe2 size={16} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--text-primary)' }}>
            52.4k
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981' }}>
            +28.5% organic growth
          </div>
        </div>
      </div>

      {/* Analytics Graph & Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={18} style={{ color: 'var(--accent-gold)' }} /> Investor Portal Engagement (Weekly)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Updated 5 mins ago</span>
          </div>

          <div style={{ height: '200px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '12px' }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={18} style={{ color: 'var(--accent-gold)' }} /> Portfolio Asset Allocation
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Villas', pct: '45%', color: 'var(--accent-gold)' },
              { label: 'Mansions', pct: '25%', color: 'var(--accent-gold-dark)' },
              { label: 'Penthouses', pct: '18%', color: 'var(--text-secondary)' },
              { label: 'Commercial', pct: '12%', color: 'var(--text-tertiary)' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.pct}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: item.pct, background: item.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Telemetry Stream */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={15} style={{ color: '#10B981' }} /> Real-Time Telemetry Stream
          </span>
          <span style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
            LIVE SOCKET ACTIVE
          </span>
        </div>

        <div style={{ fontFamily: 'Courier, monospace', fontSize: '0.8rem', color: '#10B981', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
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