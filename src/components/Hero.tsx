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

export const Hero: React.FC<HeroProps> = ({ onSearch: _onSearch, t: _t }) => {
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
    <section className="relative box-border bg-bg-primary px-6 pt-[110px] pb-10 max-lg:pt-[90px] max-lg:pb-6 max-lg:px-4">
      {/* Outer Floating Rounded Card Container */}
      <div className="relative w-full max-w-[1400px] mx-auto min-h-[650px] max-lg:min-h-[720px] max-sm:min-h-[640px] rounded-[32px] overflow-hidden shadow-card border border-border-light flex flex-col justify-between">
        
        {/* Slideshow of Homes (Always fills the full card) */}
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center z-0 [transition:opacity_1.5s_ease-in-out,transform_1.5s_ease-in-out]"
            style={{
              backgroundImage: `url(${img})`,
              opacity: idx === currentSlide ? 1 : 0,
              transform: idx === currentSlide ? 'scale(1)' : 'scale(1.05)'
            }}
          />
        ))}

        {/* Ambient Dark Overlay for contrast on text and mobile */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.75)_100%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.25)_100%)]" />

        {/* Hero Main Content */}
        <div className="relative z-[2] flex items-center box-border text-left px-20 py-16 max-lg:px-6 max-lg:pt-10 max-lg:pb-6">
          <div className="max-w-[620px] flex flex-col gap-4 max-sm:gap-3">
            <h1 className="font-heading font-extrabold text-[4rem] max-lg:text-[2.6rem] max-sm:text-[2rem] text-white leading-[1.1] m-0 tracking-[-0.02em]">
              Find Your Dream Home Today
            </h1>
            <p className="font-sans text-[1.05rem] max-sm:text-[0.9rem] text-white/90 leading-relaxed m-0">
              Welcome to our real estate agency, where your dream home awaits. Browse our listings and find the perfect property for you.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-2 max-sm:flex-wrap">
              <button
                onClick={handleBrowseProperties}
                className="relative overflow-hidden bg-white text-black font-heading font-semibold text-[0.95rem] border-none rounded-[30px] py-3 px-8 cursor-pointer [transition:transform_var(--transition-fast)] after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]"
              >
                View
              </button>
              <button
                onClick={handleLearnMore}
                className="bg-transparent text-white font-heading font-medium text-[0.95rem] border-[1.5px] border-white rounded-[30px] py-3 px-8 cursor-pointer [transition:background_var(--transition-fast),color_var(--transition-fast)] hover:bg-white/15 hover:text-white"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric Bottom Right "Who We Are?" Card (Glass on mobile to keep image visible) */}
        <div className="relative lg:absolute bottom-0 right-0 w-full lg:w-[420px] bg-black/45 backdrop-blur-md border-t border-white/10 lg:border-none lg:bg-bg-primary rounded-t-[24px] lg:rounded-t-none lg:rounded-tl-[32px] pt-6 px-6 pb-6 lg:pt-9 lg:px-10 lg:pb-[30px] z-10 box-border text-left">
          <h3 className="font-heading font-extrabold text-[1.4rem] lg:text-[1.6rem] text-white lg:text-text-primary mb-1.5 lg:mb-2.5">
            Who We Are?
          </h3>
          <p className="font-sans text-[0.85rem] lg:text-[0.88rem] text-white/80 lg:text-text-secondary leading-relaxed mb-5 lg:mb-7">
            We offer a range of services including buying, selling, and property management.
          </p>

          {/* Stats Segment */}
          <div className="flex justify-between items-center gap-2">
            <div>
              <h4 className="font-serif text-[1.5rem] lg:text-[1.8rem] font-bold text-accent-gold mb-0.5 lg:mb-1">
                {countHouse}+
              </h4>
              <p className="text-[0.7rem] lg:text-[0.75rem] text-white/70 lg:text-text-tertiary m-0 uppercase font-semibold">
                Premium House
              </p>
            </div>
            <div>
              <h4 className="font-serif text-[1.5rem] lg:text-[1.8rem] font-bold text-accent-gold mb-0.5 lg:mb-1">
                {countAgent}+
              </h4>
              <p className="text-[0.7rem] lg:text-[0.75rem] text-white/70 lg:text-text-tertiary m-0 uppercase font-semibold">
                Agent House
              </p>
            </div>
            <div>
              <h4 className="font-serif text-[1.5rem] lg:text-[1.8rem] font-bold text-accent-gold mb-0.5 lg:mb-1">
                {countClients >= 1000 ? `${(countClients/1000).toFixed(0)}K` : countClients}+
              </h4>
              <p className="text-[0.7rem] lg:text-[0.75rem] text-white/70 lg:text-text-tertiary m-0 uppercase font-semibold">
                Happy Clients
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};