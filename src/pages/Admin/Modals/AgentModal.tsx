import React from 'react';
import { X } from 'lucide-react';
import { overlayClass, glassInputClass, cancelBtnClass, saveBtnClass } from '@/pages/Admin/Modals/modalStyles';

interface AgentModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({
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
      <div className="w-full max-w-[600px] bg-bg-secondary border border-border-light rounded-[20px] p-6 sm:p-9 max-h-[90vh] overflow-y-auto [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[1.4rem] font-bold">
            {editingId ? 'Edit Advisor Profile' : 'Register New Advisor'}
          </h2>
          <button onClick={onClose} className="bg-transparent border-none text-text-primary cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            className={glassInputClass} 
            value={form.name} 
            onChange={e => setForm({ ...form, name: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Role Title" 
            required 
            className={glassInputClass} 
            value={form.role} 
            onChange={e => setForm({ ...form, role: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Photo URL" 
            required 
            className={glassInputClass} 
            value={form.image} 
            onChange={e => setForm({ ...form, image: e.target.value })} 
          />
          <textarea 
            rows={3} 
            placeholder="Bio" 
            className={glassInputClass} 
            value={form.bio} 
            onChange={e => setForm({ ...form, bio: e.target.value })} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="email" 
              placeholder="Email" 
              className={glassInputClass} 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="WhatsApp Number" 
              className={glassInputClass} 
              value={form.whatsapp} 
              onChange={e => setForm({ ...form, whatsapp: e.target.value })} 
            />
          </div>

          <div className="flex justify-end gap-3 mt-3">
            <button type="button" onClick={onClose} className={cancelBtnClass}>Cancel</button>
            <button type="submit" className={saveBtnClass}>Save Advisor</button>
          </div>
        </form>
      </div>
    </div>
  );
};