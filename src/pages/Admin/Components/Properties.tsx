import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from 'firebase/firestore';
import type { Property} from "@/pages/Admin/AdminTypes/AdminTypes";



interface PropertiesTabProps {
  onOpenNewProperty: () => void;
  onOpenEditProperty: (item: Property) => void;
  onDeleteProperty: (id: string, title: string) => void;
}

const newListingBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] flex items-center gap-2 px-6 py-3 text-[0.85rem]";

export const PropertiesTab: React.FC<PropertiesTabProps> = ({
  onOpenNewProperty,
  onOpenEditProperty,
  onDeleteProperty
}) => {
  const [searchProperty, setSearchProperty] = useState('');
  const [items, setItems] = useState<Property[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'properties'), (snapshot) => {
      const itemss = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      } as Property));
      setItems(itemss);
    });

    return () => unsubscribe();
  }, []);

  const filteredProps = items.filter(
    p => p.title.toLowerCase().includes(searchProperty.toLowerCase()) ||
         p.city.toLowerCase().includes(searchProperty.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-[1.5rem] sm:text-[1.8rem] font-heading font-bold">Properties & Asset Listings</h1>
          <p className="text-[0.85rem] text-text-tertiary mt-1">Add, update pricing, change status, or toggle featured placements for all properties.</p>
        </div>

        <button
          onClick={onOpenNewProperty}
          className={`${newListingBtnClass} w-fit`}
        >
          <Plus size={16} /> Post New Luxury Estate
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search listings by title, city, or address..."
            value={searchProperty}
            onChange={(e) => setSearchProperty(e.target.value)}
            className="w-full py-3 pr-4 pl-12 rounded-[10px] border border-border-light bg-bg-secondary text-text-primary outline-none text-[0.9rem]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border-light bg-bg-secondary overflow-x-auto [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
        <table className="w-full min-w-[960px] border-collapse text-[0.85rem] text-left">
          <thead>
            <tr className="bg-bg-tertiary border-b border-border-light text-text-tertiary uppercase tracking-[0.05em]">
              <th className="py-4 px-5">Listing Asset</th>
              <th className="py-4 px-3">Type</th>
              <th className="py-4 px-3">Location</th>
              <th className="py-4 px-3">Price</th>
              <th className="py-4 px-3">Status</th>
              <th className="py-4 px-3">Posted By</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProps.map(item => (
              <tr key={item.uid} className="border-b border-border-light [transition:background_0.2s]">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3.5">
                    <img src={item.images[0]} alt={item.title} className="w-14 h-10 object-cover rounded-[6px]" />
                    <div>
                      <div className="font-semibold text-text-primary text-[0.95rem]">{item.title}</div>
                      <div className="text-[0.75rem] text-text-tertiary">{item.beds} Beds • {item.baths} Baths • {item.area.toLocaleString()} sqft</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <span className="bg-bg-tertiary text-text-secondary py-1 px-2.5 rounded text-[0.75rem] font-semibold">{item.type}</span>
                </td>
                <td className="py-4 px-3 text-text-secondary">
                  {item.city}, 
                  {/* {item.district} */}
                </td>
                <td className="py-4 px-3 font-bold text-accent-gold">
                  RWF {(item.price / 1000000).toFixed(2)}M
                </td>
                <td className="py-4 px-3">
                  <span className={`${item.status === 'For Sale' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-blue-400/15 text-blue-400'} py-1 px-2.5 rounded text-[0.75rem] font-bold`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-3 text-text-secondary">
                  {item.postedBy?.name || item.postedBy?.displayName || item.postedBy?.email || (
                    <span className="text-text-tertiary italic">Unknown</span>
                  )}
                </td>

                <td className="py-4 px-5 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onOpenEditProperty(item)}
                      className="bg-bg-tertiary border border-border-light text-text-primary py-1.5 px-2.5 rounded-md cursor-pointer"
                      title="Edit Listing"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => onDeleteProperty(item.uid, item.title)}
                      className="bg-red-500/15 border-none text-red-500 py-1.5 px-2.5 rounded-md cursor-pointer"
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