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
    <footer className="bg-[#090d16] text-slate-400 pt-20 pb-[30px] border-t border-white/5" id="contact">
      <div className="max-w-[1400px] w-full mx-auto px-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] max-lg:grid-cols-1 gap-[50px] mb-[60px]">
          {/* Col 1: Branding & Newsletter */}
          <div>
            <a href="#" className="flex items-center gap-3 no-underline mb-4">
              <img src="/dusabe_logo.png" alt="DUSABE Logo" className="w-[42px] h-[42px] rounded-[10px] object-cover border border-accent-gold" />
              <div className="flex flex-col leading-none">
                <span className="text-[1.4rem] font-heading font-extrabold tracking-[0.08em] text-white">
                  DUSABE<span className="text-accent-gold">.</span>
                </span>
                <span className="text-[0.6rem] tracking-[0.22em] uppercase text-accent-gold font-bold mt-[3px]">
                  REAL ESTATE
                </span>
              </div>
            </a>
            <p className="text-[0.9rem] my-2.5 mb-6 leading-[1.7] text-slate-400">
              Your trusted real estate agency for finding, buying, and renting top quality homes.
            </p>

            <h4 className="text-white text-[0.95rem] mb-3 uppercase tracking-[0.1em]">Private Intel Dispatch</h4>
            {subscribed ? (
              <p className="text-accent-gold text-[0.85rem]">✔ Enrolled in private portfolio circular.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@exclusive.com"
                  className="bg-white/5 border border-white/10 rounded-md py-2.5 px-3.5 text-white outline-none text-[0.85rem] grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 p-2.5 rounded-md flex items-center justify-center shadow-none"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-heading text-[1.1rem] font-semibold text-white mb-6">Core Practices</h4>
            <ul className="list-none flex flex-col gap-3">
              <li><a href="#why-choose-us" className="hover:text-white">Asset Consulting</a></li>
              <li><a href="#why-choose-us" className="hover:text-white">Discretion Escrows</a></li>
              <li><a href="#why-choose-us" className="hover:text-white">Structuring Visas</a></li>
              <li><a href="#why-choose-us" className="hover:text-white">Structural Audits</a></li>
              <li><a href="#why-choose-us" className="hover:text-white">Helipad Bindings</a></li>
            </ul>
          </div>

          {/* Col 3: Directories */}
          <div>
            <h4 className="font-heading text-[1.1rem] font-semibold text-white mb-6">Corporate Direct</h4>
            <ul className="list-none flex flex-col gap-3">
              <li><a href="#featured-properties" className="hover:text-white">Home Gallery</a></li>
              <li><a href="#why-choose-us" className="hover:text-white">Why AURA</a></li>
              <li><a href="#testimonials" className="hover:text-white">Endorsements</a></li>
              <li><a href="#agents" className="hover:text-white">Elite Advisors</a></li>
              <li><a href="#blog" className="hover:text-white">Research Journals</a></li>
            </ul>
          </div>

          {/* Col 4: Office Addresses */}
          <div>
            <h4 className="font-heading text-[1.1rem] font-semibold text-white mb-6">Private Offices</h4>
            <p className="text-[0.85rem] text-slate-400 mb-4 leading-[1.6]">
              <strong>Beverly Hills</strong><br />
              882 Bel Air Rd, LA, CA
            </p>
            <p className="text-[0.85rem] text-slate-400 mb-4 leading-[1.6]">
              <strong>Star Island</strong><br />
              44 Star Island Dr, Miami, FL
            </p>
            <p className="text-[0.85rem] text-slate-400 leading-[1.6]">
              <strong>Roppongi Hills</strong><br />
              Minato-ku, Tokyo, Japan
            </p>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="flex justify-between border-t border-white/5 pt-[30px] text-[0.85rem]">
          <p>© 2026 AURA Estates. All rights reserved globally. Security & encryption protocols active.</p>

          <div className="flex gap-5">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="text-slate-400">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400">
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
