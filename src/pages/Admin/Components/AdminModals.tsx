import React from 'react';
import { X } from 'lucide-react';
import { type Property, type Agent, type Testimonial, type BlogPost } from '@/data';

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
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingPropertyId ? 'Edit Property Listing' : 'Post New Luxury Property'}
              </h2>
              <button onClick={onClosePropertyModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={onSaveProperty} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Title</label>
                <input type="text" required className="glass-input" value={propForm.title} onChange={e => setPropForm({ ...propForm, title: e.target.value })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Price (USD)</label>
                <input type="number" required className="glass-input" value={propForm.price} onChange={e => setPropForm({ ...propForm, price: Number(e.target.value) })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Discount Price (0 if none)</label>
                <input type="number" className="glass-input" value={propForm.discountPrice} onChange={e => setPropForm({ ...propForm, discountPrice: Number(e.target.value) })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Type</label>
                <select className="glass-input" value={propForm.type} onChange={e => setPropForm({ ...propForm, type: e.target.value })}>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mansion">Mansion</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</label>
                <select className="glass-input" value={propForm.status} onChange={e => setPropForm({ ...propForm, status: e.target.value })}>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Off-Market">Off-Market</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>City</label>
                <input type="text" required className="glass-input" value={propForm.city} onChange={e => setPropForm({ ...propForm, city: e.target.value })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Address</label>
                <input type="text" required className="glass-input" value={propForm.address} onChange={e => setPropForm({ ...propForm, address: e.target.value })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Bedrooms / Bathrooms</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" placeholder="Beds" className="glass-input" value={propForm.beds} onChange={e => setPropForm({ ...propForm, beds: Number(e.target.value) })} />
                  <input type="number" placeholder="Baths" className="glass-input" value={propForm.baths} onChange={e => setPropForm({ ...propForm, baths: Number(e.target.value) })} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Area (sq ft)</label>
                <input type="number" className="glass-input" value={propForm.area} onChange={e => setPropForm({ ...propForm, area: Number(e.target.value) })} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Image URLs (comma separated)</label>
                <input type="text" className="glass-input" value={propForm.images} onChange={e => setPropForm({ ...propForm, images: e.target.value })} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Description</label>
                <textarea rows={3} className="glass-input" value={propForm.description} onChange={e => setPropForm({ ...propForm, description: e.target.value })} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={onClosePropertyModal} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Save Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agent Modal */}
      {agentModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingAgentId ? 'Edit Advisor Profile' : 'Register New Advisor'}
              </h2>
              <button onClick={onCloseAgentModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={onSaveAgent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Full Name" required className="glass-input" value={agentForm.name} onChange={e => setAgentForm({ ...agentForm, name: e.target.value })} />
              <input type="text" placeholder="Role Title" required className="glass-input" value={agentForm.role} onChange={e => setAgentForm({ ...agentForm, role: e.target.value })} />
              <input type="text" placeholder="Photo URL" required className="glass-input" value={agentForm.image} onChange={e => setAgentForm({ ...agentForm, image: e.target.value })} />
              <textarea rows={3} placeholder="Bio" className="glass-input" value={agentForm.bio} onChange={e => setAgentForm({ ...agentForm, bio: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input type="email" placeholder="Email" className="glass-input" value={agentForm.email} onChange={e => setAgentForm({ ...agentForm, email: e.target.value })} />
                <input type="text" placeholder="WhatsApp Number" className="glass-input" value={agentForm.whatsapp} onChange={e => setAgentForm({ ...agentForm, whatsapp: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={onCloseAgentModal} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Save Advisor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {testModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingTestId ? 'Edit Endorsement' : 'Add Client Endorsement'}
              </h2>
              <button onClick={onCloseTestModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={onSaveTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Client Name" required className="glass-input" value={testForm.name} onChange={e => setTestForm({ ...testForm, name: e.target.value })} />
              <input type="text" placeholder="Role (e.g. Venture Capitalist)" required className="glass-input" value={testForm.role} onChange={e => setTestForm({ ...testForm, role: e.target.value })} />
              <input type="text" placeholder="Avatar Image URL" required className="glass-input" value={testForm.avatar} onChange={e => setTestForm({ ...testForm, avatar: e.target.value })} />
              <input type="text" placeholder="Purchased Property Title" required className="glass-input" value={testForm.propertyTitle} onChange={e => setTestForm({ ...testForm, propertyTitle: e.target.value })} />
              <textarea rows={3} placeholder="Testimonial Quote Comment" required className="glass-input" value={testForm.comment} onChange={e => setTestForm({ ...testForm, comment: e.target.value })} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={onCloseTestModal} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Save Endorsement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {blogModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingBlogId ? 'Edit Research Article' : 'Publish New Journal Article'}
              </h2>
              <button onClick={onCloseBlogModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={onSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Article Title" required className="glass-input" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} />
              <input type="text" placeholder="Category" required className="glass-input" value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} />
              <input type="text" placeholder="Author Name" required className="glass-input" value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} />
              <input type="text" placeholder="Cover Image URL" required className="glass-input" value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} />
              <textarea rows={3} placeholder="Executive Summary" required className="glass-input" value={blogForm.summary} onChange={e => setBlogForm({ ...blogForm, summary: e.target.value })} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={onCloseBlogModal} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};