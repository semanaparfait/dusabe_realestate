import React from 'react';
import { X } from 'lucide-react';
import { overlayClass, glassInputClass, fieldLabelClass, cancelBtnClass, saveBtnClass } from '@/pages/Admin/Modals/modalStyles';

interface PropertyModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  isOpen,
  editingId,
  form,
  setForm,
  onSave,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className={overlayClass}>
      <div className="w-full max-w-[750px] max-h-[90vh] overflow-y-auto bg-bg-secondary border border-border-light rounded-[20px] p-9 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[1.4rem] font-bold">
            {editingId ? 'Edit Property Listing' : 'Post New Luxury Property'}
          </h2>
          <button onClick={onClose} className="bg-transparent border-none text-text-primary cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Title</label>
            <input 
              type="text" 
              required 
              className={glassInputClass} 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Price (RWF)</label>
            <input 
              type="number" 
              required 
              className={glassInputClass} 
              value={form.price} 
              onChange={e => setForm({ ...form, price: Number(e.target.value) })} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Discount Price (0 if none)</label>
            <input 
              type="number" 
              className={glassInputClass} 
              value={form.discountPrice} 
              onChange={e => setForm({ ...form, discountPrice: Number(e.target.value) })} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Type</label>
            <select 
              className={glassInputClass} 
              value={form.type} 
              onChange={e => setForm({ ...form, type: e.target.value })}
            >
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
              <option value="Mansion">Mansion</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Status</label>
            <select 
              className={glassInputClass} 
              value={form.status} 
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Off-Market">Off-Market</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>City</label>
            <input 
              type="text" 
              required 
              className={glassInputClass} 
              value={form.city} 
              onChange={e => setForm({ ...form, city: e.target.value })} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Address</label>
            <input 
              type="text" 
              required 
              className={glassInputClass} 
              value={form.address} 
              onChange={e => setForm({ ...form, address: e.target.value })} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Bedrooms / Bathrooms</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Beds" 
                className={glassInputClass} 
                value={form.beds} 
                onChange={e => setForm({ ...form, beds: Number(e.target.value) })} 
              />
              <input 
                type="number" 
                placeholder="Baths" 
                className={glassInputClass} 
                value={form.baths} 
                onChange={e => setForm({ ...form, baths: Number(e.target.value) })} 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Area (sq ft)</label>
            <input 
              type="number" 
              className={glassInputClass} 
              value={form.area} 
              onChange={e => setForm({ ...form, area: Number(e.target.value) })} 
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Image URLs (comma separated)</label>
            <input 
              type="text" 
              className={glassInputClass} 
              value={form.images} 
              onChange={e => setForm({ ...form, images: e.target.value })} 
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Description</label>
            <textarea 
              rows={3} 
              className={glassInputClass} 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })} 
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-3">
            <button type="button" onClick={onClose} className={cancelBtnClass}>Cancel</button>
            <button type="submit" className={saveBtnClass}>Save Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
};