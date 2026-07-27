import React, { useState } from 'react';
import { X, GitCompare, Eye, Check, Minus } from 'lucide-react';
import type { Property } from '../data';

interface CompareDrawerProps {
  compareIds: string[];
  properties: Property[];
  onRemoveCompare: (id: string) => void;
  onClearAll: () => void;
  currency: string;
  onQuickView: (property: Property) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  compareIds,
  properties,
  onRemoveCompare,
  onClearAll,
  currency,
  onQuickView
}) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const items = properties.filter(p => compareIds.includes(p.id));

  // Helper for Currency Conversion
  const formatPrice = (priceUSD: number) => {
    if (currency === 'RWF') {
      const converted = Math.round(priceUSD * 1400);
      if (converted >= 1000000000) {
        return `RWF ${(converted / 1000000000).toFixed(2)}B`;
      }
      return `RWF ${(converted / 1000000).toFixed(1)}M`;
    }
    if (priceUSD >= 1000000) {
      return `$${(priceUSD / 1000000).toFixed(1)}M`;
    }
    return `$${priceUSD.toLocaleString()}`;
  };

  if (compareIds.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Drawer Tray */}
      <div className="compare-drawer open">
        <div className="container compare-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <GitCompare size={20} className="text-secondary" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Compare Estates ({items.length}/3)</h4>
            </div>
            
            <div className="compare-list">
              {items.map(item => (
                <div key={item.id} className="compare-item-card">
                  <img src={item.images[0]} alt={item.title} className="compare-thumb" />
                  <span className="compare-title">{item.title.substring(0, 15)}...</span>
                  <button 
                    onClick={() => onRemoveCompare(item.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', display: 'flex', padding: '2px' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setShowMatrix(true)} 
              className="luxury-gold-button shine-hover"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              disabled={items.length < 2}
              title={items.length < 2 ? 'Select at least 2 properties' : ''}
            >
              Compare Matrix
            </button>
            <button 
              onClick={onClearAll} 
              className="outline-luxury-button"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Compare Matrix Modal */}
      {showMatrix && (
        <div className="compare-modal-backdrop" onClick={() => setShowMatrix(false)}>
          <div 
            className="compare-modal-window glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GitCompare size={24} style={{ color: 'var(--accent-gold)' }} />
                Detailed Comparison Matrix
              </h3>
              <button 
                onClick={() => setShowMatrix(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Attributes</th>
                    {items.map(item => (
                      <th key={item.id}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                          <span>{item.title}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Valuation</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="luxury-number" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-gold-dark)' }}>
                        {formatPrice(item.discountPrice || item.price)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Estate Type</strong></td>
                    {items.map(item => (
                      <td key={item.id}>{item.type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>City</strong></td>
                    {items.map(item => (
                      <td key={item.id}>{item.location.city}</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Amortization Specs</strong></td>
                    {items.map(item => (
                      <td key={item.id}>
                        {item.beds} beds • {item.baths} baths
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Area Space</strong></td>
                    {items.map(item => (
                      <td key={item.id}>{item.area.toLocaleString()} sq ft</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Year Built</strong></td>
                    {items.map(item => (
                      <td key={item.id}>{item.yearBuilt}</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Energy Class</strong></td>
                    {items.map(item => (
                      <td key={item.id}>
                        <span style={{ background: '#10B981', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {item.energyRating}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Walkability Index</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="luxury-number">{item.walkScore}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Infinity Pool</strong></td>
                    {items.map(item => (
                      <td key={item.id}>
                        {item.amenities.includes('Infinity Pool') ? <Check style={{ color: '#10B981' }} /> : <Minus style={{ color: 'var(--text-tertiary)' }} />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Private Cinema</strong></td>
                    {items.map(item => (
                      <td key={item.id}>
                        {item.amenities.includes('Private Cinema') ? <Check style={{ color: '#10B981' }} /> : <Minus style={{ color: 'var(--text-tertiary)' }} />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Wine Cellar</strong></td>
                    {items.map(item => (
                      <td key={item.id}>
                        {item.amenities.includes('Wine Cellar') ? <Check style={{ color: '#10B981' }} /> : <Minus style={{ color: 'var(--text-tertiary)' }} />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Actions</strong></td>
                    {items.map(item => (
                      <td key={item.id}>
                        <button 
                          onClick={() => {
                            setShowMatrix(false);
                            onQuickView(item);
                          }}
                          className="luxury-gold-button shine-hover"
                          style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Eye size={12} /> Inspect Listing
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
