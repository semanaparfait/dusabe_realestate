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
import { AGENTS, type Property, type Agent } from '../data';
import { MortgageCalculator } from './MortgageCalculator';
// import type { Property  } from '@/pages/Admin/AdminTypes/AdminTypes';

interface PropertyDetailModalProps {
  property: Property;
  currency: string;
  agents?: Agent[];
  onClose: () => void;
}

const glassInputClass = "bg-white/[0.08] border border-white/15 [[data-theme=dark]_&]:bg-[rgba(15,23,42,0.4)] [[data-theme=dark]_&]:border-white/8 rounded-lg text-text-primary py-3 px-4 outline-none font-sans [transition:all_var(--transition-fast)] focus:border-accent-gold focus:bg-white/15 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]";
const luxuryGoldBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg px-7 py-3 cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";
const shineHoverClass = "after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]";
const outlineLuxuryBtnClass = "bg-transparent text-text-primary font-heading font-medium border-[1.5px] border-text-primary rounded-lg px-7 py-3 cursor-pointer [transition:background_var(--transition-fast),color_var(--transition-fast)] hover:bg-text-primary hover:text-bg-primary";

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  agents,
  onClose
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Find Agent dynamically from passed prop or fallback
  const agentList = agents && agents.length > 0 ? agents : AGENTS;
  const agent = agentList.find(a => a.id === property.agentId) || agentList[0];

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
    if (currency === 'RWF') {
      const converted = Math.round(priceUSD * 1400);
      return `RWF ${converted.toLocaleString()}`;
    }
    return `$${priceUSD.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-[rgba(9,13,22,0.85)] backdrop-blur-[10px] z-[2000] flex justify-center items-center p-10 overflow-y-auto" onClick={onClose}>
      <div
        className="w-full max-w-[1100px] rounded-[20px] overflow-hidden max-h-[90vh] flex flex-col relative bg-bg-primary border border-border-light"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="absolute top-5 right-5 bg-[rgba(15,23,42,0.6)] border border-white/15 text-white p-2.5 rounded-full cursor-pointer z-10 flex [transition:all_var(--transition-fast)] hover:bg-white hover:text-black" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="overflow-y-auto grow">
          {/* Top Gallery Slider */}
          <div className="h-[450px] relative">
            <img
              src={property.images[activeImageIdx]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <button className="absolute top-1/2 -translate-y-1/2 left-5 bg-[rgba(15,23,42,0.6)] text-white border-none p-3 rounded-full cursor-pointer [transition:background_var(--transition-fast)] flex z-10 hover:bg-accent-gold hover:text-black" onClick={handlePrevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="absolute top-1/2 -translate-y-1/2 right-5 bg-[rgba(15,23,42,0.6)] text-white border-none p-3 rounded-full cursor-pointer [transition:background_var(--transition-fast)] flex z-10 hover:bg-accent-gold hover:text-black" onClick={handleNextImage}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Slider Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer ${activeImageIdx === idx ? 'bg-accent-gold' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-10 grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-10">
            {/* Left Main details */}
            <div>
              <div className="flex gap-4 items-center mb-6">
                <span className="bg-primary text-white py-1.5 px-3.5 rounded-md font-heading text-[0.75rem] font-semibold uppercase tracking-[0.05em]">{property.status}</span>
                <span className="font-heading text-[0.9rem] font-semibold uppercase tracking-[0.1em] text-accent-gold-dark">{property.type}</span>
                {property.energyRating && (
                  <span className="bg-emerald-500 text-white py-1 px-2.5 rounded font-heading font-bold text-[0.8rem]">EU Energy {property.energyRating}</span>
                )}
              </div>

              <h2 className="text-[2.5rem] mb-2">{property.title}</h2>

              <div className="flex items-center gap-1.5 text-text-secondary text-base mb-6">
                <MapPin size={16} className="text-accent-gold" />
                <span>{property.location.address}, {property.location.district}, {property.location.city}</span>
              </div>

              <div className="flex gap-10 bg-bg-secondary p-5 rounded-xl border border-border-light mb-5">
                <div>
                  <p className="text-[0.8rem] uppercase text-text-tertiary">Price Evaluation</p>
                  <h4 className="font-serif italic text-accent-gold text-[1.8rem]">
                    {formatPrice(property.discountPrice || property.price)}
                  </h4>
                </div>
                <div className="border-l border-border-light pl-5">
                  <p className="text-[0.8rem] uppercase text-text-tertiary">Beds</p>
                  <h4 className="text-[1.4rem]">{property.beds}</h4>
                </div>
                <div className="border-l border-border-light pl-5">
                  <p className="text-[0.8rem] uppercase text-text-tertiary">Baths</p>
                  <h4 className="text-[1.4rem]">{property.baths}</h4>
                </div>
                <div className="border-l border-border-light pl-5">
                  <p className="text-[0.8rem] uppercase text-text-tertiary">Space</p>
                  <h4 className="text-[1.4rem]">{property.area.toLocaleString()} <span className="text-[0.8rem] text-text-secondary">sq ft</span></h4>
                </div>
              </div>

              {/* Description */}
              <div className="mt-[30px]">
                <h3 className="text-[1.25rem] mb-3 border-b border-border-light pb-2">Architectural Overview</h3>
                <p className="text-base text-text-secondary leading-[1.7]">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div className="mt-[30px]">
                  <h3 className="text-[1.25rem] mb-3 border-b border-border-light pb-2">Estate Amenities</h3>
                  <div className="grid grid-cols-2 gap-4 mt-5 mb-[30px]">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-[0.95rem] text-text-secondary">
                        <div className="bg-accent-gold/15 text-accent-gold-dark rounded-full p-1 flex">
                          <Check size={14} />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Walkability & Transit */}
              {(typeof property.walkScore === 'number' || typeof property.transitScore === 'number') && (
                <div className="mt-[30px]">
                  <h3 className="text-[1.25rem] mb-3 border-b border-border-light pb-2">Environmental Telemetry</h3>
                  {typeof property.walkScore === 'number' && (
                    <div className="flex gap-5 items-center my-6">
                      <div className="w-20 h-20 relative flex items-center justify-center rounded-full bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                        <svg width="80" height="80" className="-rotate-90">
                          <circle cx="40" cy="40" r="32" stroke="var(--border-light)" strokeWidth="4" fill="none" />
                          <circle cx="40" cy="40" r="32" stroke="var(--accent-gold)" strokeWidth="5" fill="none" strokeDasharray="200" strokeDashoffset={200 - (200 * property.walkScore) / 100} />
                        </svg>
                        <span className="absolute font-heading text-[1.4rem] font-extrabold text-text-primary">{property.walkScore}</span>
                      </div>
                      <div>
                        <h4 className="text-base">Walkability Rating</h4>
                        <p className="text-[0.85rem]">Most tasks can be accomplished by walking to nearby high-end retail hubs.</p>
                      </div>
                    </div>
                  )}

                  {typeof property.transitScore === 'number' && (
                    <div className="flex gap-5 items-center my-6 mt-4">
                      <div className="w-20 h-20 relative flex items-center justify-center rounded-full bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                        <svg width="80" height="80" className="-rotate-90">
                          <circle cx="40" cy="40" r="32" stroke="var(--border-light)" strokeWidth="4" fill="none" />
                          <circle cx="40" cy="40" r="32" stroke="var(--secondary)" strokeWidth="5" fill="none" strokeDasharray="200" strokeDashoffset={200 - (200 * property.transitScore) / 100} />
                        </svg>
                        <span className="absolute font-heading text-[1.4rem] font-extrabold text-text-primary">{property.transitScore}</span>
                      </div>
                      <div>
                        <h4 className="text-base">Transit Access Rating</h4>
                        <p className="text-[0.85rem]">Elite private limousine pads and proximity to arterial transport hubs.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mock Floor Plan Simulator */}
              <div className="bg-bg-tertiary rounded-xl p-5 mt-[30px]">
                <h3 className="text-[1.15rem] flex items-center gap-2">
                  <FileText size={18} />
                  Floor Plans & Blueprint
                </h3>
                <div className="w-full h-[200px] border border-dashed border-text-tertiary rounded-lg mt-4 flex items-center justify-center bg-bg-primary">
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
              <div className="mt-10">
                <h3 className="text-[1.25rem] mb-5 border-b border-border-light pb-2 flex items-center gap-2">
                  <TrendingUp size={18} className="text-accent-gold-dark" />
                  Dynamic Mortgage Calculator
                </h3>
                <MortgageCalculator initialPrice={property.discountPrice || property.price} />
              </div>

              {/* Neighborhood POI Accordion */}
              <div className="mt-10">
                <h3 className="text-[1.25rem] mb-4 border-b border-border-light pb-2">Surroundings</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 p-3 bg-bg-secondary rounded-lg">
                    <School className="text-accent-gold-dark" />
                    <div>
                      <h4 className="text-[0.95rem]">Sterling Academy of Fine Arts (Private)</h4>
                      <p className="text-[0.8rem]">0.8 miles away • Rating 10/10</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-bg-secondary rounded-lg">
                    <Activity className="text-red-500" />
                    <div>
                      <h4 className="text-[0.95rem]">Lumina Medical Wellness Center</h4>
                      <p className="text-[0.8rem]">1.2 miles away • 24/7 Concierge Health</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-bg-secondary rounded-lg">
                    <Train className="text-[var(--secondary)]" />
                    <div>
                      <h4 className="text-[0.95rem]">Minato Skyrail Line</h4>
                      <p className="text-[0.8rem]">0.4 miles away • High-Speed Monorail</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Sidebar */}
            <div>
              {/* Agent Card */}
              <div className="p-6 rounded-2xl border border-border-light flex flex-col items-center text-center mb-6 bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
                <img src={agent.image} alt={agent.name} className="w-20 h-20 rounded-full object-cover border-2 border-accent-gold mb-4" />
                <h4 className="text-[1.15rem]">{agent.name}</h4>
                <p className="text-[0.8rem] text-text-tertiary uppercase tracking-[0.05em] mb-3">{agent.role}</p>
                <p className="text-[0.85rem] text-text-secondary mb-5">{agent.bio}</p>

                <div className="flex w-full gap-2.5">
                  <a
                    href={`https://wa.me/${agent.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 text-[0.8rem] flex items-center justify-center gap-1.5 bg-[#25D366] text-white shadow-none font-heading font-semibold rounded-lg cursor-pointer [transition:transform_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className={`${outlineLuxuryBtnClass} flex-1 py-2.5 px-4 text-[0.8rem] flex items-center justify-center gap-1.5`}
                  >
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>

              {/* Booking Scheduler form */}
              <div className="p-[30px] rounded-2xl sticky top-5 bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-border-light">
                <h4 className="text-[1.2rem] mb-4 flex items-center gap-2">
                  <Calendar size={18} /> Schedule Viewing
                </h4>
                {bookingSuccess ? (
                  <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 p-4 rounded-lg text-[0.85rem] text-center">
                    ✔ Appointment Request Logged. Agent Sophia Sterling will contact you within 30 minutes via private dispatch.
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.75rem] font-semibold uppercase text-text-secondary">Full Name</label>
                      <input
                        type="text"
                        required
                        className={glassInputClass}
                        placeholder="Sir John Doe"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.75rem] font-semibold uppercase text-text-secondary">Private Email</label>
                      <input
                        type="email"
                        required
                        className={glassInputClass}
                        placeholder="john@noble.com"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.75rem] font-semibold uppercase text-text-secondary">Requested Date</label>
                      <input
                        type="date"
                        required
                        className={glassInputClass}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.75rem] font-semibold uppercase text-text-secondary">Preferred Hour</label>
                      <select
                        className={glassInputClass}
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                      >
                        <option value="10:00 AM">10:00 AM (Morning Sunrise)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon Glow)</option>
                        <option value="06:00 PM">06:00 PM (Sunset Serenade)</option>
                      </select>
                    </div>

                    <button type="submit" className={`${luxuryGoldBtnClass} ${shineHoverClass} w-full`}>
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
