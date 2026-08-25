import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '../data';

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const sliderBtnClass = "absolute top-1/2 -translate-y-1/2 bg-[rgba(15,23,42,0.6)] text-white border-none p-3 rounded-full cursor-pointer [transition:background_var(--transition-fast)] flex z-10 hover:bg-accent-gold hover:text-black";

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
    <section id="testimonials" className="relative w-full max-w-[1400px] mx-auto px-6 border-b border-border-light">
      <div className="text-center mb-[60px]">
        <span className="font-heading uppercase tracking-[0.25em] text-[0.85rem] text-accent-gold font-semibold">Reviews</span>
        <h2 className="text-[2.5rem] mb-4">What Our Clients Say</h2>
        <p className="max-w-[600px] mx-auto text-base">
          Read real reviews from happy homeowners and investors who bought properties with DUSABE Real Estate.
        </p>
      </div>

      <div className="relative max-w-[800px] mx-auto min-h-[250px] overflow-hidden p-10 rounded-[20px] border border-border-light bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
        {/* Quote Accent background icon */}
        <Quote size={80} className="absolute top-5 left-5 text-accent-gold/5 pointer-events-none" />

        <div className="text-center flex flex-col items-center">
          <img src={active.avatar} alt={active.name} className="w-20 h-20 rounded-full object-cover border-2 border-accent-gold mb-5" />

          {/* Star Display */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: active.rating }).map((_, idx) => (
              <Star key={idx} size={16} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
            ))}
          </div>

          <p className="font-serif italic text-[1.5rem] text-text-primary leading-[1.5] mb-6">
            "{active.comment}"
          </p>

          <h4 className="font-heading font-bold text-[1.1rem]">{active.name}</h4>
          <p className="text-[0.85rem] text-text-tertiary">{active.role} • Purchased <strong>{active.propertyTitle}</strong></p>
        </div>

        {/* Carousel controls */}
        <button
          onClick={handlePrev}
          className={`${sliderBtnClass} left-5`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className={`${sliderBtnClass} right-5`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};
