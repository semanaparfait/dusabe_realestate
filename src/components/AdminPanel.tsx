import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Building2, 
  Users, 
  Star, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  TrendingUp, 
  DollarSign, 
  X, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  Database, 
  Globe2, 
  Layers,
  CheckCircle2
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
} from '../data';

interface AdminPanelProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  properties,
  setProperties,
  agents,
  setAgents,
  testimonials,
  setTestimonials,
  blogPosts,
  setBlogPosts,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'agents' | 'testimonials' | 'blogs' | 'settings'>('overview');
  
  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Search Queries
  const [searchProperty, setSearchProperty] = useState('');

  // -------------------------------------------------------------
  // Live Telemetry Terminal Logs Simulation
  // -------------------------------------------------------------
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] ADMIN: Session authenticated for Security Key #0089`,
    `[${new Date().toLocaleTimeString()}] NODE: Redis cache synced (0.12ms)`,
    `[${new Date().toLocaleTimeString()}] DATABASE: Active connection pool: 24 active nodes`,
    `[${new Date().toLocaleTimeString()}] TELEMETRY: Real-time currency parity verified (USD/EUR/AED)`
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const mockEvents = [
        `[${timestamp}] VISITOR: New view recorded on Obsidian Glass Oasis`,
        `[${timestamp}] SYSTEM: Automated SSL certificate validation check: PASSED`,
        `[${timestamp}] API: Rate limit metrics healthy (0.01% load)`,
        `[${timestamp}] AGENT: Consultation request dispatched to Sophia Sterling`,
        `[${timestamp}] METRICS: Edge CDN bandwidth throughput at 1.4 Gbps`
      ];
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setLogs(prev => [randomEvent, ...prev.slice(0, 15)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // -------------------------------------------------------------
  // PROPERTY MODAL & EDIT STATE
  // -------------------------------------------------------------
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
    const imageList = propForm.images.split(',').map(s => s.trim()).filter(Boolean);
    const amenityList = propForm.amenities.split(',').map(s => s.trim()).filter(Boolean);

    if (editingPropertyId) {
      setProperties(prev => prev.map(p => {
        if (p.id === editingPropertyId) {
          return {
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
          };
        }
        return p;
      }));
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

  // -------------------------------------------------------------
  // AGENT MODAL & EDIT STATE
  // -------------------------------------------------------------
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
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        ...agentForm
      };
      setAgents(prev => [...prev, newAgent]);
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

  // -------------------------------------------------------------
  // TESTIMONIAL MODAL & EDIT STATE
  // -------------------------------------------------------------
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
      const newTest: Testimonial = {
        id: `test-${Date.now()}`,
        ...testForm
      };
      setTestimonials(prev => [...prev, newTest]);
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

  // -------------------------------------------------------------
  // BLOG MODAL & EDIT STATE
  // -------------------------------------------------------------
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
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        ...blogForm
      };
      setBlogPosts(prev => [newPost, ...prev]);
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

  // -------------------------------------------------------------
  // SYSTEM SETTINGS & UTILS
  // -------------------------------------------------------------
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
    const dataObj = {
      properties,
      agents,
      testimonials,
      blogPosts,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(dataObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura_realestate_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database state JSON backup exported.');
  };

  // Total Portfolio Calculations
  const totalValuation = properties.reduce((acc, p) => acc + (p.discountPrice || p.price), 0);
  const avgPrice = properties.length > 0 ? Math.round(totalValuation / properties.length) : 0;
  const filteredProps = properties.filter(p => p.title.toLowerCase().includes(searchProperty.toLowerCase()) || p.location.city.toLowerCase().includes(searchProperty.toLowerCase()));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 3000,
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

      {/* Sidebar Navigation */}
      <aside style={{
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-light)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Logo Header */}
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

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button 
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'overview' ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                color: activeTab === 'overview' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'overview' ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: activeTab === 'overview' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Activity size={18} /> Dashboard Overview
            </button>

            <button 
              onClick={() => setActiveTab('properties')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'properties' ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                color: activeTab === 'properties' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'properties' ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: activeTab === 'properties' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Building2 size={18} /> Properties ({properties.length})
            </button>

            <button 
              onClick={() => setActiveTab('agents')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'agents' ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                color: activeTab === 'agents' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'agents' ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: activeTab === 'agents' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Users size={18} /> Agents ({agents.length})
            </button>

            <button 
              onClick={() => setActiveTab('testimonials')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'testimonials' ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                color: activeTab === 'testimonials' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'testimonials' ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: activeTab === 'testimonials' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Star size={18} /> Reviews ({testimonials.length})
            </button>

            <button 
              onClick={() => setActiveTab('blogs')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'blogs' ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                color: activeTab === 'blogs' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'blogs' ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: activeTab === 'blogs' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={18} /> Blog Posts ({blogPosts.length})
            </button>

            <button 
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'settings' ? 'rgba(200, 122, 83, 0.15)' : 'transparent',
                color: activeTab === 'settings' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'settings' ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: activeTab === 'settings' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Settings size={18} /> System Settings
            </button>
          </div>
        </div>

        {/* Footer Return Button */}
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
      </aside>

      {/* Main Workspace Area */}
      <main style={{
        padding: '40px 50px',
        overflowY: 'auto',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Admin Dashboard</h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Real-time statistics and management overview for DUSABE Real Estate.</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '8px 16px', borderRadius: '30px', color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> All Systems Online
              </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Total Property Value</span>
                  <DollarSign size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--accent-gold)' }}>
                  ${(totalValuation / 1000000).toFixed(1)}M
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={12} /> +14.2% growth this month
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Active Properties</span>
                  <Building2 size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--text-primary)' }}>
                  {properties.length} Listings
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Avg price: ${(avgPrice / 1000000).toFixed(2)}M
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Real Estate Agents</span>
                  <Users size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--text-primary)' }}>
                  {agents.length} Experts
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981' }}>
                  100% active representation
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Monthly Unique Visits</span>
                  <Globe2 size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '12px 0 4px', color: 'var(--text-primary)' }}>
                  52.4k
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981' }}>
                  +28.5% organic growth
                </div>
              </div>
            </div>

            {/* Visual SVG Analytics Chart Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              
              {/* Traffic Trends SVG Chart */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TrendingUp size={18} style={{ color: 'var(--accent-gold)' }} /> Investor Portal Engagement (Weekly)
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Updated 5 mins ago</span>
                </div>

                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="var(--border-light)" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="var(--border-light)" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border-light)" strokeDasharray="4 4" />

                    {/* Area fill */}
                    <path d="M 0 120 L 0 90 Q 80 40 160 70 T 320 20 T 500 40 L 500 150 L 0 150 Z" fill="url(#chartGrad)" />

                    {/* Curve path */}
                    <path d="M 0 90 Q 80 40 160 70 T 320 20 T 500 40" fill="none" stroke="var(--accent-gold)" strokeWidth="3" />

                    {/* Data Points */}
                    <circle cx="160" cy="70" r="4" fill="var(--bg-secondary)" stroke="var(--accent-gold)" strokeWidth="2.5" />
                    <circle cx="320" cy="20" r="5" fill="var(--accent-gold)" />
                    <circle cx="500" cy="40" r="4" fill="var(--bg-secondary)" stroke="var(--accent-gold)" strokeWidth="2.5" />
                  </svg>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '12px' }}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* Asset Type Breakdown */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layers size={18} style={{ color: 'var(--accent-gold)' }} /> Portfolio Asset Allocation
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Villas', pct: '45%', color: 'var(--accent-gold)' },
                    { label: 'Mansions', pct: '25%', color: 'var(--accent-gold-dark)' },
                    { label: 'Penthouses', pct: '18%', color: 'var(--text-secondary)' },
                    { label: 'Commercial', pct: '12%', color: 'var(--text-tertiary)' },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.pct}</span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: item.pct, background: item.color, borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Real-Time System Log Terminal */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={15} style={{ color: '#10B981' }} /> Real-Time Telemetry Stream
                </span>
                <span style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                  LIVE SOCKET ACTIVE
                </span>
              </div>

              <div style={{ fontFamily: 'Courier, monospace', fontSize: '0.8rem', color: '#10B981', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
                {logs.map((logLine, idx) => (
                  <div key={idx} style={{ opacity: idx === 0 ? 1 : 0.7 - idx * 0.04 }}>
                    {logLine}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PROPERTIES MANAGER */}
        {/* ============================================================== */}
        {activeTab === 'properties' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Properties & Asset Listings</h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Add, update pricing, change status, or toggle featured placements for all properties.</p>
              </div>

              <button 
                onClick={handleOpenNewProperty}
                className="luxury-gold-button shine-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Post New Luxury Estate
              </button>
            </div>

            {/* Filter / Search Bar */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input 
                  type="text" 
                  placeholder="Search listings by title, city, or address..."
                  value={searchProperty}
                  onChange={(e) => setSearchProperty(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 48px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Properties Table */}
            <div className="glass-panel" style={{ borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '16px 20px' }}>Listing Asset</th>
                    <th style={{ padding: '16px 12px' }}>Type</th>
                    <th style={{ padding: '16px 12px' }}>Location</th>
                    <th style={{ padding: '16px 12px' }}>Price</th>
                    <th style={{ padding: '16px 12px' }}>Status</th>
                    <th style={{ padding: '16px 12px' }}>Featured</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProps.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img src={item.images[0]} alt={item.title} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.beds} Beds • {item.baths} Baths • {item.area.toLocaleString()} sqft</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{item.type}</span>
                      </td>
                      <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>
                        {item.location.city}, {item.location.district}
                      </td>
                      <td style={{ padding: '16px 12px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                        ${(item.price / 1000000).toFixed(2)}M
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          background: item.status === 'For Sale' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                          color: item.status === 'For Sale' ? '#10B981' : '#60A5FA',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <button 
                          onClick={() => handleToggleFeaturedProperty(item.id)}
                          style={{
                            background: item.isFeatured ? 'rgba(200, 122, 83, 0.2)' : 'var(--bg-tertiary)',
                            color: item.isFeatured ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                            border: '1px solid ' + (item.isFeatured ? 'var(--accent-gold)' : 'transparent'),
                            padding: '4px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.isFeatured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => handleOpenEditProperty(item)}
                            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
                            title="Edit Listing"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(item.id, item.title)}
                            style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
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
        )}

        {/* ============================================================== */}
        {/* TAB 3: AGENTS DIRECTORY */}
        {/* ============================================================== */}
        {activeTab === 'agents' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Advising Group & Consultants</h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Manage private wealth consultants, experience tags, and contact protocols.</p>
              </div>

              <button 
                onClick={handleOpenNewAgent}
                className="luxury-gold-button shine-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Register New Advisor
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {agents.map(agent => (
                <div key={agent.id} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={agent.image} alt={agent.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{agent.name}</h3>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{agent.role}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{agent.experience} Experience • Rating {agent.rating.toFixed(1)} ★</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {agent.bio}
                  </p>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>Email: {agent.email}</div>
                    <div>WhatsApp: {agent.whatsapp}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button 
                      onClick={() => handleOpenEditAgent(agent)}
                      style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <Edit3 size={14} /> Edit Details
                    </button>
                    <button 
                      onClick={() => handleDeleteAgent(agent.id, agent.name)}
                      style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: TESTIMONIALS */}
        {/* ============================================================== */}
        {activeTab === 'testimonials' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Client Endorsements & Reviews</h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Manage testimonials from global investors and high-net-worth patrons.</p>
              </div>

              <button 
                onClick={handleOpenNewTestimonial}
                className="luxury-gold-button shine-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add Endorsement
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {testimonials.map(item => (
                <div key={item.id} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img src={item.avatar} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.name}</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{item.role}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <Star key={idx} size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{item.comment}"
                  </p>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    Purchased Asset: <strong style={{ color: 'var(--text-primary)' }}>{item.propertyTitle}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                    <button 
                      onClick={() => handleOpenEditTestimonial(item)}
                      style={{ flex: 1, padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTestimonial(item.id)}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: BLOGS & JOURNALS */}
        {/* ============================================================== */}
        {activeTab === 'blogs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>AURA Research Journals</h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Publish research articles on luxury real estate, taxation, and architecture.</p>
              </div>

              <button 
                onClick={handleOpenNewBlog}
                className="luxury-gold-button shine-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Publish Article
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {blogPosts.map(post => (
                <div key={post.id} className="glass-panel" style={{ borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.4' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{post.summary}</p>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>By {post.author}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          onClick={() => handleOpenEditBlog(post)}
                          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(post.id, post.title)}
                          style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: PLATFORM SETTINGS */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Platform Operations & Maintenance</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Export data backups, reset mock database, or adjust system operating parameters.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {/* Backup & Export Panel */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Download size={18} style={{ color: 'var(--accent-gold)' }} /> Export System Snapshot
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Download a complete JSON file containing all active properties, advising consultants, testimonials, and blog articles state.
                </p>
                <button 
                  onClick={handleExportJSON}
                  className="luxury-gold-button shine-hover"
                  style={{ marginTop: 'auto', padding: '12px 20px', fontSize: '0.85rem', width: 'fit-content' }}
                >
                  Download JSON Backup (.json)
                </button>
              </div>

              {/* Database Reset Panel */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', color: '#EF4444' }}>
                  <RotateCcw size={18} /> Reset Database State
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Reset all property listings, agents, testimonials, and journals back to their original default seed data.
                </p>
                <button 
                  onClick={handleResetDatabase}
                  style={{
                    marginTop: 'auto',
                    padding: '12px 20px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#EF4444',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 'fit-content'
                  }}
                >
                  Restore Default Seed Data
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT PROPERTY */}
      {/* ============================================================== */}
      {propertyModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingPropertyId ? 'Edit Property Listing' : 'Post New Luxury Property'}
              </h2>
              <button onClick={() => setPropertyModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveProperty} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
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
                <select className="glass-input" value={propForm.type} onChange={e => setPropForm({ ...propForm, type: e.target.value as any })}>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mansion">Mansion</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</label>
                <select className="glass-input" value={propForm.status} onChange={e => setPropForm({ ...propForm, status: e.target.value as any })}>
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
                <button type="button" onClick={() => setPropertyModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Save Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT AGENT */}
      {/* ============================================================== */}
      {agentModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingAgentId ? 'Edit Advisor Profile' : 'Register New Advisor'}
              </h2>
              <button onClick={() => setAgentModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveAgent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" required className="glass-input" value={agentForm.name} onChange={e => setAgentForm({ ...agentForm, name: e.target.value })} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Role Title</label>
                <input type="text" required className="glass-input" value={agentForm.role} onChange={e => setAgentForm({ ...agentForm, role: e.target.value })} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Photo URL</label>
                <input type="text" required className="glass-input" value={agentForm.image} onChange={e => setAgentForm({ ...agentForm, image: e.target.value })} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Bio</label>
                <textarea rows={3} className="glass-input" value={agentForm.bio} onChange={e => setAgentForm({ ...agentForm, bio: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input type="email" placeholder="Email" className="glass-input" value={agentForm.email} onChange={e => setAgentForm({ ...agentForm, email: e.target.value })} />
                <input type="text" placeholder="WhatsApp Number" className="glass-input" value={agentForm.whatsapp} onChange={e => setAgentForm({ ...agentForm, whatsapp: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setAgentModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Save Advisor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT TESTIMONIAL */}
      {/* ============================================================== */}
      {testModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingTestId ? 'Edit Endorsement' : 'Add Client Endorsement'}
              </h2>
              <button onClick={() => setTestModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Client Name" required className="glass-input" value={testForm.name} onChange={e => setTestForm({ ...testForm, name: e.target.value })} />
              <input type="text" placeholder="Role (e.g. Venture Capitalist)" required className="glass-input" value={testForm.role} onChange={e => setTestForm({ ...testForm, role: e.target.value })} />
              <input type="text" placeholder="Avatar Image URL" required className="glass-input" value={testForm.avatar} onChange={e => setTestForm({ ...testForm, avatar: e.target.value })} />
              <input type="text" placeholder="Purchased Property Title" required className="glass-input" value={testForm.propertyTitle} onChange={e => setTestForm({ ...testForm, propertyTitle: e.target.value })} />
              <textarea rows={3} placeholder="Testimonial Quote Comment" required className="glass-input" value={testForm.comment} onChange={e => setTestForm({ ...testForm, comment: e.target.value })} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setTestModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Save Endorsement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT BLOG */}
      {/* ============================================================== */}
      {blogModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {editingBlogId ? 'Edit Research Article' : 'Publish New Journal Article'}
              </h2>
              <button onClick={() => setBlogModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Article Title" required className="glass-input" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} />
              <input type="text" placeholder="Category (e.g. Architecture, Market Trends)" required className="glass-input" value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} />
              <input type="text" placeholder="Author Name" required className="glass-input" value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} />
              <input type="text" placeholder="Cover Image URL" required className="glass-input" value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} />
              <textarea rows={3} placeholder="Executive Summary" required className="glass-input" value={blogForm.summary} onChange={e => setBlogForm({ ...blogForm, summary: e.target.value })} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setBlogModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="luxury-gold-button shine-hover" style={{ padding: '10px 24px' }}>Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
