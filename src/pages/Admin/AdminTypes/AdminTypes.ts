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
}