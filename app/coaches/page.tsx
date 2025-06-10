import type { Coach, FilterOptions } from '@/types';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import connectDB from '@/mongoDB/db';
import { Coach as CoachModel } from '@/mongoDB/models/coaches';
import { CoachListClient } from './(components)/coach-list-client';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title:       'Explore Coaches - CoachMatch',
  description: 'Find and filter coaches based on your preferences.',
};

// ──────────────────────────────────────────────
// Helper → fetch distinct filter values + range
// ──────────────────────────────────────────────
async function getFilterOptions(): Promise<
  FilterOptions & { globalMin: number; globalMax: number }
> {
  await connectDB();
  const coaches = await CoachModel.find({}).lean();

  const categories     = [...new Set(coaches.flatMap(c => c.category))];
  const languages      = [...new Set(coaches.flatMap(c => c.languages))];
  const availabilities = [...new Set(coaches.flatMap(c => c.availability))] as Array<'Online' | 'Offline'>;

  const mins = coaches.map(c => c.priceRange.min);
  const maxs = coaches.map(c => c.priceRange.max);
  const globalMin = Math.min(...mins);
  const globalMax = Math.max(...maxs);

  // simple three-band price ranges (optional – tweak as needed)
  const step = (globalMax - globalMin) / 3;
  const priceRanges = [
    { label: 'Budget',   min: globalMin,           max: globalMin + step },
    { label: 'Standard', min: globalMin + step,    max: globalMin + 2*step },
    { label: 'Premium',  min: globalMin + 2*step,  max: globalMax },
  ];

  return { categories, languages, availabilities, priceRanges, globalMin, globalMax };
}

// convert Mongo → UI type
function transformCoach(m: any): Coach {
  return {
    id:                m._id.toString(),
    name:              m.name,
    tagline:           m.tagline,
    bio:               m.bio,
    profileImageUrl:   m.profileImageUrl,
    email:             m.email,
    category:          m.category,
    specialties:       m.specialties,
    certifications:    m.certifications,
    languages:         m.languages,
    availability:      m.availability,
    priceRange:        m.priceRange,
    packages:          m.packages      ?? [],
    reviews:           m.reviews       ?? [],
    averageRating:     m.averageRating,
    location:          m.location,
    website:           m.website,
    socialMedia:       m.socialMedia   ?? [],
    yearsOfExperience: m.yearsOfExperience,
  };
}

export default async function CoachesPage() {
  await connectDB();
  const mongoCoaches   = await CoachModel.find({}).lean();
  const initialCoaches = mongoCoaches.map(transformCoach);
  const filterOptions  = await getFilterOptions();

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-[#04111b] via-[#04111b] to-[#0F4C75] p-6 md:p-8">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0">
          <Button
            asChild
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            <Link href="/home" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>Return to Home</span>
            </Link>
          </Button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Coaches</h1>
        <p className="text-lg text-gray-200 max-w-2xl">
          Discover talented coaches ready to help you achieve your goals. Use the filters to find your perfect match.
        </p>
      </div>

      <Suspense fallback={<CoachListFallback />}>
        <CoachListClient
          initialCoaches={initialCoaches}
          filterOptions={filterOptions}
        />
      </Suspense>
    </div>
  );
}

function CoachListFallback() {
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      <div className="w-full md:w-1/4 lg:w-1/5 space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-white/10" />
        ))}
      </div>
      <div className="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-96 w-full rounded-lg bg-white/10" />
        ))}
      </div>
    </div>
  );
}