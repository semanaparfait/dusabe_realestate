import React from 'react';
import { Plus, Star } from 'lucide-react';
import { type Testimonial } from '@/data';

interface ReviewsTabProps {
  testimonials: Testimonial[];
  onOpenNewTestimonial: () => void;
  onOpenEditTestimonial: (t: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;
}

const addEndorsementBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] flex items-center gap-2 px-6 py-3 text-[0.85rem]";

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  testimonials,
  onOpenNewTestimonial,
  onOpenEditTestimonial,
  onDeleteTestimonial
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[1.8rem] font-heading font-bold">Client Endorsements & Reviews</h1>
          <p className="text-[0.85rem] text-text-tertiary mt-1">Manage testimonials from global investors and high-net-worth patrons.</p>
        </div>

        <button
          onClick={onOpenNewTestimonial}
          className={addEndorsementBtnClass}
        >
          <Plus size={16} /> Add Endorsement
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {testimonials.map(item => (
          <div key={item.id} className="rounded-2xl border border-border-light bg-bg-secondary p-6 flex flex-col gap-4 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <div className="flex justify-between items-start">
              <div className="flex gap-3.5 items-center">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="text-[1rem] font-bold">{item.name}</h3>
                  <div className="text-[0.75rem] text-accent-gold">{item.role}</div>
                </div>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
                ))}
              </div>
            </div>

            <p className="text-[0.85rem] text-text-secondary italic leading-[1.5]">
              "{item.comment}"
            </p>

            <div className="text-[0.75rem] text-text-tertiary">
              Purchased Asset: <strong className="text-text-primary">{item.propertyTitle}</strong>
            </div>

            <div className="flex gap-2 mt-auto border-t border-border-light pt-3">
              <button
                onClick={() => onOpenEditTestimonial(item)}
                className="flex-1 p-1.5 rounded-md bg-bg-tertiary border border-border-light text-text-primary text-[0.75rem] cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTestimonial(item.id)}
                className="py-1.5 px-3 rounded-md bg-red-500/15 border-none text-red-500 text-[0.75rem] cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};