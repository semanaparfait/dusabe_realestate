import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@/App.css";

// Data & Types
import {
  type Property,
  type Agent,
  type Testimonial,
  type BlogPost,
  AGENTS,
  TESTIMONIALS,
  BLOG_POSTS,
} from "@/data";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { normalizeDbProperty } from "@/utils/normalizeDbProperty";

// Components
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FilterSection } from "@/components/FilterSection";
import { PropertyCard } from "@/components/PropertyCard";
import { AgentProfiles } from "@/components/AgentProfiles";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { DashboardModal } from "@/components/DashboardModal";
import { Chatbot } from "@/components/Chatbot";
import { CompareDrawer } from "@/components/CompareDrawer";
// import { AdminPanel } from '@/components/AdminPanel';

// Translations Module
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.buy": "Buy",
    "nav.rent": "Rent",
    "nav.sell": "Sell",
    "nav.commercial": "Commercial",
    "nav.agents": "Agents",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.post": "Post Property",
    "hero.sub": "DUSABE REAL ESTATE",
    "gallery.title": "Featured Luxury Properties",
    "gallery.subtitle": "Curated Portfolio",
  },
  rw: {
    "nav.home": "Ahabanza",
    "nav.buy": "Gura",
    "nav.rent": "Kodesha",
    "nav.sell": "Gurishe",
    "nav.commercial": "Ubucuruzi",
    "nav.agents": "Abahagarizi",
    "nav.blog": "Amakuru",
    "nav.contact": "Tubarize",
    "nav.post": "Shyiraho Inzu",
    "hero.sub": "DUSABE REAL ESTATE",
    "gallery.title": "Inzu n'Ibibanza Byatoranyijwe",
    "gallery.subtitle": "Imitungo Yizewe",
  },
};

function Home() {
  const navigate = useNavigate();

  // Preloader
  const [loading, setLoading] = useState(true);

  // Global Config Toggles
  const [theme, setTheme] = useState("dark");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");

  // Properties & Data lists (dynamic to support adding/editing/deleting)
  // Live listings from the same Firestore `properties` collection the Admin
  // panel manages — not the data.ts sample set.
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const items = snapshot.docs.map((docSnap) =>
        normalizeDbProperty({ id: docSnap.id, ...docSnap.data() }),
      );
      setProperties(items);
    });
    return () => unsubscribe();
  }, []);

  const [agents] = useState<Agent[]>(AGENTS);
  const [testimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [blogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  // Active Filter state
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    beds: "" as number | "",
    baths: "" as number | "",
    status: "",
    minPrice: 100000,
    maxPrice: 80000000,
    minArea: 1000,
    maxArea: 50000,
    parking: "" as number | "",
    furnished: null as boolean | null,
    amenities: [] as string[],
  });

  // User list selections
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Open overlays
  const [activeDashboardRole, setActiveDashboardRole] = useState<
    "user" | "agent" | "admin" | null
  >(null);

  // Load animation and theme settings
  useEffect(() => {
    // Check local storage or set dark default
    document.documentElement.setAttribute("data-theme", theme);
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
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Wishlist Handling
  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  // Compare Handling
  const handleToggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert("You may select up to 3 listings to compare simultaneously.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Chatbot Triggered filters
  const handleTriggerBotFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // scroll down
    const element = document.getElementById("featured-properties");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // List Management (Agent console interactions)
  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
    setCompareList((prev) => prev.filter((itemId) => itemId !== id));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      city: "",
      type: "",
      beds: "",
      baths: "",
      status: "",
      minPrice: 100000,
      maxPrice: 80000000,
      minArea: 1000,
      maxArea: 50000,
      parking: "",
      furnished: null,
      amenities: [],
    });
  };

  // Apply filters to properties list
  const filteredProperties = properties.filter((prop) => {
    if (filters.status && prop.status !== filters.status) return false;
    if (filters.city && prop.location.city !== filters.city) return false;
    if (filters.type && prop.type !== filters.type) return false;

    // Price
    const priceToCheck = prop.discountPrice || prop.price;
    if (priceToCheck < filters.minPrice || priceToCheck > filters.maxPrice)
      return false;

    // Spec criteria
    if (filters.beds && prop.beds < filters.beds) return false;
    if (filters.baths && prop.baths < filters.baths) return false;
    if (filters.parking && prop.parking < filters.parking) return false;

    // Area
    if (prop.area < filters.minArea || prop.area > filters.maxArea)
      return false;

    // Checkbox Amenities array match
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((amenity) =>
        prop.amenities.includes(amenity),
      );
      if (!hasAll) return false;
    }

    return true;
  });

  return (
    <>
      {/* Luxury Gold particles preloader */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-[#090D16] flex flex-col items-center justify-center [transition:opacity_0.8s_cubic-bezier(0.16,1,0.3,1),visibility_0.8s]">
          <div className="flex items-center gap-3.5 mb-5">
            <img
              src="/dusabe_logo.png"
              alt="DUSABE Logo"
              className="w-12 h-12 rounded-xl object-cover border border-accent-gold"
            />
            <div className="flex flex-col leading-none text-left">
              <span className="text-[1.6rem] font-heading font-extrabold tracking-[0.08em] text-white">
                DUSABE<span className="text-accent-gold">.</span>
              </span>
              <span className="text-[0.65rem] tracking-[0.22em] uppercase text-accent-gold font-bold mt-1">
                REAL ESTATE
              </span>
            </div>
          </div>
          <div className="w-[50px] h-[50px] rounded-full border-2 border-accent-gold/15 border-t-accent-gold animate-spin"></div>
        </div>
      )}

      {/* Main Page Layout */}
      <div style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
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
              const drawerBtn = document.querySelector(
                "[data-compare-open-btn]",
              ) as HTMLButtonElement;
              if (drawerBtn) drawerBtn.click();
            } else {
              alert(
                "Select at least 2 properties to inspect comparative matrix.",
              );
            }
          }}
          openDashboardModal={(role) => setActiveDashboardRole(role)}
          t={t}
        />

        {/* Cinematic Hero */}
        <Hero
          onSearch={(heroFilters) =>
            setFilters((prev) => ({ ...prev, ...heroFilters }))
          }
          t={t}
        />

        {/* Featured Properties Grid Layout */}
        <section
          id="featured-properties"
          className="relative py-[100px] bg-bg-primary"
        >
          <div className="max-w-[1400px] w-full mx-auto px-6">
            <div className="text-center mb-[60px]">
              <span className="font-heading uppercase tracking-[0.25em] text-[0.85rem] text-accent-gold font-semibold">
                {t("gallery.subtitle")}
              </span>
              <h2 className="text-[2.5rem] mb-4">{t("gallery.title")}</h2>
              <p className="max-w-[600px] mx-auto text-base">
                Browse our elite residential blueprints, private beachfront
                complexes, and smart towering suites.
              </p>
            </div>

            <div className="grid grid-cols-[300px_1fr] max-lg:grid-cols-1 gap-10 items-start">
              {/* Sidebar filter controls */}
              <FilterSection
                filters={filters}
                onChangeFilters={(updated) => setFilters(updated)}
                onReset={handleResetFilters}
              />

              {/* Main properties results grid */}
              <div className="flex flex-col gap-[30px]">
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-border-light rounded-2xl">
                    <h3 className="text-[1.25rem] mb-2 text-text-secondary">
                      No Asset Telemetry Matched
                    </h3>
                    <p className="text-[0.9rem] text-text-tertiary">
                      Adjust sliders or pick alternative cities to locate
                      listing blueprints.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[30px]">
                    {filteredProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        currency={currency}
                        isFavorited={wishlist.includes(prop.id)}
                        isInCompareList={compareList.includes(prop.id)}
                        onToggleFavorite={handleToggleWishlist}
                        onToggleCompare={handleToggleCompare}
                        onQuickView={(p) => navigate(`/property/${p.id}`)}
                      />
                    ))}
                  </div>
                )}
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

        {/* OVERLAY: User / Agent Dashboard Modal */}
        {activeDashboardRole && activeDashboardRole !== "admin" && (
          <DashboardModal
            initialRole={activeDashboardRole}
            wishlistIds={wishlist}
            properties={properties}
            onRemoveWishlist={handleRemoveWishlist}
            onAddProperty={handleAddProperty}
            onDeleteProperty={handleDeleteProperty}
            onQuickView={(p) => navigate(`/property/${p.id}`)}
            onClose={() => setActiveDashboardRole(null)}
          />
        )}

        {/* OVERLAY: Full Screen Executive Admin Panel */}
        {/* {activeDashboardRole === 'admin' && (
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
        )} */}

        {/* WIDGET: Compare Drawer */}
        <CompareDrawer
          compareIds={compareList}
          properties={properties}
          onRemoveCompare={handleRemoveCompare}
          onClearAll={handleClearCompare}
          currency={currency}
          onQuickView={(p) => navigate(`/property/${p.id}`)}
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

export default Home;
