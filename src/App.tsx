import { useState, useEffect } from 'react';
import './App.css';

// Data & Types
import { 
  type Property, 
  type Agent, 
  type Testimonial, 
  type BlogPost, 
  PROPERTIES, 
  AGENTS, 
  TESTIMONIALS, 
  BLOG_POSTS 
} from './data';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterSection } from './components/FilterSection';
import { PropertyCard } from './components/PropertyCard';
import { MapSection } from './components/MapSection';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AgentProfiles } from './components/AgentProfiles';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import { DashboardModal } from './components/DashboardModal';
import { Chatbot } from './components/Chatbot';
import { CompareDrawer } from './components/CompareDrawer';
import { AdminPanel } from './components/AdminPanel';

// Translations Module
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.buy': 'Buy',
    'nav.rent': 'Rent',
    'nav.sell': 'Sell',
    'nav.commercial': 'Commercial',
    'nav.agents': 'Agents',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.post': 'Post Property',
    'hero.sub': 'DUSABE REAL ESTATE',
    'gallery.title': 'Featured Luxury Properties',
    'gallery.subtitle': 'Curated Portfolio'
  },
  rw: {
    'nav.home': 'Ahabanza',
    'nav.buy': 'Gura',
    'nav.rent': 'Kodesha',
    'nav.sell': 'Gurishe',
    'nav.commercial': 'Ubucuruzi',
    'nav.agents': 'Abahagarizi',
    'nav.blog': 'Amakuru',
    'nav.contact': 'Tubarize',
    'nav.post': 'Shyiraho Inzu',
    'hero.sub': 'DUSABE REAL ESTATE',
    'gallery.title': 'Inzu n\'Ibibanza Byatoranyijwe',
    'gallery.subtitle': 'Imitungo Yizewe'
  }
};

function App() {
  // Preloader
  const [loading, setLoading] = useState(true);

  // Global Config Toggles
  const [theme, setTheme] = useState('dark');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

  // Properties & Data lists (dynamic to support adding/editing/deleting)
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  // Active Filter state
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    beds: '' as number | '',
    baths: '' as number | '',
    status: '',
    minPrice: 100000,
    maxPrice: 80000000,
    minArea: 1000,
    maxArea: 50000,
    parking: '' as number | '',
    furnished: null as boolean | null,
    amenities: [] as string[]
  });

  // User list selections
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Open overlays
  const [activePropertyDetail, setActivePropertyDetail] = useState<Property | null>(null);
  const [activeDashboardRole, setActiveDashboardRole] = useState<'user' | 'agent' | 'admin' | null>(null);

  // Load animation and theme settings
  useEffect(() => {
    // Check local storage or set dark default
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second elegant loading fadeout
    return () => clearTimeout(timer);
  }, []);

  // Translation Helper
  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || key;
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Wishlist Handling
  const handleToggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item !== id));
  };

  // Compare Handling
  const handleToggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert('You may select up to 3 listings to compare simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList(prev => prev.filter(item => item !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Chatbot Triggered filters
  const handleTriggerBotFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    // scroll down
    const element = document.getElementById('featured-properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // List Management (Agent console interactions)
  const handleAddProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(itemId => itemId !== id));
    setCompareList(prev => prev.filter(itemId => itemId !== id));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      city: '',
      type: '',
      beds: '',
      baths: '',
      status: '',
      minPrice: 100000,
      maxPrice: 80000000,
      minArea: 1000,
      maxArea: 50000,
      parking: '',
      furnished: null,
      amenities: []
    });
  };

  // Apply filters to properties list
  const filteredProperties = properties.filter((prop) => {
    if (filters.status && prop.status !== filters.status) return false;
    if (filters.city && prop.location.city !== filters.city) return false;
    if (filters.type && prop.type !== filters.type) return false;
    
    // Price
    const priceToCheck = prop.discountPrice || prop.price;
    if (priceToCheck < filters.minPrice || priceToCheck > filters.maxPrice) return false;

    // Spec criteria
    if (filters.beds && prop.beds < filters.beds) return false;
    if (filters.baths && prop.baths < filters.baths) return false;
    if (filters.parking && prop.parking < filters.parking) return false;

    // Area
    if (prop.area < filters.minArea || prop.area > filters.maxArea) return false;

    // Checkbox Amenities array match
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every(amenity => prop.amenities.includes(amenity));
      if (!hasAll) return false;
    }

    return true;
  });

  return (
    <>
      {/* Luxury Gold particles preloader */}
      {loading && (
        <div className="preloader">
          <div className="preloader-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="/dusabe_logo.png" alt="DUSABE Logo" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--accent-gold)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textAlign: 'left' }}>
              <span style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>
                DUSABE<span style={{ color: 'var(--accent-gold)' }}>.</span>
              </span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, marginTop: '4px' }}>
                REAL ESTATE
              </span>
            </div>
          </div>
          <div className="preloader-spinner"></div>
        </div>
      )}

      {/* Main Page Layout */}
      <div style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* Navbar */}
        <Navbar 
          theme={theme}
          toggleTheme={toggleTheme}
          currency={currency}
          setCurrency={setCurrency}
          language={language}
          setLanguage={setLanguage}
          wishlistCount={wishlist.length}
          compareCount={compareList.length}
          openCompareModal={() => {
            if (compareList.length >= 2) {
              // Trigger Comparison Matrix popup directly
              const drawerBtn = document.querySelector('.compare-drawer .luxury-gold-button') as HTMLButtonElement;
              if (drawerBtn) drawerBtn.click();
            } else {
              alert('Select at least 2 properties to inspect comparative matrix.');
            }
          }}
          openDashboardModal={(role) => setActiveDashboardRole(role)}
          t={t}
        />

        {/* Cinematic Hero */}
        <Hero 
          onSearch={(heroFilters) => setFilters(prev => ({ ...prev, ...heroFilters }))}
          t={t}
        />

        {/* Featured Properties Grid Layout */}
        <section id="featured-properties" style={{ background: 'var(--bg-primary)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">{t('gallery.subtitle')}</span>
              <h2 className="section-title">{t('gallery.title')}</h2>
              <p className="section-desc">
                Browse our elite residential blueprints, private beachfront complexes, and smart towering suites.
              </p>
            </div>

            <div className="filter-layout">
              {/* Sidebar filter controls */}
              <FilterSection 
                filters={filters}
                onChangeFilters={(updated) => setFilters(updated)}
                onReset={handleResetFilters}
              />

              {/* Main properties results grid */}
              <div className="properties-layout">
                {filteredProperties.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-light)', borderRadius: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>No Asset Telemetry Matched</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>Adjust sliders or pick alternative cities to locate listing blueprints.</p>
                  </div>
                ) : (
                  <div className="properties-grid">
                    {filteredProperties.map((prop) => (
                      <PropertyCard 
                        key={prop.id}
                        property={prop}
                        currency={currency}
                        isFavorited={wishlist.includes(prop.id)}
                        isInCompareList={compareList.includes(prop.id)}
                        agents={agents}
                        onToggleFavorite={handleToggleWishlist}
                        onToggleCompare={handleToggleCompare}
                        onQuickView={(p) => setActivePropertyDetail(p)}
                      />
                    ))}
                  </div>
                )}

                {/* Styled Vector Canvas Map Section */}
                <div style={{ marginTop: '50px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }}></span>
                    AURA Coordinates Satellite Map
                  </h3>
                  <MapSection 
                    properties={filteredProperties}
                    currency={currency}
                    onSelectProperty={(p) => setActivePropertyDetail(p)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonials Slider */}
        <Testimonials testimonials={testimonials} />

        {/* Advisors Group */}
        <AgentProfiles agents={agents} />

        {/* Blog section */}
        <Blog blogPosts={blogPosts} />

        {/* Footer */}
        <Footer />

        {/* OVERLAY: Detail Modal */}
        {activePropertyDetail && (
          <PropertyDetailModal 
            property={activePropertyDetail}
            currency={currency}
            agents={agents}
            onClose={() => setActivePropertyDetail(null)}
          />
        )}

        {/* OVERLAY: User / Agent Dashboard Modal */}
        {activeDashboardRole && activeDashboardRole !== 'admin' && (
          <DashboardModal 
            initialRole={activeDashboardRole}
            wishlistIds={wishlist}
            properties={properties}
            onRemoveWishlist={handleRemoveWishlist}
            onAddProperty={handleAddProperty}
            onDeleteProperty={handleDeleteProperty}
            onQuickView={(p) => setActivePropertyDetail(p)}
            onClose={() => setActiveDashboardRole(null)}
          />
        )}

        {/* OVERLAY: Full Screen Executive Admin Panel */}
        {activeDashboardRole === 'admin' && (
          <AdminPanel 
            properties={properties}
            setProperties={setProperties}
            agents={agents}
            setAgents={setAgents}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            onClose={() => setActiveDashboardRole(null)}
          />
        )}

        {/* WIDGET: Compare Drawer */}
        <CompareDrawer 
          compareIds={compareList}
          properties={properties}
          onRemoveCompare={handleRemoveCompare}
          onClearAll={handleClearCompare}
          currency={currency}
          onQuickView={(p) => setActivePropertyDetail(p)}
        />

        {/* WIDGET: Floating chatbot dialogue */}
        <Chatbot 
          onTriggerFilter={handleTriggerBotFilter}
          properties={properties}
          t={t}
        />

      </div>
    </>
  );
}

export default App;
