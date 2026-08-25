import React, { useState } from 'react';
import {
  Activity,
  Building2,
  Users,
  Star,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  AlertTriangle
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
import { AgentModal } from '@/pages/Admin/Modals/AgentModal';
import { PropertyModal } from '@/pages/Admin/Modals/PropertyModal';
import { ReviewModal } from '@/pages/Admin/Modals/ReviewModal';
import { BlogPostModal } from '@/pages/Admin/Modals/BlogPostModal';
import { db } from '@/firebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

export const AdminPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'agents' | 'testimonials' | 'blogs' | 'settings'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');

  const showToast = (msg: string, variant: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastVariant(variant);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
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
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'] as string[],
    videoUrl: '',
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
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      videoUrl: '',
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
      images: item.images,
      videoUrl: item.videoUrl || '',
      amenities: item.amenities.join(', '),
      agentId: item.agentId
    });
    setPropertyModalOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propForm.title.trim() || !propForm.city.trim() || !propForm.address.trim()) {
      showToast('Title, city, and address are required.', 'error');
      return;
    }

    const parseListInput = (value: unknown) => {
      if (Array.isArray(value)) {
        return value
          .map((item) => String(item).trim())
          .filter(Boolean);
      }
      if (typeof value === 'string') {
        return value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [];
    };

    const imageList = parseListInput(propForm.images);
    const amenityList = parseListInput(propForm.amenities);

    if (editingPropertyId) {
      const updatedProperty = properties.find((property) => property.id === editingPropertyId);
      if (!updatedProperty) return;
      const propertyData = {
        ...updatedProperty,
        title: propForm.title,
        type: propForm.type,
        price: Number(propForm.price),
        ...(propForm.discountPrice > 0 ? { discountPrice: Number(propForm.discountPrice) } : {}),
        location: {
          ...updatedProperty.location,
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
        images: imageList.length > 0 ? imageList : updatedProperty.images,
        videoUrl: propForm.videoUrl?.trim() || updatedProperty.videoUrl,
        amenities: amenityList.length > 0 ? amenityList : updatedProperty.amenities,
        agentId: propForm.agentId
      };
      setProperties(prev => prev.map(p => (p.id === editingPropertyId ? propertyData : p)));
      setPropertyModalOpen(false);
      try {
        await setDoc(doc(db, 'properties', editingPropertyId), propertyData);
        showToast(`Property "${propForm.title}" updated successfully.`);
      } catch (error) {
        console.error('Failed to sync property update to the database.', error);
        showToast(`Property "${propForm.title}" updated locally, but the database sync failed.`, 'error');
      }
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title: propForm.title,
        type: propForm.type,
        price: Number(propForm.price),
        // Firestore's setDoc() throws a client-side error on any field whose
        // value is `undefined` (e.g. "Unsupported field value: undefined"),
        // so the key must be omitted entirely rather than set to undefined
        // when there is no discount price.
        ...(propForm.discountPrice > 0 ? { discountPrice: Number(propForm.discountPrice) } : {}),
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
        videoUrl: propForm.videoUrl?.trim() || '',
        virtualTourUrl: '',
        mapCoords: { x: 50, y: 50 }
      };
      setProperties(prev => [newProp, ...prev]);
      setPropertyModalOpen(false);
      try {
        await setDoc(doc(db, 'properties', newProp.id), newProp);
        showToast(`New Listing "${propForm.title}" broadcasted to database.`);
      } catch (error) {
        console.error('Failed to save new property to the database.', error);
        showToast(`Listing "${propForm.title}" added locally, but the database sync failed.`, 'error');
      }
    }
  };

  const handleDeleteProperty = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove listing "${title}"?`)) {
      setProperties(prev => prev.filter(p => p.id !== id));
      try {
        await deleteDoc(doc(db, 'properties', id));
        showToast(`Property "${title}" deleted.`);
      } catch (error) {
        console.error('Failed to delete property from the database.', error);
        showToast(`Property "${title}" removed locally, but the database sync failed.`, 'error');
      }
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

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAgentId) {
      const agent = agents.find((item) => item.id === editingAgentId);
      if (!agent) return;
      const updatedAgent = { ...agent, ...agentForm };
      setAgents(prev => prev.map(a => a.id === editingAgentId ? { ...a, ...agentForm } : a));
      setAgentModalOpen(false);
      try {
        await setDoc(doc(db, 'agents', editingAgentId), updatedAgent);
        showToast(`Agent profile "${agentForm.name}" updated.`);
      } catch (error) {
        console.error('Failed to sync agent update to the database.', error);
        showToast(`Agent "${agentForm.name}" updated locally, but the database sync failed.`, 'error');
      }
    } else {
      const newAgent = { id: `agent-${Date.now()}`, ...agentForm };
      setAgents(prev => [...prev, newAgent]);
      setAgentModalOpen(false);
      try {
        await setDoc(doc(db, 'agents', newAgent.id), newAgent);
        showToast(`Agent "${agentForm.name}" added to AURA Advising Group.`);
      } catch (error) {
        console.error('Failed to save new agent to the database.', error);
        showToast(`Agent "${agentForm.name}" added locally, but the database sync failed.`, 'error');
      }
    }
  };

  const handleDeleteAgent = async (id: string, name: string) => {
    if (window.confirm(`Delete agent profile "${name}"?`)) {
      setAgents(prev => prev.filter(a => a.id !== id));
      try {
        await deleteDoc(doc(db, 'agents', id));
        showToast(`Agent "${name}" removed.`);
      } catch (error) {
        console.error('Failed to delete agent from the database.', error);
        showToast(`Agent "${name}" removed locally, but the database sync failed.`, 'error');
      }
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

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestId) {
      const testimonial = testimonials.find((item) => item.id === editingTestId);
      if (!testimonial) return;
      const updatedTestimonial = { ...testimonial, ...testForm };
      setTestimonials(prev => prev.map(t => t.id === editingTestId ? updatedTestimonial : t));
      setTestModalOpen(false);
      try {
        await setDoc(doc(db, 'testimonials', editingTestId), updatedTestimonial);
        showToast(`Testimonial by "${testForm.name}" updated.`);
      } catch (error) {
        console.error('Failed to sync testimonial update to the database.', error);
        showToast(`Testimonial by "${testForm.name}" updated locally, but the database sync failed.`, 'error');
      }
    } else {
      const newTestimonial = { id: `test-${Date.now()}`, ...testForm };
      setTestimonials(prev => [...prev, newTestimonial]);
      setTestModalOpen(false);
      try {
        await setDoc(doc(db, 'testimonials', newTestimonial.id), newTestimonial);
        showToast(`Testimonial by "${testForm.name}" published.`);
      } catch (error) {
        console.error('Failed to save new testimonial to the database.', error);
        showToast(`Testimonial by "${testForm.name}" published locally, but the database sync failed.`, 'error');
      }
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Delete this client endorsement?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      try {
        await deleteDoc(doc(db, 'testimonials', id));
        showToast('Testimonial removed.');
      } catch (error) {
        console.error('Failed to delete testimonial from the database.', error);
        showToast('Testimonial removed locally, but the database sync failed.', 'error');
      }
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

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlogId) {
      const blogPost = blogPosts.find((item) => item.id === editingBlogId);
      if (!blogPost) return;
      const updatedBlogPost = { ...blogPost, ...blogForm };
      setBlogPosts(prev => prev.map(b => b.id === editingBlogId ? updatedBlogPost : b));
      setBlogModalOpen(false);
      try {
        await setDoc(doc(db, 'blogPosts', editingBlogId), updatedBlogPost);
        showToast(`Article "${blogForm.title}" updated.`);
      } catch (error) {
        console.error('Failed to sync article update to the database.', error);
        showToast(`Article "${blogForm.title}" updated locally, but the database sync failed.`, 'error');
      }
    } else {
      const newBlogPost = { id: `blog-${Date.now()}`, ...blogForm };
      setBlogPosts(prev => [newBlogPost, ...prev]);
      setBlogModalOpen(false);
      try {
        await setDoc(doc(db, 'blogPosts', newBlogPost.id), newBlogPost);
        showToast(`Article "${blogForm.title}" published to AURA Journals.`);
      } catch (error) {
        console.error('Failed to save new article to the database.', error);
        showToast(`Article "${blogForm.title}" published locally, but the database sync failed.`, 'error');
      }
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      setBlogPosts(prev => prev.filter(b => b.id !== id));
      try {
        await deleteDoc(doc(db, 'blogPosts', id));
        showToast(`Article deleted.`);
      } catch (error) {
        console.error('Failed to delete article from the database.', error);
        showToast('Article removed locally, but the database sync failed.', 'error');
      }
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
    <div className="min-h-screen w-full bg-bg-primary text-text-primary font-sans lg:h-screen lg:overflow-hidden lg:grid lg:grid-cols-[260px_1fr]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 left-4 sm:left-auto sm:right-6 sm:top-6 z-[4000] text-white py-3 px-6 rounded-lg shadow-card flex items-center gap-2.5 text-[0.9rem] font-semibold [animation:slide-up_0.3s_ease] ${toastVariant === 'error' ? 'bg-red-500/95' : 'bg-emerald-500/95'}`}>
          {toastVariant === 'error' ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
          {toastMessage}
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-[2500] flex items-center justify-between gap-3 bg-bg-secondary border-b border-border-light py-3 px-4">
        <div className="flex items-center gap-2.5">
          <img src="/dusabe_logo.png" alt="DUSABE Logo" className="w-8 h-8 rounded-lg object-cover border border-accent-gold" />
          <div className="text-[1rem] font-heading font-bold tracking-[0.08em] text-text-primary">
            DUSABE<span className="text-accent-gold">.</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open admin menu"
          className="p-2 rounded-lg border border-border-light bg-bg-tertiary text-text-primary cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-[2900] bg-black/50"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-bg-secondary border-r border-border-light py-[30px] px-5 flex flex-col justify-between h-screen w-[260px] fixed inset-y-0 left-0 z-[3000] [transition:transform_0.3s] overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        <div>
          <div className="mb-9 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/dusabe_logo.png" alt="DUSABE Logo" className="w-[38px] h-[38px] rounded-lg object-cover border border-accent-gold" />
              <div>
                <div className="text-[1.2rem] font-heading font-bold tracking-[0.08em] text-text-primary">
                  DUSABE<span className="text-accent-gold">.</span>
                </div>
                <div className="text-[0.55rem] uppercase tracking-[0.2em] text-accent-gold mt-0.5 font-bold">
                  REAL ESTATE ADMIN
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close admin menu"
              className="lg:hidden p-1.5 rounded-lg border border-border-light bg-bg-tertiary text-text-primary cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
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
                  onClick={() => selectTab(tab.id as any)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg border-none text-[0.9rem] cursor-pointer text-left [transition:all_0.2s] border-l-[3px] ${isSelected ? 'bg-accent-gold/15 text-accent-gold font-semibold border-accent-gold' : 'bg-transparent text-text-secondary font-normal border-transparent'}`}
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
              className="w-full flex items-center justify-center gap-2.5 p-3 rounded-[10px] border border-border-light bg-bg-tertiary text-text-primary text-[0.85rem] font-semibold cursor-pointer [transition:all_0.2s]"
            >
              <LogOut size={16} /> Return to Public Site
            </button>
          </div>
        )}
      </aside>

      {/* Main Container */}
      <main className="py-6 px-4 sm:px-6 lg:py-10 lg:px-[50px] lg:h-screen lg:overflow-y-auto bg-bg-primary">
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

      <PropertyModal
        isOpen={propertyModalOpen}
        editingId={editingPropertyId}
        form={propForm}
        setForm={setPropForm}
        onSave={handleSaveProperty}
        onClose={() => setPropertyModalOpen(false)}
      />
      <AgentModal
        isOpen={agentModalOpen}
        editingId={editingAgentId}
        form={agentForm}
        setForm={setAgentForm}
        onSave={handleSaveAgent}
        onClose={() => setAgentModalOpen(false)}
      />
      <ReviewModal
        isOpen={testModalOpen}
        editingId={editingTestId}
        form={testForm}
        setForm={setTestForm}
        onSave={handleSaveTestimonial}
        onClose={() => setTestModalOpen(false)}
      />
      <BlogPostModal
        isOpen={blogModalOpen}
        editingId={editingBlogId}
        form={blogForm}
        setForm={setBlogForm}
        onSave={handleSaveBlog}
        onClose={() => setBlogModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
