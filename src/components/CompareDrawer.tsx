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

const luxuryGoldBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";
const shineHoverClass = "after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]";
const outlineLuxuryBtnClass = "bg-transparent text-text-primary font-heading font-medium border-[1.5px] border-text-primary rounded-lg cursor-pointer [transition:background_var(--transition-fast),color_var(--transition-fast)] hover:bg-text-primary hover:text-bg-primary";

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
      <div className="fixed bottom-0 left-0 w-full translate-y-0 py-5 z-[1500] bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border-t border-[var(--glass-border)] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] [transition:transform_var(--transition-normal)]">
        <div className="max-w-[1400px] w-full mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-primary">
              <GitCompare size={20} />
              <h4 className="text-[0.95rem] font-bold">Compare Estates ({items.length}/3)</h4>
            </div>

            <div className="flex gap-5">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-black/5 [[data-theme=dark]_&]:bg-white/5 py-2 pr-4 pl-2 rounded-lg relative">
                  <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-md object-cover" />
                  <span className="font-heading text-[0.85rem] font-semibold">{item.title.substring(0, 15)}...</span>
                  <button
                    onClick={() => onRemoveCompare(item.id)}
                    className="bg-transparent border-none text-text-tertiary cursor-pointer flex p-0.5"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowMatrix(true)}
              data-compare-open-btn
              className={`${luxuryGoldBtnClass} ${shineHoverClass} py-2 px-5 text-[0.85rem]`}
              disabled={items.length < 2}
              title={items.length < 2 ? 'Select at least 2 properties' : ''}
            >
              Compare Matrix
            </button>
            <button
              onClick={onClearAll}
              className={`${outlineLuxuryBtnClass} py-2 px-5 text-[0.85rem]`}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Compare Matrix Modal */}
      {showMatrix && (
        <div className="fixed inset-0 bg-[rgba(9,13,22,0.9)] backdrop-blur-[8px] z-[2200] flex justify-center items-center p-10" onClick={() => setShowMatrix(false)}>
          <div
            className="w-full max-w-[900px] rounded-2xl p-10 max-h-[80vh] overflow-y-auto bg-bg-primary border border-border-light"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-border-light pb-4 mb-5">
              <h3 className="text-[1.5rem] flex items-center gap-2">
                <GitCompare size={24} className="text-accent-gold" />
                Detailed Comparison Matrix
              </h3>
              <button
                onClick={() => setShowMatrix(false)}
                className="bg-transparent border-none text-text-primary cursor-pointer flex"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse mt-6">
                <thead>
                  <tr>
                    <th className="border-b border-border-light p-4 text-left font-heading font-bold">Attributes</th>
                    {items.map(item => (
                      <th key={item.id} className="border-b border-border-light p-4 text-left font-heading font-bold">
                        <div className="flex flex-col gap-2">
                          <img src={item.images[0]} alt={item.title} className="w-full h-[100px] object-cover rounded-lg" />
                          <span>{item.title}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Valuation</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left font-serif italic text-[1.25rem] font-bold text-accent-gold-dark">
                        {formatPrice(item.discountPrice || item.price)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Estate Type</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">{item.type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>City</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">{item.location.city}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Amortization Specs</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">
                        {item.beds} beds • {item.baths} baths
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Area Space</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">{item.area.toLocaleString()} sq ft</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Year Built</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">{item.yearBuilt}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Energy Class</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">
                        <span className="bg-emerald-500 text-white py-0.5 px-1.5 rounded text-[0.75rem] font-bold">
                          {item.energyRating}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Walkability Index</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left font-serif italic text-accent-gold">{item.walkScore}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Infinity Pool</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">
                        {item.amenities.includes('Infinity Pool') ? <Check className="text-emerald-500" /> : <Minus className="text-text-tertiary" />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Private Cinema</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">
                        {item.amenities.includes('Private Cinema') ? <Check className="text-emerald-500" /> : <Minus className="text-text-tertiary" />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Wine Cellar</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">
                        {item.amenities.includes('Wine Cellar') ? <Check className="text-emerald-500" /> : <Minus className="text-text-tertiary" />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-b border-border-light p-4 text-left"><strong>Actions</strong></td>
                    {items.map(item => (
                      <td key={item.id} className="border-b border-border-light p-4 text-left">
                        <button
                          onClick={() => {
                            setShowMatrix(false);
                            onQuickView(item);
                          }}
                          className={`${luxuryGoldBtnClass} ${shineHoverClass} py-1.5 px-3 text-[0.75rem] flex items-center gap-1`}
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
