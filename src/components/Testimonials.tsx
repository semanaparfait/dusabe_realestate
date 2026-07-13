import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export const Testimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const active = TESTIMONIALS[activeIdx];

  return (
    <section id="testimonials" className="container" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="section-header">
        <span className="section-subtitle">Client Audits</span>
        <h2 className="section-title">Endorsements from Global Investors</h2>
        <p className="section-desc">
          Discretion, integrity, and flawless execution. Read reviews from our high-net-worth property patrons.
        </p>
      </div>

      <div className="testimonial-carousel glass-panel" style={{ padding: '40px', borderRadius: '20px', border: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
        {/* Quote Accent background icon */}
        <Quote size={80} style={{ position: 'absolute', top: '20px', left: '20px', color: 'rgba(245, 158, 11, 0.05)', pointerEvents: 'none' }} />

        <div className="testimonial-slide">
          <img src={active.avatar} alt={active.name} className="testimonial-avatar" />
          
          {/* Star Display */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
            {Array.from({ length: active.rating }).map((_, idx) => (
              <Star key={idx} size={16} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
            ))}
          </div>

          <p className="testimonial-quote">
            "{active.comment}"
          </p>

          <h4 className="testimonial-name">{active.name}</h4>
          <p className="testimonial-role">{active.role} • Purchased <strong>{active.propertyTitle}</strong></p>
        </div>

        {/* Carousel controls */}
        <button 
          onClick={handlePrev} 
          className="detail-slider-btn prev"
          style={{ left: '20px' }}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext} 
          className="detail-slider-btn next"
          style={{ right: '20px' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};
