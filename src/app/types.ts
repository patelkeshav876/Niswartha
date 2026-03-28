export type UserRole = 'donor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Ashram {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  /** Social profile (e.g. Facebook page) */
  facebookUrl?: string;
  adminId: string;
}

export type NeedCategory = 'Food' | 'Clothes' | 'Education' | 'Healthcare' | 'Other';

export interface Need {
  id: string;
  ashramId: string;
  title: string;
  category: NeedCategory;
  description: string;
  quantityRequired: number;
  quantityFulfilled: number;
  urgency: 'low' | 'medium' | 'high';
  imageUrl?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  ashramId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface Post {
  id: string;
  ashramId: string;
  imageUrl: string;
  caption: string;
  likes: number;
  createdAt: string;
}

export interface Donation {
  id: string;
  userId: string;
  ashramId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  needId?: string; // Optional if donating to specific need
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  productsCount: number;
  email: string;
  phone?: string;
  donationPercentage: number; // Percentage of sales that go to orphanages
  createdAt: string;
}

export type ProductCategory = 'Handicrafts' | 'Textiles' | 'Pottery' | 'Jewelry' | 'Home Decor' | 'Food Items';

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  inStock: boolean;
  createdAt: string;
}