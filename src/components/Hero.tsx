import React, { useState, useEffect } from 'react';

interface HeroProps {
  onSearch: (filters: any) => void;
  t: (key: string) => string;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80'
];

export const Hero: React.FC<HeroProps> = ({ onSearch, t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Stats Counters
  const [countHouse, setCountHouse] = useState(0);
  const [countAgent, setCountAgent] = useState(0);
  const [countClients, setCountClients] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Stats Animation
  useEffect(() => {
    const steps = 50;
    const interval = 30; // ms
    let step = 0;

    const counterTimer = setInterval(() => {
      step++;
      setCountHouse(Math.round((80 / steps) * step));
      setCountAgent(Math.round((500 / steps) * step));
      setCountClients(Math.round((2000 / steps) * step));

      if (step >= steps) {
        clearInterval(counterTimer);
        setCountHouse(80);
        setCountAgent(500);
        setCountClients(2000);
      }
    }, interval);

    return () => clearInterval(counterTimer);
  }, []);

  const handleBrowseProperties = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('featured-properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('why-choose-us');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        background: 'var(--bg-primary)',
        padding: '110px 24px 40px 24px',
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      {/* Outer Floating Rounded Card Container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          height: '650px',
          borderRadius: '32px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--card-shadow)',
          border: '1px solid var(--border-light)'
        }}
      >
        {/* Slideshow of Homes */}
        {HERO_IMAGES.map((img, idx) => (
          <div 
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: idx === currentSlide ? 1 : 0,
              transform: idx === currentSlide ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
              zIndex: 0
            }}
          />
        ))}

        {/* Ambient Dark Overlay matching reference design */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} 
        />

        {/* Hero Overlay Content (Centered-left text matching picture) */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            padding: '0 80px',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}
          className="hero-content-overlay"
        >
          <div style={{ maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1 
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '4rem',
                color: '#FFFFFF',
                lineHeight: '1.1',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
              className="hero-reference-title"
            >
              Find Your Dream Home Today
            </h1>
            <p 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              Welcome to our real estate agency, where your dream home awaits. Browse our listings and find the perfect property for you.
            </p>

            {/* Pill-Shaped Buttons */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
              <button 
                onClick={handleBrowseProperties}
                className="shine-hover"
                style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '14px 36px',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-fast)'
                }}
              >
                View
              </button>
              <button 
                onClick={handleLearnMore}
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  border: '1.5px solid #FFFFFF',
                  borderRadius: '30px',
                  padding: '14px 36px',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast), color var(--transition-fast)'
                }}
                className="hero-outline-btn-hover"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric Bottom Right "Who We Are?" Card */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '420px',
            background: 'var(--bg-primary)',
            borderTopLeftRadius: '32px',
            padding: '36px 40px 30px 40px',
            zIndex: 10,
            boxSizing: 'border-box',
            textAlign: 'left'
          }}
          className="hero-cutout-card"
        >
          <h3 
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              marginBottom: '10px'
            }}
          >
            Who We Are?
          </h3>
          <p 
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '28px'
            }}
          >
            We offer a range of services including buying, selling, and property management.
          </p>

          {/* Stats Segment */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)', /* Sustainability Green */
                  margin: '0 0 4px 0'
                }}
              >
                {countHouse}+
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>
                Premium House
              </p>
            </div>
            <div>
              <h4 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  margin: '0 0 4px 0'
                }}
              >
                {countAgent}+
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>
                Agent House
              </p>
            </div>
            <div>
              <h4 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  margin: '0 0 4px 0'
                }}
              >
                {countClients >= 1000 ? `${(countClients/1000).toFixed(0)}K` : countClients}+
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>
                Happy Clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
