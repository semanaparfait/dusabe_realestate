import React from 'react';
import { X } from 'lucide-react';
// import { type Property, type Agent, type Testimonial, type BlogPost } from '@/data';

interface AdminModalsProps {
  // Property
  propertyModalOpen: boolean;
  editingPropertyId: string | null;
  propForm: any;
  setPropForm: React.Dispatch<React.SetStateAction<any>>;
  onSaveProperty: (e: React.FormEvent) => void;
  onClosePropertyModal: () => void;

  // Agent
  agentModalOpen: boolean;
  editingAgentId: string | null;
  agentForm: any;
  setAgentForm: React.Dispatch<React.SetStateAction<any>>;
  onSaveAgent: (e: React.FormEvent) => void;
  onCloseAgentModal: () => void;

  // Testimonial
  testModalOpen: boolean;
  editingTestId: string | null;
  testForm: any;
  setTestForm: React.Dispatch<React.SetStateAction<any>>;
  onSaveTestimonial: (e: React.FormEvent) => void;
  onCloseTestModal: () => void;

  // Blog
  blogModalOpen: boolean;
  editingBlogId: string | null;
  blogForm: any;
  setBlogForm: React.Dispatch<React.SetStateAction<any>>;
  onSaveBlog: (e: React.FormEvent) => void;
  onCloseBlogModal: () => void;
}

const overlayClass = "fixed inset-0 z-[4000] bg-black/85 backdrop-blur-[8px] flex items-center justify-center p-5";
const glassInputClass = "bg-white/[0.08] border border-white/15 [[data-theme=dark]_&]:bg-[rgba(15,23,42,0.4)] [[data-theme=dark]_&]:border-white/8 rounded-lg text-text-primary py-3 px-4 outline-none font-sans [transition:all_var(--transition-fast)] focus:border-accent-gold focus:bg-white/15 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]";
const fieldLabelClass = "text-[0.75rem] font-semibold text-text-secondary";
const cancelBtnClass = "py-2.5 px-5 rounded-lg bg-transparent border border-border-light text-text-primary cursor-pointer";
const saveBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] py-2.5 px-6";

export const AdminModals: React.FC<AdminModalsProps> = ({
  propertyModalOpen, editingPropertyId, propForm, setPropForm, onSaveProperty, onClosePropertyModal,
  agentModalOpen, editingAgentId, agentForm, setAgentForm, onSaveAgent, onCloseAgentModal,
  testModalOpen, editingTestId, testForm, setTestForm, onSaveTestimonial, onCloseTestModal,
  blogModalOpen, editingBlogId, blogForm, setBlogForm, onSaveBlog, onCloseBlogModal
}) => {
  return (
    <>
      {/* Property Modal */}
      {propertyModalOpen && (
        <div className={overlayClass}>
          <div className="w-full max-w-[750px] max-h-[90vh] overflow-y-auto bg-bg-secondary border border-border-light rounded-[20px] p-9 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[1.4rem] font-bold">
                {editingPropertyId ? 'Edit Property Listing' : 'Post New Luxury Property'}
              </h2>
              <button onClick={onClosePropertyModal} className="bg-transparent border-none text-text-primary cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={onSaveProperty} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Title</label>
                <input type="text" required className={glassInputClass} value={propForm.title} onChange={e => setPropForm({ ...propForm, title: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Price (USD)</label>
                <input type="number" required className={glassInputClass} value={propForm.price} onChange={e => setPropForm({ ...propForm, price: Number(e.target.value) })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Discount Price (0 if none)</label>
                <input type="number" className={glassInputClass} value={propForm.discountPrice} onChange={e => setPropForm({ ...propForm, discountPrice: Number(e.target.value) })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Type</label>
                <select className={glassInputClass} value={propForm.type} onChange={e => setPropForm({ ...propForm, type: e.target.value })}>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mansion">Mansion</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Status</label>
                <select className={glassInputClass} value={propForm.status} onChange={e => setPropForm({ ...propForm, status: e.target.value })}>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Off-Market">Off-Market</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>City</label>
                <input type="text" required className={glassInputClass} value={propForm.city} onChange={e => setPropForm({ ...propForm, city: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Address</label>
                <input type="text" required className={glassInputClass} value={propForm.address} onChange={e => setPropForm({ ...propForm, address: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Bedrooms / Bathrooms</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Beds" className={glassInputClass} value={propForm.beds} onChange={e => setPropForm({ ...propForm, beds: Number(e.target.value) })} />
                  <input type="number" placeholder="Baths" className={glassInputClass} value={propForm.baths} onChange={e => setPropForm({ ...propForm, baths: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Area (sq ft)</label>
                <input type="number" className={glassInputClass} value={propForm.area} onChange={e => setPropForm({ ...propForm, area: Number(e.target.value) })} />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Image URLs (comma separated)</label>
                <input type="text" className={glassInputClass} value={propForm.images} onChange={e => setPropForm({ ...propForm, images: e.target.value })} />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Description</label>
                <textarea rows={3} className={glassInputClass} value={propForm.description} onChange={e => setPropForm({ ...propForm, description: e.target.value })} />
              </div>
              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button type="button" onClick={onClosePropertyModal} className={cancelBtnClass}>Cancel</button>
                <button type="submit" className={saveBtnClass}>Save Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agent Modal */}
      {agentModalOpen && (
        <div className={overlayClass}>
          <div className="w-full max-w-[600px] bg-bg-secondary border border-border-light rounded-[20px] p-9 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[1.4rem] font-bold">
                {editingAgentId ? 'Edit Advisor Profile' : 'Register New Advisor'}
              </h2>
              <button onClick={onCloseAgentModal} className="bg-transparent border-none text-text-primary cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={onSaveAgent} className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" required className={glassInputClass} value={agentForm.name} onChange={e => setAgentForm({ ...agentForm, name: e.target.value })} />
              <input type="text" placeholder="Role Title" required className={glassInputClass} value={agentForm.role} onChange={e => setAgentForm({ ...agentForm, role: e.target.value })} />
              <input type="text" placeholder="Photo URL" required className={glassInputClass} value={agentForm.image} onChange={e => setAgentForm({ ...agentForm, image: e.target.value })} />
              <textarea rows={3} placeholder="Bio" className={glassInputClass} value={agentForm.bio} onChange={e => setAgentForm({ ...agentForm, bio: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="Email" className={glassInputClass} value={agentForm.email} onChange={e => setAgentForm({ ...agentForm, email: e.target.value })} />
                <input type="text" placeholder="WhatsApp Number" className={glassInputClass} value={agentForm.whatsapp} onChange={e => setAgentForm({ ...agentForm, whatsapp: e.target.value })} />
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <button type="button" onClick={onCloseAgentModal} className={cancelBtnClass}>Cancel</button>
                <button type="submit" className={saveBtnClass}>Save Advisor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {testModalOpen && (
        <div className={overlayClass}>
          <div className="w-full max-w-[600px] bg-bg-secondary border border-border-light rounded-[20px] p-9 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[1.4rem] font-bold">
                {editingTestId ? 'Edit Endorsement' : 'Add Client Endorsement'}
              </h2>
              <button onClick={onCloseTestModal} className="bg-transparent border-none text-text-primary cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={onSaveTestimonial} className="flex flex-col gap-4">
              <input type="text" placeholder="Client Name" required className={glassInputClass} value={testForm.name} onChange={e => setTestForm({ ...testForm, name: e.target.value })} />
              <input type="text" placeholder="Role (e.g. Venture Capitalist)" required className={glassInputClass} value={testForm.role} onChange={e => setTestForm({ ...testForm, role: e.target.value })} />
              <input type="text" placeholder="Avatar Image URL" required className={glassInputClass} value={testForm.avatar} onChange={e => setTestForm({ ...testForm, avatar: e.target.value })} />
              <input type="text" placeholder="Purchased Property Title" required className={glassInputClass} value={testForm.propertyTitle} onChange={e => setTestForm({ ...testForm, propertyTitle: e.target.value })} />
              <textarea rows={3} placeholder="Testimonial Quote Comment" required className={glassInputClass} value={testForm.comment} onChange={e => setTestForm({ ...testForm, comment: e.target.value })} />
              <div className="flex justify-end gap-3 mt-3">
                <button type="button" onClick={onCloseTestModal} className={cancelBtnClass}>Cancel</button>
                <button type="submit" className={saveBtnClass}>Save Endorsement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {blogModalOpen && (
        <div className={overlayClass}>
          <div className="w-full max-w-[600px] bg-bg-secondary border border-border-light rounded-[20px] p-9 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[1.4rem] font-bold">
                {editingBlogId ? 'Edit Research Article' : 'Publish New Journal Article'}
              </h2>
              <button onClick={onCloseBlogModal} className="bg-transparent border-none text-text-primary cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={onSaveBlog} className="flex flex-col gap-4">
              <input type="text" placeholder="Article Title" required className={glassInputClass} value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} />
              <input type="text" placeholder="Category" required className={glassInputClass} value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} />
              <input type="text" placeholder="Author Name" required className={glassInputClass} value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} />
              <input type="text" placeholder="Cover Image URL" required className={glassInputClass} value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} />
              <textarea rows={3} placeholder="Executive Summary" required className={glassInputClass} value={blogForm.summary} onChange={e => setBlogForm({ ...blogForm, summary: e.target.value })} />
              <div className="flex justify-end gap-3 mt-3">
                <button type="button" onClick={onCloseBlogModal} className={cancelBtnClass}>Cancel</button>
                <button type="submit" className={saveBtnClass}>Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};