import React from 'react';
import { Heart, GitCompare, Eye, Navigation } from 'lucide-react';
import { AGENTS, type Property } from '../data';

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
  // Find Agent
  const agent = AGENTS.find(a => a.id === property.agentId) || AGENTS[0];

  // Helper for Currency Conversion
  const formatPrice = (priceUSD: number) => {
    let rate = 1.0;
    let symbol = '$';
    if (currency === 'EUR') {
      rate = 0.92;
      symbol = '€';
    } else if (currency === 'AED') {
      rate = 3.67;
      symbol = 'AED ';
    }

    const converted = Math.round(priceUSD * rate);
    
    // For rent, price might be per month, let's format nice
    const suffix = property.status === 'For Rent' ? '/mo' : '';

    if (converted >= 1000000) {
      return `${symbol}${(converted / 1000000).toFixed(1)}M${suffix}`;
    }
    return `${symbol}${converted.toLocaleString()}${suffix}`;
  };

  return (
    <div className="property-card glass-panel">
      {/* Top Media Area */}
      <div className="card-img-container">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="card-img"
          loading="lazy"
        />
        
        {/* Badges */}
        <span className="card-badge">{property.status}</span>
        {property.discountPrice && (
          <span className="card-discount-badge">
            -{Math.round((1 - property.discountPrice / property.price) * 100)}%
          </span>
        )}

        {/* Favorite Action Button */}
        <button 
          className={`card-fav-btn ${isFavorited ? 'active' : ''}`}
          onClick={() => onToggleFavorite(property.id)}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isFavorited ? '#EF4444' : 'none'} />
        </button>

        {/* Action Button Hover Overlays */}
        <div className="card-actions-overlay">
          <button 
            onClick={() => onQuickView(property)} 
            className="card-overlay-btn"
          >
            <Eye size={14} />
            Quick View
          </button>
          <button 
            onClick={() => onToggleCompare(property.id)} 
            className="card-overlay-btn"
            style={{ 
              background: isInCompareList ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)',
              color: isInCompareList ? '#000000' : '#FFFFFF'
            }}
          >
            <GitCompare size={14} />
            {isInCompareList ? 'Comparing' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Card Information Body */}
      <div className="card-body">
        <div className="card-type-rating">
          <span className="card-type">{property.type}</span>
          <span className="card-rating luxury-number">
            ★ {property.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="card-title" onClick={() => onQuickView(property)}>
          {property.title}
        </h3>

        <div className="card-location">
          <Navigation size={14} style={{ color: 'var(--accent-gold)' }} />
          <span>{property.location.address}, {property.location.city}</span>
        </div>

        {/* Card Feature Specs Row */}
        <div className="card-features">
          <div className="card-feat-item">
            <span>{property.beds}</span>
            Beds
          </div>
          <div className="card-feat-item">
            <span>{property.baths}</span>
            Baths
          </div>
          <div className="card-feat-item">
            <span>{property.area.toLocaleString()}</span>
            Sq Ft
          </div>
        </div>

        {/* Footer info: price and agent tag */}
        <div className="card-footer">
          <div className="card-price-block">
            <span className="card-price-label">Investment Value</span>
            <span className="card-price">
              {formatPrice(property.discountPrice || property.price)}
            </span>
          </div>

          <div className="card-agent-link" title={`Managed by ${agent.name}`}>
            <img src={agent.image} alt={agent.name} className="card-agent-avatar" />
            <div>
              <p className="card-agent-name">{agent.name.split(' ')[0]}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Expert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
