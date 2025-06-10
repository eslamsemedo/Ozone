'use client';

import type { FilterOptions as FilterOptionType } from '@/types';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';

interface CoachFiltersProps {
  options: FilterOptionType;
  activeFilters: {
    category: string[];
    priceRange: { min: number; max: number };
    language: string[];
    availability: string[];
    searchTerm?: string; // Added searchTerm property
  };
  onFilterChange: (filters: any) => void;
}

export function CoachFilters({ options, activeFilters, onFilterChange }: CoachFiltersProps) {

  const handleCategoryChange = (category: string) => {
    const newCategories = activeFilters.category.includes(category)
      ? activeFilters.category.filter(c => c !== category)
      : [...activeFilters.category, category];
    onFilterChange({ ...activeFilters, category: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...activeFilters, priceRange: { min: value[0], max: value[1] } });
  };

  const handleLanguageChange = (language: string) => {
    const newLanguages = activeFilters.language.includes(language)
      ? activeFilters.language.filter(l => l !== language)
      : [...activeFilters.language, language];
    onFilterChange({ ...activeFilters, language: newLanguages });
  };

  const handleAvailabilityChange = (availability: string) => {
    const newAvailabilities = activeFilters.availability.includes(availability)
      ? activeFilters.availability.filter(a => a !== availability)
      : [...activeFilters.availability, availability];
    onFilterChange({ ...activeFilters, availability: newAvailabilities });
  };

  const clearFilters = () => {
    onFilterChange({
      category: [],
      priceRange: { min: options.globalMin, max: options.globalMax },
      language: [],
      availability: [],
      searchTerm: activeFilters.searchTerm // Preserve search term
    });
  };

  return (
    <div className="space-y-6 p-4 border border-white/20 rounded-lg shadow-sm bg-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-white hover:text-white/80 hover:bg-white/10">
          Clear All
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={['category', 'price', 'language', 'availability']} className="w-full">
        <AccordionItem value="category" className="border-white/20">
          <AccordionTrigger className="text-white hover:text-white/80">Category</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {options.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={activeFilters.category.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  className="border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor={`cat-${category}`} className="font-normal text-gray-300">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-white/20">
          <AccordionTrigger className="text-white hover:text-white/80">Price Range</AccordionTrigger>
          <AccordionContent className="pt-2">
            <Slider
              defaultValue={[activeFilters.priceRange.min, activeFilters.priceRange.max]}
              min={options.globalMin}
              max={options.globalMax}
              step={10}
              onValueCommit={handlePriceChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-300">
              <span>${activeFilters.priceRange.min}</span>
              <span>${activeFilters.priceRange.max}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="language" className="border-white/20">
          <AccordionTrigger className="text-white hover:text-white/80">Language</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {options.languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${language}`}
                  checked={activeFilters.language.includes(language)}
                  onCheckedChange={() => handleLanguageChange(language)}
                  className="border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor={`lang-${language}`} className="font-normal text-gray-300">{language}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border-white/20">
          <AccordionTrigger className="text-white hover:text-white/80">Availability</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {options.availabilities.map((availability) => (
              <div key={availability} className="flex items-center space-x-2">
                <Checkbox
                  id={`avail-${availability}`}
                  checked={activeFilters.availability.includes(availability)}
                  onCheckedChange={() => handleAvailabilityChange(availability)}
                  className="border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor={`avail-${availability}`} className="font-normal text-gray-300">{availability}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
