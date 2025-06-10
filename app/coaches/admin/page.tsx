'use client'
import React, { useEffect, useState } from 'react';
import { Trash2, Edit, Plus, X, Save, User, Mail, Globe, MapPin, DollarSign, Star, ImageIcon, Check } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';

// Types
interface Coach {
  _id: string;
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl: string;
  email: string;
  category: string[];
  specialties: string[];
  certifications: string[];
  languages: string[];
  availability: string[];
  priceRange: { min: number; max: number; currency: string };
  averageRating: number;
  location: string;
  website?: string;
  yearsOfExperience: number;
  packages: string[];
  reviews: string[];
  socialMedia: string[];
}

// Initial mock data
// const initialCoaches: Coach[] = [
//   {
//     id: '1',
//     name: 'Dr. Evelyn Reed',
//     tagline: 'Unlocking Your Potential, One Step at a Time.',
//     bio: 'With over 15 years of experience in leadership and personal development, Dr. Reed empowers individuals to break through barriers and achieve their highest aspirations. Her approach combines evidence-based strategies with compassionate guidance.',
//     profileImageUrl: 'https://picsum.photos/seed/evelyn/300/300',
//     email: 'evelyn.reed@coachmatch.com',
//     category: ['Life Coach', 'Career Coach'],
//     specialties: ['Career Transition', 'Leadership Development', 'Stress Management', 'Executive Coaching'],
//     certifications: ['ICF Master Certified Coach (MCC)', 'PhD in Organizational Psychology'],
//     languages: ['English', 'French'],
//     availability: ['Online', 'Offline'],
//     priceRange: { min: 150, max: 300, currency: 'USD' },
//     averageRating: 4.8,
//     location: 'New York, NY',
//     website: 'https://evelynreedcoaching.com',
//     yearsOfExperience: 15,
//     packages: [],
//     reviews: [],
//     socialMedia: [],
//   },
//   {
//     id: '2',
//     name: 'Marcus Chen',
//     tagline: 'Building Resilient Minds and Thriving Businesses.',
//     bio: 'Marcus is a certified business coach with a passion for helping entrepreneurs and small business owners navigate challenges and scale their ventures. He focuses on practical strategies and sustainable growth.',
//     profileImageUrl: 'https://picsum.photos/seed/marcus/300/300',
//     email: 'marcus.chen@coachmatch.com',
//     category: ['Business Coach', 'Startup Coach'],
//     specialties: ['Business Strategy', 'Marketing & Sales', 'Team Building', 'Financial Planning'],
//     certifications: ['Certified Business Coach (CBC)', 'MBA'],
//     languages: ['English', 'Mandarin'],
//     availability: ['Online'],
//     priceRange: { min: 100, max: 250, currency: 'USD' },
//     averageRating: 4.5,
//     location: 'Remote',
//     website: 'https://marcuschen.coach',
//     yearsOfExperience: 8,
//     packages: [],
//     reviews: [],
//     socialMedia: [],
//   },
//   {
//     id: '3',
//     name: 'Sofia Ramirez',
//     tagline: 'Your Partner in Wellness and Mindful Living.',
//     bio: 'Sofia is a holistic wellness coach dedicated to helping clients achieve balance in mind, body, and spirit. Her practice integrates mindfulness, nutrition, and positive psychology techniques.',
//     profileImageUrl: 'https://picsum.photos/seed/sofia/300/300',
//     email: 'sofia.ramirez@coachmatch.com',
//     category: ['Wellness Coach', 'Mindfulness Coach'],
//     specialties: ['Mindfulness & Meditation', 'Nutrition Guidance', 'Work-Life Balance', 'Holistic Health'],
//     certifications: ['Certified Health and Wellness Coach (CHWC)', 'Registered Yoga Teacher (RYT 500)'],
//     languages: ['English', 'Spanish'],
//     availability: ['Online', 'Offline'],
//     priceRange: { min: 80, max: 180, currency: 'USD' },
//     averageRating: 4.9,
//     location: 'Miami, FL',
//     website: 'https://sofiaramirezwellness.com',
//     yearsOfExperience: 6,
//     packages: [],
//     reviews: [],
//     socialMedia: [],
//   }
// ];

const CoachAdminPage: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [formData, setFormData] = useState<Partial<Coach>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/coaches');
      if (!response.ok) {
        throw new Error('Failed to fetch coaches');
      }
      const data = await response.json();
      console.log('data', data);
      setCoaches(data);
      setError(null);
    } catch (err) {
      setError('Failed to load coaches. Please try again later.');
      console.error('Error fetching coaches:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize form with empty or existing coach data
  const initializeForm = (coach?: Coach) => {
    if (coach) {
      setFormData({ ...coach });
      setEditingCoach(coach);
    } else {
      setFormData({
        name: '',
        tagline: '',
        bio: '',
        profileImageUrl: '',
        email: '',
        category: [],
        specialties: [],
        certifications: [],
        languages: [],
        availability: [],
        priceRange: { min: 0, max: 0, currency: 'USD' },
        averageRating: 0,
        location: '',
        website: '',
        yearsOfExperience: 0,
        packages: [],
        reviews: [],
        socialMedia: [],
      });
      setEditingCoach(null);
    }
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Coach] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Handle array field changes
  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  // Save coach (add or update)
  const saveCoach = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields (Name and Email)');
      return;
    }

    try {
      const method = editingCoach ? 'PUT' : 'POST';
      const response = await fetch('/api/coaches', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save coach');
      }

      await fetchCoaches(); // Refresh the list
      setIsModalOpen(false);
      setEditingCoach(null);
      setFormData({});
    } catch (err) {
      console.error('Error saving coach:', err);
      alert('Failed to save coach. Please try again.');
    }
  };

  // Delete coach
  const deleteCoach = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      try {
        const response = await fetch(`/api/coaches?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete coach');
        }

        await fetchCoaches(); // Refresh the list
      } catch (err) {
        console.error('Error deleting coach:', err);
        alert('Failed to delete coach. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading coaches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCoaches}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Coach Management</h1>
              <p className="text-gray-600 mt-2">Manage your coaching staff</p>
            </div>
            <button
              onClick={() => initializeForm()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add New Coach
            </button>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={coach.profileImageUrl}
                    alt={coach.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{coach.name}</h3>
                    <p className="text-sm text-gray-600">{coach.tagline}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    {coach.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    {coach.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign size={16} />
                    ${coach.priceRange.min} - ${coach.priceRange.max}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star size={16} />
                    {coach.averageRating}/5.0 • {coach.yearsOfExperience} years exp.
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {coach.category.slice(0, 2).map((cat, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                    {coach.category.length > 2 && (
                      <span className="text-xs text-gray-500">+{coach.category.length - 2} more</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => initializeForm(coach)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCoach(coach._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingCoach ? 'Edit Coach' : 'Add New Coach'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter coach name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline || ''}
                      onChange={(e) => handleInputChange('tagline', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter coaching tagline"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter coach biography"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image URL
                    </label>
                    {/* <input
                      type="url"
                      value={formData.profileImageUrl || ''}
                      onChange={(e) => handleInputChange('profileImageUrl', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    /> */}
                    <CldUploadWidget
                      uploadPreset="moshNext"
                      options={{
                        // multiple: false,
                        maxFileSize: 2000000, // 2MB
                        // cropping: true,
                        sources: ["local", "camera"],
                        styles: {
                          palette: {
                            window: "#07253E",
                            windowBorder: "#90A0B3",
                            tabIcon: "#0078FF",
                            menuIcons: "#5A616A",
                            textDark: "#000000",
                            textLight: "#FFFFFF",
                            link: "#0078FF",
                            action: "#FF620C",
                            inactiveTabIcon: "#245DA7",
                            error: "#F44235",
                            inProgress: "#0078FF",
                            complete: "#20B832",
                            sourceBg: "#000000"
                          },
                          fonts: {
                            default: {
                              active: true
                            }
                          }
                        }
                      }}
                      onSuccess={(result) => {
                        const url =
                          typeof result.info === "object" && result.info && "url" in result.info
                            ? (result.info.url as string)
                            : ""
                        handleInputChange('profileImageUrl', url)
                      }}
                    >
                      {({ open }) => {
                        return (
                          <div className='flex items-center gap-2'>
                          <Button
                            type="button"
                            onClick={() => open()}
                            variant={"outline"}
                            className="cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
                          >
                            <ImageIcon className="mr-2" size={16} color="currentColor" />
                            {formData.profileImageUrl ? "change" : "add"} image
                          </Button>
                          {formData.profileImageUrl && (
                            <Check className="mr-2 p-0.5 bg-green-500 rounded-full" size={20} color="currentColor" />
                          )}
                          </div>
                          
                        )
                      }}
                    </CldUploadWidget>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State/Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website || ''}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={formData.yearsOfExperience || 0}
                      onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (USD)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.priceRange?.min || 0}
                      onChange={(e) => handleInputChange('priceRange.min', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Min price"
                      min="0"
                    />
                    <input
                      type="number"
                      value={formData.priceRange?.max || 0}
                      onChange={(e) => handleInputChange('priceRange.max', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Max price"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Rating (1-5)
                  </label>
                  <input
                    type="number"
                    value={formData.averageRating || 0}
                    onChange={(e) => handleInputChange('averageRating', parseFloat(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>

                {/* Array Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categories (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.category?.join(', ') || ''}
                      onChange={(e) => handleArrayChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Life Coach, Career Coach"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.languages?.join(', ') || ''}
                      onChange={(e) => handleArrayChange('languages', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="English, French"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.availability?.join(', ') || ''}
                      onChange={(e) => handleArrayChange('availability', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Online, Offline"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialties (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.specialties?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('specialties', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leadership Development, Career Transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.certifications?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('certifications', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ICF Master Certified Coach (MCC), PhD"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCoach}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  {editingCoach ? 'Update Coach' : 'Add Coach'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {coaches.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <User size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No coaches found</h3>
            <p className="text-gray-600 mb-6">Start by adding your first coach to the system.</p>
            <button
              onClick={() => initializeForm()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Plus size={20} />
              Add First Coach
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachAdminPage;