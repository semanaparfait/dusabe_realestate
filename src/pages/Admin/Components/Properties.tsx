import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import { type Property } from '@/data';

interface PropertiesTabProps {
  properties: Property[];
  onOpenNewProperty: () => void;
  onOpenEditProperty: (item: Property) => void;
  onDeleteProperty: (id: string, title: string) => void;
  onToggleFeaturedProperty: (id: string) => void;
}

export const PropertiesTab: React.FC<PropertiesTabProps> = ({
  properties,
  onOpenNewProperty,
  onOpenEditProperty,
  onDeleteProperty,
  onToggleFeaturedProperty
}) => {
  const [searchProperty, setSearchProperty] = useState('');

  const filteredProps = properties.filter(
    p => p.title.toLowerCase().includes(searchProperty.toLowerCase()) || 
         p.location.city.toLowerCase().includes(searchProperty.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Properties & Asset Listings</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Add, update pricing, change status, or toggle featured placements for all properties.</p>
        </div>

        <button 
          onClick={onOpenNewProperty}
          className="luxury-gold-button shine-hover"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Post New Luxury Estate
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input 
            type="text" 
            placeholder="Search listings by title, city, or address..."
            value={searchProperty}
            onChange={(e) => setSearchProperty(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
        </div>
      </div>

      <div className="glass-panel" style={{ borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '16px 20px' }}>Listing Asset</th>
              <th style={{ padding: '16px 12px' }}>Type</th>
              <th style={{ padding: '16px 12px' }}>Location</th>
              <th style={{ padding: '16px 12px' }}>Price</th>
              <th style={{ padding: '16px 12px' }}>Status</th>
              <th style={{ padding: '16px 12px' }}>Featured</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProps.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src={item.images[0]} alt={item.title} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.beds} Beds • {item.baths} Baths • {item.area.toLocaleString()} sqft</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <span style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{item.type}</span>
                </td>
                <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>
                  {item.location.city}, {item.location.district}
                </td>
                <td style={{ padding: '16px 12px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                  ${(item.price / 1000000).toFixed(2)}M
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <span style={{
                    background: item.status === 'For Sale' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                    color: item.status === 'For Sale' ? '#10B981' : '#60A5FA',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <button 
                    onClick={() => onToggleFeaturedProperty(item.id)}
                    style={{
                      background: item.isFeatured ? 'rgba(200, 122, 83, 0.2)' : 'var(--bg-tertiary)',
                      color: item.isFeatured ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                      border: '1px solid ' + (item.isFeatured ? 'var(--accent-gold)' : 'transparent'),
                      padding: '4px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.isFeatured ? '★ Featured' : 'Standard'}
                  </button>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => onOpenEditProperty(item)}
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
                      title="Edit Listing"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button 
                      onClick={() => onDeleteProperty(item.id, item.title)}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
                      title="Delete Listing"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};