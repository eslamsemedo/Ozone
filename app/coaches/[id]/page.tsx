import type { Coach, CoachPackage, CoachReview } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CoachReviewsSection } from '@/components/coach-profile/coach-reviews-section';
import { CoachPackagesSection } from '@/components/coach-profile/coach-packages-section';
import { ArrowLeft } from 'lucide-react';
import connectToDatabase from '@/mongoDB/db';
import { Coach as CoachModel } from '@/mongoDB/models/coaches';

interface CoachProfilePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CoachProfilePageProps) {
  const { id } = params;
  
  try {
    await connectToDatabase();
    const coach = await CoachModel.findById(id);
    
    if (!coach) {
      return { title: 'Coach Not Found' };
    }
    
    return {
      title: `${coach.name} - Coach Profile`,
      description: coach.tagline,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Coach Profile' };
  }
}

export default async function CoachProfilePage({ params }: CoachProfilePageProps) {
  const { id } = params;
  
  try {
    await connectToDatabase();
    const coach = await CoachModel.findById(id);

    if (!coach) {
      notFound();
    }

    const getInitials = (name: string) => {
      const names = name.split(' ');
      let initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
    };

    // Convert MongoDB document to frontend Coach type
    const coachData: Coach = {
      id: coach._id.toString(),
      name: coach.name,
      tagline: coach.tagline,
      bio: coach.bio,
      profileImageUrl: coach.profileImageUrl,
      email: coach.email,
      category: coach.category,
      specialties: coach.specialties,
      certifications: coach.certifications,
      languages: coach.languages,
      availability: coach.availability as Array<'Online' | 'Offline'>,
      priceRange: coach.priceRange,
      packages: coach.packages,
      reviews: coach.reviews,
      averageRating: coach.averageRating,
      location: coach.location,
      website: coach.website,
      socialMedia: coach.socialMedia,
      yearsOfExperience: coach.yearsOfExperience,
    };

    return (
      <div className="min-h-screen space-y-8 bg-gradient-to-br from-[#04111b] via-[#0F4C75] to-[#3282B8] p-6 md:p-8">
        <Link href="/coaches" className="inline-flex items-center text-white hover:text-white/80 transition-colors mb-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Coaches</span>
        </Link>
        
        {/* Header Section */}
        <Card className="overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border border-white/20 p-2">
          <div className="md:flex">
            <div className="md:w-1/3 relative min-h-[250px] md:min-h-full">
              <Avatar className="h-full w-full rounded-none md:rounded-lg ">
                <AvatarImage 
                  src={coachData.profileImageUrl} 
                  alt={coachData.name} 
                  className="object-cover"
                  data-ai-hint="professional portrait"
                />
                <AvatarFallback className="rounded-none md:rounded-lg text-5xl bg-white/20 text-white">
                  {getInitials(coachData.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{coachData.name}</h1>
                <p className="text-lg text-gray-300 mt-1">{coachData.tagline}</p>
                <div className="flex items-center space-x-2 mt-3 text-yellow-400">
                  <Icons.starFilled className="h-5 w-5" />
                  <span>{coachData.averageRating.toFixed(1)} ({coachData.reviews.length} reviews)</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coachData.category.map((cat: string) => (
                    <Badge 
                      key={cat} 
                      variant="secondary" 
                      className="bg-white/20 text-white hover:bg-white/30"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book a Session
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Contact Coach
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Details Tabs Section */}
        <Tabs defaultValue="bio" className="w-full ">
          <TabsList className="grid p-2 h-fit w-full grid-cols-4 sm:grid-cols-4 mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="bio" className="text-white data-[state=active]:bg-white/20">Bio</TabsTrigger>
            <TabsTrigger value="specialties" className="text-white data-[state=active]:bg-white/20">Specialties</TabsTrigger>
            <TabsTrigger value="packages" className="text-white data-[state=active]:bg-white/20">Packages</TabsTrigger>
            <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-white/20">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="bio">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">About {coachData.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-300">
                <p>{coachData.bio}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-semibold text-white">Experience</h4>
                    <p className="text-gray-300">{coachData.yearsOfExperience} years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Languages</h4>
                    <p className="text-gray-300">{coachData.languages.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Availability</h4>
                    <p className="text-gray-300">{coachData.availability.join(', ')}</p>
                  </div>
                  {coachData.location && (
                    <div>
                      <h4 className="font-semibold text-white">Location</h4>
                      <p className="text-gray-300">{coachData.location}</p>
                    </div>
                  )}
                  {coachData.website && (
                    <div>
                      <h4 className="font-semibold text-white">Website</h4>
                      <Link 
                        href={`https://${coachData.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 break-all"
                      >
                        {coachData.website}
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialties">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Specialties & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Areas of Expertise</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {coachData.specialties.map((spec: string) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Certifications</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {coachData.certifications.map((cert: string) => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            <CoachPackagesSection packages={coachData.packages} />
          </TabsContent>

          <TabsContent value="reviews">
            <CoachReviewsSection reviews={coachData.reviews} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coach:', error);
    notFound();
  }
}
