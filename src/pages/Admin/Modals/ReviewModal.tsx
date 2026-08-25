import React from 'react';
import { X } from 'lucide-react';
import { overlayClass, glassInputClass, cancelBtnClass, saveBtnClass } from '@/pages/Admin/Modals/modalStyles';

interface ReviewModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
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
      <div className="w-full max-w-[600px] bg-bg-secondary border border-border-light rounded-[20px] p-9 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[1.4rem] font-bold">
            {editingId ? 'Edit Endorsement' : 'Add Client Endorsement'}
          </h2>
          <button onClick={onClose} className="bg-transparent border-none text-text-primary cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Client Name" 
            required 
            className={glassInputClass} 
            value={form.name} 
            onChange={e => setForm({ ...form, name: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Role (e.g. Venture Capitalist)" 
            required 
            className={glassInputClass} 
            value={form.role} 
            onChange={e => setForm({ ...form, role: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Avatar Image URL" 
            required 
            className={glassInputClass} 
            value={form.avatar} 
            onChange={e => setForm({ ...form, avatar: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Purchased Property Title" 
            required 
            className={glassInputClass} 
            value={form.propertyTitle} 
            onChange={e => setForm({ ...form, propertyTitle: e.target.value })} 
          />
          <textarea 
            rows={3} 
            placeholder="Testimonial Quote Comment" 
            required 
            className={glassInputClass} 
            value={form.comment} 
            onChange={e => setForm({ ...form, comment: e.target.value })} 
          />

          <div className="flex justify-end gap-3 mt-3">
            <button type="button" onClick={onClose} className={cancelBtnClass}>Cancel</button>
            <button type="submit" className={saveBtnClass}>Save Endorsement</button>
          </div>
        </form>
      </div>
    </div>
  );
};