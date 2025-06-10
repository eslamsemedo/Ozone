// 'use client';

// import type { Coach, FilterOptions } from '@/types';
// import { CoachCard } from '@/components/coach/coach-card';
// import { CoachFilters } from '@/components/coach/coach-filters';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useMemo, useState, useEffect } from 'react';
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';
// import { useDebounce } from '@/hooks/use-debounce';

// interface CoachListClientProps {
//   initialCoaches: Coach[];
//   filterOptions: FilterOptions;
// }

// export function CoachListClient({ initialCoaches, filterOptions }: CoachListClientProps) {
//   console.log('initialCoaches', initialCoaches);
//   const [coaches, setCoaches] = useState<Coach[]>(initialCoaches);
//   const [activeFilters, setActiveFilters] = useState<{
//     category: string[];
//     priceRange: { min: number; max: number };
//     language: string[];
//     availability: Array<'Online' | 'Offline'>;
//     searchTerm: string;
//   }>({
//     category: [],
//     priceRange: { min: 0, max: 500 },
//     language: [],
//     availability: [],
//     searchTerm: '',
//   });

//   const debouncedSearchTerm = useDebounce(activeFilters.searchTerm, 300);

//   useEffect(() => {
//     let filtered = initialCoaches;

//     // Filter by search term (name, tagline, specialties)
//     if (debouncedSearchTerm) {
//       const searchLower = debouncedSearchTerm.toLowerCase();
//       filtered = filtered.filter(coach =>
//         coach.name.toLowerCase().includes(searchLower) ||
//         coach.tagline.toLowerCase().includes(searchLower) ||
//         coach.specialties.some(spec => spec.toLowerCase().includes(searchLower))
//       );
//     }

//     // Filter by category
//     if (activeFilters.category.length > 0) {
//       filtered = filtered.filter(coach =>
//         activeFilters.category.some(cat => coach.category.includes(cat))
//       );
//     }

//     // Filter by price range
//     filtered = filtered.filter(coach =>
//       coach.priceRange.min >= activeFilters.priceRange.min &&
//       coach.priceRange.max <= activeFilters.priceRange.max
//     );

//     // Filter by language
//     if (activeFilters.language.length > 0) {
//       filtered = filtered.filter(coach =>
//         activeFilters.language.some(lang => coach.languages.includes(lang))
//       );
//     }

//     // Filter by availability
//     if (activeFilters.availability.length > 0) {
//       filtered = filtered.filter(coach =>
//         activeFilters.availability.some(avail => coach.availability.includes(avail))
//       );
//     }
    
//     setCoaches(filtered);
//   }, [activeFilters, initialCoaches, debouncedSearchTerm]);

//   return (
//     <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
//       <aside className="w-full md:w-1/4 lg:w-1/5">
//         <div className="sticky top-20 space-y-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground text-white" />
//             <Input
//               type="search"
//               placeholder="Search coaches..."
//               className="pl-10 border-white/20 bg-white/10 text-white"
//               value={activeFilters.searchTerm}
//               onChange={(e) => setActiveFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
//             />
//           </div>
//           <CoachFilters
//             options={filterOptions}
//             activeFilters={activeFilters}
//             onFilterChange={setActiveFilters}
//           />
//         </div>
//       </aside>
//       <main className="w-full md:w-3/4 lg:w-4/5">
//         {coaches.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             <AnimatePresence>
//               {coaches.map((coach, index) => (
//                 <motion.div
//                   key={coach.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.2, delay: index * 0.05 }}
//                 >
//                   <CoachCard coach={coach} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-96 border border-dashed rounded-lg border-white/20">
//             <Search className="h-16 w-16 text-white/40 mb-4" />
//             <h3 className="text-xl font-semibold text-white">No Coaches Found</h3>
//             <p className="text-white/60">Try adjusting your search or filters.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

import type { Coach, FilterOptions } from '@/types';
import { CoachCard } from '@/components/coach/coach-card';
import { CoachFilters } from '@/components/coach/coach-filters';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

interface Props {
  initialCoaches: Coach[];
  filterOptions:  FilterOptions & { globalMin: number; globalMax: number };
}

export function CoachListClient({ initialCoaches, filterOptions }: Props) {
  const [coaches, setCoaches] = useState<Coach[]>(initialCoaches);

  const [activeFilters, setActiveFilters] = useState({
    category:    [] as string[],
    priceRange:  {                    // ← start with FULL data span
      min: filterOptions.globalMin,
      max: filterOptions.globalMax,
    },
    language:    [] as string[],
    availability:[] as Array<'Online' | 'Offline'>,
    searchTerm:  '',
  });

  const debouncedSearch = useDebounce(activeFilters.searchTerm, 300);

  // ──────────────────────────────────────────────
  // Re-compute whenever filters / search change
  // ──────────────────────────────────────────────
  useEffect(() => {
    let filtered = initialCoaches;

    // search (name, tagline, specialties)
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.specialties.some(s => s.toLowerCase().includes(q))
      );
    }

    // category
    if (activeFilters.category.length) {
      filtered = filtered.filter(c =>
        activeFilters.category.some(cat => c.category.includes(cat))
      );
    }

    // price – keep if ANY overlap with slider range
    filtered = filtered.filter(c =>
      c.priceRange.max >= activeFilters.priceRange.min &&
      c.priceRange.min <= activeFilters.priceRange.max
    );

    // language
    if (activeFilters.language.length) {
      filtered = filtered.filter(c =>
        activeFilters.language.some(l => c.languages.includes(l))
      );
    }

    // availability
    if (activeFilters.availability.length) {
      filtered = filtered.filter(c =>
        activeFilters.availability.some(a => c.availability.includes(a))
      );
    }

    setCoaches(filtered);
  }, [debouncedSearch, activeFilters, initialCoaches]);

  // ──────────────────────────────────────────────
  // UI
  // ──────────────────────────────────────────────
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      {/* Filters */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <div className="sticky top-20 space-y-6">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
            <Input
              type="search"
              placeholder="Search coaches..."
              className="pl-10 border-white/20 bg-white/10 text-white"
              value={activeFilters.searchTerm}
              onChange={e =>
                setActiveFilters(p => ({ ...p, searchTerm: e.target.value }))
              }
            />
          </div>

          {/* Reusable filter component */}
          <CoachFilters
            options={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </div>
      </aside>

      {/* Cards */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        {coaches.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {coaches.map((coach, i) => (
                <motion.div
                  key={coach.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <CoachCard coach={coach} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 border border-dashed rounded-lg border-white/20">
            <Search className="h-16 w-16 text-white/40 mb-4" />
            <h3 className="text-xl font-semibold text-white">No Coaches Found</h3>
            <p className="text-white/60">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}