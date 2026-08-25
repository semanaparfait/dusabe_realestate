import React, { useState } from 'react';
import {
  X,
  User,
  Briefcase,
  ShieldAlert,
  Heart,
  Calendar,
  PlusCircle,
  TrendingUp,
  Trash2,
  Eye,
  CheckCircle,
  Database
} from 'lucide-react';
import type { Property } from '../data';

interface DashboardModalProps {
  initialRole: 'user' | 'agent' | 'admin';
  wishlistIds: string[];
  properties: Property[];
  onRemoveWishlist: (id: string) => void;
  onAddProperty: (newProperty: Property) => void;
  onDeleteProperty: (id: string) => void;
  onQuickView: (property: Property) => void;
  onClose: () => void;
}

const glassInputClass = "bg-white/[0.08] border border-white/15 [[data-theme=dark]_&]:bg-[rgba(15,23,42,0.4)] [[data-theme=dark]_&]:border-white/8 rounded-lg text-text-primary py-3 px-4 outline-none font-sans [transition:all_var(--transition-fast)] focus:border-accent-gold focus:bg-white/15 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]";
const luxuryGoldBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg px-7 py-3 cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";
const shineHoverClass = "after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]";
const navIconBtnClass = "bg-transparent border-none text-text-secondary cursor-pointer p-2 rounded-full [transition:all_var(--transition-fast)] flex items-center justify-center hover:text-text-primary hover:bg-bg-tertiary";
const summaryCardClass = "p-5 rounded-xl border border-border-light bg-bg-secondary [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]";

export const DashboardModal: React.FC<DashboardModalProps> = ({
  initialRole,
  wishlistIds,
  properties,
  onRemoveWishlist,
  onAddProperty,
  onDeleteProperty,
  onQuickView,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'user' | 'agent' | 'admin'>(initialRole);

  // Wishlist details
  const wishlistedItems = properties.filter(p => wishlistIds.includes(p.id));

  // Add Property State (Agent console)
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newType, setNewType] = useState('Villa');
  const [newCity, setNewCity] = useState('Miami');
  const newBeds = 4;
  const newBaths = 5;
  const newArea = 6500;
  const [successNotif, setSuccessNotif] = useState('');

  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const added: Property = {
      id: `prop-${Date.now()}`,
      title: newTitle,
      type: newType as any,
      price: parseInt(newPrice),
      location: {
        city: newCity,
        district: 'Downtown Elite',
        neighborhood: 'High Rise Block',
        address: '500 Luxury Ave'
      },
      beds: newBeds,
      baths: newBaths,
      area: newArea,
      parking: 3,
      yearBuilt: 2026,
      status: 'For Sale',
      rating: 5.0,
      isFeatured: false,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80'],
      agentId: 'agent-1',
      amenities: ['Private Cinema', 'Wine Cellar', 'Infinity Pool'],
      description: 'A brand-new premium asset listing posted directly from the Agent Management interface. Stunning structural configurations.',
      walkScore: 85,
      transitScore: 75,
      energyRating: 'A++',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      virtualTourUrl: '',
      mapCoords: { x: 50, y: 50 }
    };

    onAddProperty(added);
    setSuccessNotif('Property listing created and broadcasted to AURA database successfully.');

    // reset fields
    setNewTitle('');
    setNewPrice('');

    setTimeout(() => {
      setSuccessNotif('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(9,13,22,0.85)] backdrop-blur-[8px] z-[2100] flex justify-center items-center p-10" onClick={onClose}>
      <div
        className="w-full max-w-[1200px] h-[85vh] rounded-[20px] overflow-hidden grid grid-cols-[260px_1fr] bg-bg-primary border border-border-light"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Console Navigation Sidebar */}
        <div className="bg-primary text-white py-10 px-6 flex flex-col">
          <h3 className="text-[1.25rem] tracking-[0.1em]">AURA CONSOLE</h3>
          <p className="text-[0.65rem] text-accent-gold uppercase font-bold">Secured Management Hub</p>

          <div className="flex flex-col gap-2 mt-10 grow">
            <button
              onClick={() => setActiveTab('user')}
              className={`bg-transparent border-none py-3 px-4 rounded-lg font-heading text-[0.95rem] font-medium text-left cursor-pointer flex items-center gap-3 [transition:all_var(--transition-fast)] ${activeTab === 'user' ? 'bg-white/10 text-white border-l-[3px] border-accent-gold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              <User size={16} /> Client Desk
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`bg-transparent border-none py-3 px-4 rounded-lg font-heading text-[0.95rem] font-medium text-left cursor-pointer flex items-center gap-3 [transition:all_var(--transition-fast)] ${activeTab === 'agent' ? 'bg-white/10 text-white border-l-[3px] border-accent-gold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              <Briefcase size={16} /> Consultant Desk
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`bg-transparent border-none py-3 px-4 rounded-lg font-heading text-[0.95rem] font-medium text-left cursor-pointer flex items-center gap-3 [transition:all_var(--transition-fast)] ${activeTab === 'admin' ? 'bg-white/10 text-white border-l-[3px] border-accent-gold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              <ShieldAlert size={16} /> Administrator Desk
            </button>
          </div>

          <div className="mt-auto text-[0.75rem] text-white/40 flex items-center gap-1.5">
            <Database size={12} /> Live Node Connection
          </div>
        </div>

        {/* Right Panel Main Workspace */}
        <div className="bg-bg-primary p-10 overflow-y-auto flex flex-col">
          <div className="flex justify-between items-center border-b border-border-light pb-5 mb-[30px]">
            <div>
              <h2 className="text-[1.5rem] capitalize">
                {activeTab === 'user' && 'Investor Personal Office'}
                {activeTab === 'agent' && 'Certified Broker Workspace'}
                {activeTab === 'admin' && 'Enterprise System Telemetry'}
              </h2>
              <p className="text-[0.85rem] text-text-tertiary">
                {activeTab === 'user' && 'Track your saved assets, luxury viewings, and alerts.'}
                {activeTab === 'agent' && 'Update property listings, monitor leads, and record closings.'}
                {activeTab === 'admin' && 'Monitor website traffic, inspect audits, and manage nodes.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-transparent border-none text-text-primary cursor-pointer flex"
            >
              <X size={24} />
            </button>
          </div>

          {/* VIEW: USER DASHBOARD */}
          {activeTab === 'user' && (
            <div className="flex flex-col gap-[30px]">
              {/* Stat Boxes */}
              <div className="grid grid-cols-3 gap-5 mb-[30px]">
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] text-accent-gold font-serif italic">Gold Tier</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Client Status</p>
                </div>
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">{wishlistIds.length} Assets</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Wishlist Size</p>
                </div>
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">1 Briefing</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Scheduled Visits</p>
                </div>
              </div>

              {/* Wishlist item rows */}
              <div>
                <h3 className="text-[1.1rem] mb-4 flex items-center gap-2">
                  <Heart size={16} className="text-red-500" /> Saved Luxury Assets
                </h3>
                {wishlistedItems.length === 0 ? (
                  <p className="text-[0.9rem] text-text-tertiary">Your private portfolio is empty. Mark items on the home gallery to track them here.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {wishlistedItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-3 px-5 rounded-xl border border-border-light bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
                        <div className="flex items-center gap-4">
                          <img src={item.images[0]} alt={item.title} className="w-16 h-11 object-cover rounded-md" />
                          <div>
                            <h4 className="text-[0.95rem]">{item.title}</h4>
                            <p className="text-[0.75rem] text-text-tertiary">{item.location.city} • {item.type}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => onQuickView(item)} className={navIconBtnClass} title="Quick View"><Eye size={15} /></button>
                          <button onClick={() => onRemoveWishlist(item.id)} className={`${navIconBtnClass} text-red-500`} title="Delete"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved briefings scheduler tracking */}
              <div>
                <h3 className="text-[1.1rem] mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-accent-gold-dark" /> Scheduled Private Inquiries
                </h3>
                <div className="p-5 rounded-xl border border-border-light flex justify-between items-center bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
                  <div>
                    <h4 className="text-[0.95rem]">The Obsidian Glass Oasis (Bel Air)</h4>
                    <p className="text-[0.75rem] text-text-secondary">July 24, 2026 at 06:00 PM • Managed by Sophia Sterling</p>
                  </div>
                  <span className="text-[0.75rem] bg-accent-gold/15 text-accent-gold-dark py-1 px-2.5 rounded font-bold">
                    Awaiting Gate Pass
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: AGENT DASHBOARD */}
          {activeTab === 'agent' && (
            <div className="flex flex-col gap-[30px]">
              <div className="grid grid-cols-3 gap-5 mb-[30px]">
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] text-accent-gold font-serif italic">$2.4M</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Pending Commission</p>
                </div>
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">12 Active</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Client Leads</p>
                </div>
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">{properties.length} Listings</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Total Managed</p>
                </div>
              </div>

              {/* Commission SVG graph */}
              <div className="p-6 rounded-xl border border-border-light bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
                <h4 className="text-base mb-4 flex items-center gap-2">
                  <TrendingUp size={16} /> Lead Activity Chart
                </h4>
                <svg viewBox="0 0 400 100" className="w-full h-20">
                  <line x1="20" y1="90" x2="380" y2="90" stroke="var(--border-light)" strokeWidth="1" />
                  <path d="M 20 80 Q 80 40 140 60 T 260 20 T 380 50" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" />
                  <circle cx="260" cy="20" r="4" fill="var(--accent-gold)" />
                  <text x="260" y="12" fill="var(--text-primary)" fontSize="8" fontWeight="bold">Closing Peak</text>
                </svg>
              </div>

              {/* Form: Add Property */}
              <div className="p-[30px] rounded-xl border border-border-light bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
                <h3 className="text-[1.1rem] mb-5 flex items-center gap-2">
                  <PlusCircle size={18} /> Post New Luxury Estate
                </h3>

                {successNotif && (
                  <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 p-3 rounded-lg text-[0.85rem] mb-5 flex items-center gap-1.5">
                    <CheckCircle size={16} /> {successNotif}
                  </div>
                )}

                <form onSubmit={handleAddPropertySubmit} className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-secondary">Estate Title</label>
                    <input
                      type="text"
                      required
                      className={glassInputClass}
                      placeholder="The Platinum Cascade Villa"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-secondary">Valuation (USD)</label>
                    <input
                      type="number"
                      required
                      className={glassInputClass}
                      placeholder="35000000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-secondary">Type</label>
                    <select
                      className={glassInputClass}
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                    >
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Mansion">Mansion</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-secondary">City</label>
                    <select
                      className={glassInputClass}
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                    >
                      <option value="Miami">Miami</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Malibu">Malibu</option>
                      <option value="New York">New York</option>
                      <option value="Tokyo">Tokyo</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex justify-end mt-2.5">
                    <button type="submit" className={`${luxuryGoldBtnClass} ${shineHoverClass}`}>
                      Broadcast Broadcast Listing
                    </button>
                  </div>
                </form>
              </div>

              {/* Table of active listings */}
              <div>
                <h3 className="text-[1.1rem] mb-4">Database Active Placements</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[0.9rem]">
                    <thead>
                      <tr className="border-b border-border-light text-left">
                        <th className="py-3 px-1.5 text-left">Asset</th>
                        <th className="py-3 px-1.5 text-left">Location</th>
                        <th className="py-3 px-1.5 text-left">Price</th>
                        <th className="py-3 px-1.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map(p => (
                        <tr key={p.id} className="border-b border-border-light">
                          <td className="py-3 px-1.5 font-semibold">{p.title}</td>
                          <td className="py-3 px-1.5">{p.location.city}</td>
                          <td className="py-3 px-1.5 font-serif italic text-accent-gold">${(p.price/1000000).toFixed(1)}M</td>
                          <td className="py-3 px-1.5 text-right">
                            <button
                              onClick={() => onDeleteProperty(p.id)}
                              className="bg-transparent border-none text-red-500 cursor-pointer p-1.5"
                              title="Delete Listing"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ADMIN DASHBOARD */}
          {activeTab === 'admin' && (
            <div className="flex flex-col gap-[30px]">
              <div className="grid grid-cols-3 gap-5 mb-[30px]">
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">48.2k</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Unique Visitors</p>
                </div>
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">100%</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Node Uptime</p>
                </div>
                <div className={summaryCardClass}>
                  <h4 className="text-[1.6rem] font-serif italic text-accent-gold">0 Errors</h4>
                  <p className="text-[0.75rem] uppercase text-text-tertiary">Console Audits</p>
                </div>
              </div>

              {/* System logs console mockup */}
              <div className="p-6 rounded-xl border border-border-light bg-[#090D16] text-emerald-500 font-mono text-[0.8rem] min-h-[180px]">
                <h4 className="text-white font-heading text-[0.9rem] mb-3">System Logs Telemetry</h4>
                <div className="flex flex-col gap-1.5">
                  <div>[18:33:14] INFO: Webpack initialization complete. SSL certificate binding secure.</div>
                  <div>[18:34:02] STACK: Redux telemetry node linked. AED, EUR parity index fetched.</div>
                  <div>[18:34:44] EVENT: Saved searches indexed for client_id: cl-829.</div>
                  <div>[18:35:10] CONSOLE: Agent Sophia Sterling scheduled a visitor gate pass.</div>
                  <div className="text-accent-gold">[18:35:50] ACTION: Database property update broadcast complete.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
