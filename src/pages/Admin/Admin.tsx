import React, { useState } from 'react';
import { 
  Activity, 
  Building2, 
  Users, 
  Star, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';
import { 
  type Property, 
  type Agent, 
  type Testimonial, 
  type BlogPost,
  PROPERTIES,
  AGENTS,
  TESTIMONIALS,
  BLOG_POSTS
} from '@/data';

import { DashboardOverview } from '@/pages/Admin/Components/Dashboard';
import { PropertiesTab } from '@/pages/Admin/Components/Properties';
import { AgentsTab } from '@/pages/Admin/Components/Agents';
import { ReviewsTab } from '@/pages/Admin/Components/Reviews';
import { BlogPostTab } from '@/pages/Admin/Components/BlogPost';
import { SystemSettingsTab } from '@/pages/Admin/Components/SystemSettings';
import { AdminModals } from '@/pages/Admin/Components/AdminModals';

export const AdminPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'agents' | 'testimonials' | 'blogs' | 'settings'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Property Modal State
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [propForm, setPropForm] = useState({
    title: '',
    type: 'Villa' as Property['type'],
    price: 5000000,
    discountPrice: 0,
    city: 'Miami',
    district: 'Biscayne',
    neighborhood: 'Waterfront',
    address: '100 Ocean Blvd',
    beds: 4,
    baths: 5,
    area: 6000,
    parking: 3,
    status: 'For Sale' as Property['status'],
    isFeatured: true,
    description: '',
    images: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    amenities: 'Infinity Pool, Smart Home, Private Gym, Wine Cellar',
    agentId: 'agent-1'
  });

  const handleOpenNewProperty = () => {
    setEditingPropertyId(null);
    setPropForm({
      title: '',
      type: 'Villa',
      price: 12500000,
      discountPrice: 0,
      city: 'Los Angeles',
      district: 'Bel Air',
      neighborhood: 'Stone Canyon',
      address: '777 Sunset Ridge',
      beds: 5,
      baths: 6,
      area: 8500,
      parking: 4,
      status: 'For Sale',
      isFeatured: true,
      description: 'A brand-new architectural sanctuary boasting ultra-high ceiling glass panels and bespoke finishes.',
      images: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Infinity Pool, Private Cinema, Wine Cellar, Smart Home System',
      agentId: agents[0]?.id || 'agent-1'
    });
    setPropertyModalOpen(true);
  };

  const handleOpenEditProperty = (item: Property) => {
    setEditingPropertyId(item.id);
    setPropForm({
      title: item.title,
      type: item.type,
      price: item.price,
      discountPrice: item.discountPrice || 0,
      city: item.location.city,
      district: item.location.district,
      neighborhood: item.location.neighborhood,
      address: item.location.address,
      beds: item.beds,
      baths: item.baths,
      area: item.area,
      parking: item.parking,
      status: item.status,
      isFeatured: item.isFeatured,
      description: item.description,
      images: item.images.join(', '),
      amenities: item.amenities.join(', '),
      agentId: item.agentId
    });
    setPropertyModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const imageList = propForm.images.split(',').map((s: string) => s.trim()).filter(Boolean);
    const amenityList = propForm.amenities.split(',').map((s: string) => s.trim()).filter(Boolean);

    if (editingPropertyId) {
      setProperties(prev => prev.map(p => (p.id === editingPropertyId ? {
        ...p,
        title: propForm.title,
        type: propForm.type,
        price: Number(propForm.price),
        discountPrice: propForm.discountPrice > 0 ? Number(propForm.discountPrice) : undefined,
        location: {
          ...p.location,
          city: propForm.city,
          district: propForm.district,
          neighborhood: propForm.neighborhood,
          address: propForm.address
        },
        beds: Number(propForm.beds),
        baths: Number(propForm.baths),
        area: Number(propForm.area),
        parking: Number(propForm.parking),
        status: propForm.status,
        isFeatured: propForm.isFeatured,
        description: propForm.description,
        images: imageList.length > 0 ? imageList : p.images,
        amenities: amenityList.length > 0 ? amenityList : p.amenities,
        agentId: propForm.agentId
      } : p)));
      showToast(`Property "${propForm.title}" updated successfully.`);
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title: propForm.title,
        type: propForm.type,
        price: Number(propForm.price),
        discountPrice: propForm.discountPrice > 0 ? Number(propForm.discountPrice) : undefined,
        location: {
          city: propForm.city,
          district: propForm.district,
          neighborhood: propForm.neighborhood,
          address: propForm.address
        },
        beds: Number(propForm.beds),
        baths: Number(propForm.baths),
        area: Number(propForm.area),
        parking: Number(propForm.parking),
        yearBuilt: 2026,
        status: propForm.status,
        rating: 5.0,
        isFeatured: propForm.isFeatured,
        images: imageList.length > 0 ? imageList : ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
        agentId: propForm.agentId,
        amenities: amenityList.length > 0 ? amenityList : ['Infinity Pool', 'Smart Home System'],
        description: propForm.description,
        walkScore: 88,
        transitScore: 78,
        energyRating: 'A++',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        virtualTourUrl: '',
        mapCoords: { x: 50, y: 50 }
      };
      setProperties(prev => [newProp, ...prev]);
      showToast(`New Listing "${propForm.title}" broadcasted to database.`);
    }
    setPropertyModalOpen(false);
  };

  const handleDeleteProperty = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove listing "${title}"?`)) {
      setProperties(prev => prev.filter(p => p.id !== id));
      showToast(`Property "${title}" deleted.`);
    }
  };

  const handleToggleFeaturedProperty = (id: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    showToast('Featured status updated.');
  };

  // Agent Modal State
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [agentForm, setAgentForm] = useState({
    name: '',
    role: '',
    experience: '10 Years',
    rating: 5.0,
    image: '',
    bio: '',
    whatsapp: '',
    email: '',
    phone: ''
  });

  const handleOpenNewAgent = () => {
    setEditingAgentId(null);
    setAgentForm({
      name: '',
      role: 'Luxury Portfolio Director',
      experience: '8 Years',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Specializing in international high-net-worth real estate transactions.',
      whatsapp: '+13105550999',
      email: 'consultant@auraestates.com',
      phone: '+1 (310) 555-0999'
    });
    setAgentModalOpen(true);
  };

  const handleOpenEditAgent = (agent: Agent) => {
    setEditingAgentId(agent.id);
    setAgentForm({
      name: agent.name,
      role: agent.role,
      experience: agent.experience,
      rating: agent.rating,
      image: agent.image,
      bio: agent.bio,
      whatsapp: agent.whatsapp,
      email: agent.email,
      phone: agent.phone
    });
    setAgentModalOpen(true);
  };

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAgentId) {
      setAgents(prev => prev.map(a => a.id === editingAgentId ? { ...a, ...agentForm } : a));
      showToast(`Agent profile "${agentForm.name}" updated.`);
    } else {
      setAgents(prev => [...prev, { id: `agent-${Date.now()}`, ...agentForm }]);
      showToast(`Agent "${agentForm.name}" added to AURA Advising Group.`);
    }
    setAgentModalOpen(false);
  };

  const handleDeleteAgent = (id: string, name: string) => {
    if (window.confirm(`Delete agent profile "${name}"?`)) {
      setAgents(prev => prev.filter(a => a.id !== id));
      showToast(`Agent "${name}" removed.`);
    }
  };

  // Testimonials Modal State
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [testForm, setTestForm] = useState({
    name: '',
    role: '',
    avatar: '',
    rating: 5,
    comment: '',
    propertyTitle: ''
  });

  const handleOpenNewTestimonial = () => {
    setEditingTestId(null);
    setTestForm({
      name: '',
      role: 'Private Investor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment: 'An extraordinary advisory team that handled our estate purchase with unmatched privacy.',
      propertyTitle: properties[0]?.title || 'Aura Waterfront Estate'
    });
    setTestModalOpen(true);
  };

  const handleOpenEditTestimonial = (t: Testimonial) => {
    setEditingTestId(t.id);
    setTestForm({
      name: t.name,
      role: t.role,
      avatar: t.avatar,
      rating: t.rating,
      comment: t.comment,
      propertyTitle: t.propertyTitle
    });
    setTestModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestId) {
      setTestimonials(prev => prev.map(t => t.id === editingTestId ? { ...t, ...testForm } : t));
      showToast(`Testimonial by "${testForm.name}" updated.`);
    } else {
      setTestimonials(prev => [...prev, { id: `test-${Date.now()}`, ...testForm }]);
      showToast(`Testimonial by "${testForm.name}" published.`);
    }
    setTestModalOpen(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Delete this client endorsement?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      showToast('Testimonial removed.');
    }
  };

  // Blog Modal State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Architecture',
    author: 'Sophia Sterling',
    date: 'August 2026',
    readTime: '5 min read',
    image: '',
    summary: ''
  });

  const handleOpenNewBlog = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: '',
      category: 'Market Trends',
      author: 'Marcus Vance',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      summary: 'Analysis of ultra-luxury property capital flows into trophy waterfront sanctuaries.'
    });
    setBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogForm({
      title: b.title,
      category: b.category,
      author: b.author,
      date: b.date,
      readTime: b.readTime,
      image: b.image,
      summary: b.summary
    });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlogId) {
      setBlogPosts(prev => prev.map(b => b.id === editingBlogId ? { ...b, ...blogForm } : b));
      showToast(`Article "${blogForm.title}" updated.`);
    } else {
      setBlogPosts(prev => [ { id: `blog-${Date.now()}`, ...blogForm }, ...prev]);
      showToast(`Article "${blogForm.title}" published to AURA Journals.`);
    }
    setBlogModalOpen(false);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      setBlogPosts(prev => prev.filter(b => b.id !== id));
      showToast(`Article deleted.`);
    }
  };

  // System Settings Handlers
  const handleResetDatabase = () => {
    if (window.confirm('Reset all properties, agents, testimonials, and articles back to default initial values?')) {
      setProperties(PROPERTIES);
      setAgents(AGENTS);
      setTestimonials(TESTIMONIALS);
      setBlogPosts(BLOG_POSTS);
      showToast('Database reset to original default state successfully.');
    }
  };

  const handleExportJSON = () => {
    const dataObj = { properties, agents, testimonials, blogPosts, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura_realestate_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database state JSON backup exported.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden'
    }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 4000,
          background: 'rgba(16, 185, 129, 0.95)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 600,
          animation: 'slide-up 0.3s ease'
        }}>
          <ShieldCheck size={18} />
          {toastMessage}
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-light)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh'
      }}>
        <div>
          <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/dusabe_logo.png" alt="DUSABE Logo" style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--accent-gold)' }} />
            <div>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
                DUSABE<span style={{ color: 'var(--accent-gold)' }}>.</span>
              </div>
              <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-gold)', marginTop: '2px', fontWeight: 'bold' }}>
                REAL ESTATE ADMIN
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: Activity },
              { id: 'properties', label: `Properties (${properties.length})`, icon: Building2 },
              { id: 'agents', label: `Agents (${agents.length})`, icon: Users },
              { id: 'testimonials', label: `Reviews (${testimonials.length})`, icon: Star },
              { id: 'blogs', label: `Blog Posts (${blogPosts.length})`, icon: FileText },
              { id: 'settings', label: 'System Settings', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isSelected ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                    color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderLeft: isSelected ? '3px solid var(--accent-gold)' : '3px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={18} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {onClose && (
          <div>
            <button 
              onClick={onClose}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={16} /> Return to Public Site
            </button>
          </div>
        )}
      </aside>

      {/* Main Container */}
      <main style={{
        padding: '40px 50px',
        height: '100vh',
        overflowY: 'auto',
        background: 'var(--bg-primary)'
      }}>
        {activeTab === 'overview' && <DashboardOverview properties={properties} agents={agents} />}
        {activeTab === 'properties' && (
          <PropertiesTab 
            properties={properties} 
            onOpenNewProperty={handleOpenNewProperty} 
            onOpenEditProperty={handleOpenEditProperty} 
            onDeleteProperty={handleDeleteProperty} 
            onToggleFeaturedProperty={handleToggleFeaturedProperty} 
          />
        )}
        {activeTab === 'agents' && (
          <AgentsTab 
            agents={agents} 
            onOpenNewAgent={handleOpenNewAgent} 
            onOpenEditAgent={handleOpenEditAgent} 
            onDeleteAgent={handleDeleteAgent} 
          />
        )}
        {activeTab === 'testimonials' && (
          <ReviewsTab 
            testimonials={testimonials} 
            onOpenNewTestimonial={handleOpenNewTestimonial} 
            onOpenEditTestimonial={handleOpenEditTestimonial} 
            onDeleteTestimonial={handleDeleteTestimonial} 
          />
        )}
        {activeTab === 'blogs' && (
          <BlogPostTab 
            blogPosts={blogPosts} 
            onOpenNewBlog={handleOpenNewBlog} 
            onOpenEditBlog={handleOpenEditBlog} 
            onDeleteBlog={handleDeleteBlog} 
          />
        )}
        {activeTab === 'settings' && (
          <SystemSettingsTab 
            onExportJSON={handleExportJSON} 
            onResetDatabase={handleResetDatabase} 
          />
        )}
      </main>

      {/* Modals Container */}
      <AdminModals
        propertyModalOpen={propertyModalOpen}
        editingPropertyId={editingPropertyId}
        propForm={propForm}
        setPropForm={setPropForm}
        onSaveProperty={handleSaveProperty}
        onClosePropertyModal={() => setPropertyModalOpen(false)}
        agentModalOpen={agentModalOpen}
        editingAgentId={editingAgentId}
        agentForm={agentForm}
        setAgentForm={setAgentForm}
        onSaveAgent={handleSaveAgent}
        onCloseAgentModal={() => setAgentModalOpen(false)}
        testModalOpen={testModalOpen}
        editingTestId={editingTestId}
        testForm={testForm}
        setTestForm={setTestForm}
        onSaveTestimonial={handleSaveTestimonial}
        onCloseTestModal={() => setTestModalOpen(false)}
        blogModalOpen={blogModalOpen}
        editingBlogId={editingBlogId}
        blogForm={blogForm}
        setBlogForm={setBlogForm}
        onSaveBlog={handleSaveBlog}
        onCloseBlogModal={() => setBlogModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;