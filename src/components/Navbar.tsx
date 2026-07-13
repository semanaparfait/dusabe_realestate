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
  Settings,
  PlusCircle,
  Shield,
  Briefcase
} from 'lucide-react';

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="navbar-logo">
          AURA<span>.</span>
        </a>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li className="navbar-menu-item" onClick={() => {
            const el = document.getElementById('why-choose-us');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>About Us</li>
          <li className="navbar-menu-item" onClick={() => {
            const el = document.getElementById('featured-properties');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Properties</li>
          <li className="navbar-menu-item" onClick={() => {
            const el = document.getElementById('why-choose-us');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Services</li>
          <li 
            className={`navbar-menu-item ${dropdownOpen ? 'active' : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            More <span style={{ fontSize: '0.6rem' }}>▼</span>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="navbar-actions" style={{ position: 'relative' }} ref={dropdownRef}>
          
          {/* Compare Button */}
          <button 
            onClick={openCompareModal} 
            className="nav-icon-btn" 
            style={{ position: 'relative' }}
            title="Compare Listings"
          >
            <GitCompare size={18} />
            {compareCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--secondary)',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={() => openDashboardModal('user')} 
            className="nav-icon-btn" 
            style={{ position: 'relative' }}
            title="Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
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
            className="luxury-gold-button shine-hover"
            style={{ borderRadius: '30px', padding: '10px 24px', fontSize: '0.85rem', boxShadow: 'none' }}
          >
            Contact Us
          </button>

          {/* Dropdown Menu Box */}
          {dropdownOpen && (
            <div 
              className="glass-panel" 
              style={{
                position: 'absolute',
                top: 'calc(100% + 15px)',
                right: 0,
                width: '260px',
                borderRadius: '12px',
                padding: '20px',
                zIndex: 1100,
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                animation: 'slide-up var(--transition-fast) forwards',
                boxShadow: 'var(--glass-shadow)',
                textAlign: 'left'
              }}
            >
              {/* Option: Language */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={14} /> Language
                </span>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </div>

              {/* Option: Currency */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={14} /> Currency
                </span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              {/* Option: Dark/Light Mode */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} Theme
                </span>
                <button 
                  onClick={toggleTheme}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              {/* Consoles Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)' }}>Management consoles</span>
                
                <button 
                  onClick={() => {
                    openDashboardModal('user');
                    setDropdownOpen(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 0'
                  }}
                >
                  <User size={14} /> Client Desk
                </button>

                <button 
                  onClick={() => {
                    openDashboardModal('agent');
                    setDropdownOpen(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 0'
                  }}
                >
                  <Briefcase size={14} /> Broker Desk
                </button>

                <button 
                  onClick={() => {
                    openDashboardModal('admin');
                    setDropdownOpen(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 0'
                  }}
                >
                  <Shield size={14} /> Administrator Desk
                </button>

                <button 
                  onClick={() => {
                    openDashboardModal('admin');
                    setDropdownOpen(false);
                  }}
                  className="luxury-gold-button shine-hover"
                  style={{
                    padding: '8px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '4px',
                    boxShadow: 'none'
                  }}
                >
                  <PlusCircle size={14} /> Post Property
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-nav-toggle">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          padding: '24px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 999
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>{t('nav.home')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.buy')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.rent')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.sell')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.commercial')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.agents')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.blog')}</li>
            <li onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.contact')}</li>
          </ul>
        </div>
      )}
    </nav>
  );
};
