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
          <span className="section-subtitle">Our Promise</span>
          <h2 className="section-title">Why Choose DUSABE Real Estate</h2>
          <p className="section-desc">
            We help you find, buy, and rent top quality homes with honest advice and simple steps.
          </p>
        </div>

        {/* 6 Guarantee Cards */}
        <div className="why-grid">
          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><ShieldCheck size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>100% Verified Homes</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Every property is checked for safety, legal ownership, and top quality before listing.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Users size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Expert Real Estate Agents</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Our friendly agents help you find the right property for your family or investment.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Lock size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Safe & Secure Payments</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Your money and paperwork are protected every step of the way.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Award size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Best Price Guarantee</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Get direct access to fair market deals and high-value properties.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Headphones size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>24/7 Customer Support</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Our team is always available to answer your questions and guide your visits.
            </p>
          </div>

          <div className="why-card glass-panel" style={{ background: 'var(--bg-primary)' }}>
            <div className="why-icon"><Scale size={28} /></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Full Legal Assistance</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              We take care of all legal documents, contracts, and transfer requirements for you.
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
