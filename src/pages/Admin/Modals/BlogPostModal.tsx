import React from 'react';
import { X } from 'lucide-react';
import { overlayClass, glassInputClass, cancelBtnClass, saveBtnClass } from '@/pages/Admin/Modals/modalStyles';

interface BlogPostModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
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
            {editingId ? 'Edit Research Article' : 'Publish New Journal Article'}
          </h2>
          <button onClick={onClose} className="bg-transparent border-none text-text-primary cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Article Title" 
            required 
            className={glassInputClass} 
            value={form.title} 
            onChange={e => setForm({ ...form, title: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Category" 
            required 
            className={glassInputClass} 
            value={form.category} 
            onChange={e => setForm({ ...form, category: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Author Name" 
            required 
            className={glassInputClass} 
            value={form.author} 
            onChange={e => setForm({ ...form, author: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Cover Image URL" 
            required 
            className={glassInputClass} 
            value={form.image} 
            onChange={e => setForm({ ...form, image: e.target.value })} 
          />
          <textarea 
            rows={3} 
            placeholder="Executive Summary" 
            required 
            className={glassInputClass} 
            value={form.summary} 
            onChange={e => setForm({ ...form, summary: e.target.value })} 
          />

          <div className="flex justify-end gap-3 mt-3">
            <button type="button" onClick={onClose} className={cancelBtnClass}>Cancel</button>
            <button type="submit" className={saveBtnClass}>Publish Article</button>
          </div>
        </form>
      </div>
    </div>
  );
};