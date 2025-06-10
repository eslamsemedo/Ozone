import { Model, Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface CoachPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

export interface CoachReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CoachBase {
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl: string;
  email: string;
  category: string[];
  specialties: string[];
  certifications: string[];
  languages: string[];
  availability: Array<'Online' | 'Offline'>;
  priceRange: { min: number; max: number; currency: string };
  packages: CoachPackage[];
  reviews: CoachReview[];
  averageRating: number;
  location?: string;
  website?: string;
  socialMedia?: { platform: string; url: string }[];
  yearsOfExperience: number;
}

export interface Coach extends CoachBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CoachSchema = new Schema<Coach>(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    bio: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: [String], required: true },
    specialties: { type: [String], required: true },
    certifications: { type: [String], required: true },
    languages: { type: [String], required: true },
    availability: { type: [String], required: true },
    priceRange: { type: Object, required: true },
    packages: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      currency: { type: String, required: true },
      description: { type: String, required: true },
      features: { type: [String], required: true }
    }],
    reviews: [{
      id: { type: String, required: true },
      reviewerName: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: String, required: true }
    }],
    averageRating: { type: Number, required: true },
    location: { type: String },
    website: { type: String },
    socialMedia: { type: [Object] },
    yearsOfExperience: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Coach: Model<Coach> = (mongoose.models?.coach as Model<Coach>) || mongoose.model<Coach>('coach', CoachSchema);

