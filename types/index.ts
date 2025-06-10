
export interface CoachReview {
  id: string;
  reviewerName: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string; // ISO date string
}

export interface CoachPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

export interface Coach {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl: string;
  email: string;
  category: string[]; // e.g., ["Life Coach", "Business Coach"]
  specialties: string[]; // e.g., ["Career Development", "Mindfulness"]
  certifications: string[]; // e.g., ["ICF Certified", "PhD Psychology"]
  languages: string[]; // e.g., ["English", "Spanish"]
  availability: Array<'Online' | 'Offline'>;
  priceRange: { min: number; max: number; currency: string }; // e.g., { min: 50, max: 200, currency: "USD" }
  packages: CoachPackage[];
  reviews: CoachReview[];
  averageRating: number; // Calculated or stored
  location?: string; // For offline availability
  website?: string;
  socialMedia?: { platform: string; url: string }[];
  yearsOfExperience: number;
}

export type UserRole = 'admin' | 'editor' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface FilterOptions {
  globalMax: number | undefined;
  globalMin: number | undefined;
  categories: string[];
  priceRanges: { label: string; min: number; max: number }[];
  languages: string[];
  availabilities: Array<'Online' | 'Offline'>;
}

export type CoachFormData = Omit<Coach, 'id' | 'averageRating' | 'reviews' | 'profileImageUrl'> & {
  profileImageFile?: FileList;
};
