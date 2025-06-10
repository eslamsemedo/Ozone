import type { Coach, CoachReview, CoachPackage, User } from '@/types';

export const mockReviews: CoachReview[] = [
  { id: 'review1', reviewerName: 'Alice Smith', rating: 5, comment: 'Amazing coach, truly life-changing experience!', date: '2023-05-15T10:00:00Z' },
  { id: 'review2', reviewerName: 'Bob Johnson', rating: 4, comment: 'Very helpful and insightful. Helped me gain clarity.', date: '2023-06-01T14:30:00Z' },
  { id: 'review3', reviewerName: 'Carol White', rating: 5, comment: 'Exceptional guidance and support. Highly recommend!', date: '2023-04-20T09:15:00Z' },
];

export const mockPackages: CoachPackage[] = [
  { id: 'pkg1', name: 'Starter Pack', price: 199, currency: 'USD', description: '3 sessions to kickstart your journey.', features: ['3x 1-hour sessions', 'Goal setting', 'Email support'] },
  { id: 'pkg2', name: 'Growth Accelerator', price: 499, currency: 'USD', description: '8 sessions for deeper transformation.', features: ['8x 1-hour sessions', 'Personalized action plan', 'Bi-weekly check-ins', 'Resource library access'] },
  { id: 'pkg3', name: 'Premium Immersion', price: 899, currency: 'USD', description: '12 sessions for comprehensive development.', features: ['12x 1-hour sessions', 'Full strategy development', 'Weekly check-ins', 'Priority email/chat support', 'Extended resource access'] },
];

export const mockCoaches: Coach[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    tagline: 'Unlocking Your Potential, One Step at a Time.',
    bio: 'With over 15 years of experience in leadership and personal development, Dr. Reed empowers individuals to break through barriers and achieve their highest aspirations. Her approach combines evidence-based strategies with compassionate guidance.',
    profileImageUrl: 'https://picsum.photos/seed/evelyn/300/300',
    email: 'evelyn.reed@coachmatch.com',
    category: ['Life Coach', 'Career Coach'],
    specialties: ['Career Transition', 'Leadership Development', 'Stress Management', 'Executive Coaching'],
    certifications: ['ICF Master Certified Coach (MCC)', 'PhD in Organizational Psychology'],
    languages: ['English', 'French'],
    availability: ['Online', 'Offline'],
    priceRange: { min: 150, max: 300, currency: 'USD' },
    packages: mockPackages.slice(0,2),
    reviews: mockReviews,
    averageRating: 4.8,
    location: 'New York, NY',
    website: 'https://evelynreedcoaching.com',
    socialMedia: [{ platform: 'LinkedIn', url: 'https://linkedin.com/in/evelynreed' }],
    yearsOfExperience: 15,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    tagline: 'Building Resilient Minds and Thriving Businesses.',
    bio: 'Marcus is a certified business coach with a passion for helping entrepreneurs and small business owners navigate challenges and scale their ventures. He focuses on practical strategies and sustainable growth.',
    profileImageUrl: 'https://picsum.photos/seed/marcus/300/300',
    email: 'marcus.chen@coachmatch.com',
    category: ['Business Coach', 'Startup Coach'],
    specialties: ['Business Strategy', 'Marketing & Sales', 'Team Building', 'Financial Planning'],
    certifications: ['Certified Business Coach (CBC)', 'MBA'],
    languages: ['English', 'Mandarin'],
    availability: ['Online'],
    priceRange: { min: 100, max: 250, currency: 'USD' },
    packages: [mockPackages[1], mockPackages[2]],
    reviews: mockReviews.slice(1,3),
    averageRating: 4.5,
    location: 'Remote',
    website: 'https://marcuschen.coach',
    socialMedia: [{ platform: 'Twitter', url: 'https://twitter.com/marcuschenbiz' }],
    yearsOfExperience: 8,
  },
  {
    id: '3',
    name: 'Sofia Ramirez',
    tagline: 'Your Partner in Wellness and Mindful Living.',
    bio: 'Sofia is a holistic wellness coach dedicated to helping clients achieve balance in mind, body, and spirit. Her practice integrates mindfulness, nutrition, and positive psychology techniques.',
    profileImageUrl: 'https://picsum.photos/seed/sofia/300/300',
    email: 'sofia.ramirez@coachmatch.com',
    category: ['Wellness Coach', 'Mindfulness Coach'],
    specialties: ['Mindfulness & Meditation', 'Nutrition Guidance', 'Work-Life Balance', 'Holistic Health'],
    certifications: ['Certified Health and Wellness Coach (CHWC)', 'Registered Yoga Teacher (RYT 500)'],
    languages: ['English', 'Spanish'],
    availability: ['Online', 'Offline'],
    priceRange: { min: 80, max: 180, currency: 'USD' },
    packages: mockPackages,
    reviews: [mockReviews[0]],
    averageRating: 4.9,
    location: 'Miami, FL',
    website: 'https://sofiaramirezwellness.com',
    socialMedia: [{ platform: 'Instagram', url: 'https://instagram.com/sofiawellness' }],
    yearsOfExperience: 6,
  },
  {
    id: '4',
    name: 'David Miller',
    tagline: 'Transforming Tech Leaders for Tomorrow.',
    bio: 'David specializes in coaching tech professionals and leaders, helping them enhance their leadership skills, navigate complex team dynamics, and drive innovation. He brings a decade of experience from Silicon Valley.',
    profileImageUrl: 'https://picsum.photos/seed/david/300/300',
    email: 'david.miller@coachmatch.com',
    category: ['Tech Coach', 'Leadership Coach'],
    specialties: ['Agile Methodologies', 'Product Management', 'Software Development Leadership', 'Team Motivation'],
    certifications: ['Certified Scrum Master (CSM)', 'Executive Leadership Certificate'],
    languages: ['English'],
    availability: ['Online'],
    priceRange: { min: 200, max: 400, currency: 'USD' },
    packages: mockPackages.slice(1),
    reviews: [mockReviews[1], mockReviews[2]],
    averageRating: 4.7,
    location: 'San Francisco, CA (Remote)',
    website: 'https://davidmiller.tech.coach',
    yearsOfExperience: 12,
  },
  {
    id: '5',
    name: 'Aisha Khan',
    tagline: 'Creative Solutions for Artists and Innovators.',
    bio: 'Aisha helps artists, writers, and creative professionals overcome blocks, develop their craft, and build sustainable careers. Her coaching style is intuitive, supportive, and results-oriented.',
    profileImageUrl: 'https://picsum.photos/seed/aisha/300/300',
    email: 'aisha.khan@coachmatch.com',
    category: ['Creative Coach', 'Arts Coach'],
    specialties: ['Creative Process', 'Portfolio Development', 'Grant Writing', 'Artist Branding'],
    certifications: ['Certified Creativity Coach', 'MFA Fine Arts'],
    languages: ['English', 'Urdu'],
    availability: ['Online', 'Offline'],
    priceRange: { min: 70, max: 150, currency: 'USD' },
    packages: [mockPackages[0], mockPackages[1]],
    reviews: [mockReviews[0], mockReviews[2]],
    averageRating: 4.6,
    location: 'London, UK',
    yearsOfExperience: 7,
  }
];

export const mockUserAdmin: User = {
  id: 'userAdmin1',
  name: 'Admin User',
  email: 'admin@coachmatch.com',
  role: 'admin',
  avatarUrl: 'https://picsum.photos/seed/admin/100/100'
};

export const mockUserEditor: User = {
  id: 'userEditor1',
  name: 'Editor User',
  email: 'editor@coachmatch.com',
  role: 'editor',
  avatarUrl: 'https://picsum.photos/seed/editor/100/100'
};

export const mockUserRegular: User = {
  id: 'userRegular1',
  name: 'Regular User',
  email: 'user@coachmatch.com',
  role: 'user',
  avatarUrl: 'https://picsum.photos/seed/user/100/100'
};

// For simplicity, we'll simulate a "logged in" user.
// In a real app, this would come from an auth context.
// export const getCurrentUser = (): User => {
//   // Cycle through users for testing different roles, or set one for specific testing
//   // const users = [mockUserAdmin, mockUserEditor, mockUserRegular];
//   // return users[Math.floor(Math.random() * users.length)];
//   return mockUserAdmin; // Default to admin for now
// };

export const getCoachById = (id: string): Coach | undefined => {
  return mockCoaches.find(coach => coach.id === id);
};

export const getCoaches = (): Coach[] => {
  return mockCoaches;
}

export const filterOptions: { categories: string[], languages: string[], availabilities: Array<'Online'|'Offline'> } = {
  categories: ["Life Coach", "Career Coach", "Business Coach", "Startup Coach", "Wellness Coach", "Mindfulness Coach", "Tech Coach", "Leadership Coach", "Creative Coach", "Arts Coach"],
  languages: ["English", "Spanish", "French", "Mandarin", "Urdu"],
  availabilities: ["Online", "Offline"],
};
