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
    <div className="dashboard-backdrop" onClick={onClose}>
      <div 
        className="dashboard-window glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}
      >
        {/* Left Console Navigation Sidebar */}
        <div className="dash-sidebar">
          <h3 style={{ fontSize: '1.25rem', letterSpacing: '0.1em' }}>AURA CONSOLE</h3>
          <p style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 'bold' }}>Secured Management Hub</p>

          <div className="dash-tabs">
            <button 
              onClick={() => setActiveTab('user')}
              className={`dash-tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            >
              <User size={16} /> Client Desk
            </button>
            <button 
              onClick={() => setActiveTab('agent')}
              className={`dash-tab-btn ${activeTab === 'agent' ? 'active' : ''}`}
            >
              <Briefcase size={16} /> Consultant Desk
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`dash-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            >
              <ShieldAlert size={16} /> Administrator Desk
            </button>
          </div>

          <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Database size={12} /> Live Node Connection
          </div>
        </div>

        {/* Right Panel Main Workspace */}
        <div className="dash-content">
          <div className="dash-header">
            <div>
              <h2 style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>
                {activeTab === 'user' && 'Investor Personal Office'}
                {activeTab === 'agent' && 'Certified Broker Workspace'}
                {activeTab === 'admin' && 'Enterprise System Telemetry'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                {activeTab === 'user' && 'Track your saved assets, luxury viewings, and alerts.'}
                {activeTab === 'agent' && 'Update property listings, monitor leads, and record closings.'}
                {activeTab === 'admin' && 'Monitor website traffic, inspect audits, and manage nodes.'}
              </p>
            </div>
            
            <button 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* VIEW: USER DASHBOARD */}
          {activeTab === 'user' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Stat Boxes */}
              <div className="stats-summary-row">
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem', color: 'var(--accent-gold)' }} className="luxury-number">Gold Tier</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Client Status</p>
                </div>
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">{wishlistIds.length} Assets</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Wishlist Size</p>
                </div>
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">1 Briefing</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Scheduled Visits</p>
                </div>
              </div>

              {/* Wishlist item rows */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={16} style={{ color: '#EF4444' }} /> Saved Luxury Assets
                </h3>
                {wishlistedItems.length === 0 ? (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>Your private portfolio is empty. Mark items on the home gallery to track them here.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {wishlistedItems.map(item => (
                      <div key={item.id} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <img src={item.images[0]} alt={item.title} style={{ width: '64px', height: '44px', objectFit: 'cover', borderRadius: '6px' }} />
                          <div>
                            <h4 style={{ fontSize: '0.95rem' }}>{item.title}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.location.city} • {item.type}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => onQuickView(item)} className="nav-icon-btn" title="Quick View"><Eye size={15} /></button>
                          <button onClick={() => onRemoveWishlist(item.id)} className="nav-icon-btn" style={{ color: '#EF4444' }} title="Delete"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved briefings scheduler tracking */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} style={{ color: 'var(--accent-gold-dark)' }} /> Scheduled Private Inquiries
                </h3>
                <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem' }}>The Obsidian Glass Oasis (Bel Air)</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>July 24, 2026 at 06:00 PM • Managed by Sophia Sterling</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-gold-dark)', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
                    Awaiting Gate Pass
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: AGENT DASHBOARD */}
          {activeTab === 'agent' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="stats-summary-row">
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem', color: 'var(--accent-gold)' }} className="luxury-number">$2.4M</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Pending Commission</p>
                </div>
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">12 Active</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Client Leads</p>
                </div>
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">{properties.length} Listings</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Total Managed</p>
                </div>
              </div>

              {/* Commission SVG graph */}
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} /> Lead Activity Chart
                </h4>
                <svg viewBox="0 0 400 100" style={{ width: '100%', height: '80px' }}>
                  <line x1="20" y1="90" x2="380" y2="90" stroke="var(--border-light)" strokeWidth="1" />
                  <path d="M 20 80 Q 80 40 140 60 T 260 20 T 380 50" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" />
                  <circle cx="260" cy="20" r="4" fill="var(--accent-gold)" />
                  <text x="260" y="12" fill="var(--text-primary)" fontSize="8" fontWeight="bold">Closing Peak</text>
                </svg>
              </div>

              {/* Form: Add Property */}
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlusCircle size={18} /> Post New Luxury Estate
                </h3>

                {successNotif && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={16} /> {successNotif}
                  </div>
                )}

                <form onSubmit={handleAddPropertySubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Estate Title</label>
                    <input 
                      type="text" 
                      required 
                      className="glass-input" 
                      placeholder="The Platinum Cascade Villa"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Valuation (USD)</label>
                    <input 
                      type="number" 
                      required 
                      className="glass-input" 
                      placeholder="35000000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Type</label>
                    <select 
                      className="glass-input"
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>City</label>
                    <select 
                      className="glass-input"
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

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button type="submit" className="luxury-gold-button shine-hover">
                      Broadcast Broadcast Listing
                    </button>
                  </div>
                </form>
              </div>

              {/* Table of active listings */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Database Active Placements</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-light)', textAlign: 'left' }}>
                        <th style={{ padding: '12px 6px', textAlign: 'left' }}>Asset</th>
                        <th style={{ padding: '12px 6px', textAlign: 'left' }}>Location</th>
                        <th style={{ padding: '12px 6px', textAlign: 'left' }}>Price</th>
                        <th style={{ padding: '12px 6px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '12px 6px', fontWeight: 600 }}>{p.title}</td>
                          <td style={{ padding: '12px 6px' }}>{p.location.city}</td>
                          <td style={{ padding: '12px 6px' }} className="luxury-number">${(p.price/1000000).toFixed(1)}M</td>
                          <td style={{ padding: '12px 6px', textAlign: 'right' }}>
                            <button 
                              onClick={() => onDeleteProperty(p.id)}
                              style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '6px' }}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="stats-summary-row">
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">48.2k</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Unique Visitors</p>
                </div>
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">100%</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Node Uptime</p>
                </div>
                <div className="summary-card glass-panel" style={{ background: 'var(--bg-secondary)' }}>
                  <h4 style={{ fontSize: '1.6rem' }} className="luxury-number">0 Errors</h4>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Console Audits</p>
                </div>
              </div>

              {/* System logs console mockup */}
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)', background: '#090D16', color: '#10B981', fontFamily: 'Courier, monospace', fontSize: '0.8rem', minHeight: '180px' }}>
                <h4 style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', marginBottom: '12px' }}>System Logs Telemetry</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>[18:33:14] INFO: Webpack initialization complete. SSL certificate binding secure.</div>
                  <div>[18:34:02] STACK: Redux telemetry node linked. AED, EUR parity index fetched.</div>
                  <div>[18:34:44] EVENT: Saved searches indexed for client_id: cl-829.</div>
                  <div>[18:35:10] CONSOLE: Agent Sophia Sterling scheduled a visitor gate pass.</div>
                  <div style={{ color: 'var(--accent-gold)' }}>[18:35:50] ACTION: Database property update broadcast complete.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
