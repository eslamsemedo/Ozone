"use client"
import { fetchExcersices } from '@/app/lib/directory';
import React, { useEffect, useState } from 'react'

export const muscles = {
  1: "Biceps",
  16: "Long Head Bicep",
  17: "Short Head Bicep",
  14: "Traps (mid-back)",
  13: "Lower back",
  12: "Abdominals",
  21: "Lower Abdominals",
  22: "Upper Abdominals",
  11: "Calves",
  31: "Tibialis",
  32: "Soleus",
  33: "Gastrocnemius",
  10: "Forearms",
  25: "Wrist Extensors",
  26: "Wrist Flexors",
  9: "Glutes",
  37: "Gluteus Medius",
  38: "Gluteus Maximus",
  8: "Hamstrings",
  39: "Medial Hamstrings",
  40: "Lateral Hamstrings",
  7: "Lats",
  6: "Shoulders",
  18: "Lateral Deltoid",
  19: "Anterior Deltoid",
  20: "Posterior Deltoid",
  5: "Triceps",
  34: "Long Head Tricep",
  35: "Lateral Head Triceps",
  36: "Medial Head Triceps",
  4: "Traps",
  41: "Upper Traps",
  42: "Lower Traps",
  3: "Quads",
  27: "Inner Thigh",
  28: "Inner Quadriceps",
  29: "Outer Quadricep",
  30: "Rectus Femoris",
  2: "Chest",
  23: "Upper Pectoralis",
  24: "Mid and Lower Chest",
  15: "Obliques",
  43: "Hands",

  46: "Feet",
  47: "Front Shoulders",
  48: "Rear Shoulders",
  49: "Neck",
  50: "Groin",
}
export const equipmentMap = {
  1: "Barbell",
  2: "Dumbbells",
  3: "Bodyweight",
  4: "Machine",
  6: "Medicine-Ball",
  7: "Kettlebells",
  8: "Stretches",
  9: "Cables",
  10: "Band",
  11: "Plate",
  12: "TRX",
  13: "Yoga",
  24: "Bosu-Ball",
  26: "Vitruvian",
  27: "Cardio",
  85: "Smith-Machine",
  105: "Recovery"
};
const levels = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Novice",
};
export interface value {
  Muscles: number[],
  Equipment: number[],
  Difficulty: number[]
}


export default function page() {
  const [activeFilters, setActiveFilters] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [values, setValues] = useState<value>(
    {
      Muscles: [],
      Equipment: [],
      Difficulty: []
    }
  )

  useEffect(() => {
    (async () => {
      console.log('Fetching exercises with values:', values);
      // console.log(values)
      try {
        const res = await fetchExcersices(values);
        // console.log('API returned →', res);

        const arr = Array.isArray(res)
          ? res
          : [];

        setData(arr);
        setActiveFilters(arr.length);
      } catch (er) {
        console.error('fetch failed', er);
      }
    })();
  }, [values])

  const handleClick = (i: any) => {

    // setActiveFilters
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    window.location.href = `/searchWorkout/${i.male.substring(i.male.lastIndexOf('/') + 1)}`;
  }

  return (

    <div className=" w-full rounded-2xl bg-gradient-to-br from-[#000000] to-[#0F4C75] text-white  p-4 md:p-10">
      <div className="directory-container">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Directory</h1>

        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mb-6 ">
          <p>{activeFilters} of 1603</p>
          <div className="flex items-center gap-4">
            <button className=" text-sm cursor-pointer"
              onClick={() => {
                setValues({
                  Muscles: [],
                  Equipment: [],
                  Difficulty: []
                });

                // Uncheck all checkboxes
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                  (checkbox as HTMLInputElement).checked = false;
                });
              }}
            >
              Clear all
            </button>
            <div className="flex items-center gap-2 text-sm text-white">
              <span>⚙️</span>
              <span>{activeFilters} Filters</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 bg-[#0F4C75] rounded-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Muscles Section */}
          <div className="bg-[#eeeeee] bg-opacity-80 p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900 text-center mb-4">Muscles</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(muscles).map(([key, muscle]) => (
                <div key={`muscle-${key}`} className="grid grid-cols-4 items-center gap-2">
                  <input
                    type="checkbox"
                    id={`muscle-${key}`}
                    className="w-[16px] h-[16px] col-span-1 cursor-pointer"
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        Muscles: e.target.checked
                          ? [...prev.Muscles, Number(key)]
                          : prev.Muscles.filter((muscleKey) => muscleKey !== Number(key))
                      }));
                    }}
                  />
                  <label htmlFor={`muscle-${key}`} className="text-sm text-gray-600 col-span-3 cursor-pointer font-sans">
                    {muscle}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Section */}
          <div className="bg-[#eeeeee] bg-opacity-80 p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900 text-center mb-4">Equipment</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(equipmentMap).map(([key, equipment]) => (
                <div key={`equipment-${key}`} className="grid grid-cols-4 items-center gap-2">
                  <input type="checkbox" id={`equipment-${key}`} className="w-[16px] h-[16px] col-span-1 cursor-pointer"
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        Equipment: e.target.checked
                          ? [...prev.Equipment, Number(key)]
                          : prev.Equipment.filter((equipmentKey) => equipmentKey !== Number(key))
                      }));
                    }}
                  />
                  <label htmlFor={`equipment-${key}`} className="text-sm text-gray-600 col-span-3 cursor-pointer font-sans">
                    {equipment}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Section */}
          <div className="bg-[#eeeeee] bg-opacity-80 p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900 text-center mb-4">Difficulty</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(levels).map(([key, level]) => (
                <div key={`difficulty-${key}`} className="grid grid-cols-4 items-center gap-2">
                  <input type="checkbox" id={`difficulty-${key}`} className="w-[16px] h-[16px] col-span-1 cursor-pointer"
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        Difficulty: e.target.checked
                          ? [...prev.Difficulty, Number(key)]
                          : prev.Difficulty.filter((difficultyKey) => difficultyKey !== Number(key))
                      }));
                    }}
                  />
                  <label htmlFor={`difficulty-${key}`} className="text-sm text-gray-600 col-span-3 cursor-pointer font-sans">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto bg-[#eeeeee] bg-opacity-70 p-6 flex flex-col gap-2 rounded-lg">
          {/* <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-gray-900 font-medium">Exercise</div>
            <div className="text-gray-900 font-medium">Video</div>
            <div className="text-gray-900 font-medium">Equipment</div>
            <div className="text-gray-900 font-medium">Difficulty</div>
          </div> */}
          {/* <div className="text-center py-4 text-gray-500">
            Select filters to see exercises
          </div> */}

          <div className="grid grid-cols-1 min-[550px]:grid-cols-4 gap-4 items-center bg-[#0F4C75] p-4 rounded-lg">
            <div className="text-white flex items-center gap-2">
              Exercise
            </div>
            <div className="text-white">Muscles</div>
            <div className="text-white">Equipment</div>
            <div className="text-white">Difficulty</div>
          </div>
          <>
            {data?.map((value, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-1 min-[550px]:grid-cols-4 gap-4 items-center bg-[#3d5562] p-4 rounded-lg"
                  onClick={() => handleClick(value?.target_url)}
                >

                  <div className="text-white flex items-center gap-2">
                    {value?.name}
                  </div>
                  <div className="text-white flex flex-col  ">
                    {
                      value?.muscles?.map((v: any, i: any) => {
                        return <span key={i} className=' rounded-full bg-[#28373f] w-fit p-1 m-0.5'>{v?.name}</span>
                      })
                    }

                  </div>
                  <div className="text-white">{value?.category?.name}</div>
                  <div>
                    <div className={`text-white w-fit px-2.5 rounded-2xl
                  ${value?.difficulty?.name == "Beginner" ? "bg-green-700"
                        : value?.difficulty?.name == "Intermediate" ? "bg-gray-500"
                          : value?.difficulty?.name == "Advanced" ? "bg-pink-800"
                            : "bg-amber-600"
                      } `}>
                      {value?.difficulty?.name}
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        </div>
      </div>
    </div>
  );
}
