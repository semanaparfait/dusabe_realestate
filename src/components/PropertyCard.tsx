import React from 'react';
import { Heart, GitCompare, Eye, Navigation, Star } from 'lucide-react';

import type { Property } from '@/data';

interface PropertyCardProps {
  property: Property;
  currency: string;
  isFavorited: boolean;
  isInCompareList: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onQuickView: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isFavorited,
  isInCompareList,
  onToggleFavorite,
  onToggleCompare,
  onQuickView
}) => {

  // Helper for Currency Conversion (USD and RWF)
  const formatPrice = (priceUSD: number) => {
    const suffix = property.status === 'For Rent' ? '/mo' : '';
    if (currency === 'RWF') {
      const converted = Math.round(priceUSD * 1400);
      if (converted >= 1000000000) {
        return `RWF ${(converted / 1000000000).toFixed(2)}B${suffix}`;
      } else if (converted >= 1000000) {
        return `RWF ${(converted / 1000000).toFixed(1)}M${suffix}`;
      }
      return `RWF ${converted.toLocaleString()}${suffix}`;
    }

    if (priceUSD >= 1000000) {
      return `${(priceUSD / 1000000).toFixed(1)}M${suffix}`;
    }
    return `${priceUSD.toLocaleString()}${suffix}`;
  };

  const postedByName =
    property.postedBy?.name ||
    property.postedBy?.displayName ||
    property.postedBy?.email ||
    'DUSABE Team';

  return (
    <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden shadow-card [transition:all_var(--transition-slow)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.15)] bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-[var(--glass-border)]">
      {/* Top Media Area */}
      <div className="h-[260px] relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover [transition:transform_var(--transition-slow)] group-hover:scale-[1.08]"
          loading="lazy"
        />

        {/* Badges */}
        <span className="absolute top-4 left-4 z-10 bg-primary text-white py-1.5 px-3.5 rounded-md font-heading text-[0.75rem] font-semibold uppercase tracking-[0.05em]">{property.status}</span>
        {property.discountPrice && (
          <span className="absolute top-4 left-[100px] z-10 bg-red-600 text-white py-1.5 px-3.5 rounded-md font-heading text-[0.75rem] font-semibold uppercase">
            -{Math.round((1 - property.discountPrice / property.price) * 100)}%
          </span>
        )}

        {/* Favorite Action Button */}
        <button
          className={`absolute top-4 right-4 z-10 p-2 rounded-full flex [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-white/20 cursor-pointer [transition:all_var(--transition-fast)] ${isFavorited ? 'bg-bg-primary text-red-500' : 'bg-[rgba(15,23,42,0.4)] text-white hover:bg-bg-primary hover:text-red-500'}`}
          onClick={() => onToggleFavorite(property.id)}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isFavorited ? '#EF4444' : 'none'} />
        </button>

        {/* Action Button Hover Overlays */}
        <div className="absolute bottom-0 left-0 w-full z-10 flex justify-end gap-2.5 pt-[30px] px-5 pb-4 opacity-0 translate-y-5 [transition:all_var(--transition-normal)] group-hover:opacity-100 group-hover:translate-y-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%)]">
          <button
            onClick={() => onQuickView(property)}
            className="bg-white/15 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-white/25 text-white py-1.5 px-3.5 rounded-md text-[0.8rem] font-heading font-medium cursor-pointer inline-flex items-center gap-1.5 [transition:all_var(--transition-fast)] hover:bg-white hover:text-black"
          >
            <Eye size={14} />
            Quick View
          </button>
          <button
            onClick={() => onToggleCompare(property.id)}
            className={`[backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-white/25 py-1.5 px-3.5 rounded-md text-[0.8rem] font-heading font-medium cursor-pointer inline-flex items-center gap-1.5 [transition:all_var(--transition-fast)] ${isInCompareList ? 'bg-accent-gold text-black' : 'bg-white/15 text-white hover:bg-white hover:text-black'}`}
          >
            <GitCompare size={14} />
            {isInCompareList ? 'Comparing' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Card Information Body */}
      <div className="p-6 flex flex-col grow">

        <div className="flex items-center justify-between mb-2">
          <span className="text-[0.7rem] font-heading uppercase tracking-[0.08em] text-accent-gold font-semibold">
            {property.type}
          </span>
          {typeof property.rating === 'number' && (
            <span className="flex items-center gap-1 text-[0.8rem] text-text-secondary">
              <Star size={13} className="text-accent-gold" fill="currentColor" />
              {property.rating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="text-[1.3rem] mb-3 text-text-primary [transition:color_var(--transition-fast)] hover:text-[var(--secondary)]" onClick={() => onQuickView(property)}>
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[0.85rem] text-text-secondary mb-[18px]">
          <Navigation size={14} className="text-accent-gold" />
          <span>{property.location.address ? `${property.location.address}, ` : ''}{property.location.city}</span>
        </div>

        {/* Card Feature Specs Row */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-border-light py-4 mb-5">
          <div className="flex flex-col items-center gap-1 text-center text-[0.8rem] text-text-secondary">
            <span className="font-semibold text-text-primary">{property.beds}</span>
            Beds
          </div>
          <div className="flex flex-col items-center gap-1 text-center text-[0.8rem] text-text-secondary">
            <span className="font-semibold text-text-primary">{property.baths}</span>
            Baths
          </div>
          <div className="flex flex-col items-center gap-1 text-center text-[0.8rem] text-text-secondary">
            <span className="font-semibold text-text-primary">{property.area.toLocaleString()}</span>
            Sq Ft
          </div>
        </div>

        {/* Footer info: price and posting admin tag */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-[0.75rem] text-text-tertiary uppercase">Investment Value</span>
            <span className="font-serif text-[1.4rem] italic font-bold text-text-primary">
             RWF {formatPrice(property.discountPrice || property.price)}
            </span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer" title={`Posted by ${postedByName}`}>
            <div>
              <p className="text-[0.8rem] font-semibold text-text-primary">{postedByName.split(' ')[0]}</p>
              <p className="text-[0.65rem] text-text-tertiary">Listing Agent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
