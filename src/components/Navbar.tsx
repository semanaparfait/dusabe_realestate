import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Globe,
  DollarSign,
  Heart,
  GitCompare,
  User,
  Menu,
  X,
  PlusCircle,
  Shield,
  Briefcase
} from 'lucide-react';

import {useNavigate} from 'react-router-dom';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  currency: string;
  setCurrency: (curr: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  wishlistCount: number;
  compareCount: number;
  openCompareModal: () => void;
  openDashboardModal: (role: 'user' | 'agent' | 'admin') => void;
  t: (key: string) => string;
}

const navSelectClass = "bg-bg-tertiary border border-border-light rounded text-text-primary font-sans text-[0.8rem] px-2 py-1 outline-none cursor-pointer";
const navGhostBtnClass = "bg-transparent border-none text-text-primary text-[0.85rem] text-left cursor-pointer flex items-center gap-2.5 py-1.5";

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  currency,
  setCurrency,
  language,
  setLanguage,
  wishlistCount,
  compareCount,
  openCompareModal,
  openDashboardModal,
  t
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItemClass = (active: boolean) =>
    `relative cursor-pointer font-heading text-[0.95rem] font-medium [transition:color_var(--transition-fast)] after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-accent-gold after:[transition:width_var(--transition-fast)] ${active ? 'text-text-primary after:w-full' : 'text-text-secondary after:w-0 hover:text-text-primary hover:after:w-full'}`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] [transition:all_var(--transition-normal)] border-b ${scrolled ? 'py-3.5 border-[var(--glass-border)] bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]' : 'py-6 border-transparent'}`}>
      <div className="max-w-[1400px] w-full mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 no-underline">
          <img src="/dusabe_logo.png" alt="DUSABE Logo" className="w-[38px] h-[38px] rounded-lg object-cover border border-accent-gold" />
          <div className="flex flex-col leading-none">
            <span className="text-[1.2rem] font-heading font-extrabold tracking-[0.08em] text-text-primary">
              DUSABE<span className="text-accent-gold">.</span>
            </span>
            <span className="text-[0.55rem] tracking-[0.22em] uppercase text-accent-gold font-bold mt-0.5">
              REAL ESTATE
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 list-none">
          <li className={navItemClass(false)} onClick={() => {
            const el = document.getElementById('why-choose-us');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>About Us</li>
          <li className={navItemClass(false)} onClick={() => {
            const el = document.getElementById('featured-properties');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Properties</li>
          <li className={navItemClass(false)} onClick={() => {
            const el = document.getElementById('why-choose-us');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Services</li>

          <li
            className={`${navItemClass(dropdownOpen)} flex items-center gap-1 cursor-pointer`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            More <span className="text-[0.6rem]">▼</span>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="relative flex items-center gap-4" ref={dropdownRef}>

          {/* Compare Button */}
          <button
            onClick={openCompareModal}
            className="relative hidden bg-transparent border-none text-text-secondary cursor-pointer p-2 rounded-full [transition:all_var(--transition-fast)] flex items-center justify-center hover:text-text-primary hover:bg-bg-tertiary"
            title="Compare Listings"
          >
            <GitCompare size={18} />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--secondary)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => openDashboardModal('user')}
            className="relative hidden bg-transparent border-none text-text-secondary cursor-pointer p-2 rounded-full [transition:all_var(--transition-fast)] flex items-center justify-center hover:text-text-primary hover:bg-bg-tertiary"
            title="Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Contact Us button matching visual design */}
<button
  onClick={() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }}
  className="relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 rounded-full px-3.5 py-1.5 text-[0.75rem] sm:px-6 sm:text-[10px] sm:py-2  shadow-none after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]"
>
  Contact Us
</button>

          {/* Dropdown Menu Box */}
          {dropdownOpen && (
            <div
              className="absolute [top:calc(100%+15px)] right-0 w-[260px] rounded-xl p-5 z-[1100] flex flex-col gap-4 text-left bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] [animation:slide-up_var(--transition-fast)_forwards]"
            >
              {/* Option: Language */}
              <div className="flex items-center justify-between">
                <span className="text-[0.85rem] text-text-secondary flex items-center gap-2">
                  <Globe size={14} /> Language
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={navSelectClass}
                >
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                </select>
              </div>

              {/* Option: Currency */}
              <div className="flex items-center justify-between">
                <span className="text-[0.85rem] text-text-secondary flex items-center gap-2">
                  <DollarSign size={14} /> Currency
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={navSelectClass}
                >
                  <option value="USD">USD ($)</option>
                  <option value="RWF">RWF (FRw)</option>
                </select>
              </div>

              {/* Option: Dark/Light Mode */}
              <div className="flex items-center justify-between border-b border-border-light pb-3">
                <span className="text-[0.85rem] text-text-secondary flex items-center gap-2">
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} Theme
                </span>
                <button
                  onClick={toggleTheme}
                  className="bg-bg-tertiary border border-border-light rounded text-text-primary text-[0.75rem] font-semibold px-2.5 py-1 cursor-pointer"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              {/* Consoles Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.05em] text-text-tertiary">Management consoles</span>

                <button
                  onClick={() => {
                    openDashboardModal('user');
                    setDropdownOpen(false);
                  }}
                  className={navGhostBtnClass}
                >
                  <User size={14} /> Client Desk
                </button>

                <button
                  onClick={() => {
                    openDashboardModal('agent');
                    setDropdownOpen(false);
                  }}
                  className={navGhostBtnClass}
                >
                  <Briefcase size={14} /> Broker Desk
                </button>

                <button
                  onClick={() => {
                    openDashboardModal('admin');
                    setDropdownOpen(false);
                  }}
                  className={navGhostBtnClass}
                >
                  <Shield size={14} /> Administrator Desk
                </button>

             <button
                  onClick={() => {
                    navigate('/account');
                    
                  }}
                  className={navGhostBtnClass}
                >
                  <User size={14} /> Account
                </button>

                <button
                  onClick={() => {
                    openDashboardModal('admin');
                    setDropdownOpen(false);
                  }}
                  className="relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 p-2 text-[0.8rem] flex items-center justify-center gap-1.5 mt-1 shadow-none rounded-lg after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]"
                >
                  <PlusCircle size={14} /> Post Property
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="block lg:hidden bg-transparent border-none text-text-primary cursor-pointer text-2xl">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full p-6 flex flex-col gap-4 z-[999] bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border-b border-[var(--glass-border)]">
          <ul className="list-none flex flex-col gap-4">
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading font-bold cursor-pointer">{t('nav.home')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.buy')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.rent')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.sell')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.commercial')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.agents')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.blog')}</li>
            <li onClick={() => setMobileMenuOpen(false)} className="font-heading cursor-pointer">{t('nav.contact')}</li>
            <li
              onClick={() => {
                openDashboardModal('admin');
                setMobileMenuOpen(false);
              }}
              className="font-heading text-accent-gold font-bold flex items-center gap-2 cursor-pointer"
            >
              <Shield size={16} /> Admin Panel
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
