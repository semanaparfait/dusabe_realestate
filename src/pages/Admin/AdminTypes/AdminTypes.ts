
export interface PostedByInfo {
  uid: string;
  email: string | null;
  phoneNumber?: string;
  name?: string;
  displayName?: string;
  role?: string;
  [key: string]: any;
}

export interface PropertyData {
  id?: string;
  title: string;
  price: number;
  discountPrice?: number;
  type: string;
  status: string;
  city: string;
  address: string;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  videoUrl?: string;
  description: string;
  createdAt?: any;
  updatedAt?: any;
  // Who created this listing — set once, on creation, and never overwritten.
  postedBy?: PostedByInfo;
  // Who most recently saved changes to it — overwritten on every edit.
  lastEditedBy?: PostedByInfo;
}

export interface Property {
  uid: string;
  title: string;
  price: number;
  discountPrice?: number;
  type: string;
  status: string;
  city: string;
  address: string;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  videoUrl?: string;
  description: string;
  createdAt?: any;
  updatedAt?: any;
  postedBy?: PostedByInfo;
  lastEditedBy?: PostedByInfo;
}