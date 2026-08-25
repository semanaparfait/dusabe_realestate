import React from 'react';
import { Plus, Star } from 'lucide-react';
import { type Testimonial } from '@/data';

interface ReviewsTabProps {
  testimonials: Testimonial[];
  onOpenNewTestimonial: () => void;
  onOpenEditTestimonial: (t: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  testimonials,
  onOpenNewTestimonial,
  onOpenEditTestimonial,
  onDeleteTestimonial
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Client Endorsements & Reviews</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Manage testimonials from global investors and high-net-worth patrons.</p>
        </div>

        <button 
          onClick={onOpenNewTestimonial}
          className="luxury-gold-button shine-hover"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Add Endorsement
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {testimonials.map(item => (
          <div key={item.id} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <img src={item.avatar} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{item.role}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.5' }}>
              "{item.comment}"
            </p>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Purchased Asset: <strong style={{ color: 'var(--text-primary)' }}>{item.propertyTitle}</strong>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              <button 
                onClick={() => onOpenEditTestimonial(item)}
                style={{ flex: 1, padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDeleteTestimonial(item.id)}
                style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer' }}
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