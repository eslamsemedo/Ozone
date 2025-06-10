import type { Coach } from '@/types';
// import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, DollarSign, Users } from 'lucide-react';
import { Icons } from '@/components/icons';
import Image from 'next/image';

interface CoachCardProps {
  coach: Coach;
}

export function CoachCard({ coach }: CoachCardProps) {
  // Ensure we have valid data
  if (!coach) {
    return null;
  }

  // Safely handle optional fields
  const reviewsCount = coach.reviews?.length || 0;
  const averageRating = coach.averageRating || 0;
  const categories = coach.category || [];
  const availability = coach.availability || [];
  const priceRange = coach.priceRange || { min: 0, max: 0, currency: 'USD' };

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white/10 backdrop-blur-sm border border-white/20">
      {/* <div className="relative w-full h-56">
        <img
          src={coach.profileImageUrl}
          alt={coach.name}
          // layout="fill"
          // objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="professional portrait"
        />
      </div> */}
      <CardHeader>
        <div className="flex items-center space-x-4">
          {coach.profileImageUrl && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={coach.profileImageUrl}
                alt={coach.name}
                fill
                className="object-cover"
                sizes="(max-width: 64px) 100vw, 64px"
              />
            </div>
          )}
          <div>
            <CardTitle className="text-xl text-white group-hover:text-white/80 transition-colors">
              <Link href={`/coaches/${coach.id}`}>
                {coach.name}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis text-gray-300">
              {coach.tagline}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Icons.starFilled className="h-5 w-5 text-yellow-400" />
              <span>{averageRating.toFixed(1)} ({reviewsCount} reviews)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <DollarSign className="h-5 w-5 text-emerald-400" />
          <span>{priceRange.currency} {priceRange.min} - {priceRange.max}</span>
        </div>
        {coach.location && availability.includes('Offline') && (
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span>{coach.location}</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <Users className="h-5 w-5 text-purple-400" />
          <span>{availability.join(' & ')}</span>
        </div>
        <div className="pt-2">
          {categories.slice(0, 2).map((cat) => (
            <Badge 
              key={cat} 
              variant="secondary" 
              className="mr-1 mb-1 bg-white/20 text-white hover:bg-white/30"
            >
              {cat}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white hover:bg-white/30"
            >
              +{categories.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link href={`/coaches/${coach.id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
