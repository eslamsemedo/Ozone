"use client"
import React, { memo, Suspense, useEffect, useState } from 'react'
import { Dumbbell, Calendar, Weight, BarChart3, Layers } from 'lucide-react';
import { getWorkouts } from '@/app/lib/workout';
import DropMenu from './uis/dropMenu';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Load from './load';
import load from './load';
import Link from 'next/link';

interface Workout {
  id: number;
  goalType: {
    id: number;
    name: string;
    name_en_us: string;
  };
  status: string;
  name: string;
  name_en_us: string;
  slug: string;
  description: string | null;
  description_en_us: string | null;
  src_image: string | null;
  weight: number;
  difficulty: number;
  equipment: number[];
}

const equipmentOptions = {
  Barbell: 1,
  Dumbbells: 2,
  Bodyweight: 3,
  Machine: 4,
  Kettlebells: 7,
  Cables: 9,
  Band: 10,
  SmithMachine: 85
};
const muscleGroups = {
  "Biceps": 1,
  "Long Head Bicep": 16,
  "Short Head Bicep": 17,
  "Traps (mid-back)": 14,
  "Lower back": 13,
  "Abdominals": 12,
  "Lower Abdominals": 21,
  "Upper Abdominals": 22,
  "Calves": 11,
  "Tibialis": 31,
  "Soleus": 32,
  "Gastrocnemius": 33,
  "Forearms": 10,
  "Wrist Extensors": 25,
  "Wrist Flexors": 26,
  "Glutes": 9,
  "Gluteus Medius": 37,
  "Gluteus Maximus": 38,
  "Hamstrings": 8,
  "Medial Hamstrings": 39,
  "Lateral Hamstrings": 40,
  "Lats": 7,
  "Shoulders": 6,
  "Lateral Deltoid": 18,
  "Anterior Deltoid": 19,
  "Posterior Deltoid": 20,
  "Triceps": 5,
  "Long Head Tricep": 34,
  "Lateral Head Triceps": 35,
  "Medial Head Triceps": 36,
  "Traps": 4,
  "Upper Traps": 41,
  "Lower Traps": 42,
  "Quads": 3,
  "Inner Thigh": 27,
  "Inner Quadriceps": 28,
  "Outer Quadricep": 29,
  "Rectus Femoris": 30,
  "Chest": 2,
  "Upper Pectoralis": 23,
  "Mid and Lower Chest": 24,
  "Obliques": 15,
  "Hands": 43,
  "Feet": 46,
  "Front Shoulders": 47,
  "Rear Shoulders": 48,
  "Neck": 49,
  "Groin": 50
};
const fitnessGoals = {
  "Gain Muscle": 1,
  "Lose Body Fat": 2,
  "Get Stronger": 3
};
const experienceLevels = {
  "Beginner": 1,
  "Intermediate": 2,
  "Advanced": 3,
  "Novice": 4
};

export default function workouts() {

  const [workout, setWorkout] = useState<Workout[]>([])

  const [levels, setLevels] = useState<string[]>([])
  const [equipment, setEquipment] = useState<string[]>([])
  const [muscle, setmuscle] = useState<string[]>([])
  const [Goals, setGoals] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    let fetchData = async () => {
      setWorkout([]);
      setLoading(true);

      let params = {
        limit: 9,
        offset: 0,
        ordering: '-weight',
        equipment: equipment.map(eq => equipmentOptions[eq as keyof typeof equipmentOptions]),
        difficulty: levels.map(level => experienceLevels[level as keyof typeof experienceLevels]),
        muscles: muscle.map(muscleGroup => muscleGroups[muscleGroup as keyof typeof muscleGroups]),
        goals: Goals.map(goal => fitnessGoals[goal as keyof typeof fitnessGoals]),
      }

      try {
        const data = await getWorkouts(params);
        setWorkout(data.results || []); // adjust based on actual API shape
      } catch (error) {
        console.error('Failed to load workouts:', error);
      }
      setLoading(false);
    }
    fetchData()
  }, [equipment, levels, muscle, Goals])


  const WorkoutsComponent = (workout: Workout) => (
    <div className="max-w-md h-full  mx-auto bg-[#eeeeee] rounded-xl shadow-md md:max-w-2xl">
      <div className="md:flex h-full">
        <div className="md:shrink-0">
          <div className="h-48 w-full bg-gray-300 md:h-full md:w-[100px] lg:w-[200px] flex items-center justify-center overflow-hidden">
            {workout?.src_image ? (
              <Image
                src={workout?.src_image}
                alt="Workout thumbnail"
                width={300}   // ✅ Set appropriate width
                height={200}  // ✅ Set appropriate height
                className="h-full w-full object-cover"
              />
            ) : (
              <Dumbbell size={48} className="text-gray-400" />
            )}
          </div>
        </div>
        <div className="p-6 w-full">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-1">
              <Dumbbell size={16} className="text-blue-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-blue-600 uppercase tracking-wider">
              {workout?.goalType.name}
            </span>
          </div>
          <h2 className="mt-2 text-xl font-bold text-gray-900">
            {workout?.name}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <BarChart3 size={18} className="text-gray-500" />
              <span className="ml-2 text-sm text-gray-600">
                Difficulty: {Array(workout?.difficulty).fill('★').join('')}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <Layers size={18} className="text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">Equipment:</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {workout?.equipment.map(eq => (
                <span key={eq} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                  {Object.keys(equipmentOptions).find(key => equipmentOptions[key as keyof typeof equipmentOptions] === eq) || `Equipment ${eq}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='absolute top-[70px] h-[83%] w-full gap-[10px] p-[10px]'>
      <div className='w-full flex justify-end'>
        <div className='flex  flex-wrap gap-[10px] items-center justify-center'>

          <DropMenu menuName="Experience Levels" menu={Object.keys(experienceLevels)} allsets={setLevels} />
          <DropMenu menuName="Equipment" menu={Object.keys(equipmentOptions)} allsets={setEquipment} />
          <DropMenu menuName="Muscle Groups" menu={Object.keys(muscleGroups)} allsets={setmuscle} />
          <DropMenu menuName="Fitness Goals" menu={Object.keys(fitnessGoals)} allsets={setGoals} />
        </div>
      </div>

      {loading ? (
        <div className='h-full w-full absolute  flex justify-center items-center'>
          <Load />
        </div>
      ) : workout.length === 0 ? (
        <div className='h-full w-full absolute flex justify-center items-center text-gray-500'>
          No workouts found
        </div>
      ) : null}
      <div className="h-[83%] w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] relative p-[10px] auto-rows-auto">

        {workout.map((w, i) => (
          <Link href={`/excersice/${workout[i].slug}`} className='h-full' key={i}>
            <WorkoutsComponent {...w} />
          </Link>
        ))}
      </div>
    </div>
  )
  // const workouts = memo(WorkoutsComponent);
}


