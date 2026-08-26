import type { Property, PostedByInfo } from '@/data';

// Shape of a raw Firestore "properties" collection document, as written by
// the Admin panel's property form (see src/pages/Admin/Modals/PropertyModal.tsx).
// Deliberately loose — a document could predate a field, or come from future
// tooling that adds more.
export interface RawDbProperty {
  id: string; // Firestore document id
  title?: string;
  price?: number;
  discountPrice?: number;
  type?: string;
  status?: string;
  city?: string;
  address?: string;
  beds?: number;
  baths?: number;
  area?: number;
  images?: string[];
  videoUrl?: string;
  description?: string;
  postedBy?: PostedByInfo;
  lastEditedBy?: PostedByInfo;
  [key: string]: any;
}

const VALID_TYPES: Property['type'][] = ['Villa', 'Penthouse', 'Apartment', 'Commercial', 'Mansion'];
const VALID_STATUSES: Property['status'][] = ['For Sale', 'For Rent', 'Off-Market'];

// Maps a raw Firestore document (the flat shape the Admin panel writes) onto
// the full Property shape the public site's cards, filters, compare drawer,
// and detail view expect. Fields the Admin form doesn't collect yet
// (district/neighborhood, parking, amenities, ratings, walk/transit scores,
// map position, ...) get safe, neutral defaults rather than fabricated data —
// components that render a badge for one of those hide it when the value is
// absent instead of showing a fake number (see PropertyCard, PropertyDetailModal,
// CompareDrawer).
export function normalizeDbProperty(raw: RawDbProperty): Property {
  const type = VALID_TYPES.includes(raw.type as Property['type'])
    ? (raw.type as Property['type'])
    : 'Villa';
  const status = VALID_STATUSES.includes(raw.status as Property['status'])
    ? (raw.status as Property['status'])
    : 'For Sale';

  return {
    id: raw.id,
    title: raw.title || 'Untitled Listing',
    type,
    price: raw.price || 0,
    discountPrice: raw.discountPrice || undefined,
    location: {
      city: raw.city || '',
      district: '',
      neighborhood: '',
      address: raw.address || '',
    },
    beds: raw.beds || 0,
    baths: raw.baths || 0,
    area: raw.area || 0,
    parking: 0,
    yearBuilt: undefined,
    status,
    rating: undefined,
    isFeatured: false,
    images: Array.isArray(raw.images) && raw.images.length > 0 ? raw.images : ['/dusabe_logo.png'],
    agentId: '',
    amenities: [],
    description: raw.description || '',
    walkScore: undefined,
    transitScore: undefined,
    energyRating: undefined,
    videoUrl: raw.videoUrl || '',
    virtualTourUrl: '',
    mapCoords: { x: 50, y: 50 },
    // Pass multi-admin attribution straight through — this was previously
    // being silently dropped here, which is why "posted by" never showed
    // up anywhere on the public site regardless of what was in Firestore.
    postedBy: raw.postedBy || undefined,
    lastEditedBy: raw.lastEditedBy || undefined,
  };
}
