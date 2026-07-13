import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Mail, 
  School, 
  Activity, 
  Train, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  FileText
} from 'lucide-react';
import { AGENTS, type Property } from '../data';
import { MortgageCalculator } from './MortgageCalculator';

interface PropertyDetailModalProps {
  property: Property;
  currency: string;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  onClose
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Find Agent
  const agent = AGENTS.find(a => a.id === property.agentId) || AGENTS[0];

  const handlePrevImage = () => {
    setActiveImageIdx(prev => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleNextImage = () => {
    setActiveImageIdx(prev => (prev + 1) % property.images.length);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingName || !bookingEmail) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingDate('');
      setBookingName('');
      setBookingEmail('');
    }, 4000);
  };

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
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <div className="detail-modal-backdrop" onClick={onClose}>
      <div 
        className="detail-modal-window glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}
      >
        {/* Close Button */}
        <button className="detail-modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="detail-modal-scroll">
          {/* Top Gallery Slider */}
          <div className="detail-gallery-slider">
            <img 
              src={property.images[activeImageIdx]} 
              alt={property.title} 
              className="detail-gallery-img"
            />
            {property.images.length > 1 && (
              <>
                <button className="detail-slider-btn prev" onClick={handlePrevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="detail-slider-btn next" onClick={handleNextImage}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Slider Dots */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
              {property.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeImageIdx === idx ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="detail-body">
            {/* Left Main details */}
            <div>
              <div className="detail-meta-row">
                <span className="card-badge" style={{ position: 'static' }}>{property.status}</span>
                <span className="card-type" style={{ fontSize: '0.9rem' }}>{property.type}</span>
                <span className="energy-rating-badge">EU Energy {property.energyRating}</span>
              </div>

              <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{property.title}</h2>
              
              <div className="card-location" style={{ fontSize: '1rem', marginBottom: '24px' }}>
                <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>{property.location.address}, {property.location.district}, {property.location.city}</span>
              </div>

              <div className="card-features" style={{ display: 'flex', gap: '40px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Price Evaluation</p>
                  <h4 className="luxury-number" style={{ fontSize: '1.8rem', fontStyle: 'italic' }}>
                    {formatPrice(property.discountPrice || property.price)}
                  </h4>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '20px' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Beds</p>
                  <h4 style={{ fontSize: '1.4rem' }}>{property.beds}</h4>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '20px' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Baths</p>
                  <h4 style={{ fontSize: '1.4rem' }}>{property.baths}</h4>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '20px' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Space</p>
                  <h4 style={{ fontSize: '1.4rem' }}>{property.area.toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>sq ft</span></h4>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Architectural Overview</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Estate Amenities</h3>
                <div className="detail-amenities-grid">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="detail-amenity-item">
                      <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-gold-dark)', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                        <Check size={14} />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Walkability & Transit */}
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Environmental Telemetry</h3>
                <div className="walk-score-circle">
                  <div className="score-gauge-ring glass-panel" style={{ borderRadius: '50%' }}>
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="40" cy="40" r="32" stroke="var(--border-light)" strokeWidth="4" fill="none" />
                      <circle cx="40" cy="40" r="32" stroke="var(--accent-gold)" strokeWidth="5" fill="none" strokeDasharray="200" strokeDashoffset={200 - (200 * property.walkScore) / 100} />
                    </svg>
                    <span className="score-number" style={{ position: 'absolute' }}>{property.walkScore}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Walkability Rating</h4>
                    <p style={{ fontSize: '0.85rem' }}>Most tasks can be accomplished by walking to nearby high-end retail hubs.</p>
                  </div>
                </div>

                <div className="walk-score-circle" style={{ marginTop: '16px' }}>
                  <div className="score-gauge-ring glass-panel" style={{ borderRadius: '50%' }}>
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="40" cy="40" r="32" stroke="var(--border-light)" strokeWidth="4" fill="none" />
                      <circle cx="40" cy="40" r="32" stroke="var(--secondary)" strokeWidth="5" fill="none" strokeDasharray="200" strokeDashoffset={200 - (200 * property.transitScore) / 100} />
                    </svg>
                    <span className="score-number" style={{ position: 'absolute' }}>{property.transitScore}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Transit Access Rating</h4>
                    <p style={{ fontSize: '0.85rem' }}>Elite private limousine pads and proximity to arterial transport hubs.</p>
                  </div>
                </div>
              </div>

              {/* Mock Floor Plan Simulator */}
              <div className="floor-plan-box">
                <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} />
                  Floor Plans & Blueprint
                </h3>
                <div className="floor-plan-drawing">
                  <svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="10" y="10" width="180" height="130" stroke="var(--text-secondary)" strokeWidth="1" fill="none" />
                    <line x1="90" y1="10" x2="90" y2="140" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="10" y1="70" x2="190" y2="70" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="25" y="40" fill="var(--text-tertiary)" fontSize="10">Grand Foyer</text>
                    <text x="110" y="40" fill="var(--text-tertiary)" fontSize="10">Chef Kitchen</text>
                    <text x="25" y="110" fill="var(--text-tertiary)" fontSize="10">Master Wing</text>
                    <text x="110" y="110" fill="var(--text-tertiary)" fontSize="10">Wine Lounge</text>
                  </svg>
                </div>
              </div>

              {/* Mortgage Calculator Integration */}
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} style={{ color: 'var(--accent-gold-dark)' }} />
                  Dynamic Mortgage Calculator
                </h3>
                <MortgageCalculator initialPrice={property.discountPrice || property.price} />
              </div>

              {/* Neighborhood POI Accordion */}
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Surroundings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <School style={{ color: 'var(--accent-gold-dark)' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem' }}>Sterling Academy of Fine Arts (Private)</h4>
                      <p style={{ fontSize: '0.8rem' }}>0.8 miles away • Rating 10/10</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <Activity style={{ color: '#EF4444' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem' }}>Lumina Medical Wellness Center</h4>
                      <p style={{ fontSize: '0.8rem' }}>1.2 miles away • 24/7 Concierge Health</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <Train style={{ color: 'var(--secondary)' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem' }}>Minato Skyrail Line</h4>
                      <p style={{ fontSize: '0.8rem' }}>0.4 miles away • High-Speed Monorail</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Sidebar */}
            <div>
              {/* Agent Card */}
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
                <img src={agent.image} alt={agent.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.15rem' }}>{agent.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{agent.role}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>{agent.bio}</p>

                <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                  <a 
                    href={`https://wa.me/${agent.whatsapp}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="luxury-gold-button"
                    style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#25D366', color: '#FFF', boxShadow: 'none' }}
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                  <a 
                    href={`mailto:${agent.email}`}
                    className="outline-luxury-button"
                    style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>

              {/* Booking Scheduler form */}
              <div className="glass-panel booking-card" style={{ border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} /> Schedule Viewing
                </h4>
                {bookingSuccess ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center' }}>
                    ✔ Appointment Request Logged. Agent Sophia Sterling will contact you within 30 minutes via private dispatch.
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className="glass-input" 
                        placeholder="Sir John Doe"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Private Email</label>
                      <input 
                        type="email" 
                        required 
                        className="glass-input" 
                        placeholder="john@noble.com"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Requested Date</label>
                      <input 
                        type="date" 
                        required 
                        className="glass-input" 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Preferred Hour</label>
                      <select 
                        className="glass-input"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                      >
                        <option value="10:00 AM">10:00 AM (Morning Sunrise)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon Glow)</option>
                        <option value="06:00 PM">06:00 PM (Sunset Serenade)</option>
                      </select>
                    </div>

                    <button type="submit" className="luxury-gold-button shine-hover" style={{ width: '100%' }}>
                      Secure VIP Booking
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
