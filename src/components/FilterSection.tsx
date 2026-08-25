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

const glassInputClass = "w-full p-2.5 bg-white/[0.08] border border-white/15 [[data-theme=dark]_&]:bg-[rgba(15,23,42,0.4)] [[data-theme=dark]_&]:border-white/8 rounded-lg text-text-primary outline-none font-sans [transition:all_var(--transition-fast)] focus:border-accent-gold focus:bg-white/15 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]";

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
    <aside className="bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] py-[30px] px-6 rounded-2xl sticky top-[100px]">
      <div className="flex justify-between items-center mb-6 border-b border-border-light pb-4">
        <h3 className="text-[1.15rem] flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filter Estates
        </h3>
        <button
          onClick={onReset}
          className="bg-transparent border-none text-accent-gold-dark flex items-center gap-1 cursor-pointer text-[0.85rem] font-semibold"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Group: Status */}
      <div className="mb-6">
        <label className="font-heading text-[0.85rem] font-bold uppercase tracking-[0.05em] text-text-primary mb-3 flex justify-between items-center">Status</label>
        <select
          className={glassInputClass}
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
        >
          <option value="">Any Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
      </div>

      {/* Group: City */}
      <div className="mb-6">
        <label className="font-heading text-[0.85rem] font-bold uppercase tracking-[0.05em] text-text-primary mb-3 flex justify-between items-center">City</label>
        <select
          className={glassInputClass}
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
      <div className="mb-6">
        <label className="font-heading text-[0.85rem] font-bold uppercase tracking-[0.05em] text-text-primary mb-3 flex justify-between items-center">Estate Type</label>
        <select
          className={glassInputClass}
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
      <div className="mb-6">
        <div className="font-heading text-[0.85rem] font-bold uppercase tracking-[0.05em] text-text-primary mb-3 flex justify-between items-center">
          <span>Max Price</span>
          <span className="font-serif italic text-accent-gold text-[0.9rem]">
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
          className="w-full accent-accent-gold cursor-pointer"
        />
        <div className="flex justify-between text-[0.8rem] text-text-secondary mt-1.5">
          <span>$100K</span>
          <span>$80M</span>
        </div>
      </div>

      {/* Group: Area Range */}
      <div className="mb-6">
        <div className="font-heading text-[0.85rem] font-bold uppercase tracking-[0.05em] text-text-primary mb-3 flex justify-between items-center">
          <span>Max Area</span>
          <span className="font-serif italic text-accent-gold text-[0.9rem]">
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
          className="w-full accent-accent-gold cursor-pointer"
        />
        <div className="flex justify-between text-[0.8rem] text-text-secondary mt-1.5">
          <span>1k sqft</span>
          <span>50k sqft</span>
        </div>
      </div>
    </aside>
  );
};
