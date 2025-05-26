"use client"
import { BookOpen, ChevronDown, ChevronUp, Clock, Droplet, Tag, Users, X } from 'lucide-react';
import React, { useState } from 'react'

export default function mealDeteil({
  recipeData,
  onclose
}: {
  recipeData: {
    recipe: {
      dietLabels: string[];
      healthLabels: string[];
      cautions: string[];
      [key: string]: any;
    };
  },
  onclose: React.Dispatch<React.SetStateAction<any>>
  // updatedAt: { $date: string }
}) {

  const [activeTab, setActiveTab] = useState('ingredients');
  const [showFullNutrition, setShowFullNutrition] = useState(false);


  const { recipe }: {
    recipe:
    {
      dietLabels: string[];
      healthLabels: string[];
      cautions: string[];
      [key: string]: any
    }
  } = recipeData;

  // For placeholder image since we can't use external images
  const placeholderImageUrl = "/api/placeholder/500/300";

  // Format nutrition values for display
  const formatNutrition = (value: number | undefined, unit: string): string => {
    if (typeof value !== 'number') return '0';
    return `${Math.round(value * 10) / 10}${unit}`;
  };

  // Extract key nutrients for quick display
  const keyNutrients = [
    { label: 'Calories', value: formatNutrition(recipe.totalNutrients.ENERC_KCAL.quantity, ' kcal'), percent: Math.round(recipe.totalDaily.ENERC_KCAL.quantity) },
    { label: 'Protein', value: formatNutrition(recipe.totalNutrients.PROCNT.quantity, 'g'), percent: Math.round(recipe.totalDaily.PROCNT.quantity) },
    { label: 'Fat', value: formatNutrition(recipe.totalNutrients.FAT.quantity, 'g'), percent: Math.round(recipe.totalDaily.FAT.quantity) },
    { label: 'Carbs', value: formatNutrition(recipe.totalNutrients.CHOCDF.quantity, 'g'), percent: Math.round(recipe.totalDaily.CHOCDF.quantity) }
  ];

  // Generate a digestible form of the recipe's digest
  const allNutrients = [
    ...keyNutrients,
    { label: 'Fiber', value: formatNutrition(recipe.totalNutrients.FIBTG.quantity, 'g'), percent: Math.round(recipe.totalDaily.FIBTG.quantity) },
    { label: 'Sugar', value: formatNutrition(recipe.totalNutrients.SUGAR.quantity, 'g'), percent: null },
    { label: 'Vitamin C', value: formatNutrition(recipe.totalNutrients.VITC.quantity, 'mg'), percent: Math.round(recipe.totalDaily.VITC.quantity) }
  ];


  return (
    <div className='flex items-center justify-center h-full w-full'>

      <div className="bg-white w-[95%] h-[95%] rounded-lg shadow-lg overflow-auto">
        <button
          onClick={() => onclose(null)}
          className=' absolute  right-7 cursor-pointer text-[#000] z-50'>
          <X />
        </button>

        {/* Header with Image */}
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl font-bold">{recipe.label}</h1>
              <p className="opacity-90">Source: {recipe.source}</p>
            </div>
          </div>
        </div>

        {/* Recipe Meta Info */}
        <div className="p-6 bg-yellow-50">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-yellow-600" />
              <span>{recipe.totalTime > 0 ? `${recipe.totalTime} mins` : 'Time not specified'}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-yellow-600" />
              <span>Serves {recipe.yield}</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-5 h-5 mr-2 text-yellow-600" />
              <span>{recipe.dishType?.[0] || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-600" />
              <span>{recipe.cuisineType?.[0] || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'ingredients'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'nutrition'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'health'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('health')}
            >
              Health & Diet
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'ingredients' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredientLines.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mt-1.5 mr-3"></span>
                    <span>{ingredient.replace(/^\*\s*/, '')}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  View Full Recipe Instructions
                </a>

              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Nutrition Facts</h2>
              <p className="text-gray-600 mb-4">Per serving (serves {recipe.yield})</p>

              {/* Key nutrients */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {keyNutrients.map((nutrient) => (
                  // console.log(String(Number(nutrient.value)/Number(recipe.yield)))
                  <div key={nutrient.label} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">{String((parseInt(nutrient.value)/parseInt(recipe.yield)).toFixed(1))}</div>
                    <div className="text-sm text-gray-600">{nutrient.label}</div>
                    {/* {nutrient.percent && (
                      <div className="text-xs text-gray-500 mt-1">{nutrient.percent}g Daily Value</div>
                    )} */}
                  </div>
                ))}
              </div>

              {/* Nutrition table */}
              <div>
                <button
                  onClick={() => setShowFullNutrition(!showFullNutrition)}
                  className="flex items-center text-yellow-600 font-medium mb-4"
                >
                  {showFullNutrition ? 'Hide Details' : 'Show More Nutrition Facts'}
                  {showFullNutrition ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                </button>

                {showFullNutrition && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nutrient</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Daily Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allNutrients.map((nutrient) => (
                          <tr key={nutrient.label}>
                            <td className="px-4 py-2 text-sm text-gray-900">{nutrient.label}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 text-right">{nutrient.value}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 text-right">
                              {nutrient.percent ? `${nutrient.percent}%` : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Health & Diet Information</h2>

              {/* Diet Labels */}
              {recipe.dietLabels && recipe.dietLabels.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Diet Labels</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.dietLabels.map(label => (
                      <span key={label} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Labels */}
              {recipe.healthLabels && recipe.healthLabels.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Health Labels</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.healthLabels.map(label => (
                      <span key={label} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cautions */}
              {recipe.cautions && recipe.cautions.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Cautions</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.cautions.map(caution => (
                      <span key={caution} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                        {caution}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3">
          <div className="flex items-center justify-end">
            <div className="flex items-center text-sm text-gray-500">
              <Droplet className="w-4 h-4 mr-1 text-blue-500" />
              {formatNutrition(recipe.totalWeight, 'g')} total weight
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
