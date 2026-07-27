import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '../data';

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const list = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS;
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    if (list.length === 0) return;
    setActiveIdx(prev => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    if (list.length === 0) return;
    setActiveIdx(prev => (prev + 1) % list.length);
  };

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [list.length]);

  const active = list[activeIdx] || list[0];

  return (
    <section id="testimonials" className="container" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="section-header">
        <span className="section-subtitle">Reviews</span>
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-desc">
          Read real reviews from happy homeowners and investors who bought properties with DUSABE Real Estate.
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
