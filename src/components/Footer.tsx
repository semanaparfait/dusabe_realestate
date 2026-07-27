import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Branding & Newsletter */}
          <div>
            <a href="#" className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '16px' }}>
              <img src="/dusabe_logo.png" alt="DUSABE Logo" style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--accent-gold)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>
                  DUSABE<span style={{ color: 'var(--accent-gold)' }}>.</span>
                </span>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, marginTop: '3px' }}>
                  REAL ESTATE
                </span>
              </div>
            </a>
            <p style={{ fontSize: '0.9rem', margin: '10px 0 24px', lineHeight: '1.7', color: '#94A3B8' }}>
              The global authority in architectural masterpieces and sovereign real estate placement.
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Private Intel Dispatch</h4>
            {subscribed ? (
              <p style={{ color: 'var(--accent-gold)', fontSize: '0.85rem' }}>✔ Enrolled in private portfolio circular.</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="email" 
                  required
                  placeholder="name@exclusive.com"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    color: '#FFF',
                    outline: 'none',
                    fontSize: '0.85rem',
                    flexGrow: 1
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="luxury-gold-button"
                  style={{ padding: '10px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="footer-subtitle">Core Practices</h4>
            <ul className="footer-links">
              <li><a href="#why-choose-us">Asset Consulting</a></li>
              <li><a href="#why-choose-us">Discretion Escrows</a></li>
              <li><a href="#why-choose-us">Structuring Visas</a></li>
              <li><a href="#why-choose-us">Structural Audits</a></li>
              <li><a href="#why-choose-us">Helipad Bindings</a></li>
            </ul>
          </div>

          {/* Col 3: Directories */}
          <div>
            <h4 className="footer-subtitle">Corporate Direct</h4>
            <ul className="footer-links">
              <li><a href="#featured-properties">Home Gallery</a></li>
              <li><a href="#why-choose-us">Why AURA</a></li>
              <li><a href="#testimonials">Endorsements</a></li>
              <li><a href="#agents">Elite Advisors</a></li>
              <li><a href="#blog">Research Journals</a></li>
            </ul>
          </div>

          {/* Col 4: Office Addresses */}
          <div>
            <h4 className="footer-subtitle">Private Offices</h4>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px', lineHeight: '1.6' }}>
              <strong>Beverly Hills</strong><br />
              882 Bel Air Rd, LA, CA
            </p>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px', lineHeight: '1.6' }}>
              <strong>Star Island</strong><br />
              44 Star Island Dr, Miami, FL
            </p>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.6' }}>
              <strong>Roppongi Hills</strong><br />
              Minato-ku, Tokyo, Japan
            </p>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom">
          <p>© 2026 AURA Estates. All rights reserved globally. Security & encryption protocols active.</p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
