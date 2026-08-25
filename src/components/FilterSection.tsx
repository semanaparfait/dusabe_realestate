import React from 'react';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

interface FilterState {
  city: string;
  type: string;
  beds: number | '';
  baths: number | '';
  status: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  parking: number | '';
  furnished: boolean | null;
  amenities: string[];
}

interface FilterSectionProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onReset: () => void;
}

const AMENITIES_LIST = [
  'Infinity Pool',
  'Private Cinema',
  'Wine Cellar',
  'Smart Home System',
  'Helipad',
  'Private Gym',
  'Private Beach Access',
  'Sauna',
  'Tesla Battery System'
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onChangeFilters,
  onReset
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onChangeFilters({
      ...filters,
      [key]: value
    });
  };

  const handleAmenityChange = (amenity: string) => {
    const isSelected = filters.amenities.includes(amenity);
    const updated = isSelected 
      ? filters.amenities.filter(item => item !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', updated);
  };

  return (
    <aside className="glass-panel filters-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={18} className="text-secondary" />
          Filter Estates
        </h3>
        <button 
          onClick={onReset}
          style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold-dark)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Group: Status */}
      <div className="filter-group">
        <label className="filter-group-title">Status</label>
        <select 
          className="glass-input" 
          style={{ width: '100%', padding: '10px' }}
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
        >
          <option value="">Any Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
      </div>

      {/* Group: City */}
      <div className="filter-group">
        <label className="filter-group-title">City</label>
        <select 
          className="glass-input" 
          style={{ width: '100%', padding: '10px' }}
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
        >
          <option value="">All Cities</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Malibu">Malibu</option>
          <option value="New York">New York</option>
          <option value="Palm Springs">Palm Springs</option>
          <option value="Miami">Miami</option>
          <option value="Tokyo">Tokyo</option>
        </select>
      </div>

      {/* Group: Type */}
      <div className="filter-group">
        <label className="filter-group-title">Estate Type</label>
        <select 
          className="glass-input" 
          style={{ width: '100%', padding: '10px' }}
          value={filters.type}
          onChange={(e) => updateFilter('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Mansion">Mansion</option>
          <option value="Villa">Villa</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Apartment">Apartment</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* Group: Price Slider */}
      <div className="filter-group">
        <div className="filter-group-title">
          <span>Max Price</span>
          <span className="luxury-number" style={{ fontSize: '0.9rem' }}>
            ${(filters.maxPrice / 1000000).toFixed(1)}M
          </span>
        </div>
        <input 
          type="range" 
          min={100000} 
          max={80000000} 
          step={500000}
          value={filters.maxPrice} 
          onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value))}
          className="range-slider"
        />
        <div className="slider-labels">
          <span>$100K</span>
          <span>$80M</span>
        </div>
      </div>



      {/* Group: Area Range */}
      <div className="filter-group">
        <div className="filter-group-title">
          <span>Max Area</span>
          <span className="luxury-number" style={{ fontSize: '0.9rem' }}>
            {filters.maxArea.toLocaleString()} sq ft
          </span>
        </div>
        <input 
          type="range" 
          min={1000} 
          max={50000} 
          step={1000}
          value={filters.maxArea} 
          onChange={(e) => updateFilter('maxArea', parseInt(e.target.value))}
          className="range-slider"
        />
        <div className="slider-labels">
          <span>1k sqft</span>
          <span>50k sqft</span>
        </div>
      </div>




    </aside>
  );
};
