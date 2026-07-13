export interface Property {
  id: string;
  title: string;
  type: 'Villa' | 'Penthouse' | 'Apartment' | 'Commercial' | 'Mansion';
  price: number;
  discountPrice?: number;
  location: {
    city: string;
    district: string;
    neighborhood: string;
    address: string;
  };
  beds: number;
  baths: number;
  area: number; // sq ft
  parking: number;
  yearBuilt: number;
  status: 'For Sale' | 'For Rent' | 'Off-Market';
  rating: number;
  isFeatured: boolean;
  images: string[];
  agentId: string;
  amenities: string[];
  description: string;
  walkScore: number;
  transitScore: number;
  energyRating: 'A++' | 'A+' | 'A' | 'B' | 'C';
  videoUrl: string;
  virtualTourUrl: string;
  mapCoords: { x: number; y: number }; // Relative percentage coordinates for custom interactive vector map [0-100]
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  image: string;
  bio: string;
  whatsapp: string;
  email: string;
  phone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  propertyTitle: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
}

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sophia Sterling',
    role: 'Managing Partner & Luxury Specialist',
    experience: '12 Years',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Sophia specializes in ultra-high-net-worth acquisitions across Beverly Hills and Malibu. Her dedication to discretion and bespoke service has earned her international awards.',
    whatsapp: '+13105550190',
    email: 'sophia@auraestates.com',
    phone: '+1 (310) 555-0190'
  },
  {
    id: 'agent-2',
    name: 'Marcus Vance',
    role: 'Senior Investment Director',
    experience: '15 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Marcus focuses on architectural masterpieces, historical luxury restorations, and commercial real estate portfolio expansions in key global metro markets.',
    whatsapp: '+12125550181',
    email: 'marcus@auraestates.com',
    phone: '+1 (212) 555-0181'
  },
  {
    id: 'agent-3',
    name: 'Elena Rostova',
    role: 'International Relations Consultant',
    experience: '8 Years',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Elena coordinates our European and Middle Eastern private offices, assisting overseas buyers in identifying high-yield premium estate placements.',
    whatsapp: '+971505550172',
    email: 'elena@auraestates.com',
    phone: '+971 (50) 555-0172'
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Obsidian Glass Oasis',
    type: 'Mansion',
    price: 18500000,
    location: {
      city: 'Los Angeles',
      district: 'Bel Air',
      neighborhood: 'Stone Canyon',
      address: '882 Bel Air Rd'
    },
    beds: 6,
    baths: 8,
    area: 14500,
    parking: 6,
    yearBuilt: 2024,
    status: 'For Sale',
    rating: 5.0,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-1',
    amenities: ['Infinity Pool', 'Private Cinema', 'Wine Cellar', 'Smart Home System', 'Helipad', 'Private Gym', 'Guest House', 'Security System'],
    description: 'Hovering over the legendary Bel Air canyon, The Obsidian Glass Oasis is a symphony of glass, steel, and structural concrete. Designed by award-winning architect Paul McClean, it features a 150-foot infinity pool, full-service spa wing, dual garages with hydraulic lifts, and automated glass walls sliding open to breathtaking Pacific Ocean vistas.',
    walkScore: 78,
    transitScore: 65,
    energyRating: 'A++',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mocktour1',
    mapCoords: { x: 35, y: 42 }
  },
  {
    id: 'prop-2',
    title: 'Nirvana Cliffside Sanctuary',
    type: 'Villa',
    price: 24500000,
    discountPrice: 22800000,
    location: {
      city: 'Malibu',
      district: 'Carbon Beach',
      neighborhood: 'Pacific Coast Hwy',
      address: '22408 Pacific Coast Hwy'
    },
    beds: 5,
    baths: 6,
    area: 9800,
    parking: 4,
    yearBuilt: 2023,
    status: 'For Sale',
    rating: 4.9,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-1',
    amenities: ['Private Beach Access', 'Sauna', 'Therapeutic Hot Tub', 'Chef Kitchen', 'Panoramic Deck', 'Garden', 'Smart Security System'],
    description: 'Carved directly into the coastal cliffs of Malibu, Nirvana is a bespoke masterpiece offering unmatched ocean panoramas. It features solid teak woodwork, imported Italian travertine, a multi-tier beachside terrace, private tidal path, and an open-concept great room that merges flawlessly with the surf line.',
    walkScore: 82,
    transitScore: 70,
    energyRating: 'A+',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mocktour2',
    mapCoords: { x: 22, y: 68 }
  },
  {
    id: 'prop-3',
    title: 'The Horizon Skyline Penthouse',
    type: 'Penthouse',
    price: 145000,
    location: {
      city: 'New York',
      district: 'Manhattan',
      neighborhood: 'Billionaires Row',
      address: '111 West 57th St'
    },
    beds: 3,
    baths: 4,
    area: 5200,
    parking: 1,
    yearBuilt: 2022,
    status: 'For Rent',
    rating: 4.8,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-2',
    amenities: ['24/7 Concierge', 'Indoor Swimming Pool', 'Valet Parking', 'Private Elevator', 'Skylight Lounge', 'Spa Room', 'Wine vault'],
    description: 'Occupying the entire 84th floor of one of Central Park’s most slender architectural icons, the Horizon Penthouse yields 360-degree views of New York City. Premium details include solid white oak floors, quartzite countertops, custom bronze accents, and a marble bath oasis looking straight down the Park avenue corridor.',
    walkScore: 98,
    transitScore: 95,
    energyRating: 'A',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mocktour3',
    mapCoords: { x: 55, y: 30 }
  },
  {
    id: 'prop-4',
    title: 'Aethera Desert Monolith',
    type: 'Villa',
    price: 11200000,
    location: {
      city: 'Palm Springs',
      district: 'Chino Canyon',
      neighborhood: 'Desert Ranch',
      address: '2800 North Canyon Dr'
    },
    beds: 4,
    baths: 5,
    area: 7600,
    parking: 4,
    yearBuilt: 2024,
    status: 'For Sale',
    rating: 4.9,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-3',
    amenities: ['Solar Farm Power', 'Desert Botanical Garden', 'Heated Saltwater Pool', 'Outdoor Fire Pit', 'Yoga Deck', 'EV Charging Station'],
    description: 'Blending organically with the stark beauty of the Mojave desert, Aethera is a high-tech off-grid sanctuary. The structure is built with carbon-neutral concrete blocks, framing rugged mountain silhouettes through double-height steel-framed windows. It features custom solar batteries, natural thermal cooling, and a beautiful sunken fire-pit lounge.',
    walkScore: 40,
    transitScore: 35,
    energyRating: 'A++',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mocktour4',
    mapCoords: { x: 15, y: 80 }
  },
  {
    id: 'prop-5',
    title: 'The Luminary Glass Tower HQ',
    type: 'Commercial',
    price: 68000000,
    location: {
      city: 'Tokyo',
      district: 'Minato-ku',
      neighborhood: 'Roppongi Hills',
      address: '6-10-1 Roppongi'
    },
    beds: 0,
    baths: 12,
    area: 45000,
    parking: 20,
    yearBuilt: 2021,
    status: 'For Sale',
    rating: 5.0,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-2',
    amenities: ['Executive Boardrooms', 'Rooftop Helipad', 'Automated Parking Stack', 'LEED Platinum Certification', 'Secure Data Vault', 'Panoramic Sky Lounge'],
    description: 'An architectural beacon in Roppongi Hills, The Luminary is a pristine glass commercial headquarters designed for global enterprises. Features include column-free floor layouts, advanced triple-glazed structural glass with dynamic tinting, high-speed destination elevators, and an executive garden suite on the top floor.',
    walkScore: 95,
    transitScore: 98,
    energyRating: 'A++',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mocktour5',
    mapCoords: { x: 80, y: 50 }
  },
  {
    id: 'prop-6',
    title: 'Aura Waterfront Estate',
    type: 'Villa',
    price: 32000000,
    location: {
      city: 'Miami',
      district: 'Star Island',
      neighborhood: 'Biscayne Bay',
      address: '44 Star Island Dr'
    },
    beds: 7,
    baths: 9,
    area: 16800,
    parking: 8,
    yearBuilt: 2023,
    status: 'For Sale',
    rating: 5.0,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-3',
    amenities: ['Superyacht Dock', 'Infinity Glass Pool', 'Chef’s Outdoor Pavilion', 'Massage Studio', 'Waterfall Atrium', 'Tesla Battery System'],
    description: 'Located in the hyper-exclusive enclave of Star Island, the Aura Waterfront Estate offers 200 feet of prime Intracoastal waterfront. This custom architectural compound boasts an all-glass facade, floating pathways over saltwater ponds, a custom private boat dock capable of hosting a 150ft superyacht, and unparalleled views of the Miami skyline.',
    walkScore: 70,
    transitScore: 60,
    energyRating: 'A++',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mocktour6',
    mapCoords: { x: 70, y: 85 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sir Charles Sterling',
    role: 'Venture Capitalist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'The absolute pinnacle of luxury home procurement. Sophia Sterling coordinated our Star Island purchase with unmatched discretion, delivering a masterpiece fully furnished to our specific bespoke requirements.',
    propertyTitle: 'Aura Waterfront Estate'
  },
  {
    id: 'test-2',
    name: 'Dr. Evelyn Fontaine',
    role: 'Biotech Founder',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Acquiring the Obsidian Glass Oasis was a seamless experience. The visual representation of walkability, building thermodynamics, and local services gave us absolute certainty.',
    propertyTitle: 'The Obsidian Glass Oasis'
  },
  {
    id: 'test-3',
    name: 'Kenji Takahashi',
    role: 'Tech Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'AURA provided elite advisory services for our global commercial real estate deployment. Marcus Vance is an exceptional professional who understands high-stakes negotiations.',
    propertyTitle: 'The Luminary Glass Tower HQ'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Rise of Off-Grid Brutalist Architecture',
    category: 'Architecture',
    author: 'Diana Thorne',
    date: 'July 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    summary: 'Explore how top designers are blending raw materials with advanced solar battery technology to build self-sustaining modern compounds in harsh desert ecosystems.'
  },
  {
    id: 'blog-2',
    title: 'Inside High-Yield Ultra Luxury Capital Allocations',
    category: 'Market Trends',
    author: 'Marcus Vance',
    date: 'June 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    summary: 'A statistical study on how global high-net-worth individuals are sheltering capital in trophy properties across Miami, Tokyo, and Los Angeles amidst monetary shifts.'
  },
  {
    id: 'blog-3',
    title: 'Designing Flow: The Biophilic Water Element Integration',
    category: 'Interior Design',
    author: 'Sophia Sterling',
    date: 'May 14, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
    summary: 'Integrating dynamic current channels, structural waterfall features, and ambient mist control inside luxury residential entries to enhance health and visual depth.'
  }
];
