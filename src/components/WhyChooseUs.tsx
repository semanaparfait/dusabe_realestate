import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Lock, Award, Headphones, Scale } from 'lucide-react';

interface StatCounter {
  value: number;
  label: string;
  suffix: string;
}

const STATS_DATA: StatCounter[] = [
  { value: 1250, label: 'Properties Sold', suffix: '+' },
  { value: 980, label: 'Happy Clients', suffix: '+' },
  { value: 18, label: 'Cities Covered', suffix: '' },
  { value: 45, label: 'Expert Agents', suffix: '' }
];

export const WhyChooseUs: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts(
        STATS_DATA.map((stat) => {
          const target = stat.value;
          const current = Math.round((target / steps) * stepCount);
          return current >= target ? target : current;
        })
      );

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="why-choose-us" className="dark-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Excellence Standards</span>
          <h2 className="section-title">Why Sophisticated Investors Choose AURA</h2>
          <p className="section-desc">
            We transcend standard real estate transactions, curating seamless residential assets, tax-efficient configurations, and structural masterpieces.
          </p>
        </div>

        {/* 6 Guarantee Cards */}
        <div className="why-grid">
          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><ShieldCheck size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Verified Telemetry</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              100% of our portfolio undergoes strict structural integrity, thermal scanning, and legal verification before listing.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Users size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Discreet Elite Advisors</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Our agents are certified luxury consultants specializing in asset sheltering, trust ownerships, and private transactions.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Lock size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Structured Acquisitions</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              High-security escrow operations cooperating with elite financial bodies to secure capital positioning during transfers.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Award size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Guaranteed Pricing Index</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Private access to off-market auctions, builder closeouts, and distressed estates at genuine market-aligned valuation.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Headphones size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>24/7 Digital Concierge</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Your private client liaison is always available for site modifications, structural audits, or local services onboarding.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Scale size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Legal Compliance Wings</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Complete international cross-border advisory, helping secure residency-by-investment, golden visas, and tax exemptions.
            </p>
          </div>
        </div>

        {/* Dynamic Counter Section */}
        <div className="stats-grid">
          {STATS_DATA.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">
                {counts[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
